'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LuxuryHeading, LuxuryLabel, VerticalText } from '@/components/luxury';

interface AcademyHeroProps {
  backgroundImage?: string;
}

const AcademyHero: React.FC<AcademyHeroProps> = ({
  backgroundImage = '/images/academy/academy-hero.jpg',
}) => {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-0"
      >
        <img src={backgroundImage} alt="The Fader Academy" className="w-full h-full object-cover" />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

      {/* Vertical Text */}
      <VerticalText position="right" className="hidden lg:block">
        EXCELLENCE SINCE 2018
      </VerticalText>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12" dir="rtl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-3xl"
        >
          <LuxuryLabel size="sm" className="mb-6">
            THE FADER ACADEMY
          </LuxuryLabel>

          <LuxuryHeading as="h1" size="h1" className="mb-6">
            האקדמיה למצוינות
            <br />
            <span className="text-gold">בספרות מקצועית</span>
          </LuxuryHeading>

          <p className="text-xl md:text-2xl font-light text-lightgrey">
            מאז 2018, אנו מובילים את תחום הכשרת הספרים המקצועיים בצפון
          </p>
        </motion.div>
      </div>

      {/* Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
    </section>
  );
};

export default AcademyHero;
