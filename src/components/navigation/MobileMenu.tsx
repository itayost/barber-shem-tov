// src/components/navigation/MobileMenu.tsx - Mobile-First Luxury Edition
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useViewportSize } from '@/hooks/useViewportSize';
import { AcademyInfo } from '@/types';
import { NavItem, navigationConfig } from '@/config/navigation';

import MobileMenuHeader from './mobile/MobileMenuHeader';
import MobileMenuNav from './mobile/MobileMenuNav';
import MobileMenuActions from './mobile/MobileMenuActions';
import MobileMenuFooter from './mobile/MobileMenuFooter';

// Extend Navigator interface for deviceMemory
declare global {
  interface Navigator {
    deviceMemory?: number;
  }
}

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
  id,
}) => {
  const [activeNavIndex, setActiveNavIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragY, setDragY] = useState(0);
  const pathname = usePathname();
  const { isCompact } = useViewportSize(navigationConfig.mobileMenu.compactModeBreakpoint);
  const prefersReducedMotion = useReducedMotion();

  // Device detection for optimized animations
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);

  useEffect(() => {
    // Check for low-end device indicators
    const checkDevice = () => {
      const isLowEnd =
        navigator.hardwareConcurrency <= 2 || // Few CPU cores
        (navigator.deviceMemory !== undefined && navigator.deviceMemory <= 4) || // Low RAM (if available)
        window.matchMedia('(max-width: 375px)').matches; // Small screen

      setIsLowEndDevice(isLowEnd);
    };

    checkDevice();
  }, []);

  // Today's status
  const today = new Date().getDay();
  const todayHours = academyInfo.getHoursForDay(today);
  const todayStatus = {
    isOpen: todayHours.isOpen,
    hours: todayHours.isOpen ? `${todayHours.open} - ${todayHours.close}` : 'סגור',
  };

  // Enhanced body scroll lock with touch prevention
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';

      // Prevent iOS bounce
      document.addEventListener('touchmove', preventScroll, { passive: false });
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';

      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }

      document.removeEventListener('touchmove', preventScroll);
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.removeEventListener('touchmove', preventScroll);
    };
  }, [isOpen]);

  const preventScroll = (e: TouchEvent) => {
    if (!e.target || !(e.target as HTMLElement).closest('.overflow-y-auto')) {
      e.preventDefault();
    }
  };

  // Handle navigation with haptic feedback
  const handleNavItemClick = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    const item = navItems[index];

    // Haptic feedback if available
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }

    if (item) {
      onClose();
      setTimeout(() => {
        window.location.href = item.path;
      }, 150); // Faster for mobile
    }
  };

  // Touch-friendly drag to close
  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.y > 100 || info.velocity.y > 500) {
      onClose();
    }
    setIsDragging(false);
    setDragY(0);
  };

  // Mobile-optimized animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: prefersReducedMotion || isLowEndDevice ? 0.1 : 0.2,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: prefersReducedMotion || isLowEndDevice ? 0.1 : 0.15,
      },
    },
  };

  const menuVariants = {
    hidden: { y: '100%' },
    visible: {
      y: 0,
      transition: {
        type: prefersReducedMotion ? 'tween' : 'spring',
        damping: 30,
        stiffness: 300,
        duration: prefersReducedMotion || isLowEndDevice ? 0.2 : 0.3,
      },
    },
    exit: {
      y: '100%',
      transition: {
        type: 'tween',
        duration: prefersReducedMotion || isLowEndDevice ? 0.2 : 0.25,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile-optimized backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            style={{ touchAction: 'none' }}
            id={`${id}-backdrop`}
          />

          {/* Mobile-first menu with bottom sheet behavior */}
          <motion.div
            className={`
              fixed bottom-0 left-0 right-0 z-50
              bg-charcoal rounded-t-3xl shadow-2xl
              ${navigationConfig.mobileMenu.bottomSheetMaxHeight}
              touch-manipulation
            `}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            drag={navigationConfig.mobileMenu.enableDragToClose ? 'y' : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDrag={(_, info) => {
              setIsDragging(true);
              setDragY(info.offset.y);
            }}
            onDragEnd={handleDragEnd}
            style={{
              y: dragY,
              maxHeight: navigationConfig.mobileMenu.bottomSheetMaxHeight,
            }}
            id={id}
          >
            {/* Drag indicator - Touch friendly */}
            <div className="absolute top-0 left-0 right-0 flex justify-center py-3 cursor-grab active:cursor-grabbing">
              <div className="w-12 h-1 bg-lightgrey/30 rounded-full" />
            </div>

            {/* Menu content - Mobile optimized */}
            <div className="h-full overflow-hidden flex flex-col">
              <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-6 pb-safe">
                {/* Header - Mobile optimized */}
                <motion.div
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05, duration: 0.2 }}
                >
                  <MobileMenuHeader
                    businessName={academyInfo.shortName}
                    todayStatus={todayStatus}
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
