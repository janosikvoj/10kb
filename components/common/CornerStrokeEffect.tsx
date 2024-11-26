import { cn } from '@/lib/utils';
import React from 'react';

type cornerSize = number | string | undefined;

type Corner = {
  classes: string;
};

interface CornerStrokeEffectProps {
  cornerSize?: cornerSize;
  stroke?: string;
  className?: string;
}

const CornerStrokeEffect: React.FC<CornerStrokeEffectProps> = ({
  cornerSize = '0.75rem',
  stroke = 'stroke-info',
  className,
}) => {
  const fourCorners: Corner[] = [
    { classes: 'absolute' },
    { classes: 'absolute right-0 rotate-90' },
    { classes: 'absolute right-0 bottom-0 rotate-180' },
    { classes: 'absolute bottom-0 -rotate-90' },
  ];

  return (
    <div
      className={cn('absolute inset-0 pointer-events-none', stroke, className)}
    >
      {fourCorners.map(({ classes }, i) => (
        <svg
          key={i}
          className={classes}
          style={{
            width: cornerSize,
            height: cornerSize,
          }}
          width="1"
          height="1"
          viewBox="0 0 1 1"
          strokeWidth={1}
          stroke="inherit"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path vectorEffect="non-scaling-stroke" d="M0 32V0H32" />
        </svg>
      ))}
    </div>
  );
};

export default CornerStrokeEffect;
