'use client';

import React, { useActionState, useEffect, useTransition } from 'react';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { Form } from '../ui/form';
import { ActionState } from '@/types/ActionState';
import { toast } from '@/hooks/use-toast';
import { number, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, Trash2 } from 'lucide-react';
import { deleteProject } from '@/actions/deleteProject';

const deleteProjectSchema = z.object({ id: number() });
export type DeleteProjectSchema = z.infer<typeof deleteProjectSchema>;

const DeleteProjectButton = ({ projectId }: { projectId: number }) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<DeleteProjectSchema>({
    resolver: zodResolver(deleteProjectSchema),
    defaultValues: {
      id: projectId,
    },
    mode: 'onChange',
  });

  const onSubmit = async (values: DeleteProjectSchema) => {
    startTransition(async () => {
      formAction(values);
    });
  };

  const [state, formAction] = useActionState<ActionState, DeleteProjectSchema>(
    deleteProject,
    null
  );

  useEffect(() => {
    if (!state) {
      return;
    }
    if (state.status === 'error') {
      console.log(state.errors);
      toast({
        title: 'Failure',
        description: state.message,
      });
    }
    if (state.status === 'success') {
      toast({
        title: 'Success',
        description: state.message,
      });
      form.reset();
    }
  }, [state, form]);

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

export default DeleteProjectButton;
