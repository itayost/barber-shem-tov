'use client';

import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import Logo from './Logo';
import DesktopNav from './DesktopNav';
import MobileMenuButton from './MobileMenuButton';
import { academyInfo } from '@/lib/data';
import { navigationConfig } from '@/config/navigation';

// Lazy load mobile menu for better initial page load
const MobileMenuRefactored = lazy(() => import('./MobileMenuRefactored'));

const NavbarOptimized = () => {
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
  
  // Dynamic navbar styles
  const navbarStyles = {
    paddingTop: isScrolled ? '0.5rem' : '1rem',
    paddingBottom: isScrolled ? '0.5rem' : '1rem',
    backgroundColor: isScrolled ? 'rgba(26, 26, 26, 0.98)' : 'transparent',
    boxShadow: isScrolled ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
    backgroundImage: !isScrolled 
      ? 'linear-gradient(to bottom, rgba(26, 26, 26, 0.8) 0%, rgba(26, 26, 26, 0.6) 50%, rgba(26, 26, 26, 0) 100%)' 
      : 'none',
    backdropFilter: 'blur(5px)',
    transition: 'padding 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease'
  };
  
  return (
    <header 
      className="navbar fixed w-full z-50"
      style={navbarStyles}
      dir="rtl"
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
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
            <MobileMenuRefactored 
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

export default NavbarOptimized;