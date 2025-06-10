// src/components/common/QuickEnrollFloat.tsx - Updated
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
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

    return () => clearTimeout(timer);
  }, [shouldShow]);

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
            ? 'bottom-4 right-4' // Higher on mobile to avoid WhatsApp button
            : 'bottom-6 right-6' // Left side on desktop to not conflict with WhatsApp
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
        {/* Simple floating button */}
        <motion.button
          onClick={handleEnroll}
          className="bg-gold text-charcoal px-6 py-3 rounded-full shadow-lg hover:shadow-xl flex items-center gap-2 font-bold group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => setHasInteracted(true)}
        >
          {/* Icon */}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          
          {/* Text - Hidden on mobile */}
          <span className={`${isMobile ? 'hidden' : 'block'}`}>
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
          className="mt-2 bg-green-500/90 text-white p-2 rounded-full shadow-md hover:bg-green-600 transition-colors mx-auto block"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
          </svg>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuickEnrollFloat;