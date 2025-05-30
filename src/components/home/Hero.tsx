// src/components/home/Hero.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HeroContent from './HeroContent';
import ScrollDownButton from './ScrollDownButton';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  // Primary image path
  const heroImagePath = "/images/academy-background.jpg";
  
  return (
    <section 
      className="relative h-[100dvh] flex flex-col overflow-hidden bg-charcoal"
      dir="rtl"
    >
      {/* Background image with overlay - Mobile optimized */}
      <div className="absolute inset-0 z-0">
        {/* Primary background image */}
        <div 
          className="h-full w-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${heroImagePath})`, 
            backgroundPosition: 'center center'
          }}
          aria-hidden="true"
        />
        
        {/* Gradient overlay - Stronger on mobile for readability */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80 sm:from-black/60 sm:via-black/50 sm:to-black/70"
          aria-hidden="true"
        />
      </div>
      
      {/* Main content container */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 pt-16">
        {/* Hero content - Adjusted padding */}
        <div className="w-full relative z-10">
          <HeroContent isLoaded={isLoaded} />
        </div>
      </div>
      
      {/* Scroll down button */}
      <div className="relative z-10 pb-4 sm:pb-6 flex justify-center">
        <ScrollDownButton targetId="three-pathways" />
      </div>
    </section>
  );
};

export default Hero;