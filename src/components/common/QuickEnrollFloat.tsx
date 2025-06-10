// src/components/common/QuickEnrollFloat.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();

  // Only show on course-related pages
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
      // Auto-expand once after 3 seconds if user hasn't interacted
      if (!hasInteracted && !isMobile) { // Don't auto-expand on mobile
        setTimeout(() => {
          setIsExpanded(true);
          setTimeout(() => setIsExpanded(false), 4000);
        }, 3000);
      }
    }, 1500); // Faster on mobile

    return () => clearTimeout(timer);
  }, [shouldShow, hasInteracted, isMobile]);

  // Handle body scroll lock for mobile
  useEffect(() => {
    if (isMobile && isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile, isExpanded]);

  // Handle user interaction
  const handleToggle = () => {
    setHasInteracted(true);
    setIsExpanded(!isExpanded);
  };

  // Quick actions
  const handleWhatsApp = () => {
    trackEnrollment.float.whatsapp(courseName, coursePrice);
    const message = courseName 
      ? `היי! מעוניין ב${courseName}${coursePrice ? ` (₪${coursePrice})` : ''}`
      : 'היי! מעוניין בפרטים על הקורסים שלכם 🎯';
    
    window.open(`https://wa.me/972528691415?text=${encodeURIComponent(message)}`, '_blank');
    setIsExpanded(false);
  };

  const handleCall = () => {
    trackEnrollment.float.phone(courseName, coursePrice);
    window.location.href = 'tel:+972528691415';
    setIsExpanded(false);
  };

  const handleForm = () => {
    trackEnrollment.float.form(courseName, coursePrice);
    const url = courseName 
      ? `/contact?course=${encodeURIComponent(courseName)}`
      : '/contact?subject=enrollment';
    window.location.href = url;
  };

  if (!shouldShow || !isVisible) return null;

  // Mobile Bottom Sheet Style
  if (isMobile && isExpanded) {
    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60"
            onClick={handleToggle}
          />
          
          {/* Bottom Sheet */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-charcoal border-t border-gold/20"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            dir="rtl"
          >
            {/* Handle */}
            <div className="flex justify-center py-3">
              <div className="w-12 h-1 bg-gold/30 rounded-full" />
            </div>
            
            {/* Title */}
            <div className="px-6 pb-4">
              <h3 className="text-xl font-bold text-offwhite">בחר אפשרות הרשמה</h3>
              {courseName && (
                <p className="text-sm text-lightgrey mt-1">{courseName}</p>
              )}
            </div>
            
            {/* Options */}
            <div className="pb-8">
              {/* WhatsApp - Primary */}
              <button
                onClick={handleWhatsApp}
                className="w-full px-6 py-4 flex items-center gap-4 hover:bg-green-500/10 active:bg-green-500/20 transition-colors"
              >
                <div className="bg-green-500 p-3 rounded-full">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
                  </svg>
                </div>
                <div className="flex-1 text-right">
                  <div className="text-lg font-bold text-offwhite">WhatsApp</div>
                  <div className="text-sm text-lightgrey">תשובה מיידית - מומלץ</div>
                </div>
                <span className="text-gold">←</span>
              </button>
              
              {/* Phone */}
              <button
                onClick={handleCall}
                className="w-full px-6 py-4 flex items-center gap-4 hover:bg-blue-500/10 active:bg-blue-500/20 transition-colors"
              >
                <div className="bg-blue-500 p-3 rounded-full">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="flex-1 text-right">
                  <div className="text-lg font-bold text-offwhite">התקשר</div>
                  <div className="text-sm text-lightgrey hebrew-nums" dir="ltr">052-869-1415</div>
                </div>
                <span className="text-gold">←</span>
              </button>
              
              {/* Form */}
              <button
                onClick={handleForm}
                className="w-full px-6 py-4 flex items-center gap-4 hover:bg-gold/10 active:bg-gold/20 transition-colors border-t border-lightgrey/10"
              >
                <div className="bg-gold p-3 rounded-full">
                  <svg className="w-6 h-6 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1 text-right">
                  <div className="text-lg font-bold text-offwhite">טופס מלא</div>
                  <div className="text-sm text-lightgrey">למידע מפורט</div>
                </div>
                <span className="text-gold">←</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Desktop/Tablet Floating Button
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed z-40 ${
            isMobile 
              ? 'bottom-4 right-4' // Above WhatsApp on mobile
              : 'bottom-6 right-6' // Desktop position
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
          {/* Mobile Compact Button */}
          {isMobile ? (
            <motion.button
              onClick={handleToggle}
              className="bg-gold text-charcoal p-4 rounded-full shadow-lg flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              
              {/* Pulse indicator */}
              {!hasInteracted && (
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.button>
          ) : (
            /* Desktop Expandable Widget */
            <motion.div
              variants={{
                collapsed: { width: 'auto' },
                expanded: { width: '320px' }
              }}
              initial="collapsed"
              animate={isExpanded ? "expanded" : "collapsed"}
              className="bg-charcoal border border-gold/30 shadow-2xl overflow-hidden"
            >
              {/* Main Button */}
              <button
                onClick={handleToggle}
                className="flex items-center gap-3 px-5 py-3 hover:bg-gold/10 transition-colors w-full text-right"
              >
                <div className="bg-gold/20 p-2 rounded-full">
                  <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-offwhite">הרשמה מהירה</div>
                  {courseName && !isExpanded && (
                    <div className="text-lightgrey text-xs truncate">{courseName}</div>
                  )}
                </div>
                <motion.svg
                  className="w-4 h-4 text-gold"
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>

              {/* Desktop Expanded Options */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-gold/10"
                  >
                    {/* Same options as mobile but compact */}
                    <button
                      onClick={handleWhatsApp}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-green-500/10 transition-colors w-full text-right"
                    >
                      <div className="bg-green-500/20 p-1.5 rounded-full">
                        <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">WhatsApp</div>
                        <div className="text-xs text-lightgrey">תשובה מיידית</div>
                      </div>
                      <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                        מומלץ
                      </span>
                    </button>

                    <button
                      onClick={handleCall}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-blue-500/10 transition-colors w-full text-right"
                    >
                      <div className="bg-blue-500/20 p-1.5 rounded-full">
                        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">טלפון</div>
                        <div className="text-xs text-lightgrey hebrew-nums" dir="ltr">052-869-1415</div>
                      </div>
                    </button>

                    <button
                      onClick={handleForm}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-gold/10 transition-colors w-full text-right border-t border-gold/10"
                    >
                      <div className="bg-gold/20 p-1.5 rounded-full">
                        <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">טופס מלא</div>
                        <div className="text-xs text-lightgrey">פרטים מלאים</div>
                      </div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Pulsing indicator for desktop */}
          {!isMobile && !hasInteracted && !isExpanded && (
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-gold rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuickEnrollFloat;