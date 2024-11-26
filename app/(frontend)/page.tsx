import Hero from '@/components/sections/Hero';
import ProjectsLibrary from '@/components/sections/projects-library/ProjectsLibrary';

export default async function LandingPage() {
  return (
    <div className="w-full">
      <Hero />
      <div className="h-64" />
      <ProjectsLibrary />
    </div>
  );
}
