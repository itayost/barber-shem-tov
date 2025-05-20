'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import SocialLinks from './SocialLinks';
import Button from '@/components/common/Button';
import { AcademyInfo } from '@/types';

interface NavItem {
  name: string;
  path: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  academyInfo: AcademyInfo;
  navItems: NavItem[];
  id?: string;
}

const MobileMenu = ({ isOpen, onClose, academyInfo, navItems, id }: MobileMenuProps) => {
  // Ref for the menu container to trap focus
  const menuRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  
  // Update viewport height on mount and resize
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initial calculation
      const updateViewportSize = () => {
        setIsSmallScreen(window.innerHeight < 700);
      };
      
      updateViewportSize();
      window.addEventListener('resize', updateViewportSize);
      
      return () => {
        window.removeEventListener('resize', updateViewportSize);
      };
    }
  }, []);
  
  // Handle focus trapping and keyboard navigation
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    // Prevent scrolling on body when menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      // Focus the menu container
      setTimeout(() => {
        if (menuRef.current) {
          const firstFocusableElement = menuRef.current.querySelector('a, button') as HTMLElement;
          if (firstFocusableElement) {
            firstFocusableElement.focus();
          }
        }
      }, 100);
    } else {
      document.body.style.overflow = '';
      setActiveIndex(null);
    }

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Animation variants for menu items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  // Get the current day of the week
  const today = new Date().getDay();
  const todayHours = academyInfo.getHoursForDay(today);
  const isOpenToday = academyInfo.isOpenDay(today) && todayHours.isOpen;

  // Handle link click without propagation to parent
  const handleLinkClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from bubbling up
    setActiveIndex(index);
    onClose();
  };

  // Handle link clicks when using buttons
  const handleLinkButtonClick = () => {
    onClose();
  };

  // Stop event propagation helper function
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          id={id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh'
          }}
          className="bg-charcoal/90 backdrop-blur-md md:hidden flex flex-col"
          aria-modal="true"
          role="dialog"
          aria-label="תפריט ניווט"
          tabIndex={-1}
          onClick={(e) => {
            // Close when clicking the background (this div), but not its children
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          {/* Modern background effect with golden gradient */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent opacity-30"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-charcoal/80 via-transparent to-gold/5 opacity-20"></div>
          </div>
          
          {/* Close button with fixed position */}
          <motion.button 
            className="absolute top-6 left-6 text-offwhite hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-50 p-3 rounded-full bg-charcoal/30 backdrop-blur-sm z-[120]"
            onClick={onClose}
            aria-label="סגור תפריט"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ rotate: 90, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
          
          {/* Flexbox container that distributes content evenly */}
          <div className="flex flex-col items-center justify-between h-full py-20 px-8 relative z-10">
            {/* Top section with logo */}
            <div className="w-full flex flex-col items-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className={`${isSmallScreen ? 'mb-2' : 'mb-4'}`}
              >
                <Image 
                  src="/images/logos/logo.png"
                  alt={academyInfo.shortName}
                  width={isSmallScreen ? 180 : 220}
                  height={isSmallScreen ? 50 : 62}
                  className={`${isSmallScreen ? 'h-12' : 'h-16'} w-auto object-contain`}
                  priority
                />
              </motion.div>
              
              {/* Today's hours - conditionally shown on larger screens */}
              {!isSmallScreen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-center mt-1"
                >
                  <span className={isOpenToday ? 'text-gold' : 'text-lightgrey'}>
                    {isOpenToday 
                      ? `פתוח היום ${todayHours.open} - ${todayHours.close}` 
                      : 'סגור היום'}
                  </span>
                </motion.div>
              )}
            </div>
            
            {/* Middle section with navigation */}
            <motion.nav 
              className="w-full flex-grow flex flex-col justify-center relative"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className={`grid grid-cols-1 ${isSmallScreen ? 'gap-2' : 'gap-3'} w-full auto-rows-min`}>
                {navItems.map((item, index) => (
                  <motion.div 
                    key={item.name} 
                    variants={itemVariants}
                    className="w-full"
                  >
                    <Link 
                      href={item.path}
                      className={`block text-center py-2 text-${isSmallScreen ? 'base' : 'lg'} font-medium relative group ${
                        activeIndex === index 
                          ? 'text-gold'
                          : 'text-offwhite hover:text-gold'
                      }`}
                      onClick={(e) => handleLinkClick(index, e)}
                      onFocus={() => setActiveIndex(index)}
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(null)}
                    >
                      <span className="relative z-10">{item.name}</span>
                      <span 
                        className={`absolute bottom-0 right-0 h-0.5 bg-gold transition-all duration-300 ${
                          activeIndex === index ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              {/* Action buttons */}
              <motion.div 
                className={`w-full ${isSmallScreen ? 'mt-3 space-y-2' : 'mt-5 space-y-3'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button 
                  href="/academy/apply" 
                  variant="primary"
                  className={`w-full text-center ${isSmallScreen ? 'py-2 text-sm' : ''}`}
                  onClick={handleLinkButtonClick}
                >
                  הרשמה לקורסים
                </Button>
                <Button 
                  href="/contact" 
                  variant="secondary"
                  className={`w-full text-center ${isSmallScreen ? 'py-2 text-sm' : ''}`}
                  onClick={handleLinkButtonClick}
                >
                  צור קשר
                </Button>
              </motion.div>
            </motion.nav>
            
            {/* Bottom section with contact info and social links */}
            <motion.div 
              className={`${isSmallScreen ? 'mt-3' : 'mt-5'} flex flex-col items-center gap-3 w-full`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {/* Display academy stats if not on a small screen */}
              {!isSmallScreen && (
                <div className="w-full grid grid-cols-2 gap-2 mb-2">
                  <div className="text-center">
                    <div className="text-gold font-medium text-sm">{academyInfo.stats.graduates}+</div>
                    <div className="text-lightgrey text-xs">בוגרים</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gold font-medium text-sm">{academyInfo.stats.placementRate}%</div>
                    <div className="text-lightgrey text-xs">השמה</div>
                  </div>
                </div>
              )}
              
              {/* Contact Info with simplified display on small screens */}
              <div className="flex items-center justify-center gap-4 text-sm">
                <a 
                  href={`tel:${academyInfo.phone}`}
                  className="text-gold flex items-center gap-1 hover:text-gold/80 transition-colors"
                  onClick={stopPropagation}
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="hebrew-nums text-sm">{academyInfo.phone}</span>
                </a>
                
                <a 
                  href={`mailto:${academyInfo.email}`}
                  className="text-gold flex items-center gap-1 hover:text-gold/80 transition-colors"
                  onClick={stopPropagation}
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">{isSmallScreen ? 'אימייל' : academyInfo.email}</span>
                </a>
              </div>
              
              {/* Social Links in a compact layout */}
              <div 
                className="flex items-center space-x-reverse space-x-4 border border-lightgrey border-opacity-20 bg-charcoal/20 rounded-full py-1 px-4"
                onClick={stopPropagation}
              >
                <SocialLinks social={academyInfo.social} />
              </div>
              
              {/* Established year */}
              <div className="text-xs text-lightgrey/70">
                {academyInfo.shortName} • {academyInfo.established}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;