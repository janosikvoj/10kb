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
    <Link href={project.path ?? '#'} className="group hover:bg-footer">
      {displayWebsite && (
        <div className="aspect-video flex justify-center items-center">
          <div className="relative aspect-video w-full">
            <WebsiteDisplay path={project.path} zoom={zoom || 3.5} />
          </div>
        </div>
      )}
      <div
        className={cn(
          'text-text flex flex-row justify-between items-baseline',
          'transition-all',
          displayWebsite && 'pt-6 group-hover:p-3',
          !displayWebsite && 'flex-col p-3'
        )}
      >
        <div>
          <h3 className="font-medium">{project.title}</h3>
          <div className={cn('text-sm', !displayWebsite && 'text-surface')}>
            {project.Author && (
              <p>{project.Author.fname + ' ' + project.Author.sname}</p>
            )}
            {!displayWebsite && <p>{project.year ?? 'XXXX'}</p>}
          </div>
        </div>
        {displayWebsite && (
          <div className="text-right text-surface">
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
  );
};

export default ProjectThumbnail;
