// components/common/Hero.tsx - Fixed animation flashing
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
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  // Memoize images array to prevent useEffect dependency changes
  const images = useMemo(() => {
    return backgroundImages || (backgroundImage ? [backgroundImage] : []);
  }, [backgroundImage, backgroundImages]);
  
  const hasMultipleImages = images.length > 1;

  // Preload images to prevent flashing
  useEffect(() => {
    const imagePromises = images.map(src => {
      return new Promise((resolve, reject) => {
        const img = new window.Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    Promise.all(imagePromises)
      .then(() => setImagesLoaded(true))
      .catch(() => setImagesLoaded(true)); // Still show even if some fail
  }, [images]);

  // Auto-advance carousel
  useEffect(() => {
    if (!hasMultipleImages || !imagesLoaded) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [hasMultipleImages, images.length, imagesLoaded]);

  // Scroll handler
  const handleScrollDown = () => {
    const heroElement = document.getElementById('hero-section');
    if (heroElement) {
      const nextElement = heroElement.nextElementSibling;
      if (nextElement) {
        nextElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Simplified variants without conflicting animations
  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section 
      id="hero-section"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      dir="rtl"
    >
      {/* Background - Single div for all images to prevent flashing */}
      <div className="absolute inset-0 z-0">
        {imagesLoaded && images.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image}
              alt="Hero background"
              fill
              className="object-cover"
              priority={index === 0}
              quality={75}
              sizes="100vw"
            />
          </div>
        ))}
        
        {/* Dark overlay - always visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      {/* Image indicators */}
      {hasMultipleImages && imagesLoaded && (
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
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

      {/* Content - Only animate once */}
      <motion.div 
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        variants={contentVariants}
        initial="initial"
        animate="animate"
      >
        {/* Subtitle */}
        <motion.p 
          variants={itemVariants}
          className="text-gold text-lg md:text-xl mb-4 font-medium"
        >
          {subtitle}
        </motion.p>

        {/* Title */}
        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-offwhite mb-8 leading-tight"
        >
          {title}
        </motion.h1>

        {/* CTA Button */}
        {ctaText && ctaHref && (
          <motion.div 
            variants={itemVariants}
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
      </motion.div>

      {/* Scroll Down Button */}
      <motion.button
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
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
    </section>
  );
};

export default Hero;