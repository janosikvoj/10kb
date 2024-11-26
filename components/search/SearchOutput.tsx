import React from 'react';
import ResponsiveContainer from '../common/ResponsiveContainer';
import prisma from '@/lib/prisma';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import ProjectThumbnail from '../sections/projects-library/ProjectThumbnail';
import LoadingEllipsis from '../common/LoadingEllipsis';

async function SearchOutput({
  query,
  className,
}: {
  query: string;
  className?: string;
}) {
  let projects, authors;

  async function fetchFilteredProjects(query: string) {
    'use server';

    try {
      const projects = await prisma.project.findMany({
        where: { title: { contains: query } },
        include: { Author: true },
      });
      return projects;
    } catch {
      throw new Error('Failed to fetch projects');
    }
  }
  async function fetchFilteredAuthors(query: string) {
    'use server';
    try {
      const authors = await prisma.author.findMany({
        where: {
          OR: [{ fname: { contains: query } }, { sname: { contains: query } }],
        },
        include: { projects: true },
      });
      return authors;
    } catch {
      throw new Error('Failed to fetch authors');
    }
  }

  if (query) {
    projects = await fetchFilteredProjects(query);
    authors = await fetchFilteredAuthors(query);
  }

  return (
    <div className={cn('w-full h-screen', className)}>
      <ResponsiveContainer className="pt-48">
        <Link
          scroll={false}
          href="/"
          className="block text-neutral-lighter w-fit"
        >
          {'<- '}Exit search
        </Link>
        <div className="mt-8">
          <details open={true} className="group/details">
            <summary
              className={cn(
                'w-fit list-none text-info border-info border px-1.5 py-0.5 cursor-pointer select-none',
                'group-open/details:text-black group-open/details:bg-info'
              )}
            >
              Authors
            </summary>
            <div className="mt-2">
              {query ? (
                authors && authors.length > 0 ? (
                  <div className="grid grid-cols-2">
                    {authors.map((author, i) => {
                      if (i > 3) return;
                      return (
                        <Link
                          key={author.id}
                          href={'#'}
                          className="hover:bg-black-lighter px-3 py-2"
                        >
                          {author.fname + ' ' + author.sname}
                        </Link>
                      );
                    })}
                    {authors.length > 3 && (
                      <Link
                        href={'#'}
                        className="hover:bg-black-lighter px-3 py-2 col-span-2 text-neutral-lighter"
                      >
                        Show {authors.length - 4} more{' ->'}
                      </Link>
                    )}
                  </div>
                ) : (
                  <span className="text-neutral-lighter">
                    No authors found.
                  </span>
                )
              ) : (
                <LoadingEllipsis>Start typing to see authors</LoadingEllipsis>
              )}
            </div>
          </details>
          <br />
          <details open={false} className="group/details">
            <summary
              className={cn(
                'w-fit list-none text-info border-info border px-1.5 py-0.5 cursor-pointer select-none',
                'group-open/details:text-black group-open/details:bg-info'
              )}
            >
              Projects
            </summary>
            <div className="mt-2">
              {query ? (
                projects && projects.length > 0 ? (
                  <div className="grid grid-cols-2">
                    {projects.map((project, i) => {
                      if (i > 3) return;
                      return (
                        <ProjectThumbnail
                          key={project.id}
                          project={project}
                          displayWebsite={false}
                        />
                      );
                    })}
                    {projects.length > 3 && (
                      <Link
                        href={'#'}
                        className="hover:bg-black-lighter px-3 py-2 col-span-2 text-neutral-lighter"
                      >
                        Show {projects.length - 4} more{' ->'}
                      </Link>
                    )}
                  </div>
                ) : (
                  <span className="text-neutral-lighter">
                    No authors found.
                  </span>
                )
              ) : (
                <LoadingEllipsis>Start typing to see projects</LoadingEllipsis>
              )}
            </div>
          </details>
        </div>
      </ResponsiveContainer>
    </div>
  );
}

export default SearchOutput;
