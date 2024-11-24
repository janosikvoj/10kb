'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import Action from '../common/Action';

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-background">
      <ResponsiveContainer>
        <nav className="py-8 sm:py-12 text-white grid grid-cols-2 sm:grid-cols-[1fr_fit-content(100%)_1fr] items-center justify-between">
          <Link href="/" className="px-1.5 py-0.5">
            <Action className="font-semibold">10kb webs</Action>
          </Link>
          <ul className="flex flex-row gap-8">
            <li>
              <Link href="/?nav=about">
                <Action>About</Action>
              </Link>
            </li>
            <li>
              <Link href="/#projects-library" className="px-1.5 py-0.5">
                <Action>Projects</Action>
              </Link>
            </li>
          </ul>
          <section
            role="search"
            className="justify-self-end hidden sm:flex flex-row gap-2 items-center text-muted"
          >
            <Image
              src="/assets/icon_zoom.svg"
              alt="Zoom icon"
              width={24}
              height={24}
            />
            Search
          </section>
        </nav>
      </ResponsiveContainer>
      <section role="search" className="sm:hidden bg-footer">
        <ResponsiveContainer className="flex flex-row gap-2 items-center text-muted py-4">
          <Image
            src="/assets/icon_zoom.svg"
            alt="Zoom icon"
            width={24}
            height={24}
          />
          Search
        </ResponsiveContainer>
      </section>
    </header>
  );
};

export default Header;
