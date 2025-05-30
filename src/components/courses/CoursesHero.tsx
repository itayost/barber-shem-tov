// src/components/courses/CoursesHero.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { academyInfo } from '@/lib/data';
import Image from 'next/image';

interface CoursesHeroProps {
  activeFilter: 'all' | 'beginner' | 'advanced';
  onFilterChange: (filter: 'all' | 'beginner' | 'advanced') => void;
}

const CoursesHero: React.FC<CoursesHeroProps> = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: 'all' as const, label: 'כל הקורסים', description: 'כל האפשרויות שלנו' },
    { id: 'beginner' as const, label: 'למתחילים', description: 'התחל מהבסיס' },
    { id: 'advanced' as const, label: 'מתקדמים', description: 'שדרג את הכישורים' }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" dir="rtl">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/courses-hero.jpg"
          alt="קורסי ספרות מקצועיים"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/90 via-charcoal/80 to-charcoal/90"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-brown/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Animated lines */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent animate-[shimmer_3s_infinite]"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent animate-[shimmer_3s_infinite]" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-h1 md:text-7xl font-bold mb-6 leading-tight">
              בחר את <span className="text-gold">המסלול המתאים לך</span>
            </h1>
            <p className="text-lightgrey text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              קורסי ספרות מקצועיים שיובילו אותך להצלחה בתעשייה
            </p>
          </motion.div>

          {/* Key benefits bar */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { icon: '🎯', text: `${academyInfo.stats.placementRate}% שיעור השמה` },
              { icon: '📜', text: 'הסמכה מוכרת' },
              { icon: '🤝', text: 'ליווי עד להשמה' },
              { icon: '👥', text: 'כיתות קטנות' }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 bg-charcoal/50 px-6 py-3 rounded-full border border-gold/20 hover:border-gold/40 transition-all"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
              >
                <span className="text-xl">{benefit.icon}</span>
                <span className="text-lightgrey">{benefit.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Filter buttons */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => onFilterChange(filter.id)}
                className={`px-8 py-4 font-bold text-lg transition-all duration-300 border-2 relative overflow-hidden group ${
                  activeFilter === filter.id
                    ? 'bg-gold text-charcoal border-gold shadow-lg'
                    : 'bg-transparent text-gold border-gold/50 hover:border-gold hover:bg-gold/10'
                }`}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex flex-col items-center">
                  <span className="font-bold">{filter.label}</span>
                  <span className="text-sm opacity-80 font-normal">{filter.description}</span>
                </span>
                
                {/* Active background animation */}
                {activeFilter === filter.id && (
                  <motion.div
                    className="absolute inset-0 bg-gold"
                    layoutId="activeFilter"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]"></div>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* CTA hint */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="text-lightgrey mb-4">
              לא בטוח איזה מסלול מתאים לך?
            </p>
            <motion.a
              href="/contact?consultation=true"
              className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors font-medium"
              whileHover={{ scale: 1.05 }}
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
      </div>

      {/* Bottom wave transition */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg 
          className="relative block w-full h-12" 
          data-name="Layer 1" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            className="fill-charcoal"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default CoursesHero;