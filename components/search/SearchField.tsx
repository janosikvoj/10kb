'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const SearchIcon = ({ className }: { className: string }) => {
  return (
    <svg
      className={cn(
        'top-0 ml-0.5 pt-0.5 absolute pointer-events-none',
        className
      )}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 7H7V6L8 6V7Z" />
      <path d="M7 8H6V7L7 7V8Z" />
      <path d="M8 15H7V14H8V15Z" />
      <path d="M14 7H13V6L14 6V7Z" />
      <path d="M15 8H14V7H15V8Z" />
      <path d="M16 16H15V15H16V16Z" />
      <path d="M17 17H16V16H17V17Z" />
      <path d="M18 18H17V17H18V18Z" />
      <path d="M19 19H18V18H19V19Z" />
      <path d="M7 14H6V13H7V14Z" />
      <path d="M14 13V14H13V15H15V13H14Z" />
      <path d="M16 8H15V13H16V8Z" />
      <path d="M8 5V6L13 6V5L8 5Z" />
      <path d="M5 13H6V8H5L5 13Z" />
      <path d="M8 15V16H13V15H8Z" />
    </svg>
  );
};

interface SearchFieldProps {
  className?: string;
}

const SearchField: React.FC<SearchFieldProps> = ({ className }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    router.replace(`/search?${params.toString()}`, { scroll: false });
  }

  return (
    <section
      role="search"
      className={cn(
        'relative justify-self-end flex flex-row gap-2 items-center text-white',
        className
      )}
    >
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        autoComplete="off"
        id="search"
        className={cn(
          'peer w-32 py-0.5 pl-8 bg-transparent outline-none',
          'placeholder:text-neutral-lighter focus-visible:text-info'
        )}
        placeholder="Search…"
        defaultValue={searchParams.get('query')?.toString()}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <SearchIcon className="fill-white peer-focus-visible:fill-info" />
    </section>
  );
};

export default SearchField;
