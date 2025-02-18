import { cn } from '@/lib/utils';
import React from 'react';

interface ResponsiveContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn('mx-6 sm:mx-16 xl:mx-40', className)} {...props}>
      {children}
    </div>
  );
};

export default ResponsiveContainer;
