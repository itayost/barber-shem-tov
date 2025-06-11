// components/common/Hero.tsx - Restored with Framer Motion
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
  ctaHref
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = backgroundImages || (backgroundImage ? [backgroundImage] : []);
  const hasMultipleImages = images.length > 1;

  // Auto-advance carousel
  useEffect(() => {
    if (!hasMultipleImages) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [hasMultipleImages, images.length]);

  const handleScrollDown = () => {
    const heroElement = document.getElementById('hero-section');
    if (heroElement) {
      const nextElement = heroElement.nextElementSibling;
      if (nextElement) {
        nextElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  // Image transition variants
  const imageVariants = {
    enter: { opacity: 0 },
    center: { 
      opacity: 1,
      transition: { duration: 1.5, ease: "easeInOut" }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 1.5, ease: "easeInOut" }
    }
  };

  return (
    <section 
      id="hero-section"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      dir="rtl"
    >
      {/* Background Image(s) */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            className="absolute inset-0"
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <Image
              src={images[currentImageIndex]}
              alt="Hero background"
              fill
              className="object-cover"
              priority={currentImageIndex === 0}
              quality={75}
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      {/* Image indicators for carousel */}
      {hasMultipleImages && (
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

      {/* Content */}
      <motion.div 
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
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

        {/* CTA Button (optional) */}
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