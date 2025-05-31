// src/components/courses/CoursesHero.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CoursesHeroProps {
  activeFilter: 'all' | 'beginner' | 'advanced';
  onFilterChange: (filter: 'all' | 'beginner' | 'advanced') => void;
}

const CoursesHero: React.FC<CoursesHeroProps> = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: 'all' as const, label: 'הכל' },
    { id: 'beginner' as const, label: 'למתחילים' },
    { id: 'advanced' as const, label: 'מתקדמים' }
  ];

  return (
    <section className="relative bg-black pt-32 pb-20" dir="rtl">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 20% 80%, rgba(201, 166, 107, 0.3) 0%, transparent 50%)'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Pre-title */}
          <p className="text-gold/60 text-sm tracking-wider uppercase mb-3">
            אקדמיית בר שם טוב
          </p>
          
          {/* Main title */}
          <h1 className="text-4xl md:text-6xl font-light text-offwhite mb-4">
            הקורסים <span className="font-normal text-gold">שלנו</span>
          </h1>
          
          <p className="text-lightgrey/80 text-lg mb-12 max-w-xl mx-auto">
            תוכניות לימוד מקצועיות שמותאמות לכל רמה ומובילות להצלחה בתעשייה
          </p>
          
          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => onFilterChange(filter.id)}
                className={`px-8 py-3 transition-all duration-200 ${
                  activeFilter === filter.id
                    ? 'bg-gold text-charcoal font-medium'
                    : 'text-gold border border-gold/30 hover:border-gold/60 hover:bg-gold/5'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {filter.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-charcoal to-transparent" />
    </section>
  );
};

export default CoursesHero;