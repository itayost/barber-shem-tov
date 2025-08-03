// src/components/home/TestimonialsCarousel.tsx - Mobile-First Animations
'use client';

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import LuxuryCarousel from '@/components/common/LuxuryCarousel';
import Button from '@/components/common/Button';
import { academyTestimonials } from '@/lib/data';

const TestimonialsCarousel: React.FC = () => {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Detect mobile for animation optimization
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile-first animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: isMobile ? 0.98 : 0.95, // Smaller scale change on mobile
      y: isMobile ? 10 : 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.3 : 0.5,
        ease: 'easeOut',
      },
    },
  };

  const starVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: isMobile ? 0.05 * i : 0.1 * i, // Faster on mobile
        duration: isMobile ? 0.2 : 0.3,
        ease: 'easeOut',
      },
    }),
  };

  // Create slide components for each testimonial
  const testimonialSlides = academyTestimonials.map(testimonial => (
    <div key={testimonial.id} className="px-4 sm:px-6">
      <div className="max-w-full sm:max-w-sm md:max-w-4xl mx-auto">
        <motion.div
          className="bg-charcoal-light/30 backdrop-blur-sm border border-gold/20 overflow-hidden"
          variants={prefersReducedMotion ? {} : cardVariants}
          initial={prefersReducedMotion ? {} : 'hidden'}
          animate={prefersReducedMotion ? {} : 'visible'}
        >
          {/* Mobile-first: Stack vertically, then side-by-side on desktop */}
          <div className="flex flex-col md:grid md:grid-cols-2">
            {/* Image section - Mobile-first sizing */}
            <div className="relative h-64 sm:h-72 md:h-full bg-gradient-to-br from-gold/20 to-transparent">
              {!imageErrors[testimonial.id] ? (
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 400px"
                  priority={false}
                  quality={isMobile ? 60 : 75}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEFBxGRsf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R7w="
                  onError={() => setImageErrors(prev => ({ ...prev, [testimonial.id]: true }))}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mx-auto rounded-full bg-gold/20 flex items-center justify-center text-gold text-3xl sm:text-4xl md:text-5xl font-thin">
                      {testimonial.name.charAt(0)}
                    </div>
                  </div>
                </div>
              )}

              {/* Gradient overlay - mobile-first direction */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent md:bg-gradient-to-r" />

              {/* Rating stars - Mobile-first animations */}
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={prefersReducedMotion ? {} : starVariants}
                      initial={prefersReducedMotion ? {} : 'hidden'}
                      animate={prefersReducedMotion ? {} : 'visible'}
                      className={`text-base sm:text-lg md:text-xl ${i < testimonial.rating ? 'text-gold' : 'text-gray-600/50'}`}
                    >
                      ★
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            {/* Content section - Mobile optimized */}
            <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
              {/* Quote icon - Mobile-first sizing */}
              <motion.div
                className="text-gold/20 text-5xl sm:text-6xl md:text-8xl font-serif leading-none mb-3 sm:mb-4 md:mb-6"
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                transition={{ duration: isMobile ? 0.3 : 0.6, delay: isMobile ? 0.1 : 0.2 }}
              >
                &ldquo;
              </motion.div>

              {/* Testimonial text - Mobile-first typography */}
              <motion.blockquote
                className="text-lightgrey/90 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 italic font-light"
                initial={prefersReducedMotion ? {} : { opacity: 0 }}
                animate={prefersReducedMotion ? {} : { opacity: 1 }}
                transition={{ duration: isMobile ? 0.4 : 0.6, delay: isMobile ? 0.2 : 0.3 }}
              >
                {testimonial.text}
              </motion.blockquote>

              {/* Author info - Mobile-first spacing */}
              <motion.div
                className="border-t border-gold/20 pt-4 sm:pt-5 md:pt-6"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: isMobile ? 0.3 : 0.5, delay: isMobile ? 0.3 : 0.4 }}
              >
                <h4 className="text-base sm:text-lg md:text-xl font-light text-offwhite mb-1">
                  {testimonial.name}
                </h4>
                <p className="text-xs sm:text-sm tracking-wider text-gold/80 mb-0.5">
                  {testimonial.course} • {testimonial.year}
                </p>
                <p className="text-[10px] sm:text-xs text-lightgrey/50 tracking-wide">
                  {testimonial.instructor}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  ));

  // Mobile-first header animations
  const headerLineVariants = {
    hidden: { width: 0 },
    visible: {
      width: isMobile ? '40px' : '60px',
      transition: {
        duration: isMobile ? 0.5 : 1,
        ease: 'easeOut',
      },
    },
  };

  const headerTextVariants = {
    hidden: { opacity: 0, y: isMobile ? 10 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.3 : 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative bg-gradient-to-b from-charcoal to-black overflow-hidden" dir="rtl">
      {/* Subtle background pattern - less prominent on mobile */}
      <div className={`absolute inset-0 ${isMobile ? 'opacity-[0.005]' : 'opacity-[0.01]'}`}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, #C9A66B 1px, transparent 1px)`,
            backgroundSize: isMobile ? '80px 80px' : '50px 50px',
          }}
        />
      </div>

      {/* Ambient light - smaller on mobile */}
      {!isMobile && (
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-[150px]" />
        </div>
      )}

      <div className="relative z-10">
        {/* Section header - Mobile-first spacing */}
        <div className="text-center py-12 sm:py-16 md:py-20">
          <motion.div
            variants={prefersReducedMotion ? {} : headerLineVariants}
            initial={prefersReducedMotion ? {} : 'hidden'}
            animate={prefersReducedMotion ? {} : 'visible'}
            className="h-px bg-gold mx-auto mb-4 sm:mb-6 md:mb-8 sm:w-20 md:w-24"
          />

          <motion.h2
            variants={prefersReducedMotion ? {} : headerTextVariants}
            initial={prefersReducedMotion ? {} : 'hidden'}
            animate={prefersReducedMotion ? {} : 'visible'}
            className="text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] text-gold mb-2 sm:mb-3 md:mb-4 uppercase"
          >
            TESTIMONIALS
          </motion.h2>

          <motion.h1
            variants={prefersReducedMotion ? {} : headerTextVariants}
            initial={prefersReducedMotion ? {} : 'hidden'}
            animate={prefersReducedMotion ? {} : 'visible'}
            transition={{ delay: isMobile ? 0.1 : 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-thin"
          >
            <span className="block">סיפורי</span>
            <span className="block text-gold italic font-serif">הצלחה</span>
          </motion.h1>
        </div>

        {/* Luxury Carousel */}
        <LuxuryCarousel
          slides={testimonialSlides}
          variant="minimal"
          showDots={true}
          autoPlayInterval={isMobile ? 8000 : 6000} // Slower on mobile
          height="auto"
          className="pb-0"
        />

        {/* CTA Section - Mobile-first animations */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: isMobile ? 15 : 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: isMobile ? '-50px' : '-100px' }}
          transition={{ duration: isMobile ? 0.4 : 0.6, delay: isMobile ? 0.1 : 0.3 }}
          className="px-4 sm:px-6 py-12 sm:py-16 md:py-20"
        >
          <div className="max-w-full sm:max-w-sm md:max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gold/5 to-transparent backdrop-blur-sm border border-gold/20 p-6 sm:p-8 md:p-12 text-center">
              {/* Decorative line */}
              <div className="w-8 sm:w-10 md:w-12 h-px bg-gold mx-auto mb-4 sm:mb-6" />

              <h3 className="text-xl sm:text-2xl md:text-3xl font-thin mb-2 sm:mb-3 md:mb-4">
                רוצה להיות <span className="text-gold italic font-serif">הסיפור הבא</span>?
              </h3>

              <p className="text-lightgrey/80 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 font-light max-w-md mx-auto">
                הצטרף למאות הבוגרים המצליחים שלנו
              </p>

              {/* CTA Button - Mobile-first sizing */}
              <motion.div
                whileHover={!isMobile ? { scale: 1.02 } : {}}
                whileTap={{ scale: 0.98 }}
                className="inline-block"
              >
                <Button
                  href="/apply"
                  variant="primary"
                  size="large"
                  className="w-full sm:w-auto min-w-0 sm:min-w-[200px] font-light tracking-wider"
                >
                  הרשמה לקורס
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
