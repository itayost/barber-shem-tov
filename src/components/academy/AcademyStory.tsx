// src/components/academy/AcademyStory.tsx - Using LuxuryCarousel
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import LuxuryCarousel from '@/components/common/LuxuryCarousel';

const AcademyStory: React.FC = () => {
  const storyCards = [
    {
      year: '2018',
      subtitle: 'THE GENESIS',
      title: 'החלום נולד',
      content: 'התחלנו עם חזון פשוט - להקים את האקדמיה המובילה לספרות בישראל.',
      accent: 'ESTABLISHED',
      metric: '12',
      metricLabel: 'FOUNDING STUDENTS'
    },
    {
      year: '2020',
      subtitle: 'THE EVOLUTION',
      title: 'הצמיחה למרות הכל',
      content: 'בתקופה המאתגרת ביותר, הצלחנו לא רק לשרוד אלא לצמוח.',
      accent: 'RESILIENCE',
      metric: '200+',
      metricLabel: 'GRADUATES'
    },
    {
      year: '2023',
      subtitle: 'THE LEADERSHIP',
      title: 'מובילים בתעשייה',
      content: 'היום אנחנו גאים להיות האקדמיה המובילה בצפון.',
      accent: 'EXCELLENCE',
      metric: '92%',
      metricLabel: 'SUCCESS RATE'
    },
    {
      year: '2025',
      subtitle: 'THE FUTURE',
      title: 'העתיד כבר כאן',
      content: 'עם חזון לעתיד, אנחנו ממשיכים לחדש.',
      accent: 'INNOVATION',
      metric: '50+',
      metricLabel: 'PARTNERSHIPS'
    }
  ];

  const slides = storyCards.map((card, index) => (
    <div key={index} className="px-4">
      <div className="max-w-sm mx-auto md:max-w-6xl">
        <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-16 md:items-center">
          {/* Visual element */}
          <div className="relative md:order-2">
            {/* Mobile year display */}
            <div className="md:hidden mb-6">
              <div className="text-[80px] font-thin leading-none text-gold/10 select-none text-center">
                {card.year}
              </div>
            </div>

            {/* Visual card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative aspect-[4/3] md:aspect-square max-w-[280px] mx-auto md:max-w-none"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-black border border-gold/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] text-gold/30 mb-2">
                      {card.accent}
                    </div>
                    <div className="w-12 md:w-16 h-[1px] bg-gold/30 mx-auto" />
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-12 h-12 md:w-20 md:h-20 border-t border-r border-gold/20" />
              <div className="absolute bottom-0 left-0 w-12 h-12 md:w-20 md:h-20 border-b border-l border-gold/20" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="text-center md:text-right md:order-1">
            {/* Desktop year display */}
            <motion.div className="hidden md:block mb-8">
              <div className="text-[120px] lg:text-[180px] font-thin leading-none text-gold/10 select-none">
                {card.year}
              </div>
            </motion.div>

            <motion.div>
              <p className="text-[10px] md:text-xs tracking-[0.25em] md:tracking-[0.3em] text-gold mb-3 md:mb-4">
                {card.subtitle}
              </p>
              
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-light text-offwhite mb-4 md:mb-6 leading-tight">
                {card.title}
              </h3>
              
              <p className="text-lightgrey/80 text-base md:text-lg leading-relaxed mb-8 md:mb-12 max-w-xs mx-auto md:max-w-md md:mx-0">
                {card.content}
              </p>

              <div className="border-t border-gold/20 pt-6 md:pt-8">
                <motion.div className="inline-block">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-thin text-gold mb-1 md:mb-2">
                    {card.metric}
                  </div>
                  <div className="text-[10px] md:text-xs tracking-[0.15em] md:tracking-[0.2em] text-lightgrey/60">
                    {card.metricLabel}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <section className="relative bg-black overflow-hidden" dir="rtl">
      {/* Ambient light effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 md:w-96 md:h-96 bg-gold/10 rounded-full blur-[100px] md:blur-[120px]" />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center pt-12 md:pt-20">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '60px' }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-[1px] bg-gold mx-auto mb-6 md:mb-8 md:w-[100px]"
        />
        
        <h2 className="text-[10px] tracking-[0.25em] md:text-xs md:tracking-[0.3em] text-gold mb-3 md:mb-4">
          OUR HERITAGE
        </h2>
        
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-light mb-8 md:mb-12">
          <span className="block">סיפור של</span>
          <span className="block text-gold italic font-serif">מצוינות</span>
        </h1>
      </div>

      {/* Carousel */}
      <LuxuryCarousel
        slides={slides}
        variant="editorial"
        showTimeline={true}
        timelineLabels={storyCards.map(card => card.year)}
        autoPlayInterval={6000}
        height="auto"
      />
    </section>
  );
};

export default AcademyStory;