// src/components/navigation/MobileMenu.tsx - Enhanced Version
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';
import { useViewportSize } from '@/hooks/useViewportSize';
import { AcademyInfo } from '@/types';
import { NavItem, navigationConfig } from '@/config/navigation';

// Import all the sub-components
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

// Luxury animation constants
const LUXURY_EASING = [0.25, 0.1, 0.25, 1];

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isOpen, 
  onClose, 
  academyInfo,
  navItems = [],
  id 
}) => {
  const [mounted, setMounted] = useState(false);
  const [activeNavIndex, setActiveNavIndex] = useState<number | null>(null);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef<number>(0);
  const { isCompact } = useViewportSize(navigationConfig.mobileMenu.compactModeBreakpoint);
  
  // Today's status
  const today = new Date().getDay();
  const todayHours = academyInfo.getHoursForDay(today);
  const todayStatus = {
    isOpen: todayHours.isOpen,
    hours: todayHours.isOpen ? `${todayHours.open} - ${todayHours.close}` : 'סגור'
  };
  
  // Drag to close functionality
  const dragY = useMotionValue(0);
  const dragProgress = useTransform(dragY, [0, 300], [0, 1]);
  const opacity = useTransform(dragProgress, [0, 1], [1, 0]);
  
  // Mount portal
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      scrollPositionRef.current = window.scrollY;
      document.body.style.cssText = `
        overflow: hidden;
        position: fixed;
        top: -${scrollPositionRef.current}px;
        width: 100%;
        touch-action: none;
      `;
      document.body.classList.add('menu-open');
    } else {
      document.body.style.cssText = '';
      document.body.classList.remove('menu-open');
      
      if (scrollPositionRef.current) {
        window.scrollTo(0, scrollPositionRef.current);
      }
    }
    
    return () => {
      document.body.style.cssText = '';
      document.body.classList.remove('menu-open');
    };
  }, [isOpen]);

  // Handle navigation item click
  const handleNavItemClick = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    const item = navItems[index];
    if (item) {
      window.location.href = item.path;
      onClose();
    }
  };

  const menuContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="md:hidden">
          {/* Enhanced Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Enhanced Bottom Sheet Style Menu */}
          <motion.div
            ref={menuRef}
            id={id}
            className="menu-bottom-sheet fixed inset-x-0 bottom-0 z-[101] bg-charcoal rounded-t-3xl shadow-2xl max-h-[85vh] overflow-hidden gpu-accelerated touch-manipulation"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ 
              type: 'tween',
              duration: 0.4,
              ease: LUXURY_EASING
            }}
            style={{ opacity }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              if (offset.y > 100 || velocity.y > 500) {
                onClose();
              }
            }}
            role="dialog"
            aria-modal="true"
            aria-label="תפריט ניווט"
            dir="rtl"
          >
            {/* Drag Handle */}
            <div className="py-3 pb-0">
              <div className="drag-handle mx-auto" />
            </div>

            {/* Scrollable Content */}
            <div className="menu-scroll-container overflow-y-auto max-h-[calc(85vh-3rem)] pb-safe">
              {/* Enhanced Header */}
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

              {/* Content Container */}
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

                {/* Footer with Stats and Social */}
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
        </div>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;
  
  return createPortal(
    menuContent,
    document.body
  );
};

export default MobileMenu;