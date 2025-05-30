// src/components/academy/AcademyHeroInteractive.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { academyInfo } from '@/lib/data';
import Button from '@/components/common/Button';

const AcademyHeroInteractive: React.FC = () => {
  const stats = [
    { number: `${academyInfo.stats.graduates}+`, label: 'בוגרים', icon: '🎓' },
    { number: `${academyInfo.stats.placementRate}%`, label: 'השמה', icon: '💼' },
    { number: '4.9★', label: 'דירוג', icon: '⭐' }
  ];

  return (
    <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden" dir="rtl">
      {/* Image Background with parallax effect */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/academy-classroom.jpg"
          alt="The Fader Academy"
          fill
          priority
          className="object-cover"
          quality={90}
          onError={(e) => {
            // Fallback to gradient if image fails
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gold">7 שנים</span> של הצלחה מוכחת
          </h1>
          
          {/* Live Stats Counter */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="bg-black/40 backdrop-blur-sm p-4 sm:p-6 border border-gold/20"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl sm:text-5xl font-bold text-gold mb-1">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm text-lightgrey">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/courses" variant="primary" size="large">
              🎯 ראה את הקורסים
            </Button>
            <Button href="/contact?tour=true" variant="secondary" size="large">
              🏛️ סיור באקדמיה
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gold/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gold rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
};

export default AcademyHeroInteractive;