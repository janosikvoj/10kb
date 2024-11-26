import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import ProjectsGroup from '@/components/sections/projects-library/ProjectsGroup';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

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
      <main className="w-full">
        <ResponsiveContainer className="pt-64">
          <ProjectsGroup projects={projects} />
        </ResponsiveContainer>
      </main>
    );
  } catch {
    notFound();
  }
}
