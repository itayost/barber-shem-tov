// src/components/navigation/Navbar.tsx - Fixed animation flashing
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
  const [isDesktop, setIsDesktop] = useState(true); // Default to true to prevent flash
  const [mounted, setMounted] = useState(false);
  
  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Check if desktop after mount
  useEffect(() => {
    if (!mounted) return;
    
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, [mounted]);
  
  // Scroll handler
  useEffect(() => {
    if (!mounted) return;
    
    let rafId: number;
    
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        setIsScrolled(currentScrollY > 50);
      });
    };
    
    // Check initial scroll position
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mounted]);
  
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);
  
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);
  
  // Prevent flash by not animating initial state
  const navbarClasses = `navbar ${isScrolled ? 'navbar-scrolled' : 'navbar-transparent'}`;
  
  return (
    <>
      <header 
        className={navbarClasses}
        dir="rtl"
        style={{
          height: isScrolled ? 70 : 80,
          transition: mounted ? 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none',
          backdropFilter: `blur(${isScrolled ? 20 : 10}px)`,
          WebkitBackdropFilter: `blur(${isScrolled ? 20 : 10}px)`,
        }}
      >
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-charcoal/60 to-transparent pointer-events-none"
          style={{
            opacity: isScrolled ? 0.8 : 0.4,
            transition: mounted ? 'opacity 0.6s ease' : 'none'
          }}
        />
        
        {/* Container */}
        <div className="navbar-container relative z-10">
          {/* Logo */}
          <div
            style={{
              transform: `scale(${isScrolled ? 0.9 : 1})`,
              transition: mounted ? 'transform 0.3s ease' : 'none'
            }}
          >
            <Logo 
              isScrolled={isScrolled} 
              src="/images/logos/logo.png" 
              alt={academyInfo.shortName} 
            />
          </div>
          
          {/* Navigation - No animation on initial render */}
          {mounted && (
            <>
              {/* Desktop Navigation */}
              <div className={`items-center gap-8 ${isDesktop ? 'flex' : 'hidden'}`}>
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
              <div className={isDesktop ? 'hidden' : 'block'}>
                <MobileMenuButton 
                  isOpen={isMobileMenuOpen} 
                  onClick={toggleMobileMenu}
                />
              </div>
            </>
          )}
        </div>
        
        {/* Bottom border */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
          style={{
            transform: `scaleX(${isScrolled ? 1 : 0})`,
            transition: mounted ? 'transform 0.6s ease' : 'none'
          }}
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