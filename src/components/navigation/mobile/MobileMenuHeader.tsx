// src/components/navigation/mobile/MobileMenuHeader.tsx - Enhanced Version
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface MobileMenuHeaderProps {
  logo: {
    src: string;
    alt: string;
  };
  businessName: string;
  todayStatus: {
    isOpen: boolean;
    hours: string;
  };
  isCompact: boolean;
  onClose: () => void;
}

const MobileMenuHeader: React.FC<MobileMenuHeaderProps> = ({ 
  logo,
  todayStatus,
  isCompact,
  onClose
}) => {
  return (
    <div className="px-6 pb-4 border-b border-lightgrey/10">
      <div className="flex items-center justify-between">
        {/* Logo and Status */}
        <div className="flex items-center gap-3">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Image 
              src={logo.src}
              alt={logo.alt}
              width={isCompact ? 100 : 120}
              height={isCompact ? 25 : 30}
              className={`${isCompact ? 'h-7' : 'h-8'} w-auto object-contain`}
              priority
            />
          </motion.div>
          
          {/* Live Status Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <div className={`w-2 h-2 rounded-full ${todayStatus.isOpen ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
            <span className={`text-xs ${todayStatus.isOpen ? 'text-green-400' : 'text-red-400'}`}>
              {todayStatus.isOpen ? 'פתוח' : 'סגור'}
            </span>
          </motion.div>
        </div>

        {/* Close Button */}
        <motion.button 
          className="p-2 -mr-2 hover:bg-gold/10 rounded-full transition-colors"
          onClick={onClose}
          aria-label="סגור תפריט"
          whileHover={{ rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>
      </div>
      
      {/* Today's hours - shown when not compact */}
      {!isCompact && todayStatus && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ delay: 0.3 }}
          className="mt-2 text-xs text-lightgrey/70"
        >
          שעות פעילות היום: <span className="hebrew-nums">{todayStatus.hours}</span>
        </motion.div>
      )}
    </div>
  );
};

export default MobileMenuHeader;