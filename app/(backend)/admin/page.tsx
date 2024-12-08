import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import AddProjectForm from '@/components/form/AddProjectForm';
import { Toaster } from '@/components/ui/toaster';
import prisma from '@/lib/prisma';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '10kB Admin',
};

export default async function Admin() {
  const authors = await prisma.author.findMany();

  return (
    <>
      <Toaster />

      <ResponsiveContainer className="flex justify-center pt-64">
        <ResponsiveContainer className="max-w-lg">
          <AddProjectForm data={{ authors: authors }} />
        </ResponsiveContainer>
      </ResponsiveContainer>
    </>
  );
}
