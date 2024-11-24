import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function YearPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  const projects = await prisma.project.findMany({
    where: { year: Number(year) },
  });
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      Hello, this is a sub-page for the year {year}.
      <br />
      <div>
        {projects.map((p) => (
          <div key={p.id}>
            {p.title}
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}
