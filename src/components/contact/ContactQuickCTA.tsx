// src/components/contact/ContactQuickCTA.tsx - Styled Version
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/common/Button';

const ContactQuickCTA: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-charcoal-light/50 to-brown/10 border border-gold/20 p-8 mb-12 max-w-4xl mx-auto relative overflow-hidden"
      dir="rtl"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gold/5 opacity-50"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-right">
          <h2 className="text-2xl md:text-3xl font-bold text-gold mb-2">
            רוצה להירשם לקורס?
          </h2>
          <p className="text-lightgrey text-lg">
            מלא טופס קצר ונחזור אליך תוך 24 שעות
          </p>
        </div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            href="/apply"
            variant="primary"
            size="large"
            className="min-w-[200px] animate-shine"
          >
            למילוי טופס הרשמה
          </Button>
        </motion.div>
      </div>

      {/* Corner decoration */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brown/20 rounded-full blur-3xl"></div>
    </motion.div>
  );
};

export default ContactQuickCTA;