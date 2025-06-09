// src/components/navigation/mobile/MobileMenuHeader.tsx
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
}

const MobileMenuHeader: React.FC<MobileMenuHeaderProps> = ({ 
  logo,
  todayStatus,
  isCompact
}) => {
  return (
    <div className="flex flex-col items-center w-full px-6 py-4">
      {/* Logo and status */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
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
  );
};

export default MobileMenuHeader;