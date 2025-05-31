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
  stats,
  contact,
  social,
  established,
  businessName,
  isCompact = false
}) => {
  return (
    <motion.div 
      className={`${isCompact ? 'mt-3' : 'mt-5'} flex flex-col items-center gap-3 w-full`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      {/* Display academy stats if not on a small screen */}
      {!isCompact && stats && (
        <div className="w-full grid grid-cols-2 gap-2 mb-2">
          <div className="text-center">
            <div className="text-gold font-medium text-sm">{stats.graduates}+</div>
            <div className="text-lightgrey text-xs">בוגרים</div>
          </div>
          <div className="text-center">
            <div className="text-gold font-medium text-sm">{stats.placementRate}%</div>
            <div className="text-lightgrey text-xs">השמה</div>
          </div>
        </div>
      )}
      
      {/* Contact Info */}
      <div className="flex items-center justify-center gap-4 text-sm">
        <a 
          href={`tel:${contact.phone}`}
          className="text-gold flex items-center gap-1 hover:text-gold/80 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="hebrew-nums text-sm">{contact.phone}</span>
        </a>
        
        <a 
          href={`mailto:${contact.email}`}
          className="text-gold flex items-center gap-1 hover:text-gold/80 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="text-sm">{isCompact ? 'אימייל' : contact.email}</span>
        </a>
      </div>
      
      {/* Social Links */}
      <div 
        className="flex items-center space-x-reverse space-x-4 border border-lightgrey border-opacity-20 bg-charcoal/20 rounded-full py-1 px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <SocialLinks social={social} />
      </div>
      
      {/* Established year */}
      <div className="text-xs text-lightgrey/70">
        {businessName} • {established}
      </div>
    </motion.div>
  );
};

export default MobileMenuFooter;