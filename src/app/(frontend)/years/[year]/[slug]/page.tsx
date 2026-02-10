import CornerStrokeEffect from '@/components/common/CornerStrokeEffect';
import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import WebsiteDisplay from '@/components/sections/projects-library/WebsiteDisplay';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { supabase } from '@/utils/supabase/initSupabase';

export const metadata: Metadata = {
  title: '10kB Project',
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ year: string; slug: string }>;
}) {
  try {
  } catch {
    notFound();
  }
  const { year, slug } = await params;

  const { data, error } = await supabase
    .from('project')
    .select(
      `
        *,
        author (*)
      `,
    )
    .eq('path', `/${year}/${slug}`)
    .limit(1)
    .single();
  if (error) {
    console.error('An error occurred: ', error);
  }
  if (data == null) {
    console.error('No projects');
  }
  const project = data;

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
                {project.author && (
                  <li>
                    <h2 className="text-white-darker text-sm">Author</h2>
                    <Link
                      href={`/authors/${project.author.id}`}
                      className="group hover:border-b -mr-0.5"
                    >
                      {project.author.fname} {project.author.sname}
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
                    {Math.round(project.localByteSize / 10) / 100} kB
                  </li>
                )}
              </ul>
              <a
                href={`/project${project.path}/index.html`}
                target="_blank"
                className={cn(
                  'hidden',
                  'group/new-tab relative w-fit mt-12',
                  'sm:flex justify-center items-center',
                  'text-info hover:text-white',
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
                <WebsiteDisplay
                  path={project.path ?? ''}
                  zoom={2}
                  isInteractable
                />
              </div>

              <a
                href={`/project${project.path}/index.html`}
                target="_blank"
                className={cn(
                  'group/new-tab relative mt-4',
                  'sm:hidden flex justify-center items-center',
                  'text-info hover:text-white',
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
    notFound();
  }
}
