// src/components/courses/CoursesCTA.tsx - Updated
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/common/Button';

const CoursesCTA: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-charcoal to-black" dir="rtl">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto text-center bg-charcoal border border-gold/20 p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Icon */}
          <div className="text-6xl mb-6">🚀</div>
          
          {/* Headline */}
          <h2 className="text-3xl md:text-4xl font-bold text-offwhite mb-4">
            מוכן להתחיל את המסע שלך?
          </h2>
          
          <p className="text-lightgrey text-lg mb-8 max-w-2xl mx-auto">
            הצטרף למאות הבוגרים המצליחים שלנו ותתחיל לבנות קריירה מצליחה בעולם הספרות
          </p>

          {/* CTAs - Updated to use /apply */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              href="/apply" 
              variant="primary"
              size="large"
              className="min-w-[200px]"
            >
              הרשמה לקורס
            </Button>
            
            <span className="text-lightgrey/40">או</span>
            
            <Button 
              href="/contact?consultation=true" 
              variant="secondary"
              size="large"
              className="min-w-[200px]"
            >
              ייעוץ חינם
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-lightgrey/60">
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>טופס קצר</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>מענה תוך 24 שעות</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>ללא התחייבות</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CoursesCTA;