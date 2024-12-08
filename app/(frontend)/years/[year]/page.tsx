import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import ProjectsGroup from '@/components/sections/projects-library/ProjectsGroup';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function YearPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  try {
    const { year } = await params;
    const projects = await prisma.project.findMany({
      where: { year: Number(year) },
      include: { Author: true },
    });
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
          <ProjectsGroup projects={projects} />
        </ResponsiveContainer>
      </main>
    );
  } catch {
    notFound();
  }
}
