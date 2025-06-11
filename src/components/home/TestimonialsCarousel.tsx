// src/components/home/TestimonialsCarousel.tsx - Using LuxuryCarousel
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import LuxuryCarousel from '@/components/common/LuxuryCarousel';
import Button from '@/components/common/Button';
import { academyTestimonials } from '@/lib/data';

const TestimonialsCarousel: React.FC = () => {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  // Create slide components for each testimonial
  const testimonialSlides = academyTestimonials.map((testimonial) => (
    <div key={testimonial.id} className="px-4">
      <div className="max-w-sm mx-auto md:max-w-4xl">
        <motion.div 
          className="bg-charcoal-light/30 backdrop-blur-sm border border-gold/20 overflow-hidden"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Mobile: Stack vertically, Desktop: Side by side */}
          <div className="flex flex-col md:grid md:grid-cols-2">
            {/* Image section - Mobile first sizing */}
            <div className="relative h-64 md:h-full bg-gradient-to-br from-gold/20 to-brown/10">
              {!imageErrors[testimonial.id] ? (
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={false} // Never prioritize testimonial images
                  quality={65} // Lower quality for testimonials
                  loading="lazy" // Always lazy load
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R7w="
                  onError={() => setImageErrors(prev => ({ ...prev, [testimonial.id]: true }))}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full bg-gold/20 flex items-center justify-center text-gold text-4xl md:text-5xl font-light">
                      {testimonial.name.charAt(0)}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent md:bg-gradient-to-r" />
              
              {/* Rating stars - Luxury style */}
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * i }}
                      className={`text-lg md:text-xl ${i < testimonial.rating ? 'text-gold' : 'text-gray-600/50'}`}
                    >
                      ★
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            {/* Content section - Mobile optimized */}
            <div className="p-6 md:p-10 flex flex-col justify-center">
              {/* Quote icon - Editorial style */}
              <div className="text-gold/20 text-6xl md:text-8xl font-serif leading-none mb-4 md:mb-6">
                &ldquo;
              </div>

              {/* Testimonial text */}
              <blockquote className="text-lightgrey/90 text-base md:text-lg leading-relaxed mb-6 md:mb-8 italic font-light">
                {testimonial.text}
              </blockquote>

              {/* Author info - Luxury minimal style */}
              <div className="border-t border-gold/20 pt-4 md:pt-6">
                <h4 className="text-lg md:text-xl font-light text-offwhite mb-1">
                  {testimonial.name}
                </h4>
                <p className="text-xs md:text-sm tracking-wider text-gold/80 mb-0.5">
                  {testimonial.course} • {testimonial.year}
                </p>
                <p className="text-xs text-lightgrey/50 tracking-wide">
                  {testimonial.instructor}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  ));

  return (
    <section className="relative bg-gradient-to-b from-charcoal to-black overflow-hidden" dir="rtl">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.01]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #C9A66B 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Ambient light */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10">
        {/* Section header - Luxury minimal */}
        <div className="text-center pt-12 pb-8 md:pt-20 md:pb-12">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '60px' }}
            transition={{ duration: 1 }}
            className="h-[1px] bg-gold mx-auto mb-6 md:mb-8 md:w-[100px]"
          />
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.25em] md:tracking-[0.3em] text-gold mb-3 md:mb-4"
          >
            TESTIMONIALS
          </motion.h2>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-light"
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
          autoPlayInterval={6000}
          height="auto"
          className="pb-0"
        />

        {/* CTA Section - Mobile optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="px-4 py-12 md:py-20"
        >
          <div className="max-w-sm mx-auto md:max-w-4xl">
            <div className="bg-gradient-to-br from-gold/5 to-transparent backdrop-blur-sm border border-gold/20 p-8 md:p-12 text-center">
              {/* Decorative line */}
              <div className="w-12 h-[1px] bg-gold mx-auto mb-6" />
              
              <h3 className="text-2xl md:text-3xl font-light mb-3 md:mb-4">
                רוצה להיות <span className="text-gold italic font-serif">הסיפור הבא</span>?
              </h3>
              
              <p className="text-lightgrey/80 text-base md:text-lg mb-8 font-light max-w-md mx-auto">
                הצטרף למאות הבוגרים המצליחים שלנו
              </p>
              
              {/* CTAs - Mobile stack, Desktop inline */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    href="/apply"
                    variant="primary"
                    size="large"
                    className="min-w-[200px] font-light tracking-wider"
                  >
                    הרשמה לקורס
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;