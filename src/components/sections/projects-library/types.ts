import { Database } from '@/utils/supabase/supabase';

// Extract table types from Supabase generated types
export type Project = Database['public']['Tables']['project']['Row'];
export type Author = Database['public']['Tables']['author']['Row'];

// ProjectWithAuthor - a project with its author
export type ProjectWithAuthor = Project & {
  author: Author | null;
};

// AuthorWithProjects - an author with their projects
export type AuthorWithProjects = Author & {
  project: Project[];
};

// AuthorWithProjectsWithAuthor - an author with projects that include author data
export type AuthorWithProjectsWithAuthor = Author & {
  project: ProjectWithAuthor[];
};
