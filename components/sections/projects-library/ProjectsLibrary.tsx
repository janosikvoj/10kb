import prisma from '@/lib/prisma';
import React from 'react';
import Image from 'next/image';

import ResponsiveContainer from '../../common/ResponsiveContainer';
import { sortByYear } from './utils';
import ProjectsGroup from './ProjectsGroup';
import Link from 'next/link';

export default async function ProjectsLibrary() {
  try {
    const projects = await prisma.project.findMany({
      include: { Author: true },
    });
    const projectsByYear = sortByYear(projects);
    return (
      <ResponsiveContainer id="projects-library">
        <div className="space-y-64">
          {Object.keys(projectsByYear)
            .reverse()
            .map((year) => (
              <div key={year}>
                <div className="flex flex-row items-center w-1/3 mb-32">
                  <Link
                    href={'/years/' + year}
                    className="bg-info text-black hover:bg-white-lighter px-1.5 py-0.5"
                  >
                    {year}
                  </Link>
                  <div className="bg-neutral-lighter w-8 h-px mx-3 grow min-w-8" />
                  <Image
                    className="h-6 w-auto rotate-180"
                    width="27"
                    height="33"
                    src="/assets/hand-cursor-pointer-reverse.svg"
                    alt="A vector illustration if a pointing hand"
                  />
                </div>
                <ProjectsGroup projects={projectsByYear[Number(year)]} />
              </div>
            ))}
        </div>
      </ResponsiveContainer>
    );
  } catch {
    throw new Error("Can't connect to the database.");
  }
}
