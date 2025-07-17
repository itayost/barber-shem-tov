// src/components/navigation/MobileMenu.tsx - Without Open/Close Status
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import MobileMenuHeader from './mobile/MobileMenuHeader';
import MobileMenuNav from './mobile/MobileMenuNav';
import MobileMenuActions from './mobile/MobileMenuActions';
import MobileMenuFooter from './mobile/MobileMenuFooter';
import { NavItem, navigationConfig } from '@/config/navigation';
import { academyInfo } from '@/lib/data';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  academyInfo: typeof academyInfo;
  navItems: NavItem[];
  id?: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  academyInfo,
  navItems,
  id = 'mobile-menu'
}) => {
  const [activeNavIndex, setActiveNavIndex] = useState<number | null>(null);
  const [isCompact, setIsCompact] = useState(false);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  // Detect screen size for compact mode
  useEffect(() => {
    const checkCompact = () => {
      setIsCompact(window.innerHeight < 700);
    };
    
    checkCompact();
    window.addEventListener('resize', checkCompact);
    return () => window.removeEventListener('resize', checkCompact);
  }, []);

  // Handle navigation item click
  const handleNavItemClick = (index: number, event: React.MouseEvent) => {
    // Allow default navigation behavior
    setActiveNavIndex(index);
    
    // Close menu after navigation
    setTimeout(() => {
      onClose();
    }, 150);
  };

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const menuVariants = {
    hidden: { 
      x: '100%',
      transition: { 
        duration: 0.3, 
        ease: "easeIn",
        when: "afterChildren"
      }
    },
    visible: { 
      x: 0,
      transition: { 
        duration: 0.4, 
        ease: "easeOut",
        when: "beforeChildren"
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            variants={prefersReducedMotion ? {} : backdropVariants}
            initial={prefersReducedMotion ? {} : "hidden"}
            animate="visible"
            exit="hidden"
            onClick={onClose}
            style={{ WebkitBackdropFilter: 'blur(8px)' }}
          />

          {/* Menu Panel */}
          <motion.div
            id={id}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-black/95 backdrop-blur-xl border-l border-gold/20 z-50 flex flex-col"
            variants={prefersReducedMotion ? {} : menuVariants}
            initial={prefersReducedMotion ? {} : "hidden"}
            animate="visible"
            exit="hidden"
            style={{ 
              WebkitBackdropFilter: 'blur(20px)',
              backdropFilter: 'blur(20px)'
            }}
          >
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gold/20">
              <div className={`flex flex-col min-h-full ${isCompact ? 'gap-6' : 'gap-8'} py-6`}>
                {/* Header - No Status */}
                <motion.div
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05, duration: 0.2 }}
                >
                  <MobileMenuHeader
                    logo={{
                      src: '/images/logos/logo.png',
                      alt: academyInfo.shortName,
                    }}
                    businessName={academyInfo.shortName}
                    onClose={onClose}
                    isCompact={isCompact}
                  />
                </motion.div>

                {/* Navigation - Mobile optimized */}
                <motion.div
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                >
                  <MobileMenuNav
                    items={navItems}
                    activeIndex={activeNavIndex}
                    currentPath={pathname}
                    onItemClick={handleNavItemClick}
                    onItemHover={setActiveNavIndex}
                    isCompact={isCompact}
                  />
                </motion.div>

                {/* Quick Actions - Mobile optimized */}
                <motion.div
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.2 }}
                >
                  <MobileMenuActions
                    primaryAction={navigationConfig.quickActions.primary}
                    secondaryAction={navigationConfig.quickActions.secondary}
                    onActionClick={onClose}
                    isCompact={isCompact}
                  />
                </motion.div>

                {/* Footer - Mobile optimized */}
                <motion.div
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.2 }}
                >
                  <MobileMenuFooter
                    stats={academyInfo.stats}
                    contact={{
                      phone: academyInfo.phone,
                      email: academyInfo.email,
                    }}
                    social={academyInfo.social}
                    established={academyInfo.established}
                    businessName={academyInfo.shortName}
                    isCompact={isCompact}
                  />
                </motion.div>
              </div>
            </div>

            {/* Safe area gradient for iPhones */}
            <div className="absolute bottom-0 left-0 right-0 h-safe bg-gradient-to-t from-black to-transparent pointer-events-none" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;