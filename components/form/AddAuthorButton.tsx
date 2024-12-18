import React, { useActionState, useEffect, useTransition } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { FieldPath, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { addAuthorSchema, AddAuthorSchema } from '@/lib/validation/addAuthor';
import { ActionState } from '@/types/ActionState';
import { createAuthor } from '@/actions/createAuthor';
import { toast } from '@/hooks/use-toast';

const AddAuthorButton = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<AddAuthorSchema>({
    resolver: zodResolver(addAuthorSchema),
    defaultValues: {
      fname: '',
      sname: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values: AddAuthorSchema) => {
    startTransition(async () => {
      formAction(values);
    });
  };

  const [state, formAction] = useActionState<ActionState, AddAuthorSchema>(
    createAuthor,
    null
  );

  useEffect(() => {
    if (!state) {
      return;
    }
    if (state.status === 'error') {
      console.log(state.errors);
      state.errors?.forEach((error) => {
        form.setError(error.path as FieldPath<AddAuthorSchema>, {
          message: error.message,
        });
      });
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
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" className="w-full justify-start font-normal">
            <Plus
              size={16}
              strokeWidth={2}
              className="-ms-2 me-2 opacity-60"
              aria-hidden="true"
            />
            New author
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New author</DialogTitle>
            <DialogDescription>
              The created author will be saved in the database and become
              available to select.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input placeholder="Honza" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Surname</FormLabel>
                    <FormControl>
                      <Input placeholder="Novák" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Close
              </Button>
            </DialogClose>
            <Button
              onClick={async () => {
                await form.trigger();
                if (form.formState.isValid) onSubmit(form.getValues());
              }}
              type="submit"
            >
              {isPending ? 'Loading…' : 'Submit'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddAuthorButton;
