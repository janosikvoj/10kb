import * as React from 'react';

import { cn } from '@/lib/utils';
import CornerStrokeEffect from '../common/CornerStrokeEffect';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className={cn('relative', className)}>
        {type !== 'file' && <CornerStrokeEffect stroke="stroke-white" />}
        <input
          autoComplete="off"
          type={type}
          className={cn(
            'flex h-9 w-full px-3 py-1',
            'bg-transparent text-base md:text-sm transition-colors',
            type === 'file' &&
              'p-0 file:px-3 file:py-1 file:mr-3 file:border-0 file:h-full file:bg-white file:text-sm file:font-medium file:text-background',
            'focus-visible:outline focus-visible:-outline-offset-1 disabled:cursor-not-allowed disabled:opacity-50',
            'focus-visible:outline-info',
            'bg-background placeholder:text-surface'
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
