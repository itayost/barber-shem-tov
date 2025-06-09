'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { AcademyInfo } from '@/types';
import { NavItem, navigationConfig } from '@/config/navigation';
import { useViewportSize } from '@/hooks/useViewportSize';
import { menuAnimationPresets } from '@/styles';

// Import sub-components
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
  navItems = navigationConfig.mainItems,
  id 
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  
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

  // Handle body scroll lock
  useEffect(() => {
    let scrollY = 0;
    let timer: NodeJS.Timeout;
    
    if (isOpen) {
      // Save current scroll position
      scrollY = window.scrollY;
      
      // Lock scroll with iOS Safari fix
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      // Focus menu after animation
      timer = setTimeout(() => {
        const firstFocusable = menuRef.current?.querySelector('a, button') as HTMLElement;
        firstFocusable?.focus();
      }, 100);
    } else {
      // Get saved scroll position from style
      const savedScrollY = document.body.style.top;
      
      // Restore body styles
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      // Restore scroll position
      if (savedScrollY) {
        window.scrollTo(0, parseInt(savedScrollY || '0') * -1);
      }
      
      setActiveIndex(null);
    }
    
    // Cleanup function
    return () => {
      if (timer) clearTimeout(timer);
      
      // Always restore body styles on cleanup
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
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

  const handleBackgroundClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  const menuContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          id={id}
          className="menu-backdrop md:hidden flex flex-col"
          aria-modal="true"
          role="dialog"
          aria-label="תפריט ניווט"
          tabIndex={-1}
          onClick={handleBackgroundClick}
          {...menuAnimationPresets.fadeIn}
        >
          {/* Background effects */}
          <div className="floating-bg-elements">
            <div className="floating-element w-96 h-96 top-0 right-0 animate-float"></div>
            <div className="floating-element w-64 h-64 bottom-0 left-0 animate-float" style={{ animationDelay: '1s' }}></div>
          </div>
          
          {/* Content container */}
          <div className="flex flex-col items-center justify-between h-full py-20 px-8 relative z-10">
            {/* Header */}
            <MobileMenuHeader
              logo={{ src: '/images/logos/logo.png', alt: academyInfo.shortName }}
              businessName={academyInfo.shortName}
              todayStatus={todayStatus}
              isCompact={isCompact}
              onClose={onClose}
            />
            
            {/* Navigation and Actions */}
            <div className="w-full flex-grow flex flex-col justify-center">
              <MobileMenuNav
                items={navItems}
                activeIndex={activeIndex}
                onItemClick={handleLinkClick}
                onItemHover={setActiveIndex}
                isCompact={isCompact}
              />
              
              <MobileMenuActions
                primaryAction={navigationConfig.quickActions.primary}
                secondaryAction={navigationConfig.quickActions.secondary}
                onActionClick={handleActionClick}
                isCompact={isCompact}
              />
            </div>
            
            {/* Footer */}
            <MobileMenuFooter
              stats={navigationConfig.mobileMenu.showStats ? academyInfo.stats : undefined}
              contact={{ phone: academyInfo.phone, email: academyInfo.email }}
              social={academyInfo.social}
              established={academyInfo.established}
              businessName={academyInfo.shortName}
              isCompact={isCompact}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Use portal for better performance and z-index management
  if (!mounted) return null;
  return createPortal(menuContent, document.body);
};

export default MobileMenu;