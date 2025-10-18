import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import Hero from '@/components/sections/Hero';
import ProjectsLibrary from '@/components/sections/projects-library/ProjectsLibrary';
import { ProjectWithAuthor } from '@/components/sections/projects-library/types';
import { sortByYear } from '@/components/sections/projects-library/utils';
import { supabase } from '@/utils/supabase/initSupabase';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

function filterLastThreeYears(data: { [year: number]: ProjectWithAuthor[] }): {
  [year: number]: ProjectWithAuthor[];
} {
  const years = Object.keys(data)
    .map(Number)
    .sort((a, b) => b - a)
    .slice(0, 3);
  return years.reduce((acc, year) => ({ ...acc, [year]: data[year] }), {});
}

export default async function LandingPage() {
  const { data, error } = await supabase.from('project').select(
    `
        *,
        author (*)
      `
  );
  if (error) {
    console.error('An error occurred: ', error);
  }
  if (data == null || data.length <= 0) {
    console.error('No projects');
  }

  const projectsByYear = filterLastThreeYears(sortByYear(data ?? []));

  return (
    <main className="w-full">
      <Hero />
      <div className="h-64" />
      <ResponsiveContainer>
        <ProjectsLibrary projectsGroups={projectsByYear} />
        <div className="mt-32">
          <Link
            className="px-3 py-2 bg-white text-black hover:bg-info"
            href="/years"
          >
            Browse all projects{' ->'}
          </Link>
        </div>
      </ResponsiveContainer>
    </main>
  );
}
