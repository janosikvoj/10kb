import React, { Suspense } from 'react';
import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import Image from 'next/image';
import LandingPageNavLink from '../navigation/LandingPageNavLink';

const About = () => {
  return (
    <div className="w-full h-screen">
      <ResponsiveContainer className="pt-48">
        <Suspense>
          <LandingPageNavLink
            to={undefined}
            className="block text-neutral-lighter w-fit hover:bg-black-lighter px-1.5 py-0.5"
          >
            Go back{' ->'}
          </LandingPageNavLink>
        </Suspense>
        <hgroup className="flex flex-col sm:flex-row sm:items-center gap-4 mt-8">
          <Image
            width="32"
            height="32"
            src="/assets/computers-devices-electronics-desktop.svg"
            alt="Monitor displaying a heart vector illustration."
          />
          <h2 className="leading-tight">
            Read more about <br className="sm:hidden md:block" />
            the 10kb webs initiative.
          </h2>
        </hgroup>
        <div className="text-sm text-white-darker leading-relaxed mt-8 space-y-2">
          <p>
            10kB web presents websites with a single parameter: the maximum data
            size is limited to 10 kilobytes. This limitation stimulates
            creativity and the effective use of both the oldest and most modern
            web technologies. Every website design must be data-optimized, while
            also offering an attractive user experience.
          </p>
          <p>
            Created by students from the Digital Design Studio, Faculty of
            Multimedia Communications, Tomas Bata University in Zlin, Czech
            Republic.
          </p>
        </div>
      </ResponsiveContainer>
    </div>
  );
};

export default About;
