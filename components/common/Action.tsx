import { cn } from '@/lib/utils';
import React from 'react';

interface ActionProps {
  children: React.ReactNode;
  className?: string;
}

const Action: React.FC<ActionProps> = ({ className, children }) => {
  return (
    <span
      className={cn(
        'bg-transparent text-white hover:bg-black-lighter px-1.5 py-0.5 transition-all',
        className
      )}
    >
      {children}
    </span>
  );
};

export default Action;
