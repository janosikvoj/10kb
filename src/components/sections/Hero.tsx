import React, { Suspense } from 'react';
import Image from 'next/image';
import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import LandingPageNavLink from '../navigation/LandingPageNavLink';

const Hero = () => {
  return (
    <div className="relative w-full h-screen">
      <ResponsiveContainer className="pt-64">
        <ResponsiveContainer>
          <hgroup className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Image
              width="32"
              height="32"
              src="/assets/computer-old-electronics.svg"
              alt="Old computer vector illustration."
            />
            <h1 className="leading-tight">
              Collection of lightweight sites,{' '}
              <br className="hidden md:block" />
              created by students from the Digital Design Studio.
            </h1>
          </hgroup>
          <Suspense>
            <LandingPageNavLink
              to="left"
              className="block text-neutral-lighter mt-2 w-fit hover:bg-black-lighter px-1.5 py-0.5"
            >
              {'<- '}Read more
            </LandingPageNavLink>
          </Suspense>
        </ResponsiveContainer>
      </ResponsiveContainer>

      <div className="absolute bottom-0 px-6 pb-6 flex flex-row gap-16 w-full justify-between">
        <div className="self-end">
          <Image
            className="w-full h-auto max-h-[50vh]"
            width="1532"
            height="510"
            src="/assets/10kb-text.svg"
            alt='Text that says "10kB"'
          />
        </div>
        <div className="hidden sm:block -mt-12">
          <div className="flex flex-col h-full items-center">
            <p className="text-neutral-lighter [writing-mode:vertical-lr]">
              Check out our work
            </p>
            <div className="w-px my-4 min-h-8 grow bg-neutral-lighter" />
            <Image
              className="h-6 w-auto rotate-180"
              width="27"
              height="33"
              src="/assets/hand-cursor-pointer.svg"
              alt="A vector illustration if a pointing hand"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
