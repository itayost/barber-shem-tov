// src/hooks/useViewportSize.ts
import { useState, useEffect, useCallback } from 'react';

interface ViewportSize {
  width: number;
  height: number;
  isCompact: boolean;
}

export const useViewportSize = (compactBreakpoint: number = 700): ViewportSize => {
  const [viewportSize, setViewportSize] = useState<ViewportSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    isCompact: typeof window !== 'undefined' ? window.innerHeight < compactBreakpoint : false
  });

  const handleResize = useCallback(() => {
    setViewportSize({
      width: window.innerWidth,
      height: window.innerHeight,
      isCompact: window.innerHeight < compactBreakpoint
    });
  }, [compactBreakpoint]);

  useEffect(() => {
    // Initial calculation
    handleResize();
    
    // Add event listener with debouncing
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 150);
    };
    
    window.addEventListener('resize', debouncedResize);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', debouncedResize);
    };
  }, [handleResize]);

  return viewportSize;
};