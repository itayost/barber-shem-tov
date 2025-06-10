// src/components/navigation/mobile/MobileMenuFooter.tsx - Updated Version
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SocialLinks from '../SocialLinks';
import { PhoneIcon } from '@/components/icons';

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
      {/* Contact Info - Streamlined with proper SocialLinks */}
      <div className="flex items-center justify-between px-4 py-3 bg-gold/5 rounded-xl">
        <a 
          href={`tel:${contact.phone}`}
          className="flex items-center gap-2 text-gold hover:text-gold/80 transition-colors group"
          onClick={(e) => e.stopPropagation()}
        >
          <PhoneIcon 
            size={isCompact ? 16 : 18} 
            className="group-hover:scale-110 transition-transform" 
          />
          <span className={`hebrew-nums font-medium ${isCompact ? 'text-sm' : 'text-sm'}`}>
            {contact.phone}
          </span>
        </a>
        
        {/* Social Links with appropriate mobile styling */}
        <div 
          className="flex items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <SocialLinks 
            social={social} 
            size={isCompact ? "small" : "medium"}
            variant="minimal"
            color="gold"
          />
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

// Alternative version with more features
export const MobileMenuFooterEnhanced: React.FC<MobileMenuFooterProps> = ({
  stats,
  contact,
  social,
  businessName,
  established,
  isCompact = false
}) => {
  return (
    <motion.div 
      className={`${isCompact ? 'space-y-3' : 'space-y-4'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      {/* Stats Grid - Only show if not compact and stats provided */}
      {!isCompact && stats && (
        <motion.div 
          className="grid grid-cols-2 gap-3 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <div className="text-center bg-gold/5 rounded-lg py-3 px-4">
            <div className="text-2xl font-bold text-gold">{stats.graduates}+</div>
            <div className="text-xs text-lightgrey/70">בוגרים</div>
          </div>
          <div className="text-center bg-gold/5 rounded-lg py-3 px-4">
            <div className="text-2xl font-bold text-gold">{stats.placementRate}%</div>
            <div className="text-xs text-lightgrey/70">השמה</div>
          </div>
        </motion.div>
      )}
      
      {/* Contact & Social Row */}
      <div className={`bg-charcoal-light/50 rounded-xl ${isCompact ? 'p-3' : 'p-4'}`}>
        <div className="flex items-center justify-between">
          {/* Phone */}
          <a 
            href={`tel:${contact.phone}`}
            className="flex items-center gap-2 text-gold hover:text-gold/80 transition-all group"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <PhoneIcon size={isCompact ? 16 : 18} />
            </motion.div>
            <span className={`hebrew-nums font-medium ${isCompact ? 'text-sm' : 'text-base'}`}>
              {contact.phone}
            </span>
          </a>
          
          {/* Divider */}
          <div className="w-px h-6 bg-gold/20 mx-3" />
          
          {/* Social Links */}
          <div onClick={(e) => e.stopPropagation()}>
            <SocialLinks 
              social={social} 
              size={isCompact ? "small" : "medium"}
              variant="circle"
              color="gold"
              className="gap-2"
            />
          </div>
        </div>
      </div>
      
      {/* Footer Info */}
      <motion.div 
        className="text-center space-y-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="text-xs text-lightgrey/50">
          {businessName} © {new Date().getFullYear()}
        </div>
        {!isCompact && established && (
          <div className="text-xs text-gold/50">
            מאז {established}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};