// src/components/home/AcademyHero.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/common/Button';
import { academyInfo } from '@/lib/data';

const AcademyHero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-charcoal" dir="rtl">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="h-full w-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url('/images/academy-classroom.jpg')`,
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/90 via-charcoal/70 to-charcoal/90"></div>
      </div>
      
      {/* Animated golden accents */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gold blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gold blur-3xl"
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Academy badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-8"
          >
            <div className="bg-gold/10 border border-gold/30 px-6 py-2 text-gold">
              מאז {academyInfo.established} • {academyInfo.stats.graduates}+ בוגרים
            </div>
          </motion.div>
          
          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heebo text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            האקדמיה המובילה
            <span className="block text-gold mt-2">לאמנות הספרות</span>
          </motion.h1>
          
          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-lightgrey mb-12 max-w-3xl mx-auto"
          >
            הכשרה מקצועית מקיפה עם {academyInfo.stats.placementRate}% שיעור השמה
            <span className="block mt-2">התחל את הקריירה שלך בתעשייה המבוקשת ביותר</span>
          </motion.p>
          
          {/* Key benefits */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>תעודה מוכרת</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>ליווי אישי</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>התנסות מעשית</span>
            </div>
          </motion.div>
          
          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              href="/courses" 
              variant="primary"
              className="text-lg px-8 py-4"
            >
              צפה בקורסים
            </Button>
            <Button 
              href="/contact?type=consultation" 
              variant="secondary"
              className="text-lg px-8 py-4"
            >
              ייעוץ חינם
            </Button>
          </motion.div>
          
          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-lightgrey"
          >
            <div className="flex items-center gap-2">
              <span className="text-gold text-2xl font-bold">{academyInfo.stats.programCount}</span>
              <span>תוכניות לימוד</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gold text-2xl font-bold">{academyInfo.stats.averageSalaryIncrease}%</span>
              <span>עליה בהכנסה</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gold text-2xl font-bold">100%</span>
              <span>מדריכים פעילים</span>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-gold"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AcademyHero;