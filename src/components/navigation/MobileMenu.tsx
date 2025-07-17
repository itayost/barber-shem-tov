// src/components/navigation/MobileMenu.tsx - Bottom Sheet Design
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
    setActiveNavIndex(index);
    
    // Close menu after navigation
    setTimeout(() => {
      onClose();
    }, 150);
  };

  // Bottom sheet animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const bottomSheetVariants = {
    hidden: { 
      y: '100%',
      transition: { 
        duration: 0.3, 
        ease: "easeIn",
        when: "afterChildren"
      }
    },
    visible: { 
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: [0.32, 0.72, 0, 1], // iOS-like spring
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

          {/* Bottom Sheet */}
          <motion.div
            id={id}
            className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-t border-gold/20"
            variants={prefersReducedMotion ? {} : bottomSheetVariants}
            initial={prefersReducedMotion ? {} : "hidden"}
            animate="visible"
            exit="hidden"
            style={{ 
              WebkitBackdropFilter: 'blur(20px)',
              backdropFilter: 'blur(20px)',
              maxHeight: '85vh',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px'
            }}
          >
            {/* Handle bar for iOS-like bottom sheet */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-gold/30 rounded-full"></div>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gold/20" style={{ maxHeight: 'calc(85vh - 20px)' }}>
              <div className={`flex flex-col ${isCompact ? 'gap-4 pb-4' : 'gap-6 pb-6'}`}>
                
                {/* Header - Without Status */}
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

                {/* Navigation */}
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

                {/* Quick Actions */}
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

                {/* Footer */}
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

                {/* Safe area for iOS */}
                <div className="h-safe"></div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;