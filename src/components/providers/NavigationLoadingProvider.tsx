// src/components/providers/NavigationLoadingProvider.tsx
'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingLogo from '@/components/common/LoadingLogo';

interface NavigationLoadingProviderProps {
  children: React.ReactNode;
}

const NavigationLoadingProvider: React.FC<NavigationLoadingProviderProps> = ({ children }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [navigationStart, setNavigationStart] = useState(0);

  // Minimum loading time to prevent flash
  const MIN_LOADING_TIME = 500;

  // Handle route changes
  useEffect(() => {
    setIsLoading(false);
  }, [pathname, searchParams]);

  // Intercept link clicks to show loading state
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href && !link.target && !e.defaultPrevented) {
        const url = new URL(link.href);
        
        // Only show loading for internal navigation
        if (url.origin === window.location.origin && url.pathname !== pathname) {
          setIsLoading(true);
          setNavigationStart(Date.now());
        }
      }
    };

    // Add global click listener
    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [pathname]);

  // Ensure minimum loading time
  useEffect(() => {
    if (!isLoading && navigationStart > 0) {
      const elapsed = Date.now() - navigationStart;
      if (elapsed < MIN_LOADING_TIME) {
        const remainingTime = MIN_LOADING_TIME - elapsed;
        const timer = setTimeout(() => {
          setIsLoading(false);
          setNavigationStart(0);
        }, remainingTime);
        return () => clearTimeout(timer);
      }
      setNavigationStart(0);
    }
  }, [isLoading, navigationStart]);

  return (
    <>
      {children}
      
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-charcoal/95 backdrop-blur-sm z-[100] flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LoadingLogo size="medium" showText={true} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavigationLoadingProvider;