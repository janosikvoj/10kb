import React from 'react';
import Link from 'next/link';

import { ProjectWithAuthor } from './types';
import { cn } from '@/lib/utils';
import WebsiteDisplay from './WebsiteDisplay';

interface ProjectThumbnailProps {
  project: ProjectWithAuthor;
}

const ProjectThumbnail: React.FC<ProjectThumbnailProps> = ({ project }) => {
  return (
    <Link href={project.path ?? '#'} className="group hover:bg-footer">
      <div className="aspect-video flex justify-center items-center">
        <div className="relative aspect-video w-full">
          <WebsiteDisplay path={project.path} zoom={3.5} />
        </div>
      </div>
      <div
        className={cn(
          'text-text flex flex-row justify-between items-baseline pt-6',
          'group-hover:p-3 transition-all'
        )}
      >
        <div>
          <h3 className="font-medium">{project.title}</h3>
          {project.Author && (
            <p className="text-sm">
              {project.Author.fname + ' ' + project.Author.sname}
            </p>
          )}
        </div>
        <div className="text-right">
          <p className="text-sm text-muted">{project.year ?? 'XXXX'}</p>

          {project.localByteSize && (
            <p className="text-sm text-muted">
              {Math.round(project.localByteSize / 10) / 100}Kb
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProjectThumbnail;