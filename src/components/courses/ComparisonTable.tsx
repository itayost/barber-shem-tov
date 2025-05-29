// src/components/courses/ComparisonTable.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { courses } from '@/lib/data';

const ComparisonTable: React.FC = () => {
  // Enhanced comparison data
  const comparisonData = [
    {
      feature: 'רמת הקורס',
      beginner: 'מתחילים ללא ניסיון',
      advanced: 'מקצוענים עם בסיס',
      icon: '🎯'
    },
    {
      feature: 'משך הקורס',
      beginner: '4 שבועות מלאים',
      advanced: '2 ימי סדנה אינטנסיבית',
      icon: '⏰'
    },
    {
      feature: 'מחיר',
      beginner: '₪3,200',
      advanced: '₪1,800',
      icon: '💰'
    },
    {
      feature: 'גודל הקבוצה',
      beginner: 'עד 12 משתתפים',
      advanced: 'עד 8 משתתפים',
      icon: '👥'
    },
    {
      feature: 'עבודה עם לקוחות',
      beginner: '20+ לקוחות אמיתיים',
      advanced: 'לקוחות VIP ויוקרה',
      icon: '✂️'
    },
    {
      feature: 'תעודה',
      beginner: 'תעודת יסודות הספרות',
      advanced: 'תעודת מומחה מתקדם',
      icon: '🏆'
    },
    {
      feature: 'כלים וציוד',
      beginner: 'ערכת כלים כלולה',
      advanced: 'גישה לכלים מתקדמים',
      icon: '🛠️'
    },
    {
      feature: 'ליווי אחרי הקורס',
      beginner: 'ליווי בחיפוש עבודה',
      advanced: 'רשת קשרים מקצועית',
      icon: '🤝'
    },
    {
      feature: 'הזדמנויות תעסוקה',
      beginner: 'מספרות רגילות ברחבי הארץ',
      advanced: 'מספרות יוקרה ועבודה עצמאית',
      icon: '💼'
    },
    {
      feature: 'שכר צפוי',
      beginner: '₪6,000-9,000/חודש',
      advanced: '₪9,000-15,000/חודש',
      icon: '📈'
    }
  ];

  const beginnerCourse = courses.find(c => c.category === 'beginner');
  const advancedCourse = courses.find(c => c.category === 'advanced');

  return (
    <section className="py-20 bg-brown/5 relative overflow-hidden" dir="rtl">
      <div className="container mx-auto px-6">
        {/* Section header */}
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

        {/* Comparison table */}
        <motion.div 
          className="max-w-5xl mx-auto bg-charcoal border border-lightgrey/10 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Table header */}
          <div className="grid grid-cols-1 md:grid-cols-3 bg-gradient-to-r from-gold/20 to-brown/20 border-b border-lightgrey/10">
            <div className="p-6 border-b md:border-b-0 md:border-l border-lightgrey/10">
              <h3 className="text-h4 font-bold text-center">השוואת תכונות</h3>
            </div>
            <div className="p-6 border-b md:border-b-0 md:border-l border-lightgrey/10 bg-green-500/10">
              <div className="text-center">
                <div className="text-2xl mb-2">🎯</div>
                <h3 className="text-h4 font-bold text-green-400 mb-2">קורס למתחילים</h3>
                <div className="text-sm text-lightgrey">הכי פופולרי למתחילים</div>
              </div>
            </div>
            <div className="p-6 bg-blue-500/10">
              <div className="text-center">
                <div className="text-2xl mb-2">⚡</div>
                <h3 className="text-h4 font-bold text-blue-400 mb-2">קורס מתקדמים</h3>
                <div className="text-sm text-lightgrey">לבעלי ניסיון</div>
              </div>
            </div>
          </div>

          {/* Table rows */}
          {comparisonData.map((row, index) => (
            <motion.div 
              key={row.feature}
              className="grid grid-cols-1 md:grid-cols-3 border-b border-lightgrey/10 hover:bg-lightgrey/5 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div className="p-6 border-b md:border-b-0 md:border-l border-lightgrey/10 bg-charcoal/50">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{row.icon}</span>
                  <span className="font-bold text-offwhite">{row.feature}</span>
                </div>
              </div>
              <div className="p-6 border-b md:border-b-0 md:border-l border-lightgrey/10">
                <div className="text-lightgrey">{row.beginner}</div>
              </div>
              <div className="p-6">
                <div className="text-lightgrey">{row.advanced}</div>
              </div>
            </motion.div>
          ))}

          {/* CTA row */}
          <div className="grid grid-cols-1 md:grid-cols-3 bg-gradient-to-r from-charcoal to-brown/10">
            <div className="p-6 border-b md:border-b-0 md:border-l border-lightgrey/10">
              <div className="text-center">
                <h4 className="font-bold text-gold mb-2">מוכן להתחיל?</h4>
                <p className="text-sm text-lightgrey">בחר את הקורס המתאים לך</p>
              </div>
            </div>
            <div className="p-6 border-b md:border-b-0 md:border-l border-lightgrey/10">
              <motion.a
                href={`/contact?course=${encodeURIComponent(beginnerCourse?.name_he || 'קורס מתחילים')}`}
                className="block w-full bg-green-500 text-white py-3 px-4 font-bold text-center hover:bg-green-600 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                🚀 הרשמה למתחילים
              </motion.a>
            </div>
            <div className="p-6">
              <motion.a
                href={`/contact?course=${encodeURIComponent(advancedCourse?.name_he || 'קורס מתקדמים')}`}
                className="block w-full bg-blue-500 text-white py-3 px-4 font-bold text-center hover:bg-blue-600 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                ⚡ הרשמה למתקדמים
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Quick decision helper */}
        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-charcoal border border-green-500/30 p-8 text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-h4 font-bold text-green-400 mb-4">מתאים לך אם:</h3>
            <ul className="text-lightgrey space-y-2">
              <li>✓ אין לך ניסיון בספרות</li>
              <li>✓ רוצה ללמוד מהבסיס</li>
              <li>✓ מחפש קריירה יציבה</li>
              <li>✓ רוצה הכשרה מקיפה</li>
            </ul>
          </div>
          
          <div className="bg-charcoal border border-blue-500/30 p-8 text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-h4 font-bold text-blue-400 mb-4">מתאים לך אם:</h3>
            <ul className="text-lightgrey space-y-2">
              <li>✓ יש לך ניסיון בסיסי</li>
              <li>✓ רוצה להתמחות בטכניקות מתקדמות</li>
              <li>✓ מעוניין בלקוחות VIP</li>
              <li>✓ רוצה השתלמות מהירה</li>
            </ul>
          </div>
        </motion.div>

        {/* Still unsure CTA */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-lightgrey mb-4 text-lg">עדיין לא בטוח איזה קורס מתאים לך?</p>
          <motion.a
            href="/contact?consultation=true"
            className="inline-flex items-center gap-2 bg-gold text-charcoal py-4 px-8 font-bold text-lg hover:bg-gold/90 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            💬 קבל ייעוץ אישי חינם
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ←
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonTable;