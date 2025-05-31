'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { NavItem } from '@/config/navigation';

interface MobileMenuNavProps {
  items: NavItem[];
  activeIndex: number | null;
  onItemClick: (index: number, e: React.MouseEvent) => void;
  onItemHover: (index: number | null) => void;
  isCompact?: boolean;
}

const MobileMenuNav: React.FC<MobileMenuNavProps> = ({
  items,
  activeIndex,
  onItemClick,
  onItemHover,
  isCompact = false
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <motion.nav 
      className="w-full flex-grow flex flex-col justify-center relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={`grid grid-cols-1 ${isCompact ? 'gap-2' : 'gap-3'} w-full auto-rows-min`}>
        {items.map((item, index) => (
          <motion.div 
            key={item.name} 
            variants={itemVariants}
            className="w-full"
          >
            <Link 
              href={item.path}
              className={`block text-center py-2 text-${isCompact ? 'base' : 'lg'} font-medium relative group ${
                activeIndex === index 
                  ? 'text-gold'
                  : 'text-offwhite hover:text-gold'
              }`}
              onClick={(e) => onItemClick(index, e)}
              onFocus={() => onItemHover(index)}
              onMouseEnter={() => onItemHover(index)}
              onMouseLeave={() => onItemHover(null)}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {item.icon && <span>{item.icon}</span>}
                {item.name}
                {item.badge && (
                  <span className="bg-gold/20 text-gold text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </span>
              <span 
                className={`absolute bottom-0 right-0 h-0.5 bg-gold transition-all duration-300 ${
                  activeIndex === index ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.nav>
  );
};

export default MobileMenuNav;