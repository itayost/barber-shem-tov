// src/components/academy/AcademyResults.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { academyInfo } from '@/lib/data';

const AcademyResults: React.FC = () => {
  const results = [
    {
      metric: `${academyInfo.stats.graduates}+`,
      label: 'בוגרים מצליחים',
      detail: 'מאז 2018',
      icon: '🎓',
      color: 'text-green-400'
    },
    {
      metric: `${academyInfo.stats.placementRate}%`,
      label: 'שיעור השמה',
      detail: 'תוך 3 חודשים',
      icon: '💼',
      color: 'text-blue-400'
    },
    {
      metric: '₪7,500',
      label: 'שכר התחלתי ממוצע',
      detail: 'לבוגרים שלנו',
      icon: '💰',
      color: 'text-gold'
    },
    {
      metric: '50+',
      label: 'מספרות שותפות',
      detail: 'ברחבי הארץ',
      icon: '🤝',
      color: 'text-purple-400'
    },
    {
      metric: '4.9/5',
      label: 'דירוג ממוצע',
      detail: 'מ-200+ ביקורות',
      icon: '⭐',
      color: 'text-yellow-400'
    },
    {
      metric: '100%',
      label: 'הסמכה מוכרת',
      detail: 'משרד העבודה',
      icon: '📜',
      color: 'text-orange-400'
    }
  ];

  const partners = [
    'רשת טופ סטייל',
    'American Crew',
    'איגוד הספרים',
    'משרד העבודה'
  ];

  return (
    <section className="py-20 md:py-32 bg-charcoal relative overflow-hidden" dir="rtl">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gold/20 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-h2 md:text-5xl font-bold mb-4">
            המספרים <span className="text-gold">מדברים</span>
          </h2>
          <p className="text-lightgrey text-xl max-w-2xl mx-auto">
            תוצאות מוכחות של 7 שנים של הצלחה
          </p>
        </motion.div>

        {/* Results grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, staggerChildren: 0.1 }}
        >
          {results.map((result, index) => (
            <motion.div
              key={result.label}
              className="bg-charcoal/50 backdrop-blur-sm border border-lightgrey/10 p-8 text-center hover:border-gold/30 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)"
              }}
            >
              <div className="text-5xl mb-4">{result.icon}</div>
              <div className={`text-5xl font-bold mb-2 ${result.color}`}>
                {result.metric}
              </div>
              <div className="text-offwhite font-medium text-lg mb-1">
                {result.label}
              </div>
              <div className="text-lightgrey text-sm">
                {result.detail}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Partners section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-h4 font-bold mb-8 text-gold">השותפים שלנו</h3>
          <div className="flex flex-wrap justify-center gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={partner}
                className="bg-charcoal/30 border border-lightgrey/10 px-8 py-4"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-lightgrey font-medium">{partner}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16 bg-gradient-to-r from-gold/10 to-brown/10 border border-gold/20 p-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-h3 font-bold mb-4">
            רוצה להיות חלק מהסיפור <span className="text-gold">ההצלחה</span>?
          </h3>
          <p className="text-lightgrey text-lg mb-6">
            הצטרף למאות הבוגרים שכבר בנו קריירה מצליחה
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-lightgrey/80">
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>מימון גמיש</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>מחזור חדש כל חודש</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>ייעוץ אישי חינם</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AcademyResults;