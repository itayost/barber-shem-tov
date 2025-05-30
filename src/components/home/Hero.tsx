// src/components/home/Hero.tsx
'use client';

import React, { useEffect, useState } from 'react';
import HeroContent from './HeroContent';
import ScrollDownButton from './ScrollDownButton';
import { AnimatePresence, motion } from 'framer-motion'; // Import motion for transitions

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  // Array of background image paths
  const backgroundImagePaths = [
    "/images/hero/homeHero1.jpg", // Use your provided image paths
    "/images/hero/homeHero2.jpg", 
    "/images/hero/homeHero3.jpg",
  ];

  // Preload images
  useEffect(() => {
    backgroundImagePaths.forEach((imagePath) => {
      const img = new Image();
      img.onload = () => {
        setLoadedImages((prevLoadedImages) => [...prevLoadedImages, imagePath]);
      };
      img.src = imagePath;
    });
  }, [backgroundImagePaths]); // Preload all images when the component mounts or image paths change

  useEffect(() => {
    setIsLoaded(true);

    // Set interval to change background image every 5 seconds
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % backgroundImagePaths.length
      );
    }, 5000); // Change image every 5000 milliseconds (5 seconds)

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [backgroundImagePaths.length]); // Depend on array length to restart interval if images change
  
  const currentImagePath = backgroundImagePaths[currentImageIndex];
  const isCurrentImageLoaded = loadedImages.includes(currentImagePath);

  return (
    <section 
      className="relative h-[100dvh] flex flex-col overflow-hidden bg-charcoal"
      dir="rtl"
    >
      {/* Background images with overlay and transitions */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          {isCurrentImageLoaded && (
            <motion.div
              key={currentImageIndex}
              className="absolute inset-0 h-full w-full bg-cover bg-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 6 }}
              style={{
                backgroundImage: `url(${currentImagePath})`,
                backgroundPosition: 'center center',
              }}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>
        
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