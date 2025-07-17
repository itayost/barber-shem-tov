// components/common/Hero.tsx - Mobile-First Luxury Edition
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/common/Button';

interface HeroProps {
  title: string | React.ReactNode;
  subtitle: string;
  backgroundImage?: string;
  backgroundImages?: string[];
  ctaText?: string;
  ctaHref?: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  backgroundImage,
  backgroundImages,
  ctaText,
  ctaHref,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const images = backgroundImages || (backgroundImage ? [backgroundImage] : []);
  const hasMultipleImages = images.length > 1;

  // Detect mobile and motion preferences
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    const checkMotion = () =>
      setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    checkMobile();
    checkMotion();

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-advance carousel with reduced motion support
  useEffect(() => {
    if (!hasMultipleImages || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [hasMultipleImages, images.length, prefersReducedMotion]);

  const handleScrollDown = () => {
    const heroElement = document.getElementById('hero-section');
    if (heroElement) {
      const nextElement = heroElement.nextElementSibling;
      if (nextElement) {
        nextElement.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      }
    }
  };

  // Mobile-optimized animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.2,
        delayChildren: isMobile ? 0.1 : 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: isMobile ? 20 : 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.4 : 0.8,
        ease: 'easeOut',
      },
    },
  };

  // Simplified image transitions for mobile
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
      className="relative min-h-[100svh] sm:min-h-screen w-full flex items-center justify-center overflow-hidden"
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
              className="object-cover"
              priority={currentImageIndex === 0}
              quality={isMobile ? 60 : 75}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
              loading={currentImageIndex === 0 ? 'eager' : 'lazy'}
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

        {/* Mobile-first title with proper font weight */}
        <motion.h1
          variants={prefersReducedMotion ? {} : itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-thin text-offwhite mb-6 sm:mb-8 leading-tight"
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
          whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-gold"
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
};

export default Hero;
