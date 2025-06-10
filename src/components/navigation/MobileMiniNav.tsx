// src/components/navigation/MobileMiniNav.tsx - Luxury Enhanced Version
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { navigationConfig } from '@/config/navigation';

interface MobileMiniNavProps {
  academyInfo: {
    phone: string;
  };
}

// Luxury animation constants
const LUXURY_SPRING = { type: "spring", stiffness: 400, damping: 30 };
const LUXURY_EASING = [0.25, 0.1, 0.25, 1];

const MobileMiniNav: React.FC<MobileMiniNavProps> = ({ academyInfo }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const pathname = usePathname();
  
  // Spring values for smooth animations
  const y = useSpring(100, LUXURY_SPRING);
  const scale = useSpring(0.9, LUXURY_SPRING);
  const opacity = useSpring(0, { stiffness: 300, damping: 30 });

  useEffect(() => {
    let rafId: number;
    let timeoutId: NodeJS.Timeout;
    
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const direction = currentScrollY > lastScrollY ? 'down' : 'up';
        
        // Enhanced visibility logic
        if (currentScrollY > 300) {
          if (direction === 'up' || currentScrollY < 400) {
            setIsVisible(true);
            y.set(0);
            scale.set(1);
            opacity.set(1);
            
            // Auto-hide after 5 seconds of no scrolling
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
              if (window.scrollY > 300) {
                setIsVisible(false);
                y.set(100);
                scale.set(0.9);
                opacity.set(0);
              }
            }, 5000);
          } else {
            setIsVisible(false);
            y.set(100);
            scale.set(0.9);
            opacity.set(0);
          }
        } else {
          setIsVisible(false);
          y.set(100);
          scale.set(0.9);
          opacity.set(0);
        }
        
        setScrollDirection(direction);
        setLastScrollY(currentScrollY);
      });
    };

    // Only add on mobile
    if (window.innerWidth < 768) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('touchmove', handleScroll, { passive: true });
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, [lastScrollY, y, scale, opacity]);

  // Get current page name with emoji
  const currentPageData = navigationConfig.mainItems.find(item => 
    pathname === item.path || (item.path !== '/' && pathname?.startsWith(item.path))
  );
  const currentPage = currentPageData?.name || 'The Fader';
  const currentEmoji = currentPageData?.icon || '📍';

  // Swipe up to hide gesture
  const handleSwipeUp = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const startY = touch.clientY;
    
    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      if (startY - currentY > 50) {
        setIsVisible(false);
        y.set(100);
        scale.set(0.9);
        opacity.set(0);
      }
    };
    
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', () => {
      window.removeEventListener('touchmove', handleTouchMove);
    }, { once: true });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-4 left-4 right-4 z-30 md:hidden pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          dir="rtl"
        >
          <motion.div
            className="bg-charcoal/95 backdrop-blur-2xl border border-gold/20 rounded-2xl shadow-2xl pointer-events-auto"
            style={{ y, scale, opacity }}
            onTouchStart={handleSwipeUp}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              if (offset.y > 50 || velocity.y > 500) {
                setIsVisible(false);
                y.set(100);
                scale.set(0.9);
                opacity.set(0);
              }
            }}
          >
            {/* Luxury glass effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent rounded-2xl pointer-events-none" />
            
            {/* Content */}
            <div className="relative px-5 py-3.5">
              <div className="flex items-center justify-between gap-3">
                {/* Current Page with Animation */}
                <motion.div 
                  className="flex items-center gap-2.5"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1, ...LUXURY_SPRING }}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <span className="text-lg">{currentEmoji}</span>
                  </motion.div>
                  <div className="flex items-center gap-2">
                    <motion.div 
                      className="w-2 h-2 bg-gold rounded-full"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-sm text-gold font-medium tracking-wide">
                      {currentPage}
                    </span>
                  </div>
                </motion.div>

                {/* Quick Actions with Stagger */}
                <motion.div 
                  className="flex items-center gap-2"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, ...LUXURY_SPRING }}
                >
                  {/* WhatsApp Button */}
                  <motion.button 
                    onClick={() => window.open(`https://wa.me/${academyInfo.phone.replace(/\D/g, '')}`, '_blank')}
                    className="p-2.5 bg-green-500/20 backdrop-blur-sm rounded-xl hover:bg-green-500/30 transition-all duration-300 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="WhatsApp"
                  >
                    <svg className="w-4 h-4 text-green-400 group-hover:text-green-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
                    </svg>
                    
                    {/* Pulse ring effect */}
                    <motion.div
                      className="absolute inset-0 rounded-xl border border-green-400/30"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.button>

                  {/* Book CTA */}
                  <motion.button
                    onClick={() => window.location.href = '/contact'}
                    className="px-4 py-2 bg-gradient-to-r from-gold to-gold-light text-charcoal text-sm font-bold rounded-xl hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">קבע תור</span>
                    
                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.button>
                </motion.div>
              </div>
              
              {/* Swipe indicator */}
              <motion.div 
                className="absolute -top-2 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 0.3, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="w-8 h-1 bg-gold/30 rounded-full" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMiniNav;