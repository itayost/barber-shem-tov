// src/components/common/QuickEnrollFloat.tsx - With Icon System
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { PlusIcon, WhatsAppIcon } from '@/components/icons';
import { trackEnrollment } from '@/utils/enrollmentTracking';

interface QuickEnrollFloatProps {
  courseName?: string;
  coursePrice?: number;
}

const QuickEnrollFloat: React.FC<QuickEnrollFloatProps> = ({ 
  courseName,
  coursePrice 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();
  const router = useRouter();

  // Only show on course-related pages (not on /apply itself)
  const shouldShow = pathname?.includes('/courses') || pathname?.includes('/academy');

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Show button after delay
  useEffect(() => {
    if (!shouldShow) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    // Show tooltip briefly on first appearance
    const tooltipTimer = setTimeout(() => {
      if (!hasInteracted) {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 3000);
      }
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearTimeout(tooltipTimer);
    };
  }, [shouldShow, hasInteracted]);

  // Quick actions
  const handleEnroll = () => {
    trackEnrollment.float.form(courseName, coursePrice);
    const url = courseName 
      ? `/apply?course=${encodeURIComponent(courseName)}`
      : '/apply';
    router.push(url);
  };

  const handleWhatsApp = () => {
    trackEnrollment.float.whatsapp(courseName, coursePrice);
    const message = courseName 
      ? `היי! מעוניין ב${courseName}${coursePrice ? ` (₪${coursePrice})` : ''}`
      : 'היי! מעוניין בפרטים על הקורסים שלכם 🎯';
    
    window.open(`https://wa.me/972528691415?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (!shouldShow || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={`fixed z-40 ${
          isMobile 
            ? 'bottom-20 right-4' // Higher on mobile to avoid WhatsApp button
            : 'bottom-6 right-6'
        }`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{
          type: prefersReducedMotion ? "tween" : "spring",
          stiffness: 200,
          damping: 20
        }}
        dir="rtl"
      >
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && !isMobile && (
            <motion.div
              className="absolute bottom-full mb-2 right-0 bg-charcoal text-offwhite px-3 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              רוצה להירשם? לחץ כאן! 👈
              <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-charcoal"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main button group */}
        <div className="flex flex-col items-center gap-2">
          {/* Simple floating button */}
          <motion.button
            onClick={handleEnroll}
            className="bg-gold text-charcoal px-6 py-3 rounded-full shadow-lg hover:shadow-xl flex items-center gap-2 font-bold group relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => {
              setHasInteracted(true);
              setShowTooltip(false);
            }}
          >
            {/* Background shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />

            {/* Icon */}
            <motion.div
              animate={{ rotate: hasInteracted ? 0 : [0, 90, 180, 270, 360] }}
              transition={{ 
                duration: 3,
                repeat: hasInteracted ? 0 : Infinity,
                repeatDelay: 2
              }}
              className="relative z-10"
            >
              <PlusIcon size={20} strokeWidth={3} />
            </motion.div>
            
            {/* Text - Hidden on mobile */}
            <span className={`relative z-10 ${isMobile ? 'hidden' : 'block'}`}>
              הרשמה מהירה
            </span>

            {/* Pulse effect */}
            {!hasInteracted && !prefersReducedMotion && (
              <motion.div
                className="absolute inset-0 bg-gold/30 rounded-full pointer-events-none"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </motion.button>

          {/* Quick WhatsApp option below */}
          <motion.button
            onClick={handleWhatsApp}
            className="bg-green-500/90 text-white p-3 rounded-full shadow-md hover:bg-green-600 transition-all group"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <WhatsAppIcon size={20} className="group-hover:rotate-12 transition-transform" />
          </motion.button>

          {/* Mobile-only: Call button */}
          {isMobile && (
            <motion.a
              href="tel:+972528691415"
              className="bg-blue-500/90 text-white p-3 rounded-full shadow-md hover:bg-blue-600 transition-all"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </motion.a>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// Alternative minimal version for specific pages
export const QuickEnrollFloatMinimal: React.FC<QuickEnrollFloatProps> = (props) => {
  const router = useRouter();
  const pathname = usePathname();
  const shouldShow = pathname?.includes('/courses') || pathname?.includes('/academy');

  if (!shouldShow) return null;

  const handleEnroll = () => {
    const url = props.courseName 
      ? `/apply?course=${encodeURIComponent(props.courseName)}`
      : '/apply';
    router.push(url);
  };

  return (
    <motion.button
      onClick={handleEnroll}
      className="fixed bottom-6 right-6 bg-gold text-charcoal p-4 rounded-full shadow-lg hover:shadow-xl z-40"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <PlusIcon size={24} strokeWidth={3} />
    </motion.button>
  );
};

export default QuickEnrollFloat;