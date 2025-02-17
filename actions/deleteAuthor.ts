'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { DeleteAuthorSchema } from '@/components/form/DeleteAuthorButton';
import { ActionState } from '@/types/ActionState';
import { cookies } from 'next/headers';
import * as jose from 'jose';

export async function deleteAuthor(
  state: ActionState,
  inputData: DeleteAuthorSchema
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
  // DELETE AUTHOR FROM DATABASE
  //———————————————————————————
  try {
    await prisma.author.delete({
      where: {
        id: inputData.id,
      },
    });

    revalidatePath('/');

    return {
      status: 'success',
      message: 'Author deleted successfully',
    };
  } catch (error: unknown) {
    console.error('Failed to delete author:', error);
    return {
      status: 'error',
      message: 'Failed to delete author. Please try again.',
    };
  }
}
