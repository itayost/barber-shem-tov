// src/components/common/WhatsAppFloat.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const WhatsAppFloat: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Detect mobile and show button
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Show button faster on mobile, slower on desktop
    const delay = window.innerWidth < 768 ? 1000 : 2000;
    const timer = setTimeout(() => setIsVisible(true), delay);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // WhatsApp message
  const whatsappMessage = encodeURIComponent(
    'היי! אשמח לקבל מידע על הקורסים לספרות באקדמיה 🎯'
  );
  
  const whatsappUrl = `https://wa.me/972528691415?text=${whatsappMessage}`;

  // Mobile-optimized animation variants
  const buttonVariants = {
    hidden: { 
      scale: 0, 
      opacity: 0,
      x: 20,
      y: 20
    },
    visible: { 
      scale: 1, 
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: prefersReducedMotion ? "tween" : "spring",
        stiffness: prefersReducedMotion ? undefined : 200,
        damping: prefersReducedMotion ? undefined : 15,
        duration: prefersReducedMotion ? 0.3 : 0.6
      }
    },
    exit: { 
      scale: 0, 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const tooltipVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9,
      x: isMobile ? 0 : 16,
      y: isMobile ? 10 : 0
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      x: 0,
      y: 0,
      transition: { 
        duration: 0.2,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: { duration: 0.15 }
    }
  };

  // Simplified pulse animation for mobile
  const pulseVariants = prefersReducedMotion ? {} : {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.6, 0, 0.6],
      transition: {
        duration: isMobile ? 3 : 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Touch-friendly sizing
  const buttonSize = isMobile ? 'w-16 h-16' : 'w-14 h-14';
  const iconSize = isMobile ? 'w-9 h-9' : 'w-8 h-8';
  const positioning = isMobile 
    ? 'bottom-4 right-4' // More accessible on mobile
    : 'bottom-6 right-6';

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Tooltip - only show on desktop hover or mobile tap */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                variants={tooltipVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`
                  fixed z-40 bg-charcoal border border-gold/30 text-offwhite px-3 py-2 text-sm font-medium shadow-lg max-w-xs
                  ${isMobile 
                    ? 'bottom-24 right-4 text-center' 
                    : 'bottom-24 right-4'
                  }
                `}
                dir="rtl"
              >
                💬 שאלות? בואו נדבר!
                {/* Arrow */}
                <div className={`
                  absolute w-2 h-2 bg-charcoal border border-gold/30 transform rotate-45
                  ${isMobile 
                    ? '-bottom-1 left-1/2 -translate-x-1/2 border-t-0 border-r-0' 
                    : '-bottom-1 right-4 border-l-0 border-t-0'
                  }
                `} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main WhatsApp Button */}
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              fixed ${positioning} ${buttonSize} 
              bg-green-500 hover:bg-green-600 active:bg-green-700
              text-white rounded-full flex items-center justify-center 
              shadow-lg hover:shadow-xl active:shadow-md
              transition-colors duration-200 z-50 
              touch-manipulation select-none
              ${isMobile ? 'active:scale-95' : ''}
            `}
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            whileHover={!isMobile ? { scale: 1.05 } : {}}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => !isMobile && setIsHovered(true)}
            onMouseLeave={() => !isMobile && setIsHovered(false)}
            onTouchStart={() => isMobile && setIsHovered(true)}
            onTouchEnd={() => isMobile && setTimeout(() => setIsHovered(false), 2000)}
          >
            {/* WhatsApp Icon */}
            <svg 
              className={iconSize}
              fill="currentColor" 
              viewBox="0 0 24 24"
              aria-label="WhatsApp"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.106"/>
            </svg>

            {/* Notification Badge */}
            {!prefersReducedMotion && (
              <motion.div
                className={`
                  absolute -top-1 -right-1 bg-red-500 rounded-full flex items-center justify-center
                  ${isMobile ? 'w-5 h-5' : 'w-4 h-4'}
                `}
                animate={{ 
                  scale: [1, 1.1, 1],
                  transition: { 
                    duration: isMobile ? 3 : 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                <span className={`font-bold ${isMobile ? 'text-sm' : 'text-xs'}`}>
                  !
                </span>
              </motion.div>
            )}

            {/* Subtle Pulse Ring - only on desktop */}
            {!isMobile && !prefersReducedMotion && (
              <motion.div
                className="absolute inset-0 bg-green-400 rounded-full pointer-events-none"
                {...pulseVariants}
              />
            )}
          </motion.a>
        </>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppFloat;