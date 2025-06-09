'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { NavItem } from '@/config/navigation';
import { menuAnimationPresets } from '@/styles';

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
  return (
    <motion.nav 
      className="mobile-menu-nav"
      variants={menuAnimationPresets.containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={`grid grid-cols-1 ${isCompact ? 'gap-2' : 'gap-3'} w-full auto-rows-min`}>
        {items.map((item, index) => (
          <motion.div 
            key={item.name} 
            variants={menuAnimationPresets.itemVariants}
            className="w-full"
          >
            <Link 
              href={item.path}
              className={`mobile-menu-nav-item ${
                activeIndex === index ? 'active' : ''
              } ${isCompact ? 'compact' : ''}`}
              onClick={(e) => onItemClick(index, e)}
              onFocus={() => onItemHover(index)}
              onMouseEnter={() => onItemHover(index)}
              onMouseLeave={() => onItemHover(null)}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {item.icon && <span>{item.icon}</span>}
                {item.name}
                {item.badge && (
                  <span className="badge badge-gold">
                    {item.badge}
                  </span>
                )}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.nav>
  );
};

export default MobileMenuNav;