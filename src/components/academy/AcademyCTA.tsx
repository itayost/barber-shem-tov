'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LuxuryButton } from '@/components/luxury';
import { Award, Users, Clock, Star } from 'lucide-react';

const benefits = [
  { icon: Award, text: 'תעודה מוכרת ממשרד העבודה' },
  { icon: Users, text: 'קבוצות לימוד קטנות ואינטימיות' },
  { icon: Clock, text: 'לוח זמנים גמיש המותאם לך' },
  { icon: Star, text: 'ליווי אישי לאורך כל הדרך' },
];

const AcademyCTA: React.FC = () => {
  return (
    <section className="relative py-32 bg-black overflow-hidden" dir="rtl">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-gold/5 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-thin text-offwhite mb-6">
            הצטרפו למשפחת
            <span className="text-gold"> The Fader</span>
          </h2>

          <p className="text-xl md:text-2xl text-lightgrey mb-12 max-w-3xl mx-auto">
            קחו את הצעד הראשון לקראת קריירה מצליחה בעולם הספרות המקצועית
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center gap-4 justify-center md:justify-start"
                >
                  <div className="w-12 h-12 border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <p className="text-sm text-offwhite/80 text-right">{benefit.text}</p>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <LuxuryButton variant="primary" size="large" href="/apply">
              הרשמה לקורס הבא
            </LuxuryButton>
            <LuxuryButton variant="outline" size="large" href="/contact">
              קבעו פגישת ייעוץ
            </LuxuryButton>
          </motion.div>

          {/* Next Course Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 pt-12 border-t border-gold/10"
          >
            <p className="text-sm uppercase tracking-wider text-gold mb-2">המחזור הבא מתחיל ב-</p>
            <p className="text-2xl font-light text-offwhite">1 בינואר 2025</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AcademyCTA;
