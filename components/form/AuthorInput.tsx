'use client';

import { Check, ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';
import { Author } from '@prisma/client';
import { FormControl } from '@/components/ui/form';
import AddAuthorButton from './AddAuthorButton';

interface SelectSearchAddProps {
  field: ControllerRenderProps<
    {
      title: string;
      year: number;
      description: string;
      author: number;
      zipFile: File;
    },
    'author'
  >;
  authors: Author[];
  form: UseFormReturn<{
    author: number;
    title: string;
    year: number;
    description: string;
    zipFile: File;
  }>;
}

const getAuthorById = (id: number, authors: Author[]) =>
  authors.find((author) => author.id === id);

const AuthorInput: React.FC<SelectSearchAddProps> = ({
  field,
  authors,
  form,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const selectedAuthor = getAuthorById(field.value, authors);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            id="select-42"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-black px-3 font-normal hover:bg-black text-base md:text-sm"
          >
            <span
              className={cn(
                'truncate',
                !selectedAuthor && 'text-neutral-lighter'
              )}
            >
              {selectedAuthor
                ? `${selectedAuthor.fname} ${selectedAuthor.sname}`
                : 'Select author'}
            </span>
            <ChevronDown
              size={16}
              strokeWidth={2}
              className="shrink-0 text-white-darker"
              aria-hidden="true"
            />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent
        className="w-full min-w-[var(--radix-popper-anchor-width)] p-0"
        align="start"
      >
        <Command
          filter={(value, search) => {
            const author = getAuthorById(Number(value), authors);

            if (
              author &&
              `${author.fname} ${author.sname}`
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase())
            )
              return 1;
            return 0;
          }}
        >
          <CommandInput placeholder="Find" />
          <CommandList>
            <CommandEmpty>No author found.</CommandEmpty>
            <CommandGroup heading="Options">
              <AddAuthorButton />
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Existing authors">
              {authors.map((author) => (
                <CommandItem
                  className="cursor-pointer"
                  key={author.id}
                  value={String(author.id)}
                  onSelect={(currentValue) => {
                    form.setValue(
                      'author',
                      currentValue === String(selectedAuthor?.id)
                        ? NaN
                        : getAuthorById(Number(currentValue), authors)?.id ||
                            NaN,
                      {
                        shouldValidate: true,
                        shouldDirty: true,
                      }
                    );
                    setOpen(false);
                  }}
                >
                  {`${author.fname} ${author.sname}`}
                  <Check
                    className={cn(
                      'ml-auto',
                      selectedAuthor?.id === author.id
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
export default AuthorInput;
