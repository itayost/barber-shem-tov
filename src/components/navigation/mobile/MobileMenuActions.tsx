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

// Simple animation preset
const slideUpAnimation = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const MobileMenuActions: React.FC<MobileMenuActionsProps> = ({
  primaryAction,
  secondaryAction,
  onActionClick,
  isCompact = false
}) => {
  return (
    <motion.div 
      className={`mobile-menu-actions ${isCompact ? 'compact' : ''}`}
      {...slideUpAnimation}
    >
      <Button 
        href={primaryAction.href}
        variant="primary"
        className={`btn-full ${isCompact ? 'btn-sm' : ''}`}
        onClick={onActionClick}
      >
        {primaryAction.text}
      </Button>
      <Button 
        href={secondaryAction.href}
        variant="secondary"
        className={`btn-full ${isCompact ? 'btn-sm' : ''}`}
        onClick={onActionClick}
      >
        {secondaryAction.text}
      </Button>
    </motion.div>
  );
};

export default MobileMenuActions;