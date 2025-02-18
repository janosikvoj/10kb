import { Project, Author } from '@prisma/client';

export type ProjectWithAuthor = {
  Author: Author | null;
} & Project;
