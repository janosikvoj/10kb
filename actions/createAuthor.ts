'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { AddAuthorSchema, addAuthorSchema } from '@/lib/validation/addAuthor';
import { ActionState } from '@/types/ActionState';

export async function createAuthor(
  state: ActionState,
  inputData: AddAuthorSchema
): Promise<ActionState> {
  //———————————————————————————
  // PARSE FORM DATA
  //———————————————————————————

  const parse = await addAuthorSchema.safeParseAsync(inputData);

  if (!parse.success) {
    return {
      status: 'error',
      message: 'Failed to parse form data:' + parse.error,

      errors: parse.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: `Server validation: ${issue.message}`,
      })),
    };
  }

  const data = parse.data;

  //———————————————————————————
  // ADD A RECORD TO DATABASE
  //———————————————————————————

  await prisma.author.create({
    data: {
      fname: data.fname,
      sname: data.sname,
    },
  });

  revalidatePath('/');

  return {
    status: 'success',
    message: `New author ${data.fname} ${data.sname} added`,
  };
}
