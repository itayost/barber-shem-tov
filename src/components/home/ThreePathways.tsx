// src/components/home/ThreePathways.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/common/Button';
import PathwayCard from '@/components/home/PathwayCard';
import { courses } from '@/lib/data';

const ThreePathways: React.FC = () => {
  // Map courses to pathway format
  const pathways = courses.slice(0, 3).map((course, index) => ({
    id: course.id,
    title: course.name_he,
    subtitle: course.category === 'beginner'
      ? 'התחלה מהבסיס'
      : course.category === 'advanced'
      ? 'העמקה והתמחות'
      : 'ניהול עסק משלך',
    duration: course.duration_he,
    price: course.price,
    description: course.description_he,
    features: [
      'הכשרה מעשית על לקוחות אמיתיים',
      'ציוד מקצועי מלא כלול בקורס',
      'ליווי אישי עד למציאת עבודה',
      'אפשרות התמחות בסלונים מובילים'
    ],
    icon: index === 0 ? '✂️' : index === 1 ? '💈' : '💼',
    popular: index === 1, // Middle card is most popular
    nextStep: 'הירשם עכשיו',
    instructor: 'בר שם טוב',
    nextSession: 'ינואר 2025',
    prerequisites: course.prerequisites,
    certification: 'תעודה ממשרד העבודה'
  }));

  return (
    <section className="py-16 md:py-24 bg-black relative overflow-hidden" dir="rtl">
      {/* Subtle pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(201, 166, 107, 0.1) 40px, rgba(201, 166, 107, 0.1) 80px)'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        {/* Section header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Pre-title */}
          <p className="text-gold text-sm tracking-wider uppercase mb-3">
            אקדמיית בר שם טוב
          </p>
          
          <h2 className="text-3xl md:text-5xl font-bold text-offwhite mb-4">
            המסלולים שלנו
          </h2>
          
          <p className="text-lightgrey text-lg max-w-2xl mx-auto">
            בחר את המסלול המתאים לך ותתחיל את הקריירה שלך בעולם הספרות
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {pathways.map((pathway, index) => (
            <motion.div
              key={pathway.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5,
                delay: 0.1 * index,
              }}
            >
              <PathwayCard pathway={pathway} />
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="text-center p-4 bg-charcoal border border-gold/10">
            <div className="text-2xl font-bold text-gold mb-1">15+</div>
            <div className="text-xs text-lightgrey">שנות ניסיון</div>
          </div>
          <div className="text-center p-4 bg-charcoal border border-gold/10">
            <div className="text-2xl font-bold text-gold mb-1">500+</div>
            <div className="text-xs text-lightgrey">בוגרים מצליחים</div>
          </div>
          <div className="text-center p-4 bg-charcoal border border-gold/10">
            <div className="text-2xl font-bold text-gold mb-1">95%</div>
            <div className="text-xs text-lightgrey">השמה בעבודה</div>
          </div>
          <div className="text-center p-4 bg-charcoal border border-gold/10">
            <div className="text-2xl font-bold text-gold mb-1">100%</div>
            <div className="text-xs text-lightgrey">שביעות רצון</div>
          </div>
        </motion.div>

        {/* CTA section */}
        <motion.div 
          className="text-center bg-charcoal border border-gold/20 p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-offwhite mb-4">
            לא בטוח איזה מסלול מתאים לך?
          </h3>
          <p className="text-lightgrey mb-6 max-w-xl mx-auto">
            צוות הייעוץ שלנו כאן כדי לעזור לך לבחור את המסלול המושלם עבורך
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              href="/contact?consultation=true" 
              variant="primary"
              size="large"
              className="min-w-[200px]"
            >
              קבל ייעוץ חינם
            </Button>
            
            <div className="flex items-center gap-4">
              <span className="text-lightgrey">או</span>
              <a 
                href="tel:+972528691415" 
                className="text-gold hover:text-gold/80 transition-colors flex items-center gap-2"
              >
                <span>📞</span>
                <span className="font-medium">052-869-1415</span>
              </a>
            </div>
          </div>
          
          <p className="text-xs text-lightgrey/60 mt-4">
            שעות פעילות: א׳-ה׳ 9:00-20:00
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ThreePathways;