import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import ProjectsLibrary from '@/components/sections/projects-library/ProjectsLibrary';
import { sortByYear } from '@/components/sections/projects-library/utils';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function YearsPage() {
  try {
    const projects = await prisma.project.findMany({
      include: { Author: true },
    });
    const projectsByYear = sortByYear(projects);
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
  } catch {
    notFound();
  }
}
