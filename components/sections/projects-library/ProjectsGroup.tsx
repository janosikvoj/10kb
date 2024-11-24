import React from 'react';
import { ProjectWithAuthor } from './types';
import ProjectThumbnail from './ProjectThumbnail';

interface ProjectsGroupProps {
  projects: ProjectWithAuthor[];
}

const ProjectsGroup: React.FC<ProjectsGroupProps> = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-20">
      {projects.map((p) => (
        <ProjectThumbnail project={p} key={p.id} />
      ))}
    </div>
  );
};

export default ProjectsGroup;
