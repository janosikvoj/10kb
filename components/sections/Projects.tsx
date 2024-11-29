import React from 'react';
import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import LandingPageNavLink from '../navigation/LandingPageNavLink';
import { cn, shuffle } from '@/lib/utils';
import prisma from '@/lib/prisma';
import Link from 'next/link';

const MAX_LINK_COUNT = 6;

async function fetchProjects() {
  try {
    const projects = await prisma.project.findMany({
      select: {
        year: true,
      },
    });
    return projects;
  } catch {
    throw new Error('Failed to fetch projects');
  }
}

async function fetchAuthors() {
  try {
    const authors = await prisma.author.findMany({
      include: { _count: { select: { projects: true } } },
    });
    return authors;
  } catch {
    throw new Error('Failed to fetch authors');
  }
}

const Projects = async () => {
  const authors = await fetchAuthors();
  shuffle(authors);

  const projectsYear: {
    year: number;
  }[] = await fetchProjects();

  const years: number[] = projectsYear.map((p) => p.year);

  const uniqueYears: number[] = [...new Set(projectsYear.map((p) => p.year))];

  uniqueYears.sort((a, b) => b - a);

  const uniqueYearsWithProjectCount: {
    year: number;
    count: number;
  }[] = [
    ...uniqueYears.map((y) => {
      return { year: y, count: years.filter((a) => a === y).length };
    }),
  ];

  return (
    <div className="w-full h-screen">
      <ResponsiveContainer className="pt-48">
        <LandingPageNavLink
          to={undefined}
          className="block text-neutral-lighter mt-2 w-fit hover:bg-black-lighter px-1.5 py-0.5"
        >
          {'<- '}Go back
        </LandingPageNavLink>
        <div className="mt-8 space-y-4">
          <details open={true} className="group/details">
            <summary
              className={cn(
                'w-fit list-none text-info border-info border px-1.5 py-0.5 cursor-pointer select-none',
                'group-open/details:text-black group-open/details:bg-info',
                'hover:border-white-lighter hover:text-white-lighter hover:group-open/details:bg-white-lighter'
              )}
            >
              Years
            </summary>
            <div className="mt-2 grid grid-cols-3">
              {uniqueYearsWithProjectCount.map((y, i) => {
                if (i > MAX_LINK_COUNT - 1) return;
                return (
                  <Link
                    key={y.year}
                    href={`/years/${y.year}`}
                    className="hover:bg-black-lighter px-3 py-2"
                  >
                    {y.year}
                    <span className="text-xs align-top text-info font-semibold ml-px">
                      {y.count}
                    </span>
                  </Link>
                );
              })}
              {uniqueYearsWithProjectCount.length > MAX_LINK_COUNT && (
                <Link
                  href={'/years'}
                  className="hover:bg-black-lighter px-3 py-2 col-span-3 text-neutral-lighter"
                >
                  Show {uniqueYearsWithProjectCount.length - MAX_LINK_COUNT}{' '}
                  older{' ->'}
                </Link>
              )}
            </div>
          </details>
          <details open={false} className="group/details">
            <summary
              className={cn(
                'w-fit list-none text-info border-info border px-1.5 py-0.5 cursor-pointer select-none',
                'group-open/details:text-black group-open/details:bg-info',
                'hover:border-white-lighter hover:text-white-lighter hover:group-open/details:bg-white-lighter'
              )}
            >
              Authors
            </summary>
            <div className="mt-2 grid grid-cols-2">
              {authors.map((author, i) => {
                if (i > MAX_LINK_COUNT - 1) return;
                return (
                  <Link
                    key={author.id}
                    href={`/authors/${author.id}`}
                    className="hover:bg-black-lighter px-3 py-2"
                  >
                    {author.fname} {author.sname}
                    <span className="text-xs align-top text-info ml-px font-semibold">
                      {author._count.projects}
                    </span>
                  </Link>
                );
              })}
              {authors.length > MAX_LINK_COUNT && (
                <Link
                  href={'/authors'}
                  className="hover:bg-black-lighter px-3 py-2 col-span-2 text-neutral-lighter"
                >
                  Show {authors.length - MAX_LINK_COUNT} more{' ->'}
                </Link>
              )}
            </div>
          </details>
        </div>
      </ResponsiveContainer>
    </div>
  );
};

export default Projects;
