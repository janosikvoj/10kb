'use client';

import { useActionState, useEffect, useState } from 'react';
import { FieldPath, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createProject } from '@/actions/createProject';
import { addFormSchema, AddFormSchema } from '@/lib/validation/addProject';
import { ProjectFormContent } from './ProjectFormContent';
import { Author } from '@prisma/client';
import { AddAuthorForm } from './AddAuthorForm';
import { ActionState } from '@/types/ActionState';

const DEV_MODE = false;

interface AddProjectFormProps {
  data: { authors: Author[] };
}

export const AddProjectForm: React.FC<AddProjectFormProps> = ({ data }) => {
  const [clientSideValidation, setClientSideValidation] = useState(true);
  const [authorModal, setAuthorModal] = useState(false);

  const {
    register,
    formState: { isValid, errors },
    setError,
    reset,
  } = useForm<AddFormSchema>({
    mode: 'all',
    resolver: clientSideValidation ? zodResolver(addFormSchema) : undefined,
  });

  const [state, formAction] = useActionState<ActionState, FormData>(
    createProject,
    null
  );

  useEffect(() => {
    if (!state) {
      return;
    }
    if (state.status === 'error') {
      console.log(state.errors);
      state.errors?.forEach((error) => {
        setError(error.path as FieldPath<AddFormSchema>, {
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
      {DEV_MODE && (
        <div className="pb-1.5 mb-1.5 border-b flex items-center">
          <input
            type="checkbox"
            checked={clientSideValidation}
            onChange={() => {
              reset();
              setClientSideValidation(!clientSideValidation);
            }}
            id="client-side-validation-checkbox"
            className="mr-3"
          />
          <label htmlFor="client-side-validation-checkbox">
            Enable client-side validation
          </label>
        </div>
      )}
      <div className="relative">
        {authorModal && (
          <div className="absolute inset-0 p-8 bg-background bg-opacity-80 z-10">
            <AddAuthorForm setAuthorModal={setAuthorModal} />
          </div>
        )}
        <form action={formAction}>
          <ProjectFormContent
            register={register}
            isValid={isValid}
            errors={errors}
            data={data}
            setAuthorModal={setAuthorModal}
          />
        </form>
      </div>
    </>
  );
};
