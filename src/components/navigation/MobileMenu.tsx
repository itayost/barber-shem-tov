// src/components/navigation/MobileMenu.tsx - Simple Fix
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useViewportSize } from '@/hooks/useViewportSize';
import { AcademyInfo } from '@/types';
import { NavItem, navigationConfig } from '@/config/navigation';

import MobileMenuHeader from './mobile/MobileMenuHeader';
import MobileMenuNav from './mobile/MobileMenuNav';
import MobileMenuActions from './mobile/MobileMenuActions';
import MobileMenuFooter from './mobile/MobileMenuFooter';

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
  navItems = [],
  id 
}) => {
  const [activeNavIndex, setActiveNavIndex] = useState<number | null>(null);
  const pathname = usePathname();
  const { isCompact } = useViewportSize(navigationConfig.mobileMenu.compactModeBreakpoint);
  
  // Today's status
  const today = new Date().getDay();
  const todayHours = academyInfo.getHoursForDay(today);
  const todayStatus = {
    isOpen: todayHours.isOpen,
    hours: todayHours.isOpen ? `${todayHours.open} - ${todayHours.close}` : 'סגור'
  };
  
  // Simple body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle navigation
  const handleNavItemClick = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    const item = navItems[index];
    if (item) {
      onClose();
      setTimeout(() => {
        window.location.href = item.path;
      }, 200);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            id={id}
            className="fixed inset-x-0 bottom-0 z-[101] bg-charcoal rounded-t-3xl shadow-2xl max-h-[85vh] overflow-hidden md:hidden"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ 
              type: 'tween',
              duration: 0.3,
              ease: 'easeOut'
            }}
            role="dialog"
            aria-modal="true"
            aria-label="תפריט ניווט"
            dir="rtl"
          >
            {/* Drag Handle */}
            <div className="py-3 pb-0">
              <div className="w-12 h-1 bg-lightgrey/30 rounded-full mx-auto" />
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[calc(85vh-3rem)] pb-safe">
              {/* Header */}
              <MobileMenuHeader
                logo={{
                  src: '/images/logos/logo.png',
                  alt: academyInfo.shortName
                }}
                businessName={academyInfo.name}
                todayStatus={todayStatus}
                isCompact={isCompact}
                onClose={onClose}
              />

              {/* Content */}
              <div className="px-6 py-6 space-y-6">
                {/* Navigation */}
                <div>
                  <h3 className="text-sm font-medium text-gold mb-3">ניווט</h3>
                  <MobileMenuNav
                    items={navItems}
                    activeIndex={activeNavIndex}
                    currentPath={pathname}
                    onItemClick={handleNavItemClick}
                    onItemHover={setActiveNavIndex}
                    isCompact={isCompact}
                  />
                </div>

                {/* CTA Actions */}
                <MobileMenuActions
                  primaryAction={navigationConfig.quickActions.primary}
                  secondaryAction={navigationConfig.quickActions.secondary}
                  onActionClick={onClose}
                  isCompact={isCompact}
                />

                {/* Footer */}
                <MobileMenuFooter
                  stats={academyInfo.stats}
                  contact={{
                    phone: academyInfo.phone,
                    email: academyInfo.email
                  }}
                  social={academyInfo.social}
                  established={academyInfo.established}
                  businessName={academyInfo.shortName}
                  isCompact={isCompact}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;