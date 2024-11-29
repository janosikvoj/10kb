import React from 'react';
import Image from 'next/image';

import ProjectsGroup from './ProjectsGroup';
import { ProjectWithAuthor } from './types';
import { cn } from '@/lib/utils';

interface ProjectsLibraryProps {
  projectsGroups: {
    [group: string]: ProjectWithAuthor[];
  };
}

export default async function ProjectsLibrary({
  projectsGroups,
}: ProjectsLibraryProps) {
  return (
    <ul className="space-y-6">
      {Object.keys(projectsGroups)
        .reverse()
        .map((group, i) => (
          <li key={group}>
            <details className="group/projects" open={i === 0}>
              <summary className="list-none cursor-pointer select-none">
                <div className="flex flex-row items-center">
                  <h2
                    className={cn(
                      'w-fit text-info border-info border px-1.5 py-0.5 select-none',
                      'group-open/projects:text-black group-open/projects:bg-info',
                      'hover:border-white-lighter hover:text-white-lighter hover:group-open/projects:bg-white-lighter'
                    )}
                  >
                    {group}
                  </h2>
                  <Image
                    className="ml-16 h-6 w-auto -rotate-90 group-open/projects:-rotate-180 transition-all"
                    width="27"
                    height="33"
                    src="/assets/hand-cursor-pointer-reverse.svg"
                    alt="A vector illustration if a pointing hand"
                  />
                  <div className="bg-neutral-darker w-8 h-px mx-3 grow min-w-8" />
                </div>
              </summary>
              <div className="mt-20 mb-32">
                <ProjectsGroup projects={projectsGroups[group]} />
              </div>
            </details>
          </li>
        ))}
    </ul>
  );
}
