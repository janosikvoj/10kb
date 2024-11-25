import { cn } from '@/lib/utils';
import React from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

interface SearchFieldProps {
  className?: string;
}

const SearchField: React.FC<SearchFieldProps> = ({ className }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handleFocus(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    params.set('nav', 'search');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <section
      role="search"
      className={cn(
        'relative justify-self-end flex flex-row gap-2 items-center text-muted',
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
          'peer w-32 py-0.5 pl-8 bg-transparent placeholder:text-text outline-none',
          'focus-visible:placeholder:text-surface focus-visible:w-64 focus-visible:text-info',
          'transition-all duration-500'
        )}
        placeholder="Search…"
        defaultValue={searchParams.get('query')?.toString()}
        onFocus={(e) => handleFocus(e.target.value)}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <svg
        className="top-0 ml-0.5 pt-0.5 absolute pointer-events-none fill-text peer-focus-visible:fill-info"
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
    </section>
  );
};

export default SearchField;
