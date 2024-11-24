import WebsiteDisplay from '@/components/sections/projects-library/WebsiteDisplay';
import prisma from '@/lib/prisma';

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ year: string; slug: string }>;
}) {
  const { year, slug } = await params;
  const project = await prisma.project.findUnique({
    where: { path: `/${year}/${slug}` },
  });
  if (project) {
    return (
      <div className="w-full h-screen flex flex-col justify-center">
        <div className="relative aspect-video w-1/2">
          <WebsiteDisplay path={project.path} zoom={2} isInteractable />
        </div>
        <div>
          {project && (
            <div key={project.id}>
              {project.title}
              <br />
              {project.description}
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        There was an error.
      </div>
    );
  }
}
