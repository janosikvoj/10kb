import { z } from 'zod';

export const addAuthorSchema = z.object({
  fname: z.string().min(2, 'Input at least 2 characters'),
  sname: z.string().min(2, 'Input at least 2 characters'),
});

export type AddAuthorSchema = z.infer<typeof addAuthorSchema>;

// Define the file size limit and accepted file types as constants
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_FILE_TYPES = ['application/zip', 'application/x-zip-compressed'];

export const addProjectSchema = z.object({
  title: z
    .string({ message: 'Title is required' })
    .min(3, 'Title should be at least 3 characters'),

  year: z.coerce
    .number({ message: 'Year is required' })
    .int('Must be a whole number')
    .min(1900)
    .max(new Date().getFullYear()),

  description: z.string().min(1, 'Description is required'),

  author: z.coerce.number({ message: 'Author selection is required' }),

  zipFile: z
    .instanceof(File, { message: 'Project upload is required' })
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
      'Only the .zip format is supported'
    )
    .refine((file) => file.size < MAX_FILE_SIZE, 'Max file size is 5MB'),
});

export type AddProjectSchema = z.infer<typeof addProjectSchema>;
