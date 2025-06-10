// components/home/TestimonialsCarousel.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import Image from 'next/image';
import { academyTestimonials } from '@/lib/data';

const TestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  const testimonials = academyTestimonials;

  // Auto-play functionality
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        handleNext();
      }, 5000); // Change slide every 5 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex, isPaused]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
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

  const backgroundVariants = {
    enter: { scale: 1.2, opacity: 0 },
    center: { scale: 1, opacity: 0.1 },
    exit: { scale: 0.8, opacity: 0 },
  };

  return (
    <section className="py-20 md:py-32 bg-charcoal relative overflow-hidden" dir="rtl">
      {/* Animated background */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="absolute inset-0"
            variants={backgroundVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-brown/10" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-h2 md:text-5xl font-bold mb-4">
            סיפורי <span className="text-gold">הצלחה אמיתיים</span>
          </h2>
          <p className="text-lightgrey text-xl max-w-2xl mx-auto">
            הבוגרים שלנו משנים חיים - הנה הסיפורים שלהם
          </p>
        </motion.div>

        {/* Carousel container */}
        <div 
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main carousel */}
          <div className="relative h-[500px] md:h-[450px]">
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
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
              >
                <TestimonialSlide testimonial={testimonials[currentIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={handlePrev}
            className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-4 md:translate-x-0 bg-charcoal/80 backdrop-blur-sm border border-gold/20 text-gold p-3 md:p-4 hover:bg-gold/10 hover:border-gold/40 transition-all z-20"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-0 bg-charcoal/80 backdrop-blur-sm border border-gold/20 text-gold p-3 md:p-4 hover:bg-gold/10 hover:border-gold/40 transition-all z-20"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`transition-all ${
                  index === currentIndex 
                    ? 'w-12 h-2 bg-gold' 
                    : 'w-2 h-2 bg-gold/30 hover:bg-gold/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold/10 overflow-hidden">
            <motion.div
              className="h-full bg-gold"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 5,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop"
              }}
              style={{ display: isPaused ? 'none' : 'block' }}
              key={currentIndex}
            />
          </div>
        </div>

        {/* Enhanced CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-gold/5 via-gold/10 to-gold/5 backdrop-blur-sm border border-gold/20 p-12 max-w-4xl mx-auto">
            <h3 className="text-h3 font-bold mb-4">
              רוצה להיות <span className="text-gold">הסיפור הבא</span>?
            </h3>
            <p className="text-lightgrey text-lg mb-8">
              הצטרף ל-{testimonials[0].year > 2020 ? '500+' : '400+'} בוגרים מצליחים שכבר שינו את החיים שלהם
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href="/courses"
                className="bg-gold text-charcoal py-4 px-8 font-bold text-lg hover:bg-gold/90 transition-all shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                הרשמה לקורס
              </motion.a>
              
              <motion.a
                href="/contact?consultation=true"
                className="border border-gold text-gold py-4 px-8 font-bold text-lg hover:bg-gold/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                שיחת ייעוץ חינם
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Individual testimonial slide component
const TestimonialSlide: React.FC<{ testimonial: any }> = ({ testimonial }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="h-full flex items-center justify-center px-4">
      <motion.div 
        className="bg-charcoal-light/50 backdrop-blur-sm border border-gold/10 overflow-hidden max-w-4xl w-full grid md:grid-cols-2 gap-0"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Image side */}
        <div className="relative h-64 md:h-full bg-gradient-to-br from-gold/20 to-brown/20">
          {!imageError ? (
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto rounded-full bg-gold/20 flex items-center justify-center text-gold text-5xl font-bold mb-4">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="text-gold">{testimonial.name}</div>
              </div>
            </div>
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent md:bg-gradient-to-r" />
          
          {/* Rating stars - positioned over image */}
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className={`text-2xl ${i < testimonial.rating ? 'text-gold' : 'text-gray-600'}`}
                >
                  ★
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* Content side */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          {/* Quote icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gold/30 text-6xl font-serif mb-4"
          >
            &ldquo;
          </motion.div>

          {/* Testimonial text */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lightgrey text-lg md:text-xl leading-relaxed mb-6 italic"
          >
            {testimonial.text}
          </motion.blockquote>

          {/* Author info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="border-t border-gold/20 pt-6"
          >
            <h4 className="text-xl font-bold text-offwhite mb-1">
              {testimonial.name}
            </h4>
            <p className="text-gold mb-1">
              בוגר {testimonial.year} • {testimonial.course}
            </p>
            <p className="text-lightgrey/60 text-sm">
              מדריך: {testimonial.instructor}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default TestimonialsCarousel;