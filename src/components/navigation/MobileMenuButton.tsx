'use client';

import { motion } from 'framer-motion';

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

  // Common transition for smooth animation
  const lineTransition = { 
    type: "spring", 
    stiffness: 260, 
    damping: 20 
  };

  return (
    <motion.button 
      className={`md:hidden flex-shrink-0 p-3 rounded-lg z-10 
        focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-50 
        hover:bg-charcoal/10 active:bg-charcoal/20 transition-colors
        ${className}`}
      onClick={onClick}
      aria-label={isOpen ? 'סגור תפריט' : 'פתח תפריט'}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      whileTap={{ scale: 0.95 }}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
    >
      <div className="w-6 h-5 relative flex flex-col justify-between">
        {/* Top line */}
        <motion.div 
          className="w-6 h-0.5 bg-offwhite absolute top-0"
          variants={topLineVariants}
          transition={lineTransition}
        />
        
        {/* Middle line */}
        <motion.div 
          className="w-6 h-0.5 bg-offwhite absolute top-1/2 -translate-y-1/2"
          variants={middleLineVariants}
          transition={lineTransition}
        />
        
        {/* Bottom line */}
        <motion.div 
          className="w-6 h-0.5 bg-offwhite absolute bottom-0"
          variants={bottomLineVariants}
          transition={lineTransition}
        />
      </div>
    </motion.button>
  );
};

export default MobileMenuButton;