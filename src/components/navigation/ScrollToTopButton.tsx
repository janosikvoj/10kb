'use client';

import React, { useEffect, useState } from 'react';
import CornerStrokeEffect from '../common/CornerStrokeEffect';
import { cn, scrollToTop } from '@/lib/utils';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    // Show the button when the user scrolls down
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    // Add scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      className={cn(
        'group',
        'size-12 flex justify-center items-center',
        'transition-all duration-300',
        !isVisible && 'translate-x-4 opacity-0 pointer-events-none'
      )}
      onClick={scrollToTop}
    >
      <CornerStrokeEffect />
      <svg
        className={cn(
          'h-6 w-auto fill-info',
          'group-hover:-translate-y-2 transition-all',
          'group-active:-translate-y-4 group-active:fill-white'
        )}
        width="27"
        height="33"
        viewBox="0 0 27 33"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M26.0704 14.1384H24.5029V25.1419H26.0704V14.1384Z" />
        <path d="M22.9255 28.2872L7.21953 28.2872V26.7197H5.64172V28.2872H4.07422V33H26.0708V28.2872H24.5033V25.1418H22.9255V28.2872ZM22.9255 31.4325H19.7905V29.8547H22.9255V31.4325Z" />
        <path d="M24.5026 12.5709H22.9248V14.1384H24.5026V12.5709Z" />
        <path d="M21.3575 14.1384H19.79V18.8616H21.3575V14.1384Z" />
        <path d="M22.925 11.0034H19.79V12.5709H22.925V11.0034Z" />
        <path d="M16.6446 14.1384H15.0771V18.8616H16.6446V14.1384Z" />
        <path d="M11.9323 14.1384H10.3545V18.8616H11.9323V14.1384Z" />
        <path d="M10.3545 11.0034L19.7904 11.0034V9.42563L11.9323 9.42563L11.9323 1.5675L10.3545 1.5675L10.3545 11.0034Z" />
        <path d="M10.3547 0L7.21973 0V1.5675L10.3547 1.5675V0Z" />
        <path d="M5.64172 20.4291H7.21953L7.21953 1.5675L5.64172 1.5675L5.64172 12.5709H4.07422V14.1384H5.64172L5.64172 20.4291Z" />
        <path d="M5.64172 25.1418H4.07422V26.7197H5.64172V25.1418Z" />
        <path d="M4.07434 21.9966H2.50684L2.50684 25.1419H4.07434V21.9966Z" />
        <path d="M4.07434 14.1384H2.50684L2.50684 15.7162H4.07434V14.1384Z" />
        <path d="M2.50652 15.7162H0.928711L0.928711 21.9966H2.50652L2.50652 15.7162Z" />
      </svg>
    </button>
  );
};

export default ScrollToTopButton;
