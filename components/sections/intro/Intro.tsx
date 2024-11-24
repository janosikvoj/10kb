'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import About from './About';
import Hero from './Hero';
import Link from 'next/link';

type introNavigationState = 'about' | 'hero' | 'search';

interface IntroProps {
  routeNavigationState?: introNavigationState;
}
const Intro: React.FC<IntroProps> = () => {
  const searchParams = useSearchParams();
  const urlNavigationInput = searchParams.get('nav');

  const [navigationState, setNavigationState] =
    useState<introNavigationState>('hero');

  useEffect(() => {
    const newNavigationState =
      urlNavigationInput === 'about' || urlNavigationInput === 'search'
        ? urlNavigationInput
        : 'hero';
    setNavigationState(newNavigationState);
  }, [urlNavigationInput]);

  const gradientVisible: boolean = navigationState === 'hero' ? false : true;
  const shiftToDirection: 'right' | 'left' | undefined =
    navigationState === 'hero'
      ? undefined
      : navigationState === 'about'
      ? 'right'
      : 'left';

  return (
    <div className="relative">
      <div
        className={cn(
          'w-1/2 absolute z-10',
          shiftToDirection !== 'right' && '-translate-x-full',
          'transition-all duration-1000 ease-in-out'
        )}
      >
        <About />
      </div>
      <div
        className={cn(
          'relative',
          shiftToDirection === 'right' && 'translate-x-1/3',
          'transition-all duration-1000 ease-in-out'
        )}
      >
        <Link href={'/'}>
          <div
            className={cn(
              'z-10 absolute inset-0 bg-gradient-to-r from-background from-15% to-transparent',
              !gradientVisible && 'scale-x-0',
              'origin-left transition-all duration-1000 ease-in-out'
            )}
          />
        </Link>
        <Hero />
      </div>
    </div>
  );
};

export default Intro;
