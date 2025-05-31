'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavItem } from '@/config/navigation';

interface MobileMenuSlideProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

const MobileMenuSlide: React.FC<MobileMenuSlideProps> = ({ isOpen, onClose, navItems }) => {
  // Slide animation variants
  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    }
  };

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={backdropVariants}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={onClose}
          />
          
          {/* Sliding menu panel */}
          <motion.nav
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-charcoal shadow-2xl z-50 md:hidden"
            dir="rtl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gold/20">
              <h2 className="text-xl font-bold text-gold">תפריט</h2>
              <button
                onClick={onClose}
                className="p-2 text-offwhite hover:text-gold transition-colors"
                aria-label="סגור תפריט"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Navigation items */}
            <div className="py-6">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.path}
                  href={item.path}
                  className="flex items-center gap-3 px-6 py-4 text-offwhite hover:text-gold hover:bg-gold/5 transition-all"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  onClick={onClose}
                >
                  {item.icon && <span className="text-xl">{item.icon}</span>}
                  <span className="font-medium">{item.name}</span>
                  <svg className="w-4 h-4 mr-auto opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.a>
              ))}
            </div>
            
            {/* Quick actions */}
            <div className="p-6 border-t border-gold/20">
              <a
                href="/contact"
                className="block w-full text-center bg-gold text-charcoal py-3 px-6 font-bold hover:bg-gold/90 transition-colors mb-3"
                onClick={onClose}
              >
                הרשמה לקורסים
              </a>
              <a
                href="https://wa.me/972528691415"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-green-400 hover:text-green-300 transition-colors"
              >
                <span>💬</span>
                <span>WhatsApp</span>
              </a>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenuSlide;