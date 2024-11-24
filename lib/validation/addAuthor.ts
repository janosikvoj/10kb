import { z } from 'zod';

export const addAuthorSchema = z.object({
  fname: z.string().min(2, 'Input at least 2 characters'),
  sname: z.string().min(2, 'Input at least 2 characters'),
});

export type AddAuthorSchema = z.infer<typeof addAuthorSchema>;
