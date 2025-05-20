'use client';

import React, { useEffect, useState, useCallback } from 'react';
import HeroContent from './HeroContent';
import ScrollDownButton from './ScrollDownButton';
import { academyInfo } from '@/lib/data';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  // Memoize scroll handler to prevent unnecessary re-renders
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);
  
  useEffect(() => {
    setIsLoaded(true);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
  
  // Calculate opacity based on scroll position
  const heroOpacity = Math.max(1 - scrollY / 500, 0);
  const scrollButtonOpacity = Math.max(1 - scrollY / 250, 0);
  
  // Primary image path
  const heroImagePath = "/images/academy-classroom.jpg";
  
  return (
    <section 
      className="relative min-h-screen flex flex-col overflow-hidden bg-charcoal"
      dir="rtl"
    >
      {/* Background image with simple overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: heroOpacity,
          transition: 'opacity 0.3s ease'
        }}
      >
        {/* Primary background image */}
        <div 
          className="h-full w-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${heroImagePath})`, 
            backgroundPosition: 'center 25%'
          }}
          aria-hidden="true"
        />
        
        {/* Clean gradient overlay using variables from globals.css */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/75"
          aria-hidden="true"
        ></div>
      </div>
      
      {/* Main content container with flex centering */}
      <div className="flex-1 flex items-center">
        {/* Main content with proper top padding */}
        <div 
          className="w-full relative z-10 pt-20 sm:pt-24 md:pt-28" 
          style={{ 
            opacity: heroOpacity,
            transition: 'opacity 0.3s ease'
          }}
        >
          <HeroContent isLoaded={isLoaded} />
        </div>
      </div>
      
      {/* Scroll down button - positioned at bottom center */}
      <div 
        className="relative z-10 pb-8 flex justify-center mb-4"
        style={{ 
          opacity: scrollButtonOpacity,
          transition: 'opacity 0.3s ease'
        }}
      >
        <ScrollDownButton targetId="introduction" />
      </div>
    </section>
  );
};

export default Hero;