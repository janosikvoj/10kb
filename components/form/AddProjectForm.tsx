'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FieldPath, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  AddProjectSchema,
  addProjectSchema,
} from '@/lib/validation/addProject';
import { Author } from '@prisma/client';
import { useActionState, useEffect, useTransition } from 'react';
import { ActionState } from '@/types/ActionState';
import { createProject } from '@/actions/createProject';
import AuthorInput from './AuthorInput';
import { toast } from '@/hooks/use-toast';

export default function AddProjectForm({
  data,
}: {
  data: { authors: Author[] };
}) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<AddProjectSchema>({
    resolver: zodResolver(addProjectSchema),
    defaultValues: {
      title: '',
      year: new Date().getFullYear(),
      description: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values: AddProjectSchema) => {
    startTransition(async () => {
      formAction(values);
    });
  };

  const [state, formAction] = useActionState<ActionState, AddProjectSchema>(
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
        form.setError(error.path as FieldPath<AddProjectSchema>, {
          message: error.message,
        });
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
        <div className="md:grid grid-cols-2 gap-16 mb-16">
          <div className="flex flex-col gap-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="10kb web" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name of the website.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="2024" {...field} />
                  </FormControl>
                  <FormDescription>Project completion year.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <AuthorInput
                    field={field}
                    authors={data.authors}
                    form={form}
                  />
                  <FormDescription>
                    Select an author from the database or add a new one.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-8">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Lorem ipsum dolor sit amet…"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This text will be visible on a detail page.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zipFile"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>ZIP File</FormLabel>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      accept="application/zip, application/x-zip-compressed"
                      type="file"
                      onChange={(event) =>
                        onChange(event.target.files && event.target.files[0])
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Upload a ZIP file that contains an index.html.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit" className="w-full">
          {isPending ? 'Loading…' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}
