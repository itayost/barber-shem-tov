// src/components/navigation/MobileMenu.tsx - Fixed Portal Version
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';
import { AcademyInfo } from '@/types';
import { NavItem, navigationConfig } from '@/config/navigation';
import { useViewportSize } from '@/hooks/useViewportSize';

// Import sub-components
import MobileMenuHeader from './mobile/MobileMenuHeader';
import MobileMenuNav from './mobile/MobileMenuNav';
import MobileMenuActions from './mobile/MobileMenuActions';
import MobileMenuFooter from './mobile/MobileMenuFooter';
import MobileMenuQuickActions from './mobile/MobileMenuQuickActions';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  academyInfo: AcademyInfo;
  navItems?: NavItem[];
  id?: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isOpen, 
  onClose, 
  academyInfo,
  navItems = navigationConfig.mainItems,
  id 
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  
  // Use viewport hook
  const { isCompact } = useViewportSize(navigationConfig.mobileMenu.compactModeBreakpoint);
  
  // Today's status
  const today = new Date().getDay();
  const todayHours = academyInfo.getHoursForDay(today);
  const todayStatus = {
    isOpen: academyInfo.isOpenDay(today) && todayHours.isOpen,
    hours: `${todayHours.open} - ${todayHours.close}`
  };

  // Mount portal
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      // Add class to body for additional styling if needed
      document.body.classList.add('mobile-menu-open');
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.classList.remove('mobile-menu-open');
      
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
      
      setActiveIndex(null);
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Handle navigation
  const handleLinkClick = useCallback((index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex(index);
    onClose();
  }, [onClose]);

  const handleActionClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const menuContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="md:hidden">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Menu Panel - Side drawer */}
          <motion.div
            ref={menuRef}
            id={id}
            className="fixed inset-y-0 right-0 z-[101] w-full max-w-sm bg-charcoal shadow-2xl overflow-hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            aria-label="תפריט ניווט"
            dir="rtl"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-charcoal border-b border-lightgrey/10">
              <MobileMenuHeader
                logo={{ src: '/images/logos/logo.png', alt: academyInfo.shortName }}
                businessName={academyInfo.shortName}
                todayStatus={todayStatus}
                isCompact={isCompact}
                onClose={onClose}
              />
            </div>

            {/* Scrollable Content */}
            <div className="h-full overflow-y-auto pb-20" style={{ maxHeight: 'calc(100vh - 80px)' }}>
              {/* Quick Actions */}
              {navigationConfig.mobileMenu.enableQuickActions && (
                <div className="px-6 py-4">
                  <MobileMenuQuickActions 
                    phone={academyInfo.phone}
                    whatsapp={academyInfo.phone}
                    address={academyInfo.address}
                    isCompact={isCompact}
                  />
                </div>
              )}

              {/* Navigation */}
              <div className="px-6 py-4">
                <MobileMenuNav
                  items={navItems}
                  activeIndex={activeIndex}
                  currentPath={pathname}
                  onItemClick={handleLinkClick}
                  onItemHover={setActiveIndex}
                  isCompact={isCompact}
                />
              </div>
              
              {/* Primary Actions */}
              <div className="px-6 py-4">
                <MobileMenuActions
                  primaryAction={navigationConfig.quickActions.primary}
                  secondaryAction={navigationConfig.quickActions.secondary}
                  onActionClick={handleActionClick}
                  isCompact={isCompact}
                />
              </div>
              
              {/* Footer */}
              <div className="px-6 py-4 mt-auto">
                <MobileMenuFooter
                  stats={navigationConfig.mobileMenu.showStats ? academyInfo.stats : undefined}
                  contact={{ phone: academyInfo.phone, email: academyInfo.email }}
                  social={academyInfo.social}
                  established={academyInfo.established}
                  businessName={academyInfo.shortName}
                  isCompact={isCompact}
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  // Portal to body
  if (!mounted) return null;
  
  return createPortal(
    menuContent,
    document.body
  );
};

export default MobileMenu;