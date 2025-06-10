// src/components/academy/tabs/AcademyResultsTab.tsx - Luxury Version (Partial)
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/common/Button';

const AcademyResultsTab: React.FC = () => {
  const [animatedNumbers, setAnimatedNumbers] = useState({
    graduates: 0,
    placement: 0,
    salary: 0,
    partners: 0
  });

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const timer = setInterval(() => {
      setAnimatedNumbers(prev => ({
        graduates: Math.min(prev.graduates + Math.ceil(500 / steps), 500),
        placement: Math.min(prev.placement + Math.ceil(92 / steps), 92),
        salary: Math.min(prev.salary + Math.ceil(7500 / steps), 7500),
        partners: Math.min(prev.partners + Math.ceil(50 / steps), 50)
      }));
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    { 
      value: `${animatedNumbers.graduates}+`,
      label: 'GRADUATES',
      sublabel: 'בוגרים מצליחים'
    },
    { 
      value: `${animatedNumbers.placement}%`,
      label: 'SUCCESS RATE',
      sublabel: 'שיעור השמה'
    },
    { 
      value: `₪${animatedNumbers.salary.toLocaleString()}`,
      label: 'AVG SALARY',
      sublabel: 'שכר התחלתי'
    },
    { 
      value: `${animatedNumbers.partners}+`,
      label: 'PARTNERS',
      sublabel: 'מספרות שותפות'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Section Title */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-xs tracking-[0.3em] text-gold mb-4">
          THE NUMBERS
        </h2>
        <p className="text-2xl md:text-3xl font-light text-offwhite">
          המספרים <span className="text-gold italic font-serif">מדברים</span>
        </p>
      </motion.div>

      {/* Stats Grid - Luxury Minimal */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="text-4xl md:text-5xl font-thin text-gold mb-2">
              {stat.value}
            </div>
            <div className="text-[10px] tracking-[0.2em] text-lightgrey/60 mb-1">
              {stat.label}
            </div>
            <div className="text-xs text-lightgrey/80">
              {stat.sublabel}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Comparison Visual - Luxury Style */}
      <motion.div 
        className="bg-gradient-to-br from-charcoal-light/20 to-transparent border border-gold/10 p-8 md:p-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h3 className="text-center text-xs tracking-[0.3em] text-gold mb-8">
          ACADEMY COMPARISON
        </h3>
        
        {/* Simplified luxury comparison */}
        <div className="space-y-6 max-w-2xl mx-auto">
          {[
            { label: 'השמה בעבודה', ours: 92, others: 65 },
            { label: 'שביעות רצון', ours: 95, others: 70 },
            { label: 'ליווי אישי', ours: 100, others: 40 }
          ].map((item, index) => (
            <motion.div 
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-between mb-2">
                <span className="text-sm font-light">{item.label}</span>
                <span className="text-xs text-gold">{item.ours}%</span>
              </div>
              
              <div className="relative h-1 bg-charcoal">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-gold/20"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.others}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-gold"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.ours}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-8 text-xs tracking-wider text-lightgrey/60">
          <span className="text-gold">■</span> THE FADER
          <span className="mx-4">vs</span>
          <span className="text-lightgrey/40">■</span> INDUSTRY AVG
        </div>
      </motion.div>

      {/* Bottom CTA */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="text-lightgrey/80 mb-6 font-light">
          הצטרף למאות הבוגרים שכבר בנו קריירה מצליחה
        </p>
        <Button 
          href="/courses" 
          variant="primary" 
          size="large"
          className="font-light tracking-wider"
        >
          התחל את המסע שלך
        </Button>
      </motion.div>
    </div>
  );
};

export default AcademyResultsTab;