import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import Hero from '@/components/sections/Hero';
import ProjectsLibrary from '@/components/sections/projects-library/ProjectsLibrary';
import { sortByYear } from '@/components/sections/projects-library/utils';
import prisma from '@/lib/prisma';
import Link from 'next/link';

export default async function LandingPage() {
  const projects = await prisma.project.findMany({
    include: { Author: true },
  });
  const projectsByYear = sortByYear(projects);

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
