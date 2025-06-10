// src/components/navigation/MobileMiniNav.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { navigationConfig } from '@/config/navigation';

interface MobileMiniNavProps {
  academyInfo: {
    phone: string;
  };
}

const MobileMiniNav: React.FC<MobileMiniNavProps> = ({ academyInfo }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    let rafId: number;
    
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        
        // Show when scrolling up and past threshold
        if (currentScrollY > 200) {
          if (currentScrollY < lastScrollY) {
            setIsVisible(true); // Scrolling up
          } else {
            setIsVisible(false); // Scrolling down
          }
        } else {
          setIsVisible(false);
        }
        
        setLastScrollY(currentScrollY);
      });
    };

    // Only add on mobile
    if (window.innerWidth < 768) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Get current page name
  const currentPage = navigationConfig.mainItems.find(item => 
    pathname === item.path || (item.path !== '/' && pathname?.startsWith(item.path))
  )?.name || 'The Fader';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-4 left-4 right-4 z-30 md:hidden"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          dir="rtl"
        >
          <div className="bg-charcoal/95 backdrop-blur-md border border-gold/20 rounded-full px-4 py-3 shadow-2xl">
            <div className="flex items-center justify-between">
              {/* Current Page */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                <span className="text-sm text-gold font-medium">{currentPage}</span>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2">
                {/* WhatsApp */}
                <motion.button 
                  onClick={() => window.open(`https://wa.me/${academyInfo.phone.replace(/\D/g, '')}`, '_blank')}
                  className="p-2.5 bg-green-500/20 rounded-full hover:bg-green-500/30 transition-colors"
                  whileTap={{ scale: 0.9 }}
                  aria-label="WhatsApp"
                >
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
                  </svg>
                </motion.button>

                {/* Book CTA */}
                <motion.button
                  onClick={() => window.location.href = '/contact'}
                  className="px-4 py-2 bg-gold text-charcoal text-sm font-bold rounded-full hover:bg-gold/90 transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  קבע תור
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMiniNav;