import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import ProjectsGroup from '@/components/sections/projects-library/ProjectsGroup';
import prisma from '@/lib/prisma';
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
    if (!Number(authorId)) throw new Error();

    const author = await prisma.author.findUniqueOrThrow({
      where: { id: Number(authorId) },
      include: { projects: true },
    });

    const projects = author.projects.map((project) => {
      return {
        ...project,
        Author: { id: author.id, fname: author.fname, sname: author.sname },
      };
    });

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
          <ProjectsGroup projects={projects} />
        </ResponsiveContainer>
      </main>
    );
  } catch (e: unknown) {
    console.log('An error occurred: ' + e);
    notFound();
  }
}
