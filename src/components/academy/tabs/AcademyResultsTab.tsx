// src/components/academy/tabs/AcademyResultsTab.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/common/Button';
import { academyInfo } from '@/lib/data';

const AcademyResultsTab: React.FC = () => {
  const [animatedNumbers, setAnimatedNumbers] = useState({
    graduates: 0,
    placement: 0,
    salary: 0,
    partners: 0,
    rating: 0,
    certification: 0
  });

  // Animate numbers on mount
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    const timer = setInterval(() => {
      setAnimatedNumbers(prev => ({
        graduates: Math.min(prev.graduates + Math.ceil(academyInfo.stats.graduates / steps), academyInfo.stats.graduates),
        placement: Math.min(prev.placement + Math.ceil(academyInfo.stats.placementRate / steps), academyInfo.stats.placementRate),
        salary: Math.min(prev.salary + Math.ceil(7500 / steps), 7500),
        partners: Math.min(prev.partners + Math.ceil(50 / steps), 50),
        rating: Math.min(prev.rating + (4.9 / steps), 4.9),
        certification: Math.min(prev.certification + Math.ceil(100 / steps), 100)
      }));
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const mainStats = [
    { 
      value: `${animatedNumbers.graduates}+`,
      label: 'בוגרים מצליחים',
      icon: '',
      color: 'text-green-400',
      description: 'הצטרפו למשפחה שלנו'
    },
    { 
      value: `${animatedNumbers.placement}%`,
      label: 'שיעור השמה',
      icon: '',
      color: 'text-blue-400',
      description: 'מוצאים עבודה תוך 3 חודשים'
    },
    { 
      value: `₪${animatedNumbers.salary.toLocaleString()}`,
      label: 'שכר התחלתי ממוצע',
      icon: '',
      color: 'text-gold',
      description: 'לבוגרים שלנו'
    },
    { 
      value: `${animatedNumbers.partners}+`,
      label: 'מספרות שותפות',
      icon: '',
      color: 'text-purple-400',
      description: 'ברחבי הארץ'
    }
  ];

  const comparisonData = [
    { category: 'השמה בעבודה', ours: 92, others: 65 },
    { category: 'שכר התחלתי', ours: 85, others: 60 },
    { category: 'שביעות רצון', ours: 95, others: 70 },
    { category: 'ליווי אישי', ours: 100, others: 40 }
  ];

  const [selectedComparison, setSelectedComparison] = useState(0);

  return (
    <div className="space-y-12">
      {/* Section Title */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          המספרים <span className="text-gold">מדברים</span>
        </h2>
        <p className="text-lightgrey max-w-2xl mx-auto">
          תוצאות מוכחות של 7 שנים של מצוינות בהכשרת ספרים מקצועיים
        </p>
      </motion.div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {mainStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="bg-charcoal-light/50 border border-lightgrey/10 p-6 text-center hover:border-gold/30 transition-all"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)" }}
          >
            <motion.div 
              className="text-5xl mb-3"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2,
                delay: index * 0.2,
                repeat: Infinity,
                repeatDelay: 5
              }}
            >
              {stat.icon}
            </motion.div>
            <div className={`text-3xl sm:text-4xl font-bold mb-2 ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-offwhite font-medium mb-1">
              {stat.label}
            </div>
            <div className="text-lightgrey text-xs">
              {stat.description}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Comparison Chart */}
      <motion.div 
        className="bg-charcoal-light/30 p-8 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="text-xl font-bold mb-6 text-center">
          השוואה <span className="text-gold">לאקדמיות אחרות</span>
        </h3>
        
        {/* Chart */}
        <div className="space-y-6">
          {comparisonData.map((item, index) => (
            <motion.div 
              key={item.category}
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              onMouseEnter={() => setSelectedComparison(index)}
            >
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">{item.category}</span>
                <span className="text-xs text-lightgrey">
                  {selectedComparison === index && `אנחנו: ${item.ours}% | אחרים: ${item.others}%`}
                </span>
              </div>
              
              {/* Background bar */}
              <div className="h-8 bg-charcoal rounded-full overflow-hidden relative">
                {/* Others bar */}
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-lightgrey/20"
                  initial={{ width: 0 }}
                  animate={{ width: `${item.others}%` }}
                  transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                />
                
                {/* Our bar */}
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-gold flex items-center justify-end pr-3"
                  initial={{ width: 0 }}
                  animate={{ width: `${item.ours}%` }}
                  transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                >
                  <span className="text-charcoal font-bold text-sm">{item.ours}%</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gold rounded"></div>
            <span>The Fader Academy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-lightgrey/20 rounded"></div>
            <span className="text-lightgrey">ממוצע בתעשייה</span>
          </div>
        </div>
      </motion.div>

      {/* Success Stories Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="bg-gradient-to-br from-gold/10 to-transparent p-6 border border-gold/20">
          <div className="text-3xl mb-4"></div>
          <h4 className="font-bold mb-2">מקצועיות</h4>
          <p className="text-lightgrey text-sm">
            הכשרה ברמה הגבוהה ביותר עם ציוד ומתקנים מתקדמים
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500/10 to-transparent p-6 border border-blue-500/20">
          <div className="text-3xl mb-4"></div>
          <h4 className="font-bold mb-2">התמקדות בתוצאות</h4>
          <p className="text-lightgrey text-sm">
            ליווי צמוד עד למציאת עבודה והשתלבות מלאה בתעשייה
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500/10 to-transparent p-6 border border-purple-500/20">
          <div className="text-3xl mb-4"></div>
          <h4 className="font-bold mb-2">קפיצת מדרגה</h4>
          <p className="text-lightgrey text-sm">
            הבוגרים שלנו מרוויחים בממוצע 40% יותר תוך שנה
          </p>
        </div>
      </motion.div>

      {/* Bottom CTA */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <p className="text-lightgrey mb-6">
          הצטרף למאות הבוגרים שכבר בנו קריירה מצליחה
        </p>
        <Button href="/courses" variant="primary" size="large">
          התחל את המסע שלך
        </Button>
      </motion.div>
    </div>
  );
};

export default AcademyResultsTab;