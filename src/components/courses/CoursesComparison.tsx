// src/components/courses/CoursesComparison.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/common/Button';

const CoursesComparison: React.FC = () => {
  const comparisonData = {
    beginner: {
      title: 'קורס למתחילים',
      icon: '📚',
      ideal: 'מתאים למי שרוצה להתחיל קריירה חדשה',
      duration: '4 שבועות אינטנסיביים',
      outcome: 'מוכן לעבודה כספר מתחיל',
      support: 'ליווי במציאת עבודה ראשונה',
      color: 'gold'
    },
    advanced: {
      title: 'קורס מתקדמים',
      icon: '🎓',
      ideal: 'מתאים לספרים עם ניסיון בסיסי',
      duration: '2 שבועות מרוכזים',
      outcome: 'מומחה בטכניקות מתקדמות',
      support: 'ייעוץ להקמת עסק עצמאי',
      color: 'gold'
    }
  };

  return (
    <section className="py-20 bg-black relative overflow-hidden" dir="rtl">
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(45deg, transparent 48%, rgba(201, 166, 107, 0.1) 50%, transparent 52%)'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-light text-offwhite mb-4">
            איך לבחור את <span className="font-normal text-gold">המסלול הנכון</span>?
          </h2>
        </motion.div>

        {/* Comparison cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {Object.entries(comparisonData).map(([key, data], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-charcoal border border-gold/20 p-8 hover:border-gold/40 transition-all"
            >
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">{data.icon}</div>
                <h3 className="text-2xl font-bold text-gold mb-2">{data.title}</h3>
                <p className="text-lightgrey/80 text-sm">{data.ideal}</p>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-gold mt-0.5">⏱</span>
                  <div>
                    <div className="font-medium text-offwhite">משך הקורס</div>
                    <div className="text-lightgrey/70">{data.duration}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-gold mt-0.5">🎯</span>
                  <div>
                    <div className="font-medium text-offwhite">תוצאה צפויה</div>
                    <div className="text-lightgrey/70">{data.outcome}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-gold mt-0.5">🤝</span>
                  <div>
                    <div className="font-medium text-offwhite">תמיכה</div>
                    <div className="text-lightgrey/70">{data.support}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-lightgrey mb-6">
            עדיין לא בטוח? נשמח לעזור לך לבחור
          </p>
          <Button 
            href="/contact?consultation=true" 
            variant="secondary"
            size="large"
          >
            קבל ייעוץ אישי חינם
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CoursesComparison;