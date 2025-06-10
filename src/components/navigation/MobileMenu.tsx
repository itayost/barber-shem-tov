// src/components/navigation/MobileMenu.tsx - Luxury Enhanced Version
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
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

// Luxury animation constants
const LUXURY_EASING = [0.25, 0.1, 0.25, 1];
const LUXURY_SPRING = { type: "spring", stiffness: 400, damping: 30 };

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isOpen, 
  onClose, 
  academyInfo,
  navItems = [],
  id 
}) => {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  
  // Drag to close functionality
  const dragX = useMotionValue(0);
  const dragProgress = useTransform(dragX, [0, 300], [0, 1]);
  const opacity = useTransform(dragProgress, [0, 1], [1, 0.5]);
  
  // Mount portal
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Enhanced body scroll lock
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.cssText = `
        overflow: hidden;
        position: fixed;
        top: -${scrollY}px;
        width: 100%;
        touch-action: none;
      `;
      
      // Add class for additional styling hooks
      document.body.classList.add('menu-open');
    } else {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      document.body.classList.remove('menu-open');
      
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    
    return () => {
      document.body.style.cssText = '';
      document.body.classList.remove('menu-open');
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
          {/* Luxury Backdrop with Multi-layer Blur */}
          <motion.div
            className="fixed inset-0 z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.6,
              ease: LUXURY_EASING
            }}
            onClick={onClose}
          >
            {/* Base blur layer */}
            <div className="absolute inset-0 bg-black/75 backdrop-blur-xl" />
            
            {/* Gradient overlay for depth */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Luxury Menu Panel */}
          <motion.div
            id={id}
            className="fixed inset-y-0 right-0 z-[101] w-full max-w-sm bg-charcoal overflow-hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ 
              type: 'tween',
              duration: 0.6,
              ease: LUXURY_EASING
            }}
            style={{
              boxShadow: '-20px 0 60px rgba(0, 0, 0, 0.3)',
              opacity
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              if (offset.x > 100 || velocity.x > 500) {
                onClose();
              }
            }}
            role="dialog"
            aria-modal="true"
            aria-label="תפריט ניווט"
            dir="rtl"
          >
            {/* Subtle Pattern Overlay */}
            <div 
              className="absolute inset-0 opacity-[0.015] pointer-events-none"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 80%, rgba(201, 166, 107, 0.15) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(201, 166, 107, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 1px 1px, rgba(201, 166, 107, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '100% 100%, 100% 100%, 20px 20px'
              }}
            />

            <div className="relative h-full flex flex-col">
              {/* Elegant Header with Parallax */}
              <motion.div 
                className="px-8 py-6 border-b border-gold/10"
                style={{ x: useTransform(dragX, [0, 300], [0, -50]) }}
              >
                <motion.div 
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5, ease: LUXURY_EASING }}
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
                    className="p-3 -mr-3 rounded-full hover:bg-gold/5 transition-all duration-300"
                    onClick={onClose}
                    aria-label="סגור תפריט"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    transition={LUXURY_SPRING}
                  >
                    <svg className="w-5 h-5 text-gold/70 hover:text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </motion.div>

                {/* Live Status Indicator */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="flex items-center gap-2 mt-3"
                >
                  <div className={`w-2 h-2 rounded-full ${
                    academyInfo.isOpenDay(new Date().getDay()) ? 'bg-green-400' : 'bg-red-400'
                  } animate-pulse`} />
                  <span className="text-xs text-lightgrey/70">
                    {academyInfo.isOpenDay(new Date().getDay()) ? 'פתוח כעת' : 'סגור כעת'}
                  </span>
                </motion.div>
              </motion.div>

              {/* Scrollable Navigation */}
              <div className="flex-1 overflow-y-auto overscroll-contain">
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
                            delay: 0.2 + (index * 0.08),
                            duration: 0.5,
                            ease: LUXURY_EASING
                          }}
                        >
                          <Link 
                            href={item.path}
                            className={`
                              block py-4 px-4 -mx-4 text-lg font-light tracking-wide
                              transition-all duration-300 rounded-lg
                              ${isActive 
                                ? 'text-gold bg-gold/5' 
                                : 'text-offwhite/80 hover:text-gold hover:bg-gold/5'
                              }
                            `}
                            onClick={onClose}
                          >
                            <div className="flex items-center justify-between">
                              <span>{item.name}</span>
                              {isActive && (
                                <motion.div
                                  initial={{ scale: 0, rotate: -180 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  transition={LUXURY_SPRING}
                                >
                                  <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </motion.div>
                              )}
                            </div>
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>

                {/* CTA Section */}
                <motion.div 
                  className="px-8 pb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5, ease: LUXURY_EASING }}
                >
                  <Link
                    href="/contact"
                    onClick={onClose}
                    className="block w-full bg-gradient-to-r from-gold to-gold-light text-charcoal py-4 text-center font-medium tracking-wide hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
                  >
                    <span className="relative z-10">הרשמה לקורסים</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-gold-light to-gold"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                  </Link>
                </motion.div>
              </div>

              {/* Elegant Footer */}
              <motion.div 
                className="px-8 py-6 border-t border-gold/10 bg-charcoal-light/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                style={{ x: useTransform(dragX, [0, 300], [0, -30]) }}
              >
                <div className="flex items-center justify-between">
                  <a 
                    href={`tel:${academyInfo.phone}`}
                    className="flex items-center gap-2 text-gold/80 hover:text-gold transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-sm hebrew-nums">{academyInfo.phone}</span>
                  </a>
                  
                  <div className="flex gap-4">
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
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Drag Handle Indicator */}
            <motion.div 
              className="absolute left-2 top-1/2 -translate-y-1/2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 0.3, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="w-1 h-16 bg-gold/20 rounded-full" />
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