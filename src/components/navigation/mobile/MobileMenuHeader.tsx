// src/components/navigation/mobile/MobileMenuHeader.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { menuAnimationPresets } from '@/styles';

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
    <div className="flex items-center justify-between w-full px-6 py-4">
      {/* Close button */}
      <motion.button 
        className="menu-close-btn"
        onClick={onClose}
        aria-label="סגור תפריט"
        {...menuAnimationPresets.rotateButton}
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </motion.button>

      {/* Logo and status */}
      <div className="flex flex-col items-center flex-1">
        <motion.div 
          {...menuAnimationPresets.scaleLogo}
          className={`${isCompact ? 'mb-1' : 'mb-2'}`}
        >
          <Image 
            src={logo.src}
            alt={logo.alt}
            width={isCompact ? 160 : 200}
            height={isCompact ? 40 : 50}
            className={`${isCompact ? 'h-10' : 'h-12'} w-auto object-contain`}
            priority
          />
        </motion.div>
        
        {/* Today's hours - shown when not compact */}
        {!isCompact && todayStatus && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-center"
          >
            <span className={todayStatus.isOpen ? 'text-gold' : 'text-lightgrey'}>
              {todayStatus.isOpen 
                ? `פתוח היום ${todayStatus.hours}` 
                : 'סגור היום'}
            </span>
          </motion.div>
        )}
      </div>

      {/* Spacer for balance */}
      <div className="w-12" />
    </div>
  );
};

export default MobileMenuHeader;