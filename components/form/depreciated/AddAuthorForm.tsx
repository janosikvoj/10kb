'use client';

import { useActionState, useEffect, useState } from 'react';
import { FieldPath, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createAuthor } from '@/actions/createAuthor';
import { useFormStatus } from 'react-dom';
import { ErrorMessage } from '@hookform/error-message';
import { addAuthorSchema, AddAuthorSchema } from '@/lib/validation/addAuthor';
import { cn } from '@/lib/utils';
import { ActionState } from '@/types/ActionState';

interface AuthorFormContentProps {
  setAuthorModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddAuthorForm: React.FC<AuthorFormContentProps> = ({
  setAuthorModal,
}) => {
  const [clientSideValidation] = useState(true);

  const {
    register,
    formState: { isValid, errors },
    setError,
    reset,
  } = useForm<AddAuthorSchema>({
    mode: 'all',
    resolver: clientSideValidation ? zodResolver(addAuthorSchema) : undefined,
  });

  const [state, formAction] = useActionState<ActionState, FormData>(
    createAuthor,
    null
  );

  const { pending } = useFormStatus();

  useEffect(() => {
    if (!state) {
      return;
    }
    if (state.status === 'error') {
      console.log(state.errors);
      state.errors?.forEach((error) => {
        setError(error.path as FieldPath<AddAuthorSchema>, {
          message: error.message,
        });
      });
    }
    if (state.status === 'success') {
      alert(state.message);
      reset();
    }
  }, [state, setError, reset]);

  return (
    <>
      <form action={formAction}>
        <div className="grid grid-cols-1 gap-8 relative text-white max-w-xl">
          <div className="w-full">
            <label className="font-semibold block mb-2" htmlFor="name">
              First Name
            </label>
            <input
              {...register('fname')}
              type="text"
              className="block px-4 py-2 bg-background text-white border-surface rounded-md border w-full placeholder:text-neutral-lighter"
            />
            <span className="text-error text-sm">
              <ErrorMessage name="fname" errors={errors} />
            </span>
          </div>
          <div className="w-full">
            <label className="font-semibold block mb-2" htmlFor="name">
              Last Name
            </label>
            <input
              {...register('sname')}
              type="text"
              className="block px-4 py-2 bg-background text-white border-surface rounded-md border w-full placeholder:text-neutral-lighter"
            />
            <span className="text-error text-sm">
              <ErrorMessage name="sname" errors={errors} />
            </span>
          </div>
          <div className="flex flex-row gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                setAuthorModal(false);
              }}
              className="px-4 py-2 bg-background text-white border-surface rounded-md border"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={pending || !isValid}
              className={cn(
                'px-4 py-2 bg-white text-black border-surface rounded-md border w-full',
                (pending || !isValid) && 'bg-surface'
              )}
            >
              Add author
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
