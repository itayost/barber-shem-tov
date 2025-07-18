// src/components/common/Hero.tsx - With Smooth Crossfade
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
  autoPlay?: boolean;
  crossfadeDuration?: number;
  intervalDuration?: number;
}

// Smooth cubic-bezier easing for better transitions
const smoothEasing = 'cubic-bezier(0.4, 0, 0.2, 1)';

export default function Hero({
  title,
  subtitle,
  backgroundImage,
  ctaText,
  ctaHref,
  className = '',
  autoPlay = true,
  crossfadeDuration = 2500, // 2.5 seconds for smoother crossfade
  intervalDuration = 6000, // 6 seconds between changes
}: HeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const images = Array.isArray(backgroundImage) ? backgroundImage : [backgroundImage];
  const hasMultipleImages = images.length > 1;

  // Initialize loaded state for all images
  useEffect(() => {
    setImagesLoaded(new Array(images.length).fill(false));
  }, [images.length]);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Preload all images on mount for smoother transitions
  useEffect(() => {
    images.forEach((src, index) => {
      const img = new window.Image();
      img.onload = () => {
        setImagesLoaded(prev => {
          const newLoaded = [...prev];
          newLoaded[index] = true;
          return newLoaded;
        });
      };
      img.src = src;
    });
  }, [images]);

  // Smooth crossfade transition function
  const transitionToNext = useCallback(() => {
    if (isTransitioning || !hasMultipleImages || !imagesLoaded[currentImageIndex]) return;
    
    const nextIndex = (currentImageIndex + 1) % images.length;
    
    // Only transition if next image is loaded
    if (imagesLoaded[nextIndex]) {
      setIsTransitioning(true);
      setNextImageIndex(nextIndex);
      
      // Complete transition after crossfade duration
      setTimeout(() => {
        setCurrentImageIndex(nextIndex);
        setIsTransitioning(false);
      }, crossfadeDuration);
    }
  }, [currentImageIndex, images.length, hasMultipleImages, isTransitioning, crossfadeDuration, imagesLoaded]);

  // Auto-advance with smooth crossfade
  useEffect(() => {
    if (!autoPlay || !hasMultipleImages || prefersReducedMotion) return;

    const interval = setInterval(transitionToNext, intervalDuration);
    return () => clearInterval(interval);
  }, [autoPlay, hasMultipleImages, intervalDuration, transitionToNext, prefersReducedMotion]);

  // Manual navigation
  const goToImage = useCallback((index: number) => {
    if (index === currentImageIndex || isTransitioning || !imagesLoaded[index]) return;
    
    setIsTransitioning(true);
    setNextImageIndex(index);
    
    setTimeout(() => {
      setCurrentImageIndex(index);
      setIsTransitioning(false);
    }, crossfadeDuration);
  }, [currentImageIndex, isTransitioning, crossfadeDuration, imagesLoaded]);

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
    <section
      id="hero-section"
      className={`relative min-h-[100svh] sm:min-h-screen w-full flex items-center justify-center overflow-hidden ${className}`}
      dir="rtl"
    >
      {/* Background Images with Crossfade */}
      <div className="absolute inset-0 z-0">
        {/* Current Image */}
        <div className="absolute inset-0">
          <Image
            src={images[currentImageIndex]}
            alt=""
            fill
            priority={currentImageIndex === 0}
            quality={isMobile ? 75 : 85}
            sizes="100vw"
            className="object-cover"
            style={{
              objectPosition: 'center',
            }}
          />
        </div>

        {/* Crossfading Next Image */}
        {hasMultipleImages && (
          <div 
            className="absolute inset-0 transition-opacity"
            style={{
              opacity: isTransitioning ? 1 : 0,
              transitionDuration: `${crossfadeDuration}ms`,
              transitionTimingFunction: smoothEasing,
              willChange: 'opacity',
              transform: 'translateZ(0)', // Force GPU acceleration
            }}
          >
            <Image
              src={images[nextImageIndex]}
              alt=""
              fill
              quality={isMobile ? 75 : 85}
              sizes="100vw"
              className="object-cover"
              style={{
                objectPosition: 'center',
              }}
            />
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      {/* Carousel Indicators */}
      {hasMultipleImages && (
        <div className="absolute bottom-20 sm:bottom-24 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              disabled={isTransitioning}
              className="relative p-3 -m-3 touch-manipulation disabled:opacity-50"
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

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 md:px-12 max-w-4xl mx-auto py-safe"
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

      {/* CSS for performance optimization */}
      <style jsx>{`
        /* Ensure smooth rendering */
        .transition-opacity {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
        }
      `}</style>
    </section>
  );
}