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
  return (
    <motion.div 
      className={`w-full ${isCompact ? 'mt-3 space-y-2' : 'mt-5 space-y-3'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Button 
        href={primaryAction.href}
        variant="primary"
        className={`w-full text-center ${isCompact ? 'py-2 text-sm' : ''}`}
        onClick={onActionClick}
      >
        {primaryAction.text}
      </Button>
      <Button 
        href={secondaryAction.href}
        variant="secondary"
        className={`w-full text-center ${isCompact ? 'py-2 text-sm' : ''}`}
        onClick={onActionClick}
      >
        {secondaryAction.text}
      </Button>
    </motion.div>
  );
};

export default MobileMenuActions;