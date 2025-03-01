import { Project, Author } from '@prisma/client';

export type ProjectWithAuthor = {
  Author: Author | null;
} & Project;

export type AuthorWithProjects = {
  projects: Project[];
} & Author;

export type AuthorWithProjectsWithAuthor = {
  projects: ProjectWithAuthor[];
} & Author;
