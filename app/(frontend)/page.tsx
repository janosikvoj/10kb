import LandingPageNav from '@/components/navigation/LandingPageNav';
import Hero from '@/components/sections/intro/Hero';
import ProjectsLibrary from '@/components/sections/projects-library/ProjectsLibrary';

export default function LandingPage() {
  return (
    <LandingPageNav>
      <div className="w-full">
        <Hero />
        <div className="h-64" />
        <ProjectsLibrary />
      </div>
    </LandingPageNav>
  );
}
