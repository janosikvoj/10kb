import React from 'react';
import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import Image from 'next/image';
import LandingPageNavLink from '../navigation/LandingPageNavLink';

const About = () => {
  return (
    <div className="w-full h-screen">
      <ResponsiveContainer className="pt-48">
        <hgroup className="flex flex-col sm:flex-row sm:items-center gap-4">
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
        <LandingPageNavLink
          to={undefined}
          className="block text-neutral-lighter mt-2 w-fit hover:bg-black-lighter px-1.5 py-0.5"
        >
          Go back{' ->'}
        </LandingPageNavLink>
        <div className="text-sm text-white-darker leading-relaxed mt-8 space-y-2">
          <p>
            An innovative challenge for design students to create websites that
            are limited to a maximum size of 10 kilobytes.
          </p>
          <p>
            This constraint encourages creativity and efficient use of space.
            Each website design must be optimized to provide an appealing user
            experience. The project serves as a platform for students from the
            Digital Design Studio in Zlín to learn, experiment, and inspire
            future designers.
          </p>
        </div>
      </ResponsiveContainer>
    </div>
  );
};

export default About;
