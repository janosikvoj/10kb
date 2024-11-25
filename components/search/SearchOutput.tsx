import React from 'react';
import ResponsiveContainer from '../common/ResponsiveContainer';
import prisma from '@/lib/prisma';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import ProjectThumbnail from '../sections/projects-library/ProjectThumbnail';

function StartTyping({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-surface flex flex-row align-baseline animate-pulse">
      {children}
      <span className="select-none ml-1 animate-bounce block">.</span>
      <span className="select-none animate-bounce delay-150 block">.</span>
      <span className="select-none animate-bounce delay-300 block">.</span>
    </span>
  );
}

async function SearchOutput({
  query,
  className,
}: {
  query: string;
  className: string;
}) {
  let projects, authors;

  if (query) {
    projects = await prisma.project.findMany({
      where: { title: { contains: query } },
      include: { Author: true },
    });
    authors = await prisma.author.findMany({
      where: {
        OR: [
          {
            fname: { contains: query },
          },
          {
            sname: { contains: query },
          },
        ],
      },
      include: { projects: true },
    });
  }

  return (
    <div className={cn('w-full h-screen', className)}>
      <ResponsiveContainer className="pt-64">
        <Link scroll={false} href="/" className="block text-surface w-fit">
          {'<- '}Exit search
        </Link>
        <div className="mt-8">
          <details open={true} className="group/details">
            <summary
              className={cn(
                'w-fit list-none text-info border-info border px-1.5 py-0.5 cursor-pointer select-none',
                'group-open/details:text-background group-open/details:bg-info'
              )}
            >
              Authors
            </summary>
            <div className="mt-2">
              {query ? (
                <>
                  {authors && authors.length > 0 ? (
                    authors.map((author) => author.sname)
                  ) : (
                    <span className="text-surface">No authors found.</span>
                  )}
                </>
              ) : (
                <StartTyping>Start typing to see authors</StartTyping>
              )}
            </div>
          </details>
          <br />
          <details open={true} className="group/details">
            <summary
              className={cn(
                'w-fit list-none text-info border-info border px-1.5 py-0.5 cursor-pointer select-none',
                'group-open/details:text-background group-open/details:bg-info'
              )}
            >
              Projects
            </summary>
            <div className="mt-2">
              {query ? (
                <>
                  {projects && projects.length > 0 ? (
                    <div className="grid grid-cols-2">
                      {projects.map((project) => (
                        <ProjectThumbnail
                          key={project.id}
                          project={project}
                          displayWebsite={false}
                        />
                      ))}
                    </div>
                  ) : (
                    <span className="text-surface">No authors found.</span>
                  )}
                </>
              ) : (
                <StartTyping>Start typing to see projects</StartTyping>
              )}
            </div>
          </details>
        </div>
      </ResponsiveContainer>
    </div>
  );
}

export default SearchOutput;
