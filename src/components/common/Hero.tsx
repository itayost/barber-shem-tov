// src/components/common/OptimizedHero.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

interface OptimizedHeroProps {
  title: React.ReactNode;
  subtitle?: string;
  backgroundImage: string | string[];
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

// Client-side animations component - loads after LCP
function DeferredAnimations({ 
  children, 
  delay = 500 
}: { 
  children: React.ReactNode;
  delay?: number;
}) {
  const [showAnimations, setShowAnimations] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimations(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!showAnimations) return <>{children}</>;

  // Dynamically import framer-motion only when needed
  const [MotionDiv, setMotionDiv] = useState<any>(null);

  useEffect(() => {
    if (showAnimations) {
      import('framer-motion').then((mod) => {
        setMotionDiv(() => mod.motion.div);
      });
    }
  }, [showAnimations]);

  if (!MotionDiv) return <>{children}</>;

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </MotionDiv>
  );
}

export default function OptimizedHero({
  title,
  subtitle,
  backgroundImage,
  ctaText,
  ctaHref,
  className = '',
}: OptimizedHeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const images = Array.isArray(backgroundImage) ? backgroundImage : [backgroundImage];
  const hasMultipleImages = images.length > 1;

  // Auto-rotate images if multiple
  useEffect(() => {
    if (hasMultipleImages && imagesLoaded) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [images.length, hasMultipleImages, imagesLoaded]);

  const handleScrollDown = useCallback(() => {
    const nextSection = document.querySelector('#hero-section')?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section
      id="hero-section"
      className={`hero-section-critical ${className}`}
      dir="rtl"
    >
      {/* Background Image - Optimized for LCP */}
      <div className="hero-bg-critical">
        <Image
          src={images[currentImageIndex]}
          alt=""
          fill
          priority={currentImageIndex === 0} // Only first image is priority
          quality={85}
          sizes="100vw"
          onLoad={() => currentImageIndex === 0 && setImagesLoaded(true)}
          style={{
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
        
        {/* Load additional images after LCP */}
        {hasMultipleImages && imagesLoaded && images.slice(1).map((image, index) => (
          <Image
            key={image}
            src={image}
            alt=""
            fill
            quality={75}
            sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              opacity: currentImageIndex === index + 1 ? 1 : 0,
              transition: 'opacity 1s ease-in-out'
            }}
          />
        ))}
        
        <div className="hero-overlay-critical" />
      </div>

      {/* Critical content without animations initially */}
      <div className="hero-content-critical">
        {subtitle && (
          <p className="text-gold text-sm sm:text-base md:text-lg lg:text-xl mb-3 sm:mb-4 tracking-wider uppercase">
            {subtitle}
          </p>
        )}

        {/* Critical heading with inline styles for LCP */}
        <h1 className="hero-heading-critical">
          {title}
        </h1>

        {/* CTA Button */}
        {ctaText && ctaHref && (
          <div className="mb-12 sm:mb-16">
            <Button
              href={ctaHref}
              variant="primary"
              size="large"
              className="min-w-0 w-full sm:w-auto sm:min-w-0 px-8 sm:px-12"
            >
              {ctaText}
            </Button>
          </div>
        )}

        {/* Defer scroll indicator and carousel controls */}
        <DeferredAnimations delay={1000}>
          {/* Scroll indicator */}
          <button
            className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10 p-2 -m-2 touch-manipulation"
            onClick={handleScrollDown}
            aria-label="גלול למטה"
          >
            <div className="w-12 h-12 rounded-full border-2 border-gold/50 flex items-center justify-center hover:border-gold active:border-gold transition-colors duration-300">
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
            </div>
          </button>

          {/* Carousel indicators for multiple images */}
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
        </DeferredAnimations>
      </div>
    </section>
  );
}