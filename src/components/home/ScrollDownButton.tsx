'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ScrollDownButtonProps {
  targetId: string;
  label?: string;
  showLabel?: boolean;
}

const ScrollDownButton: React.FC<ScrollDownButtonProps> = ({ 
  targetId,
  label = "גלה עוד",
  showLabel = false
}) => {
  const handleScroll = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Get the element's position relative to the viewport
      const rect = targetElement.getBoundingClientRect();
      
      // Calculate the absolute position by adding current scroll position
      const absoluteTop = rect.top + window.scrollY;
      
      // Smooth scroll to the target section
      window.scrollTo({
        top: absoluteTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <button 
      onClick={handleScroll}
      className="flex flex-col items-center cursor-pointer group focus:outline-none"
      aria-label={`גלול למטה אל ${targetId}`}
    >
      {showLabel && (
        <span className="text-small text-offwhite/80 mb-2 tracking-widest font-heebo group-hover:text-offwhite transition-colors">
          {label}
        </span>
      )}
      
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ 
          repeat: Infinity, 
          duration: 2, 
          ease: "easeInOut",
          repeatType: "loop"
        }}
        className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center group-hover:border-gold transition-colors duration-200"
      >
        <svg 
          className="w-5 h-5 text-gold group-hover:scale-110 transition-transform duration-200" 
          fill="none"
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
          />
        </svg>
      </motion.div>
    </button>
  );
};

export default ScrollDownButton;