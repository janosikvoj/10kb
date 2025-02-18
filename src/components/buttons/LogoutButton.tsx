'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

const LogoutButton = () => {
  const router = useRouter();

  return (
    <Button
      variant="destructive"
      className="font-normal px-1.5 py-0.5 text-base h-fit"
      onClick={async () => {
        await fetch('/api/logout', { method: 'POST' });
        router.push('/login');
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
