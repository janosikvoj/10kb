import LandingPageNav from '@/components/navigation/LandingPageNav';
import SearchOutput from '@/components/search/SearchOutput';
import About from '@/components/sections/About';
import Hero from '@/components/sections/Hero';
import ProjectsLibrary from '@/components/sections/projects-library/ProjectsLibrary';
import { cn } from '@/lib/utils';

export default async function LandingPage(props: {
  searchParams?: Promise<{
    query?: string;
    nav?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const searchActive = searchParams?.nav === 'search';

  return (
    <LandingPageNav
      left={<About />}
      right={
        <SearchOutput
          query={query}
          className={cn(!searchActive && 'opacity-0')}
        />
      }
    >
      <div className="w-full">
        <Hero />
        <div className="h-64" />
        <ProjectsLibrary />
      </div>
    </LandingPageNav>
  );
}
