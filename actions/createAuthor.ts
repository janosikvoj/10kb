'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { AddAuthorSchema, addAuthorSchema } from '@/lib/validation/addAuthor';
import { ActionState } from '@/types/ActionState';
import { cookies } from 'next/headers';
import * as jose from 'jose';

export async function createAuthor(
  state: ActionState,
  inputData: AddAuthorSchema
): Promise<ActionState> {
  //———————————————————————————
  // JWT Authentication Check
  //———————————————————————————

  const adminCookies = await cookies();
  const adminSessionToken = adminCookies.get('adminSession')?.value;

  if (!adminSessionToken) {
    return {
      status: 'error',
      message: 'Authentication required. Please log in again.',
    };
  }

  try {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    if (!jwtSecretKey) {
      console.error(
        'JWT_SECRET_KEY is not set in environment variables (Server Action)!'
      );
      return { status: 'error', message: 'Server configuration error' };
    }

    // 1. Verify JWT using jose
    const secret = new TextEncoder().encode(jwtSecretKey);
    const { payload: verifiedToken } = await jose.jwtVerify(
      adminSessionToken,
      secret,
      {
        algorithms: ['HS256'],
      }
    );

    if (!verifiedToken.isAdmin) {
      throw new Error('Not an admin');
    }
  } catch (error) {
    console.error('JWT verification failed in Server Action:', error);
    return {
      status: 'error',
      message: 'Session invalid. Please log in again.',
    };
  }

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
