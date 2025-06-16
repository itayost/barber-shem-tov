// src/components/navigation/DesktopNav.tsx - Updated without CTA
'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { NavItem } from '@/config/navigation';

interface DesktopNavProps {
  navItems: NavItem[];
}

// Luxury animation constants
const LUXURY_SPRING = { stiffness: 300, damping: 30 };
const LUXURY_EASING = [0.25, 0.1, 0.25, 1];

const DesktopNav = ({ navItems }: DesktopNavProps) => {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  return (
    <nav className="flex items-center space-x-8 space-x-reverse">
      {navItems.map((item) => {
        const isActive = pathname === item.path || 
          (item.path !== '/' && pathname?.startsWith(item.path));
        const isHovered = hoveredItem === item.path;
        
        return (
          <motion.div 
            key={item.name}
            className="navbar-nav-item"
            animate={{
              scale: isHovered ? 1.02 : 1,
              y: isHovered ? -1 : 0
            }}
            transition={LUXURY_SPRING}
          >
            <Link 
              href={item.path}
              className={`nav-link ${isActive ? 'active' : ''} relative group`}
              aria-current={isActive ? 'page' : undefined}
              onMouseEnter={() => setHoveredItem(item.path)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Text with fade effect */}
              <span className="relative z-10 transition-colors duration-300">
                {item.name}
              </span>
              
              {/* Badge if exists */}
              {item.badge && (
                <motion.span 
                  className="badge badge-gold text-xs mr-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  {item.badge}
                </motion.span>
              )}
              
              {/* Progressive underline */}
              <motion.span
                className="absolute bottom-0 left-0 h-[2px] bg-gold origin-left"
                initial={{ scaleX: 0 }}
                animate={{ 
                  scaleX: isActive ? 1 : isHovered ? 0.7 : 0,
                  opacity: isActive ? 1 : isHovered ? 0.8 : 0
                }}
                transition={{
                  duration: 0.4,
                  ease: LUXURY_EASING
                }}
              />
              
              {/* Glow effect on hover */}
              {isHovered && !isActive && (
                <motion.span
                  className="absolute inset-0 bg-gold/5 blur-xl -z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1.2 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          </motion.div>
        );
      })}
    </nav>
  );
};

export default DesktopNav;