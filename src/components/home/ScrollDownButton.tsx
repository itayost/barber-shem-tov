"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface ScrollDownButtonProps {
  targetId?: string;
  label?: string;
}

const ScrollDownButton: React.FC<ScrollDownButtonProps> = ({ 
  targetId = "introduction",
  label = "גלה עוד"
}) => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Get the element's position relative to the viewport
      const rect = targetElement.getBoundingClientRect();
      
      // Calculate the absolute position by adding current scroll position
      const absoluteTop = rect.top + window.pageYOffset;
      
      // Smooth scroll to the target section
      window.scrollTo({
        top: absoluteTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.a 
      href={`#${targetId}`}
      onClick={handleScroll}
      animate={{ y: [0, 8, 0] }}
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      className="flex flex-col items-center cursor-pointer group"
      aria-label={`Scroll down to ${targetId} section`}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="#C9A66B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className="text-sm text-offwhite/80 mt-2 tracking-widest font-heebo group-hover:text-offwhite transition-colors">
        {label}
      </span>
    </motion.a>
  );
};

export default ScrollDownButton;