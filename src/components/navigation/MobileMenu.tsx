// src/components/navigation/MobileMenu.tsx - Enhanced Luxury Version
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { AcademyInfo } from '@/types';
import { NavItem } from '@/config/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  academyInfo: AcademyInfo;
  navItems?: NavItem[];
  id?: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isOpen, 
  onClose, 
  academyInfo,
  navItems = [],
  id 
}) => {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  
  // Mount portal
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  // ESC key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const menuContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="md:hidden">
          {/* Luxury Backdrop with Enhanced Blur */}
          <motion.div
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1] // Luxury easing curve
            }}
            onClick={onClose}
          >
            {/* Subtle gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
          </motion.div>

          {/* Luxury Menu Panel with Enhanced Shadow */}
          <motion.div
            id={id}
            className="fixed inset-y-0 right-0 z-[101] w-full max-w-sm bg-charcoal"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ 
              type: 'tween',
              duration: 0.6, // Slightly slower for luxury feel
              ease: [0.25, 0.1, 0.25, 1] // Custom luxury easing
            }}
            style={{
              boxShadow: '0 0 50px 0 rgba(0, 0, 0, 0.5)' // Deeper shadow
            }}
            role="dialog"
            aria-modal="true"
            aria-label="תפריט ניווט"
            dir="rtl"
          >
            {/* Subtle Background Pattern */}
            <div 
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(201, 166, 107, 0.5) 1px, transparent 1px)`,
                backgroundSize: '24px 24px'
              }}
            />

            {/* Elegant Header */}
            <div className="relative px-8 py-6 border-b border-gold/20">
              <motion.div 
                className="flex items-center justify-between"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Image 
                  src="/images/logos/logo.png"
                  alt={academyInfo.shortName}
                  width={140}
                  height={35}
                  className="h-8 w-auto object-contain"
                  priority
                />
                
                <motion.button 
                  className="p-3 -mr-2 rounded-full hover:bg-gold/10 transition-all duration-300"
                  onClick={onClose}
                  aria-label="סגור תפריט"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <svg className="w-5 h-5 text-gold/80 hover:text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </motion.div>
            </div>

            {/* Clean Navigation */}
            <nav className="px-8 py-8">
              <ul className="space-y-1">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.path || 
                    (item.path !== '/' && pathname?.startsWith(item.path));
                  
                  return (
                    <motion.li
                      key={item.path}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: index * 0.08,
                        duration: 0.5,
                        ease: [0.25, 0.1, 0.25, 1]
                      }}
                    >
                      <Link 
                        href={item.path}
                        className={`
                          block py-4 text-lg font-light tracking-wide
                          transition-all duration-300
                          ${isActive 
                            ? 'text-gold' 
                            : 'text-offwhite/80 hover:text-gold'
                          }
                        `}
                        onClick={onClose}
                      >
                        {item.name}
                        {isActive && (
                          <motion.div 
                            className="h-px bg-gold/50 mt-2"
                            initial={{ width: 0 }}
                            animate={{ width: '30px' }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Elegant CTA */}
            <motion.div 
              className="px-8 py-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Link
                href="/contact"
                onClick={onClose}
                className="block w-full bg-gold text-charcoal py-4 text-center font-medium tracking-wide hover:bg-gold/90 transition-colors duration-300"
              >
                הרשמה לקורסים
              </Link>
            </motion.div>

            {/* Minimal Footer */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 px-8 py-8 border-t border-gold/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="text-center space-y-3">
                <a 
                  href={`tel:${academyInfo.phone}`}
                  className="block text-gold/80 hover:text-gold transition-colors hebrew-nums"
                >
                  {academyInfo.phone}
                </a>
                
                <div className="flex justify-center gap-6">
                  {academyInfo.social.instagram && (
                    <a 
                      href={academyInfo.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lightgrey/50 hover:text-gold transition-colors"
                      aria-label="Instagram"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                      </svg>
                    </a>
                  )}
                  
                  {academyInfo.social.facebook && (
                    <a 
                      href={academyInfo.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lightgrey/50 hover:text-gold transition-colors"
                      aria-label="Facebook"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                  )}
                </div>
                
                <p className="text-xs text-lightgrey/30 pt-4">
                  © {new Date().getFullYear()} {academyInfo.shortName}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;
  
  return createPortal(
    menuContent,
    document.body
  );
};

export default MobileMenu;