"use client";
import React, { useEffect, useState } from 'react';
import HeroContent from './HeroContent';
import ScrollDownButton from './ScrollDownButton';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate opacity based on scroll position
  const heroOpacity = Math.max(1 - scrollY / 500, 0);
  
  // Update the image path to reference the public directory
  const heroImagePath = "/images/hero-barbershop.jpg";

  return (
    <section 
      className="relative h-screen flex flex-col justify-between overflow-hidden"
      dir="rtl"
    >
      {/* Background image that stays fixed with fading overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: heroOpacity, // The background fades with scroll
          transition: 'opacity 0.3s ease'
        }}
      >
        <div 
          className="h-full w-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${heroImagePath})`, 
            backgroundPosition: 'center 25%'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
      </div>
      
      {/* Main content - fades with scroll */}
      <div 
        className="flex-1 flex items-center relative z-10"
        style={{ 
          opacity: heroOpacity,
          transition: 'opacity 0.3s ease'
        }}
      >
        <HeroContent isLoaded={isLoaded} />
      </div>
      
      {/* Scroll down button - fades faster than the rest */}
      <div 
        className="relative z-10 pb-6 flex justify-center"
        style={{ 
          opacity: Math.max(1 - scrollY / 250, 0), // Fades out faster
          transition: 'opacity 0.3s ease'
        }}
      >
        <ScrollDownButton targetId="introduction" />
      </div>
    </section>
  );
};

export default Hero;