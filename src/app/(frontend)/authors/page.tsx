import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import ProjectsLibrary from '@/components/sections/projects-library/ProjectsLibrary';
import { supabase } from '@/utils/supabase/initSupabase';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: '10kB Authors',
};

export const dynamic = 'force-dynamic';

export default async function AuthorsPage() {
  const { data, error } = await supabase.from('author').select(
    `
      *,
      project (
        *,
        author (*)
      )
    `
  );
  if (error) {
    console.error('An error occurred: ', error);
  }
  if (!data) {
    console.error('No projects');
    notFound();
  }

  const projectsByAuthor = data.reduce((acc, author) => {
    const authorName =
      `${author.fname || ''} ${author.sname || ''}`.trim() || 'Unknown';
    acc[authorName] = author.project;
    return acc;
  }, {} as { [key: string]: (typeof data)[0]['project'] });

  return (
    <main className="w-full pt-64 sm:pt-48">
      <ResponsiveContainer>
        <Link
          href="/"
          className="absolute block text-neutral-lighter -mt-12 w-fit hover:bg-black-lighter px-1.5 py-0.5"
        >
          {'<- '}Home
        </Link>
        <h1 className="text-4xl font-medium mb-64">Projects by authors</h1>
        <ProjectsLibrary projectsGroups={projectsByAuthor} />
      </ResponsiveContainer>
    </main>
  );
}
