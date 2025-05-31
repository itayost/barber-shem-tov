// components/home/Hero.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Button from '@/components/common/Button';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const [scrollY, setScrollY] = useState(0);

  // Array of background images
  const backgroundImagePaths = [
    "/images/hero/homeHero1.jpg", 
    "/images/hero/homeHero2.jpg", 
    "/images/hero/homeHero3.jpg",
  ];

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    backgroundImagePaths.forEach((imagePath) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        setLoadedImages(prev => [...prev, imagePath]);
        if (loadedCount === backgroundImagePaths.length) {
          setIsLoaded(true);
        }
      };
      img.src = imagePath;
    });
  }, []);

  // Auto-advance slides
  useEffect(() => {
    if (!isLoaded) return;
    
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % backgroundImagePaths.length
      );
    }, 6000);

    return () => clearInterval(intervalId);
  }, [backgroundImagePaths.length, isLoaded]);

  const currentImagePath = backgroundImagePaths[currentImageIndex];
  const isCurrentImageLoaded = loadedImages.includes(currentImagePath);

  // Calculate if hero should be hidden (scrolled past viewport height)
  const shouldHideHero = scrollY > window.innerHeight * 0.8;

  // Simple fade animation variants
  const imageVariants = {
    enter: { opacity: 0 },
    center: {
      opacity: 1,
      transition: { opacity: { duration: 2, ease: "easeInOut" } }
    },
    exit: {
      opacity: 0,
      transition: { opacity: { duration: 2, ease: "easeInOut" } }
    }
  };

  // Content animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  return (
    <>
      {/* Fixed Hero Section - hides when scrolled */}
      <section 
        className={`fixed inset-0 h-[100dvh] flex flex-col overflow-hidden bg-charcoal transition-all duration-500 ${
          shouldHideHero ? 'opacity-0 pointer-events-none -z-10' : 'opacity-100 z-0'
        }`}
        dir="rtl"
      >
        {/* Background images with fade transitions */}
        <div className="absolute inset-0">
          <AnimatePresence>
            {isCurrentImageLoaded && (
              <motion.div
                key={currentImageIndex}
                className="absolute inset-0 h-full w-full"
                initial="enter"
                animate="center"
                exit="exit"
                variants={imageVariants}
              >
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${currentImagePath})`,
                    backgroundPosition: 'center center',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80 sm:from-black/50 sm:via-black/40 sm:to-black/60" />
        </div>
        
        {/* Main content */}
        <div className="flex-1 flex items-end pb-24 sm:pb-32 px-5 sm:px-8 lg:px-12">
          <motion.div 
            className="w-full relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            <div className="flex flex-col items-center text-center">
              <motion.h1 
                variants={itemVariants}
                className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-offwhite mb-3 sm:mb-4 md:mb-6 leading-[1.2] sm:leading-tight"
              >
                צור את העתיד שלך<br />
                <span className="text-gold">כאמן ספרות מוביל</span>
              </motion.h1>
              
              <motion.p 
                variants={itemVariants}
                className="text-lightgrey text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-8 md:mb-10 max-w-lg md:max-w-xl lg:max-w-2xl leading-[1.6] sm:leading-relaxed px-2 sm:px-0"
              >
                תוכנית הכשרה מקיפה ברמה בינלאומית
                <span className="hidden sm:inline"> עם התמחות בטכניקות פרימיום</span>
              </motion.p>
              
              <motion.div 
                variants={itemVariants}
                className="w-full px-2 sm:px-0 max-w-[280px] sm:max-w-xs md:max-w-sm"
              >
                <Button 
                  href="/courses" 
                  variant="primary"
                  className="w-full font-bold text-sm sm:text-base"
                  size="large"
                >
                  הרשמה לקורס
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Animated scroll indicator */}
        <motion.div 
          className="relative z-10 pb-6 sm:pb-8 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <button className="flex flex-col items-center cursor-pointer group">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ 
                repeat: Infinity, 
                duration: 2, 
                ease: "easeInOut"
              }}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gold/50 flex items-center justify-center group-hover:border-gold transition-colors duration-300"
            >
              <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
            </motion.div>
          </button>
        </motion.div>
      </section>

      {/* Spacer to push content down */}
      <div className="h-[100dvh]" />
    </>
  );
};

export default Hero;