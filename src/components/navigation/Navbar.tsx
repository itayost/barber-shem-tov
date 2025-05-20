'use client';
import { useState, useEffect, useCallback } from 'react';
import Logo from './Logo';
import DesktopNav from './DesktopNav';
import MobileMenuButton from './MobileMenuButton';
import MobileMenu from './MobileMenu';
import { academyInfo } from '@/lib/data';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    // Add passive: true for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Toggle mobile menu
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prevState => !prevState);
  }, []);
  
  // Close mobile menu
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);
  
  return (
    <header 
      className={`navbar fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}
      style={{
        // Base styles
        backdropFilter: 'blur(10px)',
        
        // Dynamic styles based on scroll position
        backgroundColor: isScrolled ? 'rgba(26, 26, 26, 0.98)' : 'transparent',
        boxShadow: isScrolled ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
        backgroundImage: !isScrolled 
          ? 'linear-gradient(to bottom, rgba(26, 26, 26, 0.8) 0%, rgba(26, 26, 26, 0.6) 50%, rgba(26, 26, 26, 0) 100%)' 
          : 'none'
      }}
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
          navItems={[
            { name: 'דף הבית', path: '/' },
            { name: 'האקדמיה', path: '/academy' },
            { name: 'גלריה', path: '/gallery' },
            { name: 'קורסים', path: '/courses' },
            { name: 'צור קשר', path: '/contact' },
          ]} 
          callToAction={{
            text: "הרשמה לקורסים",
            href: "/academy",
            className: "btn-primary"
          }}
        />
        
        {/* Mobile Menu Button */}
        <MobileMenuButton 
          isOpen={isMobileMenuOpen} 
          onClick={toggleMobileMenu}
        />
        
        {/* Mobile Menu */}
        <MobileMenu 
          isOpen={isMobileMenuOpen} 
          onClose={closeMobileMenu}
          academyInfo={academyInfo}
          navItems={[
            { name: 'דף הבית', path: '/' },
            { name: 'האקדמיה', path: '/academy' },
            { name: 'גלריה', path: '/gallery' },
            { name: 'קורסים', path: '/courses' },
            { name: 'צור קשר', path: '/contact' },
          ]}
        />
      </div>
    </header>
  );
};

export default Navbar;