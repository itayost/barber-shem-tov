// src/components/courses/ComparisonTable.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { courses } from '@/lib/data';

const ComparisonTable: React.FC = () => {
  const beginnerCourse = courses.find(c => c.category === 'beginner');
  const advancedCourse = courses.find(c => c.category === 'advanced');

  const comparisonPoints = [
    {
      title: 'רמת הקורס',
      beginner: 'מתחילים - ללא ניסיון קודם',
      advanced: 'מתקדמים - עם ניסיון בסיסי'
    },
    {
      title: 'משך הקורס',
      beginner: beginnerCourse?.duration_he || '3 חודשים',
      advanced: advancedCourse?.duration_he || '2 חודשים'
    },
    {
      title: 'תעודה',
      beginner: 'תעודת הסמכה בסיסית',
      advanced: 'תעודת מומחה מתקדם'
    },
    {
      title: 'תרגול מעשי',
      beginner: '20+ לקוחות אמיתיים',
      advanced: '30+ לקוחות VIP'
    },
    {
      title: 'סדנאות',
      beginner: 'סדנאות בסיסיות',
      advanced: 'סדנאות עם מומחים בינלאומיים'
    },
    {
      title: 'ליווי תעסוקתי',
      beginner: 'ליווי בחיפוש עבודה',
      advanced: 'ליווי בהקמת עסק עצמאי'
    },
    {
      title: 'השקעה',
      beginner: `${beginnerCourse?.price.toLocaleString()}₪`,
      advanced: `${advancedCourse?.price.toLocaleString()}₪`
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-brown/5 to-charcoal relative overflow-hidden" dir="rtl">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gold/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-brown/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced section header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-h2 md:text-4xl font-bold mb-4">
            השוואה בין <span className="text-gold">הקורסים</span>
          </h2>
          <p className="text-lightgrey text-xl max-w-2xl mx-auto">
            בחר את הקורס המתאים לרמה שלך ולמטרות הקריירה שלך
          </p>
        </motion.div>

        {/* Enhanced comparison table */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Enhanced course cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-charcoal to-charcoal/80 border border-lightgrey/10 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4"></div>
              <h3 className="text-xl font-bold text-gold mb-4">למתחילים</h3>
              <p className="text-lightgrey mb-6">
                מתאים למי שרוצה להתחיל קריירה חדשה בספרות
              </p>
              <ul className="space-y-3">
                {comparisonPoints.map((point, index) => (
                  <motion.li 
                    key={index} 
                    className="text-lightgrey group"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-gold font-bold group-hover:text-gold/80 transition-colors">{point.title}:</span>
                    <span className="mr-2"> {point.beginner}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Enhanced quick decision helper */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-gold/20 to-brown/10 border border-gold/20 p-6 rounded-lg flex flex-col justify-center shadow-xl"
            >
              <div className="text-4xl mb-4 text-center"></div>
              <h3 className="text-xl font-bold text-gold mb-4 text-center">איך לבחור?</h3>
              <div className="space-y-4">
                <motion.div 
                  className="bg-charcoal/50 p-4 rounded-lg border border-gold/10 hover:border-gold/30 transition-all"
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="font-bold text-offwhite mb-2 flex items-center gap-2">
                    בחר קורס למתחילים אם:
                  </h4>
                  <ul className="text-lightgrey text-sm space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-gold">•</span>
                      <span>אין לך ניסיון קודם בספרות</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-gold">•</span>
                      <span>אתה רוצה ללמוד את הבסיס</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-gold">•</span>
                      <span>אתה מעדיף קצב למידה הדרגתי</span>
                    </li>
                  </ul>
                </motion.div>
                <motion.div 
                  className="bg-charcoal/50 p-4 rounded-lg border border-gold/10 hover:border-gold/30 transition-all"
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="font-bold text-offwhite mb-2 flex items-center gap-2">
                    בחר קורס מתקדם אם:
                  </h4>
                  <ul className="text-lightgrey text-sm space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-gold">•</span>
                      <span>יש לך ניסיון בסיסי בספרות</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-gold">•</span>
                      <span>אתה רוצה להתמקצע</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-gold">•</span>
                      <span>אתה מעוניין להקים עסק עצמאי</span>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-charcoal to-charcoal/80 border border-lightgrey/10 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4"></div>
              <h3 className="text-xl font-bold text-gold mb-4">מתקדמים</h3>
              <p className="text-lightgrey mb-6">
                מתאים לספרים עם ניסיון שרוצים להתמקצע
              </p>
              <ul className="space-y-3">
                {comparisonPoints.map((point, index) => (
                  <motion.li 
                    key={index} 
                    className="text-lightgrey group"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-gold font-bold group-hover:text-gold/80 transition-colors">{point.title}:</span>
                    <span className="mr-2"> {point.advanced}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Enhanced bottom CTA */}
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-lightgrey mb-4">
              עדיין לא בטוח איזה קורס מתאים לך?
            </p>
            <motion.a
              href="/contact?consultation=true"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gold to-gold/80 text-charcoal py-3 px-6 font-bold hover:from-gold/90 hover:to-gold/70 transition-all rounded-lg shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              קבל ייעוץ אישי חינם
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;