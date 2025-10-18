import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import ProjectsLibrary from '@/components/sections/projects-library/ProjectsLibrary';
import { sortByYear } from '@/components/sections/projects-library/utils';
import { supabase } from '@/utils/supabase/initSupabase';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '10kB Years',
};

export const dynamic = 'force-dynamic';

export default async function YearsPage() {
  const { data, error } = await supabase.from('project').select(`
    *,
    author (*)
  `);
  if (error) {
    console.error('An error occurred: ', error);
  }
  if (data == null || data.length <= 0) {
    console.error('No projects');
  }

  const projectsByYear = sortByYear(data ?? []);

  return (
    <main className="w-full pt-64 sm:pt-48">
      <ResponsiveContainer>
        <Link
          href="/"
          className="absolute block text-neutral-lighter -mt-12 w-fit hover:bg-black-lighter px-1.5 py-0.5"
        >
          {'<- '}Home
        </Link>
        <h1 className="text-4xl font-medium mb-64">Projects by years</h1>
        <ProjectsLibrary projectsGroups={projectsByYear} />
      </ResponsiveContainer>
    </main>
  );
}
