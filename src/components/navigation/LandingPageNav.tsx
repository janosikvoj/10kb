'use client';

import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import LandingPageNavLink from './LandingPageNavLink';

export type landingPageNavigationState = 'left' | undefined | 'right';

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
    useState<landingPageNavigationState>(undefined);

  useEffect(() => {
    const newNavigationState =
      urlNavigationInput === 'left' || urlNavigationInput === 'right'
        ? urlNavigationInput
        : undefined;
    setNavigationState(newNavigationState);
  }, [urlNavigationInput]);

  const gradientVisible: boolean = navigationState ? true : false;

  return (
    <div className="relative">
      <div
        className={cn(
          'fixed left-0 w-full sm:w-1/2 z-20',
          navigationState !== 'left' && '-translate-x-full',
          'transition-all duration-1000 ease-in-out'
        )}
      >
        {left}
      </div>

      <div
        className={cn(
          'fixed right-0 w-full sm:w-1/2 z-20',
          navigationState !== 'right' && 'translate-x-full',
          'transition-all duration-1000 ease-in-out'
        )}
      >
        {right}
      </div>

      <div
        className={cn(
          'relative',
          navigationState === 'left' && 'translate-x-1/3',
          navigationState === 'right' && '-translate-x-1/3',
          'transition-all duration-1000 ease-in-out'
        )}
      >
        <LandingPageNavLink
          draggable={false}
          scroll={false}
          to={undefined}
          className={cn(
            'z-20 absolute -mb-48 inset-0',
            navigationState === 'left' && 'scale-x-100',
            navigationState === 'right' && 'scale-x-100',
            gradientVisible && 'bg-black/95 sm:bg-black/50',
            !gradientVisible && 'pointer-events-none',
            'transition-all duration-1000 ease-in-out'
          )}
        >
          <div
            className={cn(
              'absolute w-1/2 h-full left-0',
              'bg-gradient-to-r from-black to-transparent origin-left from-25%',
              !gradientVisible && 'scale-x-0',
              'transition-all duration-1000 ease-in-out'
            )}
          />
          <div
            className={cn(
              'absolute w-1/2 h-full right-0',
              'bg-gradient-to-l from-black to-transparent origin-right from-25%',
              !gradientVisible && 'scale-x-0',
              'transition-all duration-1000 ease-in-out'
            )}
          />
        </LandingPageNavLink>
        {children}
      </div>
    </div>
  );
};

export default LandingPageNav;
