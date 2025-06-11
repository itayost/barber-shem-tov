// src/components/navigation/Navbar.tsx - Fixed version
'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';
import DesktopNav from './DesktopNav';
import MobileMenuButton from './MobileMenuButton';
import MobileMenu from './MobileMenu';
import { academyInfo } from '@/lib/data';
import { navigationConfig } from '@/config/navigation';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    // Check initial scroll position
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);
  
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);
  
  // Base classes with proper height transition
  const navbarClasses = `navbar ${isScrolled ? 'navbar-scrolled navbar-compact' : 'navbar-transparent'}`;
  
  return (
    <>
      <motion.header 
        className={navbarClasses}
        dir="rtl"
        initial={false}
        animate={{
          height: isScrolled ? 60 : 80,
          backgroundColor: isScrolled ? 'rgba(26, 26, 26, 0.9)' : 'rgba(26, 26, 26, 0)'
        }}
        transition={{
          height: { duration: 0.3, ease: "easeInOut" },
          backgroundColor: { duration: 0.3 }
        }}
        style={{
          backdropFilter: isScrolled ? 'blur(24px) saturate(200%)' : 'blur(12px) saturate(180%)',
          WebkitBackdropFilter: isScrolled ? 'blur(24px) saturate(200%)' : 'blur(12px) saturate(180%)',
        }}
      >
        {/* Gradient overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-charcoal/60 to-transparent pointer-events-none"
          animate={{ opacity: isScrolled ? 0.8 : 0.4 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Container */}
        <div className="navbar-container relative z-10">
          {/* Logo with scaling */}
          <motion.div
            animate={{ scale: isScrolled ? 0.85 : 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Logo 
              isScrolled={isScrolled} 
              src="/images/logos/logo.png" 
              alt={academyInfo.shortName} 
            />
          </motion.div>
          
          {/* Desktop Navigation - Full width flex container */}
          <div className="hidden md:flex items-center flex-1">
            <DesktopNav 
              navItems={navigationConfig.mainItems}
              callToAction={{
                text: navigationConfig.quickActions.primary.text,
                href: navigationConfig.quickActions.primary.href,
                className: "btn-primary"
              }}
            />
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <MobileMenuButton 
              isOpen={isMobileMenuOpen} 
              onClick={toggleMobileMenu}
            />
          </div>
        </div>
        
        {/* Bottom border */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isScrolled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={closeMobileMenu}
        academyInfo={academyInfo}
        navItems={navigationConfig.mainItems}
        id="mobile-menu"
      />
    </>
  );
};

export default Navbar;