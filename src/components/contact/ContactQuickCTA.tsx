// src/components/contact/ContactQuickCTA.tsx
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
      className="bg-gradient-to-r from-gold/10 to-brown/10 border border-gold/20 p-6 rounded-xl mb-12 max-w-4xl mx-auto"
      dir="rtl"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-right">
          <h2 className="text-2xl font-bold text-gold mb-2">
            רוצה להירשם לקורס?
          </h2>
          <p className="text-lightgrey">
            מלא טופס קצר ונחזור אליך תוך 24 שעות
          </p>
        </div>
        <Button
          href="/apply"
          variant="primary"
          size="large"
          className="min-w-[200px]"
        >
          למילוי טופס הרשמה
        </Button>
      </div>
    </motion.div>
  );
};

export default ContactQuickCTA;