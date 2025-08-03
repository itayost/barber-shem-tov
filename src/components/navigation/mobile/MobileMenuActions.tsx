// src/components/navigation/mobile/MobileMenuActions.tsx - Fixed Menu Closing
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';

interface MobileMenuActionsProps {
  primaryAction: {
    text: string;
    href: string;
  };
  secondaryAction: {
    text: string;
    href: string;
  };
  onActionClick: () => void;
  isCompact?: boolean;
}

const MobileMenuActions: React.FC<MobileMenuActionsProps> = ({
  primaryAction,
  secondaryAction,
  onActionClick,
  isCompact = false
}) => {
  const router = useRouter();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  // Handle navigation with proper menu closing
  const handlePrimaryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Close the menu immediately
    onActionClick();
    
    // Navigate after a short delay to allow menu animation
    setTimeout(() => {
      router.push(primaryAction.href);
    }, 150);
  };

  const handleSecondaryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Close the menu immediately
    onActionClick();
    
    // Navigate after a short delay to allow menu animation
    setTimeout(() => {
      router.push(secondaryAction.href);
    }, 150);
  };

  return (
    <motion.div 
      className={`space-y-3 px-6 ${isCompact ? 'space-y-2' : ''}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Primary CTA */}
      <motion.div variants={itemVariants}>
        <button
          onClick={handlePrimaryClick}
          className={`
            w-full min-h-[48px] ${isCompact ? 'py-3' : 'py-4'} 
            px-8 font-bold touch-manipulation
            bg-gold text-black hover:bg-offwhite 
            border border-gold hover:border-offwhite 
            transition-all duration-300 text-center 
            relative overflow-hidden select-none
            uppercase tracking-wider
          `}
        >
          {primaryAction.text}
        </button>
      </motion.div>
      
      {/* Secondary CTA */}
      <motion.div variants={itemVariants}>
        <button
          onClick={handleSecondaryClick}
          className={`
            w-full min-h-[48px] ${isCompact ? 'py-3' : 'py-4'} 
            px-8 font-medium touch-manipulation
            bg-transparent text-offwhite border border-gold/30 
            hover:border-gold hover:text-gold
            transition-all duration-300 text-center
            uppercase tracking-wider
          `}
        >
          {secondaryAction.text}
        </button>
      </motion.div>
    </motion.div>
  );
};

export default MobileMenuActions;