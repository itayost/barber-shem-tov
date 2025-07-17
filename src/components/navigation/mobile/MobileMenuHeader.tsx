// src/components/navigation/mobile/MobileMenuHeader.tsx - Without Open/Close Status
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
  isCompact: boolean;
  onClose: () => void;
}

const MobileMenuHeader: React.FC<MobileMenuHeaderProps> = ({ 
  logo,
  isCompact,
  onClose
}) => {
  return (
    <div className="px-6 pb-4 border-b border-lightgrey/10">
      <div className="flex items-center justify-between">
        {/* Logo Only */}
        <div className="flex items-center">
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
        </div>

        {/* Close Button - Improved Touch Target */}
        <motion.button 
          className="p-4 -mr-2 hover:bg-gold/10 rounded-full transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center"
          onClick={onClose}
          aria-label="סגור תפריט"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <svg className="w-7 h-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
};

export default MobileMenuHeader;