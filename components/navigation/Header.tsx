'use client';
import React from 'react';
import Link from 'next/link';
import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import Action from '../common/Action';
import SearchField from '../search/SearchField';

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
              <Link scroll={false} href="/?nav=about">
                <Action>About</Action>
              </Link>
            </li>
            <li>
              <Link href="/#projects-library" className="px-1.5 py-0.5">
                <Action>Projects</Action>
              </Link>
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
      <section role="search" className="sm:hidden bg-footer">
        <ResponsiveContainer className="flex flex-row gap-2 items-center text-muted py-4">
          <SearchField />
        </ResponsiveContainer>
      </section>
    </header>
  );
};

export default Header;
