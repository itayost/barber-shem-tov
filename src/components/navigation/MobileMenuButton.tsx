'use client';

import { motion } from 'framer-motion';
import { transitions } from '@/styles';

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

const MobileMenuButton = ({ isOpen, onClick, className = '' }: MobileMenuButtonProps) => {
  // Animation variants for the burger lines
  const topLineVariants = {
    closed: { rotate: 0, translateY: 0 },
    open: { rotate: 45, translateY: 6 }
  };
  
  const middleLineVariants = {
    closed: { opacity: 1 },
    open: { opacity: 0 }
  };
  
  const bottomLineVariants = {
    closed: { rotate: 0, translateY: 0 },
    open: { rotate: -45, translateY: -6 }
  };

  // Common transition using centralized duration
  const lineTransition = { 
    type: "spring", 
    stiffness: 260, 
    damping: 20,
    duration: transitions.fast
  };

  return (
    <motion.button 
      className={`navbar-toggle ${isOpen ? 'active' : ''} ${className}`}
      onClick={onClick}
      aria-label={isOpen ? 'סגור תפריט' : 'פתח תפריט'}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      whileTap={{ scale: 0.95 }}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
    >
      {/* Using CSS classes for the lines */}
      <motion.div 
        className="navbar-toggle-line"
        variants={topLineVariants}
        transition={lineTransition}
      />
      
      <motion.div 
        className="navbar-toggle-line"
        variants={middleLineVariants}
        transition={lineTransition}
      />
      
      <motion.div 
        className="navbar-toggle-line"
        variants={bottomLineVariants}
        transition={lineTransition}
      />
    </motion.button>
  );
};

export default MobileMenuButton;