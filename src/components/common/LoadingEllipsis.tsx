import React from 'react';

function LoadingEllipsis({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-neutral-lighter flex flex-row align-baseline animate-pulse">
      {children}
      <span className="select-none ml-1 animate-bounce block">.</span>
      <span className="select-none animate-bounce delay-150 block">.</span>
      <span className="select-none animate-bounce delay-300 block">.</span>
    </span>
  );
}

export default LoadingEllipsis;
