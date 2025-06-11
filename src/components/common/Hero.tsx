// components/common/Hero.tsx - Stable version without flashing
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
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
  ctaHref
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  // Memoize images array
  const images = useMemo(() => {
    return backgroundImages || (backgroundImage ? [backgroundImage] : []);
  }, [backgroundImage, backgroundImages]);
  
  const hasMultipleImages = images.length > 1;

  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    if (!hasMultipleImages || !mounted) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [hasMultipleImages, images.length, mounted]);

  const handleScrollDown = () => {
    const heroElement = document.getElementById('hero-section');
    if (heroElement) {
      const nextElement = heroElement.nextElementSibling;
      if (nextElement) {
        nextElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section 
      id="hero-section"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      dir="rtl"
    >
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {images.map((image, index) => (
          <div
            key={`hero-bg-${index}`}
            className="absolute inset-0"
            style={{
              opacity: index === currentImageIndex ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out'
            }}
          >
            <Image
              src={image}
              alt="Hero background"
              fill
              className="object-cover"
              priority={index === 0}
              quality={75}
              sizes="100vw"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-10" />
      </div>

      {/* Image indicators */}
      {hasMultipleImages && mounted && (
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
          {images.map((_, index) => (
            <button
              key={`indicator-${index}`}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-gold w-8' 
                  : 'bg-gold/40 hover:bg-gold/60'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        {/* Subtitle */}
        <motion.p 
          initial={mounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gold text-lg md:text-xl mb-4 font-medium"
        >
          {subtitle}
        </motion.p>

        {/* Title */}
        <motion.h1 
          initial={mounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-offwhite mb-8 leading-tight"
        >
          {title}
        </motion.h1>

        {/* CTA Button */}
        {ctaText && ctaHref && (
          <motion.div 
            initial={mounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <Button
              href={ctaHref}
              variant="primary"
              size="large"
              className="min-w-[200px]"
            >
              {ctaText}
            </Button>
          </motion.div>
        )}
      </div>

      {/* Scroll Down Button */}
      {mounted && (
        <motion.button
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          onClick={handleScrollDown}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          aria-label="גלול למטה"
        >
          <motion.div
            className="w-12 h-12 rounded-full border-2 border-gold/50 flex items-center justify-center hover:border-gold transition-colors cursor-pointer"
            animate={{ y: [0, 10, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 2, 
              ease: "easeInOut"
            }}
            whileHover={{ scale: 1.1 }}
          >
            <svg 
              className="w-6 h-6 text-gold" 
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
      )}
    </section>
  );
};

export default Hero;