import React from 'react';
import Link from 'next/link';
import { ProjectWithAuthor } from './types';
import { cn } from '@/lib/utils';
import WebsiteDisplay from './WebsiteDisplay';

interface ProjectThumbnailProps {
  project: ProjectWithAuthor;
  zoom?: number;
  displayWebsite?: boolean;
}

const ProjectThumbnail: React.FC<ProjectThumbnailProps> = ({
  project,
  zoom,
  displayWebsite = true,
}) => {
  return (
    <div className="relative group hover:bg-black-lighter">
      <a
        href={`/project${project.path}/index.html`}
        target="_blank"
        className={cn(
          'absolute group/new-tab top-0 right-0 m-2 z-20 size-8',
          'hidden group-hover:flex justify-center items-center',
          'bg-black text-info hover:text-white'
        )}
      >
        <div className="pl-0.5 group-hover/new-tab:pl-3 -rotate-45 text-nowrap transition-all">
          {'->'}
        </div>
      </a>
      <Link href={`/years${project.path}`}>
        {displayWebsite && (
          <div className="aspect-video flex justify-center items-center">
            <div className="relative aspect-video w-full">
              <WebsiteDisplay path={project.path} zoom={zoom || 3.5} />
            </div>
          </div>
        )}
        <div
          className={cn(
            'text-white flex flex-row justify-between items-baseline',
            'transition-all',
            displayWebsite && 'pt-6 group-hover:p-3',
            !displayWebsite && 'flex-col px-3 py-2'
          )}
        >
          <div>
            <h3 className="font-medium">{project.title}</h3>
            <div
              className={cn(
                'text-sm',
                !displayWebsite && 'text-neutral-lighter'
              )}
            >
              {project.Author && (
                <p>{project.Author.fname + ' ' + project.Author.sname}</p>
              )}
              {!displayWebsite && <p>{project.year ?? 'XXXX'}</p>}
            </div>
          </div>
          {displayWebsite && (
            <div className="text-right text-neutral-lighter">
              <p className="text-sm">{project.year ?? 'XXXX'}</p>

              {project.localByteSize && (
                <p className="text-sm">
                  {Math.round(project.localByteSize / 10) / 100}Kb
                </p>
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProjectThumbnail;
