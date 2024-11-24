import * as React from 'react';

import { cn } from '@/lib/utils';
import CornerStrokeEffect from '../common/CornerStrokeEffect';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
  return (
    <div className="relative">
      <CornerStrokeEffect stroke="stroke-white" />
      <textarea
        className={cn(
          'flex min-h-[60px] w-full px-3 py-2',
          'bg-transparent text-base md:text-sm',
          'focus-visible:outline focus-visible:-outline-offset-1 focus-visible:outline-info',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'bg-background placeholder:text-surface',
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
