import React, { useActionState, useEffect, useTransition } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Author } from '@prisma/client';
import { z } from 'zod';
import { Form, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ActionState } from '@/types/ActionState';
import { toast } from '@/hooks/use-toast';
import { deleteAuthor } from '@/actions/deleteAuthor';
import { Button } from '../ui/button';
import { LoaderCircle, Trash2 } from 'lucide-react';

const deleteAuthorSchema = z.object({ id: z.number() });
export type DeleteAuthorSchema = z.infer<typeof deleteAuthorSchema>;

const AuthorTableBody = ({
  paginatedAuthors,
}: {
  paginatedAuthors: Author[];
}) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<DeleteAuthorSchema>({
    resolver: zodResolver(deleteAuthorSchema),
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

  useEffect(() => {
    console.log('DeleteAuthor: ' + state?.message);
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
      <form>
        <Table>
          <TableHeader>
            <TableRow className="border-neutral">
              <TableHead className="w-[48px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Surname</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedAuthors.map((author) => (
              <TableRow key={author.id} className="border-neutral-darker">
                <TableCell className="text-info">{author.id}</TableCell>
                <TableCell className="font-medium">{author.sname}</TableCell>
                <TableCell className="text-neutral-lighter">
                  {author.fname}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    onClick={async () => {
                      onSubmit({ id: author.id });
                    }}
                    variant="ghost"
                    className="text-error hover:bg-error"
                    type="button"
                  >
                    {isPending ? (
                      <LoaderCircle className="animate-spin" />
                    ) : (
                      <Trash2 />
                    )}
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </form>
    </Form>
  );
};

export default AuthorTableBody;
