import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import ProjectsGroup from '@/components/sections/projects-library/ProjectsGroup';
import { supabase } from '@/utils/supabase/initSupabase';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: '10kB Author',
};

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ authorId: string }>;
}) {
  try {
    const { authorId } = await params;
    const { data, error } = await supabase
      .from('author')
      .select(
        `
            *,
            project (
              *,
              author (*)
            )
          `
      )
      .eq('id', Number(authorId))
      .limit(1)
      .single();
    if (error) {
      console.error('An error occurred: ', error);
    }
    if (!data) {
      console.error('No projects');
      notFound();
    }
    const author = data;

    return (
      <main className="w-full pt-64 sm:pt-48">
        <ResponsiveContainer>
          <Link
            href="/authors"
            className="absolute block text-neutral-lighter -mt-12 w-fit hover:bg-black-lighter px-1.5 py-0.5"
          >
            {'<- '}All authors
          </Link>
          <h1 className="text-4xl font-medium mb-64">
            Projects by{' '}
            <span className="bg-success px-2 text-black">
              {author.fname + ' ' + author.sname}
            </span>
          </h1>
          <ProjectsGroup projects={author.project} />
        </ResponsiveContainer>
      </main>
    );
  } catch (e: unknown) {
    console.log('An error occurred: ' + e);
    notFound();
  }
}
