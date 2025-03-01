import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import Hero from '@/components/sections/Hero';
import ProjectsLibrary from '@/components/sections/projects-library/ProjectsLibrary';
import { ProjectWithAuthor } from '@/components/sections/projects-library/types';
import { sortByYear } from '@/components/sections/projects-library/utils';
import prisma from '@/lib/prisma';
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
  let projects: ProjectWithAuthor[] = [];
  try {
    projects = await prisma.project.findMany({
      include: { Author: true },
    });
  } catch (e: unknown) {
    console.log('An error occurred: ' + e);
  }
  const projectsByYear = filterLastThreeYears(sortByYear(projects));

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
