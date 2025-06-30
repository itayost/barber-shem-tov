'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Phone, Calendar } from 'lucide-react';

const WhatsAppFloat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Show tooltip after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const phoneNumber = '+972501234567';
  const whatsappMessage = encodeURIComponent('שלום, אני מעוניין/ת לקבל מידע נוסף על האקדמיה');

  const quickActions = [
    {
      icon: MessageCircle,
      label: 'התחל צ׳אט',
      href: `https://wa.me/${phoneNumber}?text=${whatsappMessage}`,
      primary: true,
    },
    {
      icon: Phone,
      label: 'התקשר אלינו',
      href: `tel:${phoneNumber}`,
      primary: false,
    },
    {
      icon: Calendar,
      label: 'קבע פגישה',
      href: '/contact#appointment',
      primary: false,
    },
  ];

  return (
    <>
      {/* Main Float Button */}
      <motion.div
        className="fixed bottom-6 left-6 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          delay: 0.5,
          duration: 0.5,
          type: 'spring',
          stiffness: 200,
        }}
      >
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="
                absolute bottom-0 left-full ml-4
                bg-black border border-gold/20
                px-4 py-2 whitespace-nowrap
              "
            >
              <span className="text-sm text-offwhite">יש שאלות? דברו איתנו</span>
              <button
                onClick={() => setShowTooltip(false)}
                className="absolute -top-2 -right-2 w-5 h-5 bg-black border border-gold/20 flex items-center justify-center"
              >
                <X className="w-3 h-3 text-gold" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Float Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            relative w-16 h-16
            bg-gold text-black
            flex items-center justify-center
            transition-all duration-500
            group overflow-hidden
            ${isOpen ? 'bg-black border border-gold' : ''}
          `}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Gold gradient effect */}
          <div
            className="
            absolute inset-0 bg-gradient-to-br from-gold-light to-gold-dark
            opacity-0 group-hover:opacity-100 transition-opacity duration-500
          "
          />

          {/* Icon */}
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <X className="w-6 h-6 text-gold" />
              </motion.div>
            ) : (
              <motion.div
                key="whatsapp"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <MessageCircle className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulse effect when closed */}
          {!isOpen && (
            <motion.div
              className="absolute inset-0 bg-gold"
              animate={{
                scale: [1, 1.5, 1.5],
                opacity: [0.3, 0, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
          )}
        </motion.button>
      </motion.div>

      {/* Quick Actions Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, originX: 0, originY: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed bottom-28 left-6 z-40"
            dir="rtl"
          >
            <div className="bg-black border border-gold/20 p-6 min-w-[280px]">
              <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">צור קשר מהיר</p>

              <div className="space-y-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <motion.a
                      key={action.label}
                      href={action.href}
                      target={action.href.startsWith('http') ? '_blank' : undefined}
                      rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`
                        flex items-center gap-4 px-4 py-3
                        transition-all duration-300
                        group relative overflow-hidden
                        ${
                          action.primary
                            ? 'bg-gold text-black hover:bg-gold-light'
                            : 'border border-gold/30 text-offwhite hover:border-gold'
                        }
                      `}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="w-5 h-5 relative z-10" />
                      <span className="text-sm font-light tracking-wider relative z-10">
                        {action.label}
                      </span>

                      {/* Hover effect for secondary buttons */}
                      {!action.primary && (
                        <div
                          className="
                          absolute inset-0 bg-gold
                          transform scale-x-0 group-hover:scale-x-100
                          transition-transform duration-500 origin-right
                        "
                        />
                      )}
                    </motion.a>
                  );
                })}
              </div>

              {/* Operating Hours */}
              <div className="mt-6 pt-4 border-t border-gold/10">
                <p className="text-xs text-lightgrey">שעות פעילות: א׳-ה׳ 09:00-20:00</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WhatsAppFloat;
