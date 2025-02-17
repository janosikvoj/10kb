'use client';

import React, { useActionState, useEffect, useTransition } from 'react';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { Form } from '../ui/form';
import { ActionState } from '@/types/ActionState';
import { toast } from '@/hooks/use-toast';
import { deleteAuthor } from '@/actions/deleteAuthor';
import { number, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, Trash2 } from 'lucide-react';

const deleteAuthorSchema = z.object({ id: number() });
export type DeleteAuthorSchema = z.infer<typeof deleteAuthorSchema>;

const DeleteAuthorButton = ({ authorId }: { authorId: number }) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<DeleteAuthorSchema>({
    resolver: zodResolver(deleteAuthorSchema),
    defaultValues: {
      id: authorId,
    },
    mode: 'onChange',
  });

  const onSubmit = async (values: DeleteAuthorSchema) => {
    startTransition(async () => {
      formAction(values);
    });
  };

  const [state, formAction] = useActionState<ActionState, DeleteAuthorSchema>(
    deleteAuthor,
    null
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Button
          variant="ghost"
          className="text-error hover:bg-error"
          type="submit"
        >
          {isPending ? <LoaderCircle className="animate-spin" /> : <Trash2 />}
          Delete
        </Button>
      </form>
    </Form>
  );
};

export default DeleteAuthorButton;
