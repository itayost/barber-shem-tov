// src/components/navigation/mobile/MobileMenuActions.tsx - Enhanced Version
'use client';

import React from 'react';
import { motion } from 'framer-motion';
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

  return (
    <motion.div 
      className={`space-y-3 ${isCompact ? 'space-y-2' : ''}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Primary CTA */}
      <motion.div variants={itemVariants}>
        <Button 
          href={primaryAction.href}
          variant="primary"
          className={`w-full min-h-[48px] ${isCompact ? 'py-3' : 'py-4'} font-bold touch-manipulation`}
          onClick={onActionClick}
        >
          {primaryAction.text}
        </Button>
      </motion.div>
      
      {/* Secondary CTA */}
      <motion.div variants={itemVariants}>
        <Button 
          href={secondaryAction.href}
          variant="secondary"
          className={`w-full min-h-[48px] ${isCompact ? 'py-3' : 'py-4'} font-medium touch-manipulation`}
          onClick={onActionClick}
        >
          {secondaryAction.text}
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default MobileMenuActions;