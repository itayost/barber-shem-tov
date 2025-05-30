// src/components/academy/tabs/AcademyStoryTab.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/common/Button';

const AcademyStoryTab: React.FC = () => {
  const [activeYear, setActiveYear] = useState(2023);

  const milestones = [
    { 
      year: 2018, 
      title: 'הקמת האקדמיה',
      description: 'החלום התחיל - פתחנו את דלתות האקדמיה הראשונה',
      icon: '🎯',
      stats: '12 תלמידים ראשונים',
      achievements: [
        'פתיחת הכיתה הראשונה',
        'גיוס צוות מדריכים מקצועי',
        'יצירת תוכנית לימודים ייחודית'
      ]
    },
    { 
      year: 2019, 
      title: 'ציון דרך ראשון',
      description: 'עברנו את רף ה-100 בוגרים והרחבנו את צוות המדריכים',
      icon: '🎓',
      stats: '100+ בוגרים',
      achievements: [
        'הסמכה ממשרד העבודה',
        'שיתוף פעולה ראשון עם מספרות',
        'פתיחת קורס מתקדמים'
      ]
    },
    { 
      year: 2021, 
      title: 'שותפויות אסטרטגיות',
      description: 'יצרנו שותפויות עם רשתות המספרות המובילות בארץ',
      icon: '🤝',
      stats: '20+ מספרות שותפות',
      achievements: [
        'הסכמי השמה עם רשתות גדולות',
        'פתיחת מסלול ניהול עסקי',
        'השקת תוכנית חונכות'
      ]
    },
    { 
      year: 2023, 
      title: 'מובילים בתעשייה',
      description: 'הפכנו לאקדמיה המובילה בצפון עם אחוזי השמה מרשימים',
      icon: '🏆',
      stats: '500+ בוגרים, 92% השמה',
      achievements: [
        'דירוג 4.9 כוכבים בגוגל',
        'זכייה בפרס מצוינות',
        'פתיחת קורסי מאסטרקלאס'
      ]
    }
  ];

  const currentMilestone = milestones.find(m => m.year === activeYear) || milestones[0];

  return (
    <div className="space-y-8">
      {/* Timeline Navigation */}
      <div className="relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-lightgrey/20 -translate-y-1/2" />
        <div className="relative flex justify-between">
          {milestones.map((milestone, index) => (
            <button
              key={milestone.year}
              onClick={() => setActiveYear(milestone.year)}
              className="relative group"
            >
              <motion.div
                className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-xl sm:text-2xl transition-all ${
                  activeYear === milestone.year
                    ? 'bg-gold scale-110 shadow-lg shadow-gold/30'
                    : 'bg-charcoal-light hover:bg-gold/20 hover:scale-105'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {milestone.icon}
              </motion.div>
              <span className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap ${
                activeYear === milestone.year ? 'text-gold font-bold' : 'text-lightgrey'
              }`}>
                {milestone.year}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Milestone Content */}
      <motion.div
        key={activeYear}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-16 grid md:grid-cols-2 gap-8 items-start"
      >
        {/* Text Content */}
        <div>
          <motion.h3 
            className="text-2xl sm:text-3xl font-bold mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {currentMilestone.title}
          </motion.h3>
          
          <motion.p 
            className="text-lightgrey mb-6 leading-relaxed"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {currentMilestone.description}
          </motion.p>
          
          {/* Stats Badge */}
          <motion.div 
            className="bg-gold/10 border border-gold/20 p-4 mb-6 inline-block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-gold font-bold text-lg">{currentMilestone.stats}</p>
          </motion.div>

          {/* Achievements List */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h4 className="font-bold mb-3 text-offwhite">הישגים מרכזיים:</h4>
            <ul className="space-y-2">
              {currentMilestone.achievements.map((achievement, idx) => (
                <motion.li 
                  key={idx}
                  className="flex items-start gap-2 text-lightgrey text-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + idx * 0.1 }}
                >
                  <span className="text-gold mt-0.5">✓</span>
                  <span>{achievement}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Button href="/contact" variant="primary">
              הצטרף לסיפור ההצלחה
            </Button>
          </motion.div>
        </div>
        
        {/* Visual Card */}
        <motion.div
          className="relative h-[400px] sm:h-[500px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-brown/10 rounded-lg overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-gold rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`
                  }}
                />
              ))}
            </div>

            {/* Year Display */}
            <div className="absolute top-8 right-8">
              <div className="text-6xl font-bold text-gold/20">
                {currentMilestone.year}
              </div>
            </div>

            {/* Central Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                className="text-[120px] opacity-20"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                {currentMilestone.icon}
              </motion.div>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal via-charcoal/90 to-transparent p-6">
              <p className="text-gold font-bold text-xl mb-2">{currentMilestone.year}</p>
              <p className="text-offwhite text-lg">{currentMilestone.title}</p>
              <p className="text-lightgrey text-sm mt-2">{currentMilestone.stats}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Progress Bar */}
      <div className="mt-12 bg-charcoal-light p-6 rounded-lg">
        <h4 className="text-center font-bold mb-4">המסע שלנו</h4>
        <div className="relative h-2 bg-lightgrey/20 rounded-full overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gold"
            initial={{ width: 0 }}
            animate={{ 
              width: `${((activeYear - 2018) / (2023 - 2018)) * 100}%` 
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-lightgrey">
          <span>2018</span>
          <span>היום</span>
        </div>
      </div>
    </div>
  );
};

export default AcademyStoryTab;