// components/home/TestimonialsCarousel.tsx
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import Image from 'next/image';
import { academyTestimonials } from '@/lib/data';

// Add the Testimonial type import or define it
interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
  course: string;
  instructor: string;
  image: string;
  year: number;
}

const TestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  const testimonials = academyTestimonials;

  // Define handleNext BEFORE useEffect
  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  // Now useEffect can use handleNext
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        handleNext();
      }, 6000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex, isPaused, handleNext]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      handlePrev();
    } else if (info.offset.x < -threshold) {
      handleNext();
    }
  };

  // Variants for animations
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  return (
    <section className="py-12 md:py-20 lg:py-32 bg-charcoal relative overflow-hidden" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            סיפורי <span className="text-gold">הצלחה</span>
          </h2>
          <p className="text-lightgrey text-base md:text-xl max-w-2xl mx-auto px-4">
            הבוגרים שלנו משנים חיים
          </p>
        </motion.div>

        {/* Carousel container */}
        <div 
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main carousel - Responsive height */}
          <div className="relative h-auto min-h-[400px] md:min-h-[450px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={handleDragEnd}
                className="w-full cursor-grab active:cursor-grabbing"
              >
                <MobileOptimizedSlide testimonial={testimonials[currentIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons - Better mobile positioning */}
          <button
            onClick={handlePrev}
            className="absolute right-2 sm:right-4 md:right-0 top-1/2 -translate-y-1/2 bg-charcoal/90 backdrop-blur-sm border border-gold/20 text-gold p-2 sm:p-3 md:p-4 hover:bg-gold/10 hover:border-gold/40 transition-all z-20 rounded-full md:rounded-none"
            aria-label="Previous testimonial"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute left-2 sm:left-4 md:left-0 top-1/2 -translate-y-1/2 bg-charcoal/90 backdrop-blur-sm border border-gold/20 text-gold p-2 sm:p-3 md:p-4 hover:bg-gold/10 hover:border-gold/40 transition-all z-20 rounded-full md:rounded-none"
            aria-label="Next testimonial"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Indicators - Mobile optimized */}
          <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 md:mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`transition-all rounded-full ${
                  index === currentIndex 
                    ? 'w-8 sm:w-10 md:w-12 h-2 bg-gold' 
                    : 'w-2 h-2 bg-gold/30 hover:bg-gold/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA Section - Mobile optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12 md:mt-20"
        >
          <div className="bg-gradient-to-r from-gold/5 via-gold/10 to-gold/5 backdrop-blur-sm border border-gold/20 p-6 sm:p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
              רוצה להיות <span className="text-gold">הסיפור הבא</span>?
            </h3>
            <p className="text-lightgrey text-base md:text-lg mb-6 md:mb-8 px-2">
              הצטרף למאות הבוגרים המצליחים שלנו
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <motion.a
                href="/courses"
                className="w-full sm:w-auto bg-gold text-charcoal py-3 px-6 md:py-4 md:px-8 font-bold text-base md:text-lg hover:bg-gold/90 transition-all shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                הרשמה לקורס
              </motion.a>
              
              <motion.a
                href="/contact?consultation=true"
                className="w-full sm:w-auto border border-gold text-gold py-3 px-6 md:py-4 md:px-8 font-bold text-base md:text-lg hover:bg-gold/10 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                ייעוץ חינם
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Mobile-optimized testimonial slide
const MobileOptimizedSlide: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="px-2 sm:px-4 md:px-6">
      <motion.div 
        className="bg-charcoal-light/50 backdrop-blur-sm border border-gold/10 overflow-hidden w-full"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Mobile: Stack vertically, Desktop: Side by side */}
        <div className="flex flex-col md:grid md:grid-cols-2">
          {/* Image section */}
          <div className="relative h-48 sm:h-56 md:h-full bg-gradient-to-br from-gold/20 to-brown/20">
            {!imageError ? (
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mx-auto rounded-full bg-gold/20 flex items-center justify-center text-gold text-3xl sm:text-4xl md:text-5xl font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
              </div>
            )}
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent md:bg-gradient-to-r" />
            
            {/* Rating stars */}
            <div className="absolute bottom-3 left-0 right-0 text-center">
              <div className="flex justify-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg sm:text-xl md:text-2xl ${i < testimonial.rating ? 'text-gold' : 'text-gray-600'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Content section */}
          <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
            {/* Quote icon - smaller on mobile */}
            <div className="text-gold/30 text-4xl sm:text-5xl md:text-6xl font-serif mb-3 md:mb-4">
              &ldquo;
            </div>

            {/* Testimonial text - responsive size */}
            <blockquote className="text-lightgrey text-base sm:text-lg md:text-xl leading-relaxed mb-4 md:mb-6 italic">
              {testimonial.text}
            </blockquote>

            {/* Author info */}
            <div className="border-t border-gold/20 pt-4 md:pt-6">
              <h4 className="text-lg sm:text-xl font-bold text-offwhite mb-1">
                {testimonial.name}
              </h4>
              <p className="text-gold text-sm sm:text-base mb-0.5">
                בוגר {testimonial.year} • {testimonial.course}
              </p>
              <p className="text-lightgrey/60 text-xs sm:text-sm">
                מדריך: {testimonial.instructor}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TestimonialsCarousel;