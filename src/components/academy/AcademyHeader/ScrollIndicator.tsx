// src/components/academy/AcademyHeader/ScrollIndicator.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ScrollIndicatorProps {
  scrollY: number;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ scrollY }) => {
  return (
    <motion.div 
      className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      style={{ opacity: Math.max(1 - scrollY / 150, 0) }}
    >
      <span className="text-sm text-lightgrey mb-2">גלול למטה</span>
      <motion.div 
        className="w-6 h-10 border-2 border-lightgrey/30 rounded-full flex items-center justify-center"
        animate={{ y: [0, 4, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <motion.div 
          className="w-1.5 h-3 bg-gold rounded-full"
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ScrollIndicator;