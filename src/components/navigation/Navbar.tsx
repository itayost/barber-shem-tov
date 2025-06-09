'use client';

import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import Logo from './Logo';
import DesktopNav from './DesktopNav';
import MobileMenuButton from './MobileMenuButton';
import { academyInfo } from '@/lib/data';
import { navigationConfig } from '@/config/navigation';

// Lazy load mobile menu for better initial page load
const MobileMenu = lazy(() => import('./MobileMenu'));

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Optimized scroll handler with RAF
  useEffect(() => {
    let rafId: number;
    let lastScrollY = 0;
    
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        // Only update if crossing the threshold
        if ((lastScrollY <= 50 && currentScrollY > 50) || 
            (lastScrollY > 50 && currentScrollY <= 50)) {
          setIsScrolled(currentScrollY > 50);
        }
        lastScrollY = currentScrollY;
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
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
  
  // Use classes from menu.css instead of inline styles
  const navbarClasses = `navbar ${isScrolled ? 'navbar-scrolled' : 'navbar-transparent'}`;
  
  return (
    <header 
      className={navbarClasses}
      dir="rtl"
    >
      <div className="navbar-container">
        {/* Logo */}
        <Logo 
          isScrolled={isScrolled} 
          src="/images/logos/logo.png" 
          alt={academyInfo.shortName} 
        />
        
        {/* Desktop Navigation */}
        <DesktopNav 
          navItems={navigationConfig.mainItems}
          callToAction={{
            text: navigationConfig.quickActions.primary.text,
            href: navigationConfig.quickActions.primary.href,
            className: "btn-primary"
          }}
        />
        
        {/* Mobile Menu Button */}
        <MobileMenuButton 
          isOpen={isMobileMenuOpen} 
          onClick={toggleMobileMenu}
        />
        
        {/* Lazy-loaded Mobile Menu */}
        <Suspense fallback={null}>
          {isMobileMenuOpen && (
            <MobileMenu 
              isOpen={isMobileMenuOpen} 
              onClose={closeMobileMenu}
              academyInfo={academyInfo}
              navItems={navigationConfig.mainItems}
              id="mobile-menu"
            />
          )}
        </Suspense>
      </div>
    </header>
  );
};

export default Navbar;