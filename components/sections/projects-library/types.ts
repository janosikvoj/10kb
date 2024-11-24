import { Project } from '@prisma/client';

export type ProjectWithAuthor = {
  Author: {
    id: number;
    fname: string;
    sname: string;
  } | null;
} & Project;
