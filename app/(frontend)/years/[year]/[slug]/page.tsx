import CornerStrokeEffect from '@/components/common/CornerStrokeEffect';
import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import WebsiteDisplay from '@/components/sections/projects-library/WebsiteDisplay';
import prisma from '@/lib/prisma';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ year: string; slug: string }>;
}) {
  const { year, slug } = await params;
  const project = await prisma.project.findUnique({
    where: { path: `/${year}/${slug}` },
    include: {
      Author: { include: { _count: { select: { projects: true } } } },
    },
  });

  if (project) {
    return (
      <main className="w-full pt-64 sm:pt-48">
        <ResponsiveContainer>
          <Link
            href="/years"
            className="absolute block text-neutral-lighter -mt-12 w-fit hover:bg-black-lighter px-1.5 py-0.5"
          >
            {'<- '}All projects
          </Link>
          <div className="sm:grid grid-cols-3 gap-16">
            <div>
              <hgroup className="flex flex-row items-center gap-4">
                <Image
                  width="32"
                  height="32"
                  src="/assets/computers-devices-electronics-keyboard-button.svg"
                  alt="Old computer vector illustration."
                />
                <h1 className="text-2xl text-white-lighter font-medium leading-tight">
                  {project.title}
                </h1>
              </hgroup>

              <ul className="space-y-2 mt-8 border-l pl-3">
                {project.Author && (
                  <li>
                    <h2 className="text-white-darker text-sm">Author</h2>
                    <Link
                      href={`/authors/${project.Author.id}`}
                      className="group hover:border-b -mr-0.5"
                    >
                      {project.Author.fname} {project.Author.sname}
                      <span className=" text-info group-hover:text-white">
                        {'->'}
                      </span>
                    </Link>
                  </li>
                )}
                <li>
                  <h2 className="text-white-darker text-sm">
                    Year of creation
                  </h2>
                  <Link
                    href={`/years/${project.year}`}
                    className="group hover:border-b -mr-0.5"
                  >
                    {project.year}
                    <span className=" text-info group-hover:text-white">
                      {'->'}
                    </span>
                  </Link>
                </li>
                {project.localByteSize && (
                  <li>
                    <h2 className="text-white-darker text-sm">
                      Size on server
                    </h2>
                    {Math.round(project.localByteSize / 10) / 100} Kb
                  </li>
                )}
              </ul>
              <a
                href={`/websites/${project.path}/index.html`}
                target="_blank"
                className={cn(
                  'hidden',
                  'group/new-tab relative w-fit mt-12',
                  'sm:flex justify-center items-center',
                  'text-info hover:text-white'
                )}
              >
                <CornerStrokeEffect className="group-hover/new-tab:stroke-white" />
                <span className="py-1.5 pl-3 pr-1.5">Visit site</span>
                <div className="size-8 pl-0.5 group-hover/new-tab:pl-1.5 -rotate-45 text-nowrap transition-all">
                  {'->'}
                </div>
              </a>
            </div>
            <div className="col-span-2 mt-8 sm:mt-0">
              <div className="relative aspect-video">
                <WebsiteDisplay path={project.path} zoom={2} isInteractable />
              </div>

              <a
                href={`/websites/${project.path}/index.html`}
                target="_blank"
                className={cn(
                  'group/new-tab relative mt-4',
                  'sm:hidden flex justify-center items-center',
                  'text-info hover:text-white'
                )}
              >
                <CornerStrokeEffect className="group-hover/new-tab:stroke-white" />
                <span className="py-1.5 pl-3 pr-1.5">Visit site</span>
                <div className="size-8 pl-0.5 group-hover/new-tab:pl-1.5 -rotate-45 text-nowrap transition-all">
                  {'->'}
                </div>
              </a>

              <div className="mt-8">
                <h2 className="mb-2 font-medium">Description</h2>
                <p className="text-sm text-white-darker leading-relaxed space-y-2 max-w-[64ch]">
                  {project.description}
                </p>
              </div>
            </div>
          </div>
        </ResponsiveContainer>
      </main>
    );
  } else {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        There was an error.
      </div>
    );
  }
}
