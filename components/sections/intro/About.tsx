import React from 'react';
import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import Image from 'next/image';
import Link from 'next/link';

const About = () => {
  return (
    <div className="w-full h-screen">
      <ResponsiveContainer className="pt-64">
        <hgroup className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Image
            width="32"
            height="32"
            src="/assets/computers-devices-electronics-desktop.svg"
            alt="Monitor displaying a heart vector illustration."
          />
          <h2 className="leading-tight">
            Read more about <br className="hidden md:block" />
            the 10kb webs initiative.
          </h2>
        </hgroup>
        <Link scroll={false} href="/" className="block text-surface mt-2 w-fit">
          Go back{' ->'}
        </Link>
        <div className="text-sm text-muted leading-relaxed mt-8 space-y-2">
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
