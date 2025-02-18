'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react';
import { landingPageNavigationState } from './LandingPageNav';

interface LandingPageNavLink extends Omit<LinkProps, 'href'> {
  children: React.ReactNode;
  to: landingPageNavigationState;
  draggable?: boolean;
  className?: string;
}

const LandingPageNavLink: React.FC<LandingPageNavLink> = ({
  children,
  to,
  ...props
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  function handleClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);
    if (to) {
      params.set('nav', to);
    } else {
      params.delete('nav');
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <Link href="#" scroll={false} onClick={(e) => handleClick(e)} {...props}>
      {children}
    </Link>
  );
};

export default LandingPageNavLink;
