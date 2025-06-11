// src/components/navigation/Navbar.tsx - Fixed version without compact state
'use client';

import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';
import DesktopNav from './DesktopNav';
import MobileMenuButton from './MobileMenuButton';
import { academyInfo } from '@/lib/data';
import { navigationConfig } from '@/config/navigation';

// Lazy load mobile menu for better initial page load
const MobileMenu = lazy(() => import('./MobileMenu'));

// Luxury easing curves
const LUXURY_EASING = [0.25, 0.1, 0.25, 1];
const LUXURY_SPRING = { type: "spring", stiffness: 260, damping: 30 };

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  
  // Check if desktop
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);
  
  // Simple scroll handler - only checks if scrolled or not
  useEffect(() => {
    let rafId: number;
    
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        
        // Simple scroll state - scrolled or not
        setIsScrolled(currentScrollY > 50);
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Memoized callbacks
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);
  
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);
  
  // Simple navbar classes - no compact state
  const navbarClasses = `navbar ${isScrolled ? 'navbar-scrolled' : 'navbar-transparent'}`;
  
  return (
    <>
      {/* Enhanced Navbar with Motion */}
      <motion.header 
        className={navbarClasses}
        dir="rtl"
        initial={{ y: -100 }}
        animate={{ 
          y: 0,
          height: isScrolled ? 70 : 80
        }}
        transition={{
          ease: LUXURY_EASING,
          duration: 0.4
        }}
        style={{
          // Dynamic backdrop filter for luxury glass effect
          backdropFilter: `blur(${isScrolled ? 20 : 10}px)`,
          WebkitBackdropFilter: `blur(${isScrolled ? 20 : 10}px)`,
        }}
      >
        {/* Subtle gradient overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-charcoal/60 to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isScrolled ? 0.8 : 0.4 }}
          transition={{ duration: 0.6, ease: LUXURY_EASING }}
        />
        
        {/* Container with refined animations */}
        <motion.div 
          className="navbar-container relative z-10"
          animate={{
            padding: '0 1.5rem'
          }}
          transition={{ ease: LUXURY_EASING, duration: 0.3 }}
        >
          {/* Logo with scale animation */}
          <motion.div
            animate={{ scale: isScrolled ? 0.9 : 1 }}
            transition={LUXURY_SPRING}
          >
            <Logo 
              isScrolled={isScrolled} 
              src="/images/logos/logo.png" 
              alt={academyInfo.shortName} 
            />
          </motion.div>
          
          {/* Desktop Navigation - Conditionally rendered */}
          {isDesktop && (
            <motion.div
              className="flex items-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: LUXURY_EASING }}
            >
              <DesktopNav 
                navItems={navigationConfig.mainItems}
                callToAction={{
                  text: navigationConfig.quickActions.primary.text,
                  href: navigationConfig.quickActions.primary.href,
                  className: "btn-primary luxury-shine"
                }}
              />
            </motion.div>
          )}
          
          {/* Mobile Menu Button - Always visible on mobile */}
          {!isDesktop && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={LUXURY_SPRING}
            >
              <MobileMenuButton 
                isOpen={isMobileMenuOpen} 
                onClick={toggleMobileMenu}
              />
            </motion.div>
          )}
        </motion.div>
        
        {/* Bottom border with animated width */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isScrolled ? 1 : 0 }}
          transition={{ duration: 0.6, ease: LUXURY_EASING }}
        />
      </motion.header>

      {/* Mobile Menu - Rendered OUTSIDE the navbar */}
      <Suspense fallback={null}>
        <MobileMenu 
          isOpen={isMobileMenuOpen} 
          onClose={closeMobileMenu}
          academyInfo={academyInfo}
          navItems={navigationConfig.mainItems}
          id="mobile-menu"
        />
      </Suspense>
    </>
  );
};

export default Navbar;