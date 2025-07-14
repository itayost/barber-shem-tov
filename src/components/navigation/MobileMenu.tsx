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
        navigator.deviceMemory <= 4 || // Low RAM (if available)
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
        duration: prefersReducedMotion || isLowEndDevice ? 0.15 : 0.25,
        ease: 'easeIn',
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Mobile optimized */}
          <motion.div
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm md:hidden touch-none"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          />

          {/* Bottom Sheet - Mobile-first design */}
          <motion.div
            id={id}
            className="fixed inset-x-0 bottom-0 z-[101] bg-black border-t border-gold/20 shadow-2xl max-h-[90vh] overflow-hidden md:hidden"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            drag={!prefersReducedMotion && !isLowEndDevice ? 'y' : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragStart={() => setIsDragging(true)}
            onDrag={(_, info) => setDragY(info.offset.y)}
            onDragEnd={handleDragEnd}
            role="dialog"
            aria-modal="true"
            aria-label="תפריט ניווט"
            dir="rtl"
            style={{
              y: dragY,
              touchAction: isDragging ? 'none' : 'pan-y',
              WebkitTapHighlightColor: 'transparent',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
            }}
          >
            {/* Drag Handle - Touch optimized */}
            <div className="py-3 pb-2 touch-none">
              <div className="w-12 h-1 bg-gold/30 rounded-full mx-auto transition-all duration-200 hover:bg-gold/50" />
            </div>

            {/* Scrollable Content - Mobile optimized */}
            <div className="overflow-y-auto max-h-[calc(90vh-2.5rem)] pb-safe overscroll-contain">
              {/* Header - Mobile-first spacing */}
              <MobileMenuHeader
                logo={{
                  src: '/images/logos/logo.png',
                  alt: academyInfo.shortName,
                }}
                businessName={academyInfo.name}
                todayStatus={todayStatus}
                isCompact={isCompact}
                onClose={onClose}
              />

              {/* Content - Mobile-first spacing */}
              <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
                {/* Navigation - Mobile optimized */}
                <motion.div
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                >
                  <h3 className="text-xs sm:text-sm font-medium text-gold mb-2 sm:mb-3 tracking-wider uppercase">
                    ניווט
                  </h3>
                  <MobileMenuNav
                    items={navItems}
                    activeIndex={activeNavIndex}
                    currentPath={pathname}
                    onItemClick={handleNavItemClick}
                    onItemHover={setActiveNavIndex}
                    isCompact={isCompact}
                  />
                </motion.div>

                {/* CTA Actions - Touch friendly */}
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
