import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import AddProjectForm from '@/components/form/AddProjectForm';
import { Toaster } from '@/components/ui/toaster';
import prisma from '@/lib/prisma';

export default async function Admin() {
  const authors = await prisma.author.findMany();

  return (
    <>
      <Toaster />
      <div className="flex justify-center mt-8">
        <ResponsiveContainer className="max-w-96">
          <AddProjectForm data={{ authors: authors }} />
        </ResponsiveContainer>
      </div>
    </>
  );
}
