import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import AddProjectForm from '@/components/form/AddProjectForm';
import { Toaster } from '@/components/ui/toaster';
import prisma from '@/lib/prisma';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '10kB Admin',
};

export default async function Admin() {
  const authors = await prisma.author.findMany();

  return (
    <main className="w-full pt-64 sm:pt-48">
      <Toaster />

      <ResponsiveContainer>
        <Link
          href="/"
          className="absolute block text-neutral-lighter -mt-12 w-fit hover:bg-black-lighter px-1.5 py-0.5"
        >
          {'<- '}Home
        </Link>
        <h1 className="text-4xl font-medium mb-16">Project creation</h1>
        <ResponsiveContainer>
          <AddProjectForm data={{ authors: authors }} />
        </ResponsiveContainer>
      </ResponsiveContainer>
    </main>
  );
}
