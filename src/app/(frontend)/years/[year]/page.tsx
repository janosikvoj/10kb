import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import ProjectsGroup from '@/components/sections/projects-library/ProjectsGroup';
import { supabase } from '@/utils/supabase/initSupabase';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: '10kB Year',
};

export default async function YearPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  try {
    const { year } = await params;

    const { data, error } = await supabase
      .from('project')
      .select(
        `
      *,
      author (*)
    `
      )
      .eq('year', Number(year));
    if (error) {
      console.error('An error occurred: ', error);
    }
    if (data == null || data.length <= 0) {
      console.error('No projects');
    }
    const projects = data;

    return (
      <main className="w-full pt-64 sm:pt-48">
        <ResponsiveContainer>
          <Link
            href="/years"
            className="absolute block text-neutral-lighter -mt-12 w-fit hover:bg-black-lighter px-1.5 py-0.5"
          >
            {'<- '}All years
          </Link>
          <h1 className="text-4xl font-medium mb-64">
            <span className="z-10">Projects from </span>
            <span className="bg-success px-2 text-black">{year}</span>
          </h1>
          <ProjectsGroup projects={projects ?? []} />
        </ResponsiveContainer>
      </main>
    );
  } catch (e: unknown) {
    console.log('An error occurred: ' + e);
    notFound();
  }
}
