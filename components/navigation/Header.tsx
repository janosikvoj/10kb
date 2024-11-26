'use client';
import React from 'react';
import Link from 'next/link';
import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import Action from '../common/Action';
import SearchField from '../search/SearchField';
import LandingPageNavLink from './LandingPageNavLink';

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-black">
      <ResponsiveContainer>
        <nav className="py-8 sm:py-12 text-white grid grid-cols-2 sm:grid-cols-[1fr_fit-content(100%)_1fr] items-center justify-between">
          <Link href="/" className="px-1.5 py-0.5">
            <Action className="font-semibold">10kb webs</Action>
          </Link>
          <ul className="flex flex-row gap-8">
            <li>
              <LandingPageNavLink to="left">
                <Action>About</Action>
              </LandingPageNavLink>
            </li>
            <li>
              <LandingPageNavLink to="right">
                <Action>Projects</Action>
              </LandingPageNavLink>
            </li>
            <li>
              <Link href="/admin" className="px-1.5 py-0.5">
                <Action>Admin</Action>
              </Link>
            </li>
          </ul>
          <SearchField className="hidden sm:block" />
        </nav>
      </ResponsiveContainer>
      <section role="search" className="sm:hidden bg-black-lighter">
        <ResponsiveContainer className="flex flex-row gap-2 items-center text-neutral py-4">
          <SearchField />
        </ResponsiveContainer>
      </section>
    </header>
  );
};

export default Header;
