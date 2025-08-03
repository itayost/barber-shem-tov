// src/components/navigation/Navbar.tsx - Fixed CTA positioning
'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Logo from './Logo';
import DesktopNav from './DesktopNav';
import MobileMenuButton from './MobileMenuButton';
import MobileMenu from './MobileMenu';
import { academyInfo } from '@/lib/data';
import { navigationConfig } from '@/config/navigation';

// Luxury animation constants
const LUXURY_SPRING = { stiffness: 300, damping: 30 };

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
          backgroundColor: isScrolled ? 'rgba(26, 26, 26, 0.9)' : 'rgba(26, 26, 26, 0)',
        }}
        transition={{
          height: { duration: 0.3, ease: 'easeInOut' },
          backgroundColor: { duration: 0.3 },
        }}
        style={{
          backdropFilter: isScrolled ? 'blur(24px) saturate(200%)' : 'blur(12px) saturate(180%)',
          WebkitBackdropFilter: isScrolled
            ? 'blur(24px) saturate(200%)'
            : 'blur(12px) saturate(180%)',
        }}
      >
        {/* Gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-charcoal/60 to-transparent pointer-events-none"
          animate={{ opacity: isScrolled ? 0.8 : 0.4 }}
          transition={{ duration: 0.3 }}
        />

        {/* Container with proper flex layout */}
        <div className="navbar-container relative z-10 flex items-center justify-between h-full px-6 md:px-12">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            animate={{ scale: isScrolled ? 0.85 : 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Logo
              isScrolled={isScrolled}
              src="/images/logos/logo.png"
              alt={academyInfo.shortName}
            />
          </motion.div>

          {/* Center Navigation (Desktop only) */}
          <div className="hidden md:flex items-center justify-center flex-1 px-8">
            <DesktopNav navItems={navigationConfig.mainItems} />
          </div>

          {/* CTA Button (Desktop only) - Positioned at the end */}
          <motion.div
            className="hidden md:block flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={LUXURY_SPRING}
          >
            <Link
              href={navigationConfig.quickActions.primary.href}
              className="btn-primary px-6 py-2.5 text-sm font-semibold relative group inline-block whitespace-nowrap"
              style={{ isolation: 'isolate' }}
            >
              {/* Create a clipping container */}
              <span className="absolute inset-0 overflow-hidden rounded-[inherit]">
                {/* Luxury shine effect */}
                <motion.span
                  className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  initial={{ x: '-150%' }}
                  whileHover={{ x: '150%' }}
                  transition={{
                    duration: 0.8,
                    ease: 'easeInOut',
                  }}
                />
              </span>

              {/* Button text */}
              <span className="relative z-20">{navigationConfig.quickActions.primary.text}</span>

              {/* Pulse effect */}
              <span className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none">
                <motion.span
                  className="absolute inset-0 bg-gold/20"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </span>
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <MobileMenuButton isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />
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
