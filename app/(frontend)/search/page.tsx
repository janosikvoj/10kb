import LoadingEllipsis from '@/components/common/LoadingEllipsis';
import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import ProjectsGroup from '@/components/sections/projects-library/ProjectsGroup';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const params = await searchParams;
  const { query } = params;

  const projects = await prisma.project.findMany({
    where: { title: { contains: query } },
    include: { Author: true },
  });

  const authors = await prisma.author.findMany({
    where: {
      OR: [{ fname: { contains: query } }, { sname: { contains: query } }],
    },
    include: { projects: true, _count: { select: { projects: true } } },
  });

  return (
    <main className="w-full pt-64 sm:pt-48">
      <ResponsiveContainer>
        <Link
          href="/"
          className="absolute block text-neutral-lighter -mt-12 w-fit hover:bg-black-lighter px-1.5 py-0.5"
        >
          {'<- '}Home
        </Link>
        <h1 className="text-4xl font-medium mb-2">
          {query ? (
            <>
              Search results for{' '}
              <span className="bg-success px-2 text-black">{query}</span>
            </>
          ) : (
            <LoadingEllipsis>Start searching</LoadingEllipsis>
          )}
        </h1>

        <Tabs defaultValue="projects">
          <TabsList>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="authors">Authors</TabsTrigger>
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
                    {author._count.projects}
                  </span>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* <div className="mt-8 space-y-12">
          <details open={true} className="group/details">
            <summary
              className={cn(
                'w-fit list-none text-info border-info border px-1.5 py-0.5 cursor-pointer select-none',
                'group-open/details:text-black group-open/details:bg-info',
                'hover:border-white-lighter hover:text-white-lighter hover:group-open/details:bg-white-lighter'
              )}
            >
              Authors
            </summary>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {authors.map((author) => (
                <Link
                  key={author.id}
                  href={`/authors/${author.id}`}
                  className="hover:bg-black-lighter px-3 py-2"
                >
                  {author.fname} {author.sname}
                  <span className="text-xs align-top text-info ml-px font-semibold">
                    {author._count.projects}
                  </span>
                </Link>
              ))}
            </div>
          </details>
          <div className="bg-neutral-darker h-px w-full" />
          <details open={true} className="group/details">
            <summary
              className={cn(
                'w-fit list-none text-info border-info border px-1.5 py-0.5 cursor-pointer select-none',
                'group-open/details:text-black group-open/details:bg-info',
                'hover:border-white-lighter hover:text-white-lighter hover:group-open/details:bg-white-lighter'
              )}
            >
              Projects
            </summary>
            <div className="mt-8">
              <ProjectsGroup projects={projects} />
            </div>
          </details>
        </div> */}
      </ResponsiveContainer>
    </main>
  );
}
