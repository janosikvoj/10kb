import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import AddProjectForm from '@/components/form/AddProjectForm';
import prisma from '@/lib/prisma';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import LogoutButton from '@/components/buttons/LogoutButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AuthorsDataTable from '@/components/tables/AuthorsTableControls';
import ProjectsDataTable from '@/components/tables/ProjectsTable';

export const metadata: Metadata = {
  title: '10kB Admin',
};

export default async function Admin() {
  try {
    const authors = await prisma.author.findMany();
    const projects = await prisma.project.findMany({
      include: {
        Author: true,
      },
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
          <div className="mb-16 sm:mb-32">
            <h1 className="mb-4 text-4xl font-medium">Admin Dashboard</h1>
            <LogoutButton />
          </div>

          <div className="flex flex-col gap-32">
            <ResponsiveContainer>
              <hgroup className="mb-8">
                <h2 className="mb-2 font-medium text-2xl text-white-lighter leading-tight">
                  Add Records
                </h2>
                <p className="text-sm text-white-darker leading-relaxed space-y-2 max-w-[64ch]">
                  Add projects or use the author selection UI to also add
                  authors. If you want to edit an existing record, delete it and
                  re-add it again.
                </p>
              </hgroup>
              <AddProjectForm data={{ authors: authors }} />
            </ResponsiveContainer>
            <ResponsiveContainer>
              <hgroup className="mb-8">
                <h2 className="mb-2 font-medium text-2xl text-white-lighter leading-tight">
                  Delete Records
                </h2>
                <p className="text-sm text-white-darker leading-relaxed space-y-2 max-w-[64ch]">
                  Delete projects or authors from the database. If you delete a
                  project, its source files will also be deleted from the
                  server.
                </p>
              </hgroup>
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
                  <ProjectsDataTable projects={projects} />
                </TabsContent>
                <TabsContent className="mt-4" value="authors">
                  <AuthorsDataTable authors={authors} />
                </TabsContent>
              </Tabs>
            </ResponsiveContainer>
          </div>
        </ResponsiveContainer>
      </main>
    );
  } catch {
    notFound();
  }
}
