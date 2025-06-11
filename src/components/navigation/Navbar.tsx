// src/components/navigation/Navbar.tsx - Stable version without flashing
'use client';

import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import Logo from './Logo';
import DesktopNav from './DesktopNav';
import MobileMenuButton from './MobileMenuButton';
import { academyInfo } from '@/lib/data';
import { navigationConfig } from '@/config/navigation';

const MobileMenu = lazy(() => import('./MobileMenu'));

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);
  
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
  
  // Base classes
  const navbarClasses = `navbar ${isScrolled ? 'navbar-scrolled' : 'navbar-transparent'}`;
  
  return (
    <>
      <header 
        className={navbarClasses}
        dir="rtl"
      >
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-charcoal/60 to-transparent pointer-events-none transition-opacity duration-300"
          style={{ opacity: isScrolled ? 0.8 : 0.4 }}
        />
        
        {/* Container */}
        <div className="navbar-container relative z-10">
          {/* Logo */}
          <Logo 
            isScrolled={isScrolled} 
            src="/images/logos/logo.png" 
            alt={academyInfo.shortName} 
          />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
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
        <div 
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent transition-transform duration-300"
          style={{ transform: `scaleX(${isScrolled ? 1 : 0})` }}
        />
      </header>

      {/* Mobile Menu */}
      {mounted && (
        <Suspense fallback={null}>
          <MobileMenu 
            isOpen={isMobileMenuOpen} 
            onClose={closeMobileMenu}
            academyInfo={academyInfo}
            navItems={navigationConfig.mainItems}
            id="mobile-menu"
          />
        </Suspense>
      )}
    </>
  );
};

export default Navbar;