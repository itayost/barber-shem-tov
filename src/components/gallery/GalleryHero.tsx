// src/components/gallery/GalleryHero.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GalleryHeroProps {
  totalImages: number;
}

const GalleryHero: React.FC<GalleryHeroProps> = ({ totalImages }) => {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-charcoal to-brown/10 relative overflow-hidden" dir="rtl">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-brown rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-8"
          >
            <div className="bg-gold/10 border border-gold/30 px-6 py-2 text-gold font-medium">
              📸 {totalImages} תמונות מחיי האקדמיה
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-h1 md:text-6xl font-bold mb-6"
          >
            הציצו לעולם <span className="text-gold">האקדמיה שלנו</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lightgrey text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            מהכיתות המאובזרות, דרך עבודות מרשימות של תלמידים, 
            ועד לסיפורי הצלחה של בוגרים - הכל כאן בתמונה אחת
          </motion.p>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 text-lightgrey text-sm"
          >
            <p>גלול למטה לחקור את הגלריה</p>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-2"
            >
              ↓
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GalleryHero;