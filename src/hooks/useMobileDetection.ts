// src/hooks/useMobileDetection.ts
'use client';

import { useState, useEffect } from 'react';

interface ViewportSize {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export const useMobileDetection = (mobileBreakpoint: number = 768): ViewportSize => {
  const [viewportSize, setViewportSize] = useState<ViewportSize>({
    width: 0,
    height: 0,
    isMobile: false,
    isTablet: false,
    isDesktop: true
  });

  useEffect(() => {
    const updateViewportSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setViewportSize({
        width,
        height,
        isMobile: width < mobileBreakpoint,
        isTablet: width >= mobileBreakpoint && width < 1024,
        isDesktop: width >= 1024
      });
    };

    // Set initial values
    updateViewportSize();

    // Debounced resize handler for better performance
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateViewportSize, 150);
    };

    window.addEventListener('resize', debouncedResize, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', debouncedResize);
    };
  }, [mobileBreakpoint]);

  return viewportSize;
};

// Simple version for quick mobile detection
export const useIsMobile = (breakpoint: number = 768): boolean => {
  const { isMobile } = useMobileDetection(breakpoint);
  return isMobile;
};