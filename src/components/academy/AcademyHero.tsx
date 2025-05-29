// src/components/academy/AcademyHero.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { academyInfo } from '@/lib/data';
import Button from '@/components/common/Button';

const AcademyHero: React.FC = () => {
  const stats = [
    { number: academyInfo.established, label: 'שנת ייסוד', icon: '🏛️' },
    { number: `${academyInfo.stats.graduates}+`, label: 'בוגרים מצליחים', icon: '🎓' },
    { number: `${academyInfo.stats.placementRate}%`, label: 'שיעור השמה', icon: '💼' },
    { number: '4.9★', label: 'דירוג ממוצע', icon: '⭐' }
  ];

  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-charcoal to-brown/10 relative overflow-hidden" dir="rtl">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-brown rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-8"
          >
            <div className="bg-gold/10 border border-gold/30 px-6 py-2 text-gold font-medium">
              🏆 האקדמיה המובילה לספרות גברים בצפון
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-h1 md:text-6xl font-bold mb-6"
          >
            למה ללמוד ב-<span className="text-gold">The Fader</span>?
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lightgrey text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            7 שנים של הצלחה מוכחת, מאות בוגרים שעובדים במספרות המובילות,
            וגישת הוראה ייחודית שמבטיחה את ההצלחה שלך
          </motion.p>

          {/* Stats grid */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-charcoal/50 backdrop-blur-sm border border-lightgrey/10 p-6 hover:border-gold/30 transition-all duration-300"
                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-gold mb-2">{stat.number}</div>
                <div className="text-lightgrey text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              href="/courses"
              variant="primary"
              className="min-w-[200px] py-4 text-lg font-bold shadow-lg hover:shadow-xl"
            >
              🎯 ראה את הקורסים
            </Button>
            
            <Button
              href="/contact?tour=true"
              variant="secondary"
              className="min-w-[200px] py-4 text-lg"
            >
              🏛️ סיור באקדמיה
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-lightgrey/80"
          >
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>מוכר במשרד העבודה</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>הסמכה בינלאומית</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>מימון גמיש</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AcademyHero;