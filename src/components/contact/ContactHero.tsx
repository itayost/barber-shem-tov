'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LuxuryHeading, LuxuryLabel, VerticalText } from '@/components/luxury';

const ContactHero: React.FC = () => {
  return (
    <section className="relative min-h-[50vh] flex items-center bg-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-charcoal to-black" />
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
        >
          {/* Grid pattern */}
          <div className="h-full w-full bg-[linear-gradient(to_right,#C9A66B1a_1px,transparent_1px),linear-gradient(to_bottom,#C9A66B1a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </motion.div>
      </div>

      {/* Vertical Text */}
      <VerticalText position="left" className="hidden lg:block">
        GET IN TOUCH
      </VerticalText>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12" dir="rtl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <LuxuryLabel size="sm" className="mb-6">
            CONTACT US
          </LuxuryLabel>

          <LuxuryHeading as="h1" size="h1" className="mb-6">
            נשמח לשמוע
            <span className="text-gold"> ממך</span>
          </LuxuryHeading>

          <p className="text-xl text-lightgrey max-w-2xl mx-auto">
            יש לך שאלות? רוצה לקבוע פגישת ייעוץ? מעוניין להירשם לקורס? אנחנו כאן בשבילך
          </p>
        </motion.div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
    </section>
  );
};

export default ContactHero;
