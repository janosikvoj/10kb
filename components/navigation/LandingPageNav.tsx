'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type landingPageNavigationState = 'about' | 'hero' | 'search';

interface LandingPageNavProps {
  children: React.ReactNode;
  left: React.ReactNode;
  right: React.ReactNode;
}

const LandingPageNav: React.FC<LandingPageNavProps> = ({
  children,
  left,
  right,
}) => {
  const params = useSearchParams();
  const urlNavigationInput = params.get('nav');

  const [navigationState, setNavigationState] =
    useState<landingPageNavigationState>('hero');

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
          'fixed left-0 w-full sm:w-1/2 z-20',
          shiftToDirection !== 'right' && '-translate-x-full',
          'transition-all duration-1000 ease-in-out'
        )}
      >
        {left}
      </div>

      <div
        className={cn(
          'fixed right-0 w-full sm:w-1/2 z-20',
          shiftToDirection !== 'left' && 'translate-x-full',
          'transition-all duration-1000 ease-in-out'
        )}
      >
        {right}
      </div>

      <div
        className={cn(
          'relative',
          shiftToDirection === 'right' && 'translate-x-1/3',
          shiftToDirection === 'left' && '-translate-x-1/3',
          'transition-all duration-1000 ease-in-out'
        )}
      >
        <Link
          draggable={false}
          scroll={false}
          href={'/'}
          className={cn(
            'z-20 absolute -mb-48 inset-0',
            shiftToDirection === 'right' && 'scale-x-100',
            shiftToDirection === 'left' && 'scale-x-100',
            gradientVisible && 'bg-background/95 sm:bg-background/50',
            !gradientVisible && 'pointer-events-none',
            'transition-all duration-1000 ease-in-out'
          )}
        >
          <div
            className={cn(
              'absolute w-1/2 h-full left-0',
              'bg-gradient-to-r from-background to-transparent origin-left from-25%',
              !gradientVisible && 'scale-x-0',
              'transition-all duration-1000 ease-in-out'
            )}
          />
          <div
            className={cn(
              'absolute w-1/2 h-full right-0',
              'bg-gradient-to-l from-background to-transparent origin-right from-25%',
              !gradientVisible && 'scale-x-0',
              'transition-all duration-1000 ease-in-out'
            )}
          />
        </Link>
        {children}
      </div>
    </div>
  );
};

export default LandingPageNav;
