// src/components/common/Hero.tsx - CSS Crossfade (Best Performance)
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/common/Button';

interface HeroProps {
  title: React.ReactNode;
  subtitle?: string;
  backgroundImage: string | string[];
  ctaText?: string;
  ctaHref?: string;
  className?: string;
  autoPlay?: boolean;
  crossfadeDuration?: number;
  intervalDuration?: number;
}

export default function Hero({
  title,
  subtitle,
  backgroundImage,
  ctaText,
  ctaHref,
  className = '',
  autoPlay = true,
  crossfadeDuration = 1500, // 1.5 seconds for smooth crossfade
  intervalDuration = 5000, // 5 seconds between changes
}: HeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set([0]));
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const images = Array.isArray(backgroundImage) ? backgroundImage : [backgroundImage];
  const hasMultipleImages = images.length > 1;

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Preload images
  useEffect(() => {
    images.forEach((src, index) => {
      if (index === 0) return; // First image is loaded via Next.js Image priority
      
      const img = new window.Image();
      img.onload = () => {
        setImagesLoaded(prev => new Set([...prev, index]));
      };
      img.src = src;
    });
  }, [images]);

  // Auto-advance images
  useEffect(() => {
    if (!autoPlay || !hasMultipleImages || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % images.length);
    }, intervalDuration);

    return () => clearInterval(interval);
  }, [autoPlay, hasMultipleImages, intervalDuration, images.length, prefersReducedMotion]);

  // Manual navigation
  const goToImage = useCallback((index: number) => {
    setCurrentImageIndex(index);
  }, []);

  const handleScrollDown = useCallback(() => {
    const nextSection = document.querySelector('#hero-section')?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Content animation variants
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

  return (
    <>
      {/* CSS for smooth crossfade */}
      <style jsx>{`
        .hero-image {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity ${crossfadeDuration}ms ease-in-out;
          will-change: opacity;
          transform: translateZ(0); /* Force GPU acceleration */
        }
        
        .hero-image.active {
          opacity: 1;
        }
        
        .hero-image.loaded {
          opacity: 0; /* Ready for transition */
        }
        
        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .hero-image {
            transition: none;
          }
        }
        
        /* Performance optimizations */
        .hero-background {
          contain: layout style;
          will-change: auto;
        }
      `}</style>

      <section
        id="hero-section"
        className={`relative min-h-[100svh] sm:min-h-screen w-full flex items-center justify-center overflow-hidden ${className}`}
        dir="rtl"
      >
        {/* Background Images with CSS Crossfade */}
        <div className="hero-background absolute inset-0 z-0">
          {images.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className={`hero-image ${
                index === currentImageIndex ? 'active' : ''
              } ${imagesLoaded.has(index) ? 'loaded' : ''}`}
            >
              <Image
                src={src}
                alt=""
                fill
                priority={index === 0} // Only first image has priority
                quality={isMobile ? 75 : 85}
                sizes="100vw"
                className="object-cover"
                style={{
                  objectPosition: 'center',
                }}
                onLoad={() => {
                  if (index !== 0) { // First image is handled by priority
                    setImagesLoaded(prev => new Set([...prev, index]));
                  }
                }}
              />
            </div>
          ))}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-10" />
        </div>

        {/* Carousel Indicators */}
        {hasMultipleImages && (
          <div className="absolute bottom-20 sm:bottom-24 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className="relative p-3 -m-3 touch-manipulation group"
                aria-label={`תמונה ${index + 1} מתוך ${images.length}`}
              >
                <span
                  className={`
                    block transition-all duration-300 rounded-full
                    ${
                      index === currentImageIndex
                        ? 'w-8 h-2 bg-gold shadow-lg shadow-gold/25'
                        : 'w-2 h-2 bg-gold/40 group-hover:bg-gold/60 group-hover:scale-125'
                    }
                  `}
                />
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <motion.div
          className="relative z-20 text-center px-4 sm:px-6 md:px-12 max-w-4xl mx-auto py-safe"
          variants={prefersReducedMotion ? {} : containerVariants}
          initial={prefersReducedMotion ? {} : 'hidden'}
          animate={prefersReducedMotion ? {} : 'visible'}
        >
          {/* Subtitle */}
          {subtitle && (
            <motion.p
              variants={prefersReducedMotion ? {} : itemVariants}
              className="text-gold text-sm sm:text-base md:text-lg lg:text-xl mb-3 sm:mb-4 tracking-wider uppercase"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Title with optimized responsive sizing */}
          <motion.h1
            variants={prefersReducedMotion ? {} : itemVariants}
            className="font-thin text-offwhite mb-6 sm:mb-8 leading-tight"
            style={{ 
              fontSize: 'clamp(1.875rem, 8vw, 4.5rem)',
              letterSpacing: '-0.025em'
            }}
          >
            {title}
          </motion.h1>

          {/* CTA Button */}
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

        {/* Scroll Indicator */}
        <motion.button
          className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 p-2 -m-2 touch-manipulation group"
          onClick={handleScrollDown}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={prefersReducedMotion ? {} : { delay: 1, duration: 0.8 }}
          aria-label="גלול למטה"
        >
          <motion.div
            className="w-12 h-12 rounded-full border-2 border-gold/50 flex items-center justify-center group-hover:border-gold group-active:border-gold transition-colors duration-300 group-hover:shadow-lg group-hover:shadow-gold/25"
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
    </>
  );
}