// src/components/providers/InitialPageLoader.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingLogo from '@/components/common/LoadingLogo';

const InitialPageLoader: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (hasVisited) {
      setIsLoading(false);
      return;
    }

    // Minimum display time for first visit
    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem('hasVisited', 'true');
    }, 2000);

    // Also hide loader when page is fully loaded
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem('hasVisited', 'true');
      }, 1000);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-charcoal z-[200] flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <LoadingLogo size="large" showText={true} />
            
            {/* Welcome text for first visit */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-8"
            >
              <p className="text-gold text-lg font-medium">ברוכים הבאים</p>
              <p className="text-lightgrey text-sm mt-1">The Fader Barbershop & Academy</p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InitialPageLoader;