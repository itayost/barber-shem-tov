// src/components/common/Hero.tsx - MINIMAL OPTIMIZATIONS
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import  Button  from '@/components/common/Button';

interface HeroProps {
  title: React.ReactNode;
  subtitle?: string;
  backgroundImage: string | string[];
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

export default function Hero({
  title,
  subtitle,
  backgroundImage,
  ctaText,
  ctaHref,
  className = '',
}: HeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const images = Array.isArray(backgroundImage) ? backgroundImage : [backgroundImage];
  const hasMultipleImages = images.length > 1;

  // Auto-rotate images if multiple
  useEffect(() => {
    if (hasMultipleImages) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [images.length, hasMultipleImages]);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleScrollDown = useCallback(() => {
    const nextSection = document.querySelector('#hero-section')?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: isMobile ? 20 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.4 : 0.8,
        ease: 'easeOut',
      },
    },
  };

  const imageVariants = {
    enter: { opacity: 0 },
    center: {
      opacity: 1,
      transition: {
        duration: isMobile || prefersReducedMotion ? 0.5 : 1.5,
        ease: 'easeInOut',
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: isMobile || prefersReducedMotion ? 0.5 : 1.5,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section
      id="hero-section"
      className={`relative min-h-[100svh] sm:min-h-screen w-full flex items-center justify-center overflow-hidden ${className}`}
      dir="rtl"
    >
      {/* Background Image(s) with mobile optimization */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            className="absolute inset-0"
            variants={prefersReducedMotion ? {} : imageVariants}
            initial={prefersReducedMotion ? {} : 'enter'}
            animate={prefersReducedMotion ? {} : 'center'}
            exit={prefersReducedMotion ? {} : 'exit'}
          >
            <Image
              src={images[currentImageIndex]}
              alt=""
              fill
              priority={currentImageIndex === 0} // OPTIMIZED: Priority for first image only
              quality={isMobile ? 75 : 85} // OPTIMIZED: Lower quality on mobile
              sizes="100vw"
              loading={currentImageIndex === 0 ? 'eager' : 'lazy'}
              style={{
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Optimized gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      {/* Touch-friendly carousel indicators */}
      {hasMultipleImages && (
        <div className="absolute bottom-20 sm:bottom-24 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className="relative p-3 -m-3 touch-manipulation"
              aria-label={`תמונה ${index + 1} מתוך ${images.length}`}
            >
              <span
                className={`
                  block transition-all duration-300 rounded-full
                  ${
                    index === currentImageIndex
                      ? 'w-8 h-2 bg-gold'
                      : 'w-2 h-2 bg-gold/40 hover:bg-gold/60'
                  }
                `}
              />
            </button>
          ))}
        </div>
      )}

      {/* Mobile-first content with proper spacing */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 md:px-12 max-w-4xl mx-auto py-safe"
        variants={prefersReducedMotion ? {} : containerVariants}
        initial={prefersReducedMotion ? {} : 'hidden'}
        animate={prefersReducedMotion ? {} : 'visible'}
      >
        {/* Mobile-first subtitle */}
        <motion.p
          variants={prefersReducedMotion ? {} : itemVariants}
          className="text-gold text-sm sm:text-base md:text-lg lg:text-xl mb-3 sm:mb-4 tracking-wider uppercase"
        >
          {subtitle}
        </motion.p>

        {/* OPTIMIZED: Simplified heading with clamp instead of multiple responsive classes */}
        <motion.h1
          variants={prefersReducedMotion ? {} : itemVariants}
          className="font-thin text-offwhite mb-6 sm:mb-8 leading-tight"
          style={{ 
            fontSize: 'clamp(1.875rem, 8vw, 4.5rem)', // OPTIMIZED: Single clamp instead of 5 breakpoints
            letterSpacing: '-0.025em'
          }}
        >
          {title}
        </motion.h1>

        {/* Touch-optimized CTA */}
        {ctaText && ctaHref && (
          <motion.div
            variants={prefersReducedMotion ? {} : itemVariants}
            className="mb-12 sm:mb-16"
          >
            <Button
              href={ctaHref}
              variant="primary"
              size="large"
              className="min-w-0 w-full sm:w-auto sm:min-w-0 px-8 sm:px-12"
            >
              {ctaText}
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Touch-friendly scroll indicator */}
      <motion.button
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10 p-2 -m-2 touch-manipulation"
        onClick={handleScrollDown}
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={prefersReducedMotion ? {} : { delay: 1, duration: 0.8 }}
        aria-label="גלול למטה"
      >
        <motion.div
          className="w-12 h-12 rounded-full border-2 border-gold/50 flex items-center justify-center hover:border-gold active:border-gold transition-colors duration-300"
          animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
          transition={
            prefersReducedMotion
              ? {}
              : {
                  repeat: Infinity,
                  duration: 2,
                  ease: 'easeInOut',
                }
          }
        >
          <svg
            className="w-4 h-4 text-gold"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.button>
    </section>
  );
}