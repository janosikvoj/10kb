import LoadingEllipsis from '@/components/common/LoadingEllipsis';
import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import ProjectsGroup from '@/components/sections/projects-library/ProjectsGroup';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Metadata } from 'next';
import { supabase } from '@/utils/supabase/initSupabase';
import { ProjectWithAuthor } from '@/components/sections/projects-library/types';

const MIN_QUERY_LENGTH: number = 2;

export const metadata: Metadata = {
  title: '10kB Search',
};

async function fetchQueriedData(query: string) {
  if (!query || query.length < MIN_QUERY_LENGTH)
    return { projects: [], authors: [] };

  // Search projects by title
  const { data: projects, error: projectsError } = await supabase
    .from('project')
    .select(
      `
      *,
      author (*)
    `
    )
    .ilike('title', `%${query}%`);

  if (projectsError) {
    console.error('Error fetching projects:', projectsError);
  }

  // Search authors by first or last name
  const { data: authors, error: authorsError } = await supabase
    .from('author')
    .select(
      `
      *,
      project (*)
    `
    )
    .or(`fname.ilike.%${query}%,sname.ilike.%${query}%`);

  if (authorsError) {
    console.error('Error fetching authors:', authorsError);
  }

  // Transform authors to include project count
  const authorsWithCount = authors?.map((author) => ({
    ...author,
    projectCount: author.project?.length || 0,
  }));

  return {
    projects: (projects || []) as ProjectWithAuthor[],
    authors: authorsWithCount || [],
  };
}

// async function fetchQueriedData(query: string) {
//   if (!query || query.length < MIN_QUERY_LENGTH)
//     return { projects: [], authors: [] };

//   const projects = await prisma.project.findMany({
//     where: { title: { contains: query } },
//     include: { Author: true },
//   });

//   const authors = await prisma.author.findMany({
//     where: {
//       OR: [{ fname: { contains: query } }, { sname: { contains: query } }],
//     },
//     include: { projects: true, _count: { select: { projects: true } } },
//   });

//   return { projects, authors };
// }

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const params = await searchParams;
  const { query } = params;

  const { projects, authors } = await fetchQueriedData(query);

  return (
    <main className="w-full pt-64 sm:pt-48 min-h-[calc(60vh)]">
      <ResponsiveContainer>
        <Link
          href="/"
          className="absolute block text-neutral-lighter -mt-12 w-fit hover:bg-black-lighter px-1.5 py-0.5"
        >
          {'<- '}Home
        </Link>
        {query && query.length >= MIN_QUERY_LENGTH ? (
          <>
            <h1 className="text-4xl font-medium mb-4">
              Search results for{' '}
              <span className="bg-success px-2 text-black">{query}</span>
            </h1>
            <Tabs defaultValue="projects">
              <TabsList>
                <TabsTrigger value="projects">
                  Projects
                  <span className="text-xs align-top -mt-1 ml-px font-semibold">
                    {projects.length}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="authors">
                  Authors
                  <span className="text-xs align-top -mt-1 ml-px font-semibold">
                    {authors.length}
                  </span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="projects">
                <div className="mt-48">
                  <ProjectsGroup projects={projects} />
                </div>
              </TabsContent>
              <TabsContent value="authors">
                <div className="mt-48 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {authors.map((author) => (
                    <Link
                      key={author.id}
                      href={`/authors/${author.id}`}
                      className="hover:bg-black-lighter px-3 py-2"
                    >
                      {author.fname} {author.sname}
                      <span className="text-xs align-top text-info ml-px font-semibold">
                        {author.projectCount}
                      </span>
                    </Link>
                  ))}
                  {authors.length === 0 && (
                    <p className="text-neutral-lighter">No authors found.</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <h1 className="text-4xl font-medium mb-4">
            <LoadingEllipsis>
              {query
                ? query.length < MIN_QUERY_LENGTH && 'Type more characters'
                : 'Start searching'}
            </LoadingEllipsis>
          </h1>
        )}
      </ResponsiveContainer>
    </main>
  );
}
