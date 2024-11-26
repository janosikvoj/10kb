'use client';
import React, { useState, useEffect, useRef } from 'react';

function ScrollStopper({ children }: { children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false);
  console.log(isHovered);

  if (isHovered) {
    document.body.classList.add('!overflow-y-hidden');
  } else {
    document.body.classList.remove('!overflow-y-hidden');
  }
  document.body.classList.add('!overflow-y-hidden');

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative ${isHovered ? 'overflow-hidden' : ''}`}
    >
      {children}
    </div>
  );
}

export default ScrollStopper;
