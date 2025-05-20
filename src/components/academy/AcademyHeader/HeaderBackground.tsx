// src/components/academy/AcademyHeader/HeaderBackground.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HeaderBackgroundProps {
  scrollY: number;
}

const HeaderBackground: React.FC<HeaderBackgroundProps> = ({ scrollY }) => {
  return (
    <>
      {/* Parallax background with dynamic movement */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          transform: `translateY(${scrollY * 0.2}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="absolute inset-0 bg-charcoal bg-opacity-90"></div>
        <div 
          className="absolute inset-0 bg-[url('/images/academy-background.jpg')] bg-cover bg-center opacity-20"
          style={{
            transform: `translateY(${-scrollY * 0.1}px) scale(${1 + scrollY * 0.0005})`,
          }}
        ></div>
      </div>
      
      {/* Animated gold accents */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Abstract geometrical elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute top-20 left-1/4 w-[600px] h-[600px] border border-gold rounded-full opacity-10"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        ></motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] border border-gold rounded-full opacity-10"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        ></motion.div>
        
        {/* Diagonal gold bar */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gold/80 to-transparent transform -rotate-6 origin-left"
          style={{ transform: `translateY(${scrollY * 0.3}px) rotate(-6deg)` }}
        ></motion.div>
      </div>
    </>
  );
};

export default HeaderBackground;