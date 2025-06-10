// src/components/navigation/mobile/MobileMenuFooter.tsx - Enhanced Version
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SocialLinks from '../SocialLinks';

interface MobileMenuFooterProps {
  stats?: {
    graduates: number;
    placementRate: number;
  };
  contact: {
    phone: string;
    email: string;
  };
  social: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
  established: number;
  businessName: string;
  isCompact?: boolean;
}

const MobileMenuFooter: React.FC<MobileMenuFooterProps> = ({
  contact,
  social,
  businessName,
  isCompact = false
}) => {
  return (
    <motion.div 
      className={`space-y-4 ${isCompact ? 'space-y-3' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    > 
      {/* Contact Info - Streamlined */}
      <div className="flex items-center justify-between px-4 py-3 bg-gold/5 rounded-xl">
        <a 
          href={`tel:${contact.phone}`}
          className="flex items-center gap-2 text-gold hover:text-gold/80 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="hebrew-nums text-sm font-medium">{contact.phone}</span>
        </a>
        
        {/* Social Links */}
        <div 
          className="flex items-center gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          <SocialLinks social={social} />
        </div>
      </div>
      
      {/* Copyright - Minimal */}
      <div className="text-center text-xs text-lightgrey/50 pt-2">
        {businessName} © {new Date().getFullYear()}
      </div>
    </motion.div>
  );
};

export default MobileMenuFooter;