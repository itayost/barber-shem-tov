// src/components/gallery/GalleryBottomCTA.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/common/Button';

const GalleryBottomCTA: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-brown/10 to-charcoal relative overflow-hidden" dir="rtl">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-h2 md:text-5xl font-bold mb-6 leading-tight">
              רוצה לראות <span className="text-gold">מקרוב</span>?
            </h2>
            <p className="text-lightgrey text-xl md:text-2xl mb-12 leading-relaxed">
              אין כמו לחוות את האקדמיה במו עיניך. בוא לסיור והרגש את האווירה המיוחדת
            </p>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Button
              href="/contact?tour=true"
              variant="primary"
              className="min-w-[200px] py-4 text-lg font-bold shadow-lg hover:shadow-xl"
            >
              קבע סיור באקדמיה
            </Button>
            
            <Button
              href="/courses"
              variant="secondary"
              className="min-w-[200px] py-4 text-lg"
            >
              לקורסים שלנו
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 text-sm text-lightgrey/80"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>סיור חינם</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>ללא התחייבות</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>כל יום בתיאום</span>
            </div>
          </motion.div>

          {/* Additional info */}
          <motion.div
            className="mt-16 bg-charcoal/50 backdrop-blur-sm border border-lightgrey/10 p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-h4 font-bold mb-6 text-gold">מה תראה בסיור?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-lightgrey">
              <div>
                <h4 className="font-bold mb-2">הכיתות שלנו</h4>
                <p className="text-sm">12 עמדות עבודה מאובזרות עם ציוד מקצועי</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">פגישה עם הצוות</h4>
                <p className="text-sm">הכרות עם המדריכים והתלמידים</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">ייעוץ אישי</h4>
                <p className="text-sm">התאמת מסלול לימודים אישי</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GalleryBottomCTA;