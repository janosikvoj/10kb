import ProjectsLibrary from '@/components/sections/projects-library/ProjectsLibrary';
import Intro from '@/components/sections/intro/Intro';

export default function Page() {
  return (
    <div className="w-full">
      <Intro />
      <div className="h-64" />
      <ProjectsLibrary />
    </div>
  );
}
