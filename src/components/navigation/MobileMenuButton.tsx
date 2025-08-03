'use client';

import { motion } from 'framer-motion';

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

// Luxury animation constants
const LUXURY_SPRING = { type: "spring", stiffness: 400, damping: 25 };
const LUXURY_EASING = [0.25, 0.1, 0.25, 1];

const MobileMenuButton = ({ isOpen, onClick, className = '' }: MobileMenuButtonProps) => {
  // Enhanced animation variants for burger lines
  const topLineVariants = {
    closed: { 
      rotate: 0, 
      translateY: 0,
      width: '100%'
    },
    open: { 
      rotate: 45, 
      translateY: 6,
      width: '100%'
    }
  };
  
  const middleLineVariants = {
    closed: { 
      opacity: 1,
      scale: 1,
      width: '100%'
    },
    open: { 
      opacity: 0,
      scale: 0.2,
      width: '100%'
    }
  };
  
  const bottomLineVariants = {
    closed: { 
      rotate: 0, 
      translateY: 0,
      width: '100%'
    },
    open: { 
      rotate: -45, 
      translateY: -6,
      width: '100%'
    }
  };

  return (
    <motion.button 
      className={`
        relative w-8 h-8 p-1 md:hidden focus:outline-none z-10
        rounded-full transition-colors duration-300
        ${isOpen ? 'bg-gold/10' : 'hover:bg-gold/5'}
        ${className}
      `}
      onClick={onClick}
      aria-label={isOpen ? 'סגור תפריט' : 'פתח תפריט'}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
    >
      {/* Container for lines */}
      <div className="relative w-6 h-5 mx-auto">
        {/* Top line */}
        <motion.span 
          className="absolute left-0 h-0.5 bg-offwhite origin-center"
          style={{ top: '2px' }}
          variants={topLineVariants}
          transition={LUXURY_SPRING}
        />
        
        {/* Middle line with stagger effect */}
        <motion.span 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-offwhite"
          variants={middleLineVariants}
          transition={{
            ...LUXURY_SPRING,
            opacity: { duration: 0.2, ease: LUXURY_EASING }
          }}
        />
        
        {/* Bottom line */}
        <motion.span 
          className="absolute left-0 bottom-0 h-0.5 bg-offwhite origin-center"
          style={{ bottom: '2px' }}
          variants={bottomLineVariants}
          transition={LUXURY_SPRING}
        />
      </div>

      {/* Subtle glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gold/20 blur-xl opacity-0"
        animate={{
          opacity: isOpen ? 0.5 : 0,
          scale: isOpen ? 1.5 : 1
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={isOpen ? {
          scale: [1, 1.5, 2],
          opacity: [0.3, 0.1, 0],
        } : {}}
        transition={{ duration: 0.6 }}
        style={{
          background: 'radial-gradient(circle, rgba(201, 166, 107, 0.3) 0%, transparent 70%)'
        }}
      />
    </motion.button>
  );
};

export default MobileMenuButton;