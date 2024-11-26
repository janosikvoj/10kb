import Hero from '@/components/sections/Hero';
import ProjectsLibrary from '@/components/sections/projects-library/ProjectsLibrary';

export default async function LandingPage() {
  return (
    <main className="w-full">
      <Hero />
      <div className="h-64" />
      <ProjectsLibrary />
    </main>
  );
}
