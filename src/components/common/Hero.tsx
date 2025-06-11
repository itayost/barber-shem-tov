// components/common/Hero.tsx - CSS-only animations, no Framer Motion
'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
  const [isClient, setIsClient] = useState(false);
  
  const images = useMemo(() => {
    return backgroundImages || (backgroundImage ? [backgroundImage] : []);
  }, [backgroundImage, backgroundImages]);
  
  const hasMultipleImages = images.length > 1;

  // Only run on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    if (!hasMultipleImages || !isClient) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [hasMultipleImages, images.length, isClient]);

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
            key={`bg-${index}`}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
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
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-10" />
      </div>

      {/* Image indicators */}
      {hasMultipleImages && isClient && (
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
          {images.map((_, index) => (
            <button
              key={`ind-${index}`}
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

      {/* Content with CSS animations */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        {/* Subtitle */}
        <p className={`text-gold text-lg md:text-xl mb-4 font-medium ${
          isClient ? 'animate-fadeInUp animation-delay-200' : ''
        }`}>
          {subtitle}
        </p>

        {/* Title */}
        <h1 className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-offwhite mb-8 leading-tight ${
          isClient ? 'animate-fadeInUp animation-delay-300' : ''
        }`}>
          {title}
        </h1>

        {/* CTA Button */}
        {ctaText && ctaHref && (
          <div className={`mb-16 ${
            isClient ? 'animate-fadeInUp animation-delay-400' : ''
          }`}>
            <Button
              href={ctaHref}
              variant="primary"
              size="large"
              className="min-w-[200px]"
            >
              {ctaText}
            </Button>
          </div>
        )}
      </div>

      {/* Scroll Down Button */}
      {isClient && (
        <button
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-fadeIn animation-delay-1000"
          onClick={handleScrollDown}
          aria-label="גלול למטה"
        >
          <div className="w-12 h-12 rounded-full border-2 border-gold/50 flex items-center justify-center hover:border-gold transition-colors cursor-pointer animate-bounce">
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
          </div>
        </button>
      )}
    </section>
  );
};

export default Hero;