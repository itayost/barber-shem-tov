'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { LuxuryButton } from '@/components/luxury';

interface NavItem {
  label: string;
  href: string;
  isButton?: boolean;
}

const navItems: NavItem[] = [
  { label: 'בית', href: '/' },
  { label: 'אודות', href: '/about' },
  { label: 'האקדמיה', href: '/academy' },
  { label: 'קורסים', href: '/courses' },
  { label: 'גלריה', href: '/gallery' },
  { label: 'צור קשר', href: '/contact' },
  { label: 'הרשמה', href: '/apply', isButton: true },
];

const LuxuryNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Main Navigation */}
      <motion.nav
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-700
          ${isScrolled ? 'bg-black/95 backdrop-blur-md border-b border-gold/10' : 'bg-transparent'}
        `}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        dir="rtl"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <Link href="/" className="relative z-10">
              <motion.div
                whileHover={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex items-center"
              >
                <span className="text-2xl md:text-3xl font-thin text-offwhite tracking-wider">
                  THE <span className="text-gold">FADER</span>
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8 xl:gap-12">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  {item.isButton ? (
                    <LuxuryButton variant="primary" size="small" href={item.href}>
                      {item.label}
                    </LuxuryButton>
                  ) : (
                    <Link
                      href={item.href}
                      className="
                        text-sm font-light uppercase tracking-[0.2em]
                        text-offwhite hover:text-gold
                        transition-all duration-500
                        relative group
                      "
                    >
                      {item.label}
                      <span
                        className="
                        absolute -bottom-2 left-0 right-0 h-px
                        bg-gold transform scale-x-0 group-hover:scale-x-100
                        transition-transform duration-500 origin-center
                      "
                      />
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative z-10 p-2"
              aria-label="תפריט"
            >
              <motion.div
                animate={isMobileMenuOpen ? 'open' : 'closed'}
                className="w-8 h-8 flex items-center justify-center"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <X className="w-6 h-6 text-gold" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Menu className="w-6 h-6 text-offwhite" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="
                fixed top-0 right-0 bottom-0 w-full sm:w-80
                bg-black border-l border-gold/20
                z-40 lg:hidden overflow-y-auto
              "
              dir="rtl"
            >
              <div className="pt-24 pb-8 px-8">
                {/* Mobile Navigation Items */}
                <div className="space-y-6">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                    >
                      {item.isButton ? (
                        <LuxuryButton
                          variant="primary"
                          fullWidth
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
                        </LuxuryButton>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="
                            block text-xl font-light uppercase tracking-[0.2em]
                            text-offwhite hover:text-gold
                            transition-colors duration-500
                            py-2
                          "
                        >
                          {item.label}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Mobile Menu Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="mt-16 pt-8 border-t border-gold/20"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">
                    The Fader Academy
                  </p>
                  <p className="text-sm text-lightgrey font-light">מאז 2018</p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default LuxuryNavbar;
