// src/components/common/LuxuryCarousel.tsx - Mobile-First Fashion Carousel
'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

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
  showArrows = false,
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

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return;

    const interval = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex, slides.length, autoPlayInterval]);

  // Notify parent of slide changes
  useEffect(() => {
    onSlideChange?.(currentIndex);
  }, [currentIndex, onSlideChange]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    setIsAutoPlaying(false);
    
    if (info.offset.x > threshold) {
      handlePrev();
    } else if (info.offset.x < -threshold) {
      handleNext();
    }
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // Height classes
  const heightClasses = {
    auto: 'h-auto',
    full: 'h-full',
    screen: 'h-screen'
  };

  // Variant-specific styles
  const variantStyles = {
    default: {
      wrapper: 'bg-charcoal',
      content: 'px-4 py-12 md:py-20',
      navigation: 'default'
    },
    editorial: {
      wrapper: 'bg-black',
      content: 'px-4 py-16 md:py-24',
      navigation: 'editorial'
    },
    minimal: {
      wrapper: 'bg-transparent',
      content: 'px-4 py-8 md:py-16',
      navigation: 'minimal'
    }
  };

  const currentVariant = variantStyles[variant];

  return (
    <div className={`relative overflow-hidden ${currentVariant.wrapper} ${heightClasses[height]} ${className}`}>
      {/* Luxury grid pattern overlay */}
      {variant === 'editorial' && (
        <div className="absolute inset-0 opacity-[0.02] md:opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, #C9A66B 1px, transparent 1px),
              linear-gradient(to bottom, #C9A66B 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px md:50px md:50px'
          }} />
        </div>
      )}

      <div className={`relative z-10 h-full ${currentVariant.content}`}>
        {/* Timeline Navigation - Mobile: Horizontal scroll, Desktop: Centered */}
        {showTimeline && timelineLabels.length > 0 && (
          <>
            {/* Mobile Timeline */}
            <div className="md:hidden mb-8 -mx-4 px-4 overflow-x-auto no-scrollbar">
              <div className="flex space-x-6 space-x-reverse w-max">
                {timelineLabels.map((label, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`text-xs tracking-wider transition-all ${
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
            <div className="hidden md:flex justify-center mb-12">
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
          </>
        )}

        {/* Main Carousel Content */}
        <div className="relative h-full">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ 
                opacity: 0, 
                x: direction > 0 ? 100 : -100,
                scale: 0.95
              }}
              animate={{ 
                opacity: 1, 
                x: 0,
                scale: 1
              }}
              exit={{ 
                opacity: 0, 
                x: direction > 0 ? -100 : 100,
                scale: 0.95
              }}
              transition={{ 
                duration: 0.6, 
                ease: [0.25, 0.1, 0.25, 1] 
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
              className="w-full h-full cursor-grab active:cursor-grabbing"
            >
              {slides[currentIndex]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-8 left-0 right-0">
          {/* Mobile: Dots, Desktop: Editorial or Arrows */}
          {showDots && (
            <>
              {/* Mobile Dots */}
              <div className="flex justify-center space-x-2 space-x-reverse md:hidden">
                {slides.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-[2px] transition-all duration-500 ${
                      index === currentIndex 
                        ? 'w-8 bg-gold' 
                        : 'w-4 bg-lightgrey/20'
                    }`}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>

              {/* Desktop Navigation */}
              {variant === 'editorial' ? (
                <div className="hidden md:flex justify-between items-center max-w-6xl mx-auto">
                  <motion.button
                    onClick={() => {
                      setIsAutoPlaying(false);
                      handlePrev();
                    }}
                    className="group flex items-center space-x-2 space-x-reverse"
                    whileHover={{ x: -5 }}
                  >
                    <span className="w-12 h-[1px] bg-lightgrey/30 group-hover:bg-gold transition-colors" />
                    <span className="text-xs tracking-[0.2em] text-lightgrey/60 group-hover:text-gold transition-colors">
                      PREV
                    </span>
                  </motion.button>

                  <div className="flex space-x-2 space-x-reverse">
                    {slides.map((_, index) => (
                      <motion.div
                        key={index}
                        className={`h-[1px] transition-all duration-500 ${
                          index === currentIndex 
                            ? 'w-8 bg-gold' 
                            : 'w-4 bg-lightgrey/20'
                        }`}
                      />
                    ))}
                  </div>

                  <motion.button
                    onClick={() => {
                      setIsAutoPlaying(false);
                      handleNext();
                    }}
                    className="group flex items-center space-x-2 space-x-reverse"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-xs tracking-[0.2em] text-lightgrey/60 group-hover:text-gold transition-colors">
                      NEXT
                    </span>
                    <span className="w-12 h-[1px] bg-lightgrey/30 group-hover:bg-gold transition-colors" />
                  </motion.button>
                </div>
              ) : (
                <div className="hidden md:flex justify-center space-x-2 space-x-reverse">
                  {slides.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`transition-all duration-500 ${
                        index === currentIndex 
                          ? 'w-12 h-[2px] bg-gold' 
                          : 'w-8 h-[2px] bg-lightgrey/20 hover:bg-lightgrey/40'
                      }`}
                      whileHover={{ scale: 1.1 }}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {/* Arrow Navigation (optional) */}
          {showArrows && !showDots && (
            <>
              <button
                onClick={() => {
                  setIsAutoPlaying(false);
                  handlePrev();
                }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-charcoal/80 backdrop-blur-sm border border-gold/20 rounded-full text-gold hover:bg-gold/10 hover:border-gold/40 transition-all"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => {
                  setIsAutoPlaying(false);
                  handleNext();
                }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-charcoal/80 backdrop-blur-sm border border-gold/20 rounded-full text-gold hover:bg-gold/10 hover:border-gold/40 transition-all"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Mobile Swipe Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-6 md:hidden text-[10px] tracking-[0.2em] text-lightgrey/40"
        >
          SWIPE TO EXPLORE
        </motion.p>
      </div>
    </div>
  );
};

export default LuxuryCarousel;