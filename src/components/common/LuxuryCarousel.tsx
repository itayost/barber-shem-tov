// src/components/common/LuxuryCarousel.tsx - Mobile Optimized
'use client';

import React, { useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { useMobileDetection } from '@/hooks/useMobileDetection';

export interface LuxuryCarouselProps {
  slides: ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  showTimeline?: boolean;
  timelineLabels?: string[];
  variant?: 'default' | 'editorial' | 'minimal';
  height?: 'auto' | 'full' | 'screen';
  onSlideChange?: (index: number) => void;
  className?: string;
}

const LuxuryCarousel: React.FC<LuxuryCarouselProps> = ({
  slides,
  autoPlay = true,
  autoPlayInterval = 6000,
  showDots = true,
  showTimeline = false,
  timelineLabels = [],
  variant = 'default',
  height = 'auto',
  onSlideChange,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [direction, setDirection] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  const { isMobile } = useMobileDetection();
  const prefersReducedMotion = useReducedMotion();

  // Page visibility detection for performance
  useEffect(() => {
    const handleVisibilityChange = () => setIsVisible(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Optimized navigation functions
  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  }, [currentIndex]);

  // Mobile-optimized drag handling
  const handleDragEnd = useCallback((_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = isMobile ? 30 : 50; // Lower threshold for mobile
    const velocity = Math.abs(info.velocity.x);
    
    setIsAutoPlaying(false);
    
    // Use velocity for more responsive feel on mobile
    if (info.offset.x > threshold || velocity > 300) {
      handlePrev();
    } else if (info.offset.x < -threshold || velocity > 300) {
      handleNext();
    }
  }, [isMobile, handleNext, handlePrev]);

  // Auto-play with visibility optimization
  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1 || !isVisible) return;

    const interval = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length, autoPlayInterval, isVisible, handleNext]);

  // Notify parent of slide changes
  useEffect(() => {
    onSlideChange?.(currentIndex);
  }, [currentIndex, onSlideChange]);

  // Memoized styles to prevent re-renders
  const variantStyles = useMemo(() => ({
    default: {
      wrapper: 'bg-charcoal',
      content: 'px-4 py-12 md:py-20',
    },
    editorial: {
      wrapper: 'bg-black',
      content: 'px-4 py-16 md:py-24',
    },
    minimal: {
      wrapper: 'bg-transparent',
      content: 'px-4 py-8 md:py-16',
    }
  }), []);

  const heightClasses = useMemo(() => ({
    auto: 'h-auto',
    full: 'h-full',
    screen: 'h-screen'
  }), []);

  // Mobile-optimized animation variants
  const slideVariants = useMemo(() => ({
    enter: (direction: number) => ({
      x: direction > 0 ? (isMobile ? 50 : 100) : (isMobile ? -50 : -100),
      opacity: 0,
      scale: isMobile ? 0.98 : 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? (isMobile ? 50 : 100) : (isMobile ? -50 : -100),
      opacity: 0,
      scale: isMobile ? 0.98 : 0.95
    })
  }), [isMobile]);

  // Mobile-optimized transition
  const transition = useMemo(() => ({
    duration: prefersReducedMotion ? 0.2 : (isMobile ? 0.4 : 0.6),
    ease: [0.32, 0.72, 0, 1] // Faster easing for mobile
  }), [isMobile, prefersReducedMotion]);

  const currentVariant = variantStyles[variant];

  return (
    <div className={`relative overflow-hidden gpu-accelerated ${currentVariant.wrapper} ${heightClasses[height]} ${className}`}>
      {/* Simplified background for mobile performance */}
      {variant === 'editorial' && !isMobile && (
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, #C9A66B 1px, transparent 1px),
              linear-gradient(to bottom, #C9A66B 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>
      )}

      <div className={`relative z-10 h-full ${currentVariant.content}`}>
        {/* Mobile-optimized Timeline */}
        {showTimeline && timelineLabels.length > 0 && (
          <>
            {/* Mobile Timeline */}
            <div className="md:hidden mb-8 -mx-4 px-4">
              <div className="flex space-x-4 space-x-reverse overflow-x-auto no-scrollbar">
                {timelineLabels.map((label, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`text-xs tracking-wider transition-colors whitespace-nowrap px-2 ${
                      index === currentIndex 
                        ? 'text-gold' 
                        : 'text-lightgrey/40'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Timeline */}
            {!isMobile && (
              <div className="flex justify-center mb-12">
                <div className="flex items-center space-x-8 space-x-reverse">
                  {timelineLabels.map((label, index) => (
                    <React.Fragment key={index}>
                      <button
                        onClick={() => goToSlide(index)}
                        className="relative group"
                      >
                        <motion.div
                          className={`text-xs tracking-[0.2em] transition-all duration-500 ${
                            index === currentIndex 
                              ? 'text-gold' 
                              : 'text-lightgrey/30 hover:text-lightgrey/60'
                          }`}
                        >
                          {label}
                        </motion.div>
                        <motion.div
                          className={`absolute -bottom-8 left-1/2 -translate-x-1/2 h-[1px] transition-all duration-500 ${
                            index === currentIndex ? 'w-full bg-gold' : 'w-0 bg-lightgrey/30'
                          }`}
                        />
                      </button>
                      {index < timelineLabels.length - 1 && (
                        <div className="w-20 h-[1px] bg-lightgrey/10" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Optimized Carousel Content */}
        <div className="relative h-full gpu-accelerated">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              drag={isMobile ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              dragMomentum={false}
              onDragEnd={handleDragEnd}
              className={`w-full h-full ${isMobile ? 'cursor-grab active:cursor-grabbing' : ''}`}
              style={{
                // Force hardware acceleration on mobile
                transform: 'translateZ(0)',
                willChange: 'transform'
              }}
            >
              {slides[currentIndex]}
            </motion.div>
          </AnimatePresence>
        </div>

        {showDots && (
          <div className="absolute bottom-8 left-0 right-0">
            <div className="flex justify-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'bg-gold w-8' 
                      : 'bg-gold/40 hover:bg-gold/60'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LuxuryCarousel;