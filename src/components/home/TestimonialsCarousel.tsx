// src/components/home/TestimonialsCarousel.tsx - Grid on Desktop, Carousel on Mobile
'use client';

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import LuxuryCarousel from '@/components/common/LuxuryCarousel';
import Button from '@/components/common/Button';
import { academyTestimonials } from '@/lib/data';

const TestimonialsCarousel: React.FC = () => {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [isMobile, setIsMobile] = useState(true);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Detect screen size for responsive layout
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsLargeScreen(width >= 1024);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Animation variants for desktop grid
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

  const starVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.05 * i,
        duration: 0.2,
        ease: 'easeOut',
      },
    }),
  };

  // Single testimonial card component
  const TestimonialCard = ({ testimonial, index }: { testimonial: any, index: number }) => {
    const animationDelay = isMobile ? index : index % (isLargeScreen ? 3 : 2);
    
    return (
      <motion.div
        className="bg-charcoal-light/30 backdrop-blur-sm border border-gold/20 overflow-hidden h-full"
        variants={prefersReducedMotion || isMobile ? {} : cardVariants}
        custom={animationDelay}
        initial={prefersReducedMotion || isMobile ? {} : 'hidden'}
        whileInView={prefersReducedMotion || isMobile ? {} : 'visible'}
        viewport={{ once: true, margin: '-50px' }}
      >
      <div className="flex flex-col h-full">
        {/* Image section */}
        <div className="relative h-64 sm:h-72 md:h-80 bg-gradient-to-br from-charcoal-light to-charcoal">
          {!imageErrors[testimonial.id] ? (
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-contain p-4"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={false}
              quality={75}
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEFBxGRsf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQDRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R7w="
              onError={() => setImageErrors(prev => ({ ...prev, [testimonial.id]: true }))}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-gold/20 flex items-center justify-center text-gold text-3xl font-thin">
                  {testimonial.name.charAt(0)}
                </div>
              </div>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />

          {/* Rating stars */}
          <div className="absolute bottom-4 left-0 right-0 text-center z-10">
            <div className="flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={prefersReducedMotion ? {} : starVariants}
                  initial={prefersReducedMotion ? {} : 'hidden'}
                  animate={prefersReducedMotion ? {} : 'visible'}
                  className={`text-base ${i < testimonial.rating ? 'text-gold' : 'text-gray-600/50'}`}
                >
                  ★
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="p-6 md:p-8 flex flex-col flex-grow">
          {/* Quote icon */}
          <div className="text-gold/20 text-5xl font-serif leading-none mb-4">
            &ldquo;
          </div>

          {/* Testimonial text */}
          <blockquote className="text-lightgrey/90 text-sm md:text-base leading-relaxed mb-6 italic font-light flex-grow">
            {testimonial.text}
          </blockquote>

          {/* Author info */}
          <div className="border-t border-gold/20 pt-4 mt-auto">
            <h4 className="text-base font-light text-offwhite mb-1">
              {testimonial.name}
            </h4>
            <p className="text-xs tracking-wider text-gold/80 mb-0.5">
              {testimonial.course} • {testimonial.year}
            </p>
            <p className="text-[10px] text-lightgrey/50 tracking-wide">
              {testimonial.instructor}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
  };

  // Create carousel slides - single cards on mobile, grouped on desktop
  const cardsPerSlide = isMobile ? 1 : isLargeScreen ? 3 : 2;
  
  const testimonialSlides = isMobile 
    ? academyTestimonials.map((testimonial, index) => (
        <div key={testimonial.id} className="px-4">
          <TestimonialCard testimonial={testimonial} index={index} />
        </div>
      ))
    : // Desktop: Group testimonials into slides
      Array.from({ length: Math.ceil(academyTestimonials.length / cardsPerSlide) }, (_, slideIndex) => (
        <div key={slideIndex} className="px-6 md:px-8 lg:px-12">
          <div className={`grid ${isLargeScreen ? 'grid-cols-3' : 'grid-cols-2'} gap-6`}>
            {academyTestimonials
              .slice(slideIndex * cardsPerSlide, slideIndex * cardsPerSlide + cardsPerSlide)
              .map((testimonial, index) => (
                <TestimonialCard 
                  key={testimonial.id} 
                  testimonial={testimonial} 
                  index={slideIndex * cardsPerSlide + index} 
                />
              ))}
          </div>
        </div>
      ));

  // Header animations
  const headerLineVariants = {
    hidden: { width: 0 },
    visible: {
      width: '60px',
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
  };

  const headerTextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative bg-gradient-to-b from-charcoal to-black overflow-hidden" dir="rtl">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.01]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, #C9A66B 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Ambient light */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10">
        {/* Section header */}
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
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-thin"
          >
            <span className="block">סיפורי</span>
            <span className="block text-gold italic font-serif">הצלחה</span>
          </motion.h1>
        </div>

        {/* Carousel for both mobile and desktop */}
        <LuxuryCarousel
          slides={testimonialSlides}
          variant="minimal"
          showDots={true}
          autoPlayInterval={isMobile ? 8000 : 6000}
          height="auto"
          className="pb-0"
        />

        {/* CTA Section */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
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

              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
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