import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import ProjectsGroup from '@/components/sections/projects-library/ProjectsGroup';
import prisma from '@/lib/prisma';

export default async function YearPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  const projects = await prisma.project.findMany({
    where: { year: Number(year) },
    include: { Author: true },
  });
  return (
    <main className="w-full">
      <ResponsiveContainer className="pt-64">
        <ProjectsGroup projects={projects} />
      </ResponsiveContainer>
    </main>
  );
}
