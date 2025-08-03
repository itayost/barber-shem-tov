// src/components/navigation/mobile/MobileMenuNav.tsx - Fixed Active Indicator Height
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { NavItem } from '@/config/navigation';

interface MobileMenuNavProps {
  items: NavItem[];
  activeIndex: number | null;
  currentPath?: string;
  onItemClick: (index: number, e: React.MouseEvent) => void;
  onItemHover: (index: number | null) => void;
  isCompact?: boolean;
}

const MobileMenuNav: React.FC<MobileMenuNavProps> = ({
  items,
  activeIndex,
  currentPath,
  onItemClick,
  onItemHover,
  isCompact = false
}) => {
  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  // Item animation
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <motion.nav 
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      dir="rtl"
    >
      <div className={`space-y-${isCompact ? '1' : '2'}`}>
        {items.map((item, index) => {
          // Check if this is the current page
          const isCurrentPage = currentPath === item.path || 
            (item.path !== '/' && currentPath?.startsWith(item.path));
          const isHovered = activeIndex === index;
          
          return (
            <motion.div 
              key={item.path} 
              variants={itemVariants}
            >
              <Link 
                href={item.path}
                className={`
                  block relative px-5 py-3.5 rounded-xl 
                  transition-all duration-200 
                  ${isCompact ? 'py-3' : ''}
                  ${isCurrentPage 
                    ? 'text-gold font-medium bg-gold/10' 
                    : 'text-offwhite hover:text-gold hover:bg-gold/5'
                  }
                  ${isHovered && !isCurrentPage ? 'bg-gold/5' : ''}
                `}
                onClick={(e) => onItemClick(index, e)}
                onFocus={() => onItemHover(index)}
                onMouseEnter={() => onItemHover(index)}
                onMouseLeave={() => onItemHover(null)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Optional icon */}
                    {item.icon && (
                      <span className={`text-lg ${isCurrentPage ? 'text-gold' : ''}`}>
                        {item.icon}
                      </span>
                    )}
                    
                    {/* Navigation text */}
                    <span className="text-base">{item.name}</span>
                    
                    {/* Badge if exists */}
                    {item.badge && (
                      <span className="badge badge-gold text-xs">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Arrow indicator for current page */}
                  {isCurrentPage && (
                    <motion.svg 
                      className="w-5 h-5 text-gold"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </motion.svg>
                  )}
                </div>

                {/* Active indicator line - Fixed to match text height */}
                {isCurrentPage && (
                  <motion.div
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-1 bg-gold rounded-full"
                    initial={{ height: 0 }}
                    animate={{ height: '50%' }}
                    transition={{ duration: 0.3 }}
                    style={{
                      maxHeight: '24px', // Matches typical text line height
                    }}
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default MobileMenuNav;