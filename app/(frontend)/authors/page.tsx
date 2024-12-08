import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import ProjectsLibrary from '@/components/sections/projects-library/ProjectsLibrary';
import { ProjectWithAuthor } from '@/components/sections/projects-library/types';
import prisma from '@/lib/prisma';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: '10kB Authors',
};

export default async function AuthorsPage() {
  try {
    const authorsWithProjects = await prisma.author.findMany({
      orderBy: { sname: 'desc' },
      include: {
        projects: {
          include: { Author: true },
        },
      },
    });

    const projectsByAuthor: { [group: string]: ProjectWithAuthor[] } = {};
    authorsWithProjects.forEach((author) => {
      projectsByAuthor[author.fname + ' ' + author.sname] = author.projects;
    });

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
  } catch {
    notFound();
  }
}
