// src/components/academy/tabs/AcademyStoryLight.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/common/Button';

const AcademyStoryLight: React.FC = () => {
  // Timeline milestones
  const milestones = [
    {
      year: '2018',
      title: 'ההתחלה',
      description: 'מספריים ביד, חזון בלב, חלום שנולד',
      highlight: 'פתיחת האקדמיה הראשונה'
    },
    {
      year: '2020',
      title: 'האתגר',
      description: 'כשהעולם עצר, אנחנו המשכנו חזקים מתמיד',
      highlight: 'הסתגלות וחדשנות'
    },
    {
      year: '2023',
      title: 'ההישג',
      description: '500+ בוגרים, 92% השמה, קהילה אחת',
      highlight: 'הפכנו למשפחה'
    },
    {
      year: '2025',
      title: 'העתיד',
      description: 'המסע רק מתחיל, החזון גדול מתמיד',
      highlight: 'האקדמיה המובילה בישראל'
    }
  ];

  return (
    <div className="space-y-24 md:space-y-32">
      {/* Opening Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-4xl mx-auto"
      >
        <p className="text-xs tracking-[0.5em] text-gold mb-8">
          EST. 2018
        </p>
        <h2 className="text-4xl md:text-6xl font-thin text-offwhite mb-8 leading-tight">
          שבע שנים של
          <br />
          <span className="text-gold italic font-serif">תשוקה ומצוינות</span>
        </h2>
        <p className="text-lg md:text-xl font-light text-lightgrey/90 leading-relaxed">
          מה שהתחיל כחלום של ספר צעיר, הפך לאקדמיה המובילה בישראל.
          סיפור של נחישות, חזון, ואהבה אמיתית למקצוע.
        </p>
      </motion.div>

      {/* Timeline Section */}
      <section className="relative">
        <div className="max-w-6xl mx-auto">
          {/* Timeline Line - Desktop Only */}
          <div className="hidden lg:block absolute right-1/2 transform translate-x-1/2 top-0 bottom-0 w-px bg-gold/20" />
          
          {/* Milestones */}
          <div className="space-y-16 lg:space-y-24">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  index % 2 === 0 ? '' : 'lg:text-left'
                }`}
              >
                {/* Content */}
                <div className={`${index % 2 === 0 ? 'lg:text-right' : 'lg:order-2'}`}>
                  <div className="inline-block">
                    <span className="text-6xl md:text-8xl font-serif text-gold/20">
                      {milestone.year}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-light text-offwhite mt-4 mb-4">
                      {milestone.title}
                    </h3>
                    <p className="text-lightgrey/90 mb-4 text-lg">
                      {milestone.description}
                    </p>
                    <p className="text-gold text-sm font-medium">
                      {milestone.highlight}
                    </p>
                  </div>
                </div>

                {/* Timeline Node - Desktop */}
                <div className={`hidden lg:flex justify-center ${
                  index % 2 === 0 ? 'lg:order-2' : ''
                }`}>
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="relative"
                  >
                    <div className="w-4 h-4 bg-gold rounded-full" />
                    <div className="absolute inset-0 bg-gold/30 rounded-full blur-xl" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section - Minimalist */}
      <section className="relative py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Portrait */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0">
                <Image
                  src="/images/team/bar-editorial.jpg"
                  alt="Bar Shem Tov"
                  fill
                  className="object-cover grayscale"
                  quality={85}
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.innerHTML = `
                        <div class="w-full h-full bg-gradient-to-b from-charcoal to-black flex items-center justify-center">
                          <div class="text-[120px] text-gold/10 font-serif">B</div>
                        </div>
                      `;
                    }
                  }}
                />
                {/* Simple Frame */}
                <div className="absolute inset-0 border border-gold/20" />
              </div>
            </motion.div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <p className="text-xs tracking-[0.3em] text-gold mb-6">
                  FOUNDER'S VISION
                </p>
                
                <h3 className="text-3xl md:text-4xl font-thin text-offwhite mb-6 leading-tight">
                  &ldquo;אמנות היא לא מה שאתה עושה,
                  <br />
                  <span className="text-gold">אלא איך אתה גורם למישהו להרגיש&rdquo;</span>
                </h3>
                
                <p className="text-lg font-light text-lightgrey/80 leading-relaxed mb-6">
                  שבע שנים חלפו מאז פתחתי את הדלתות לראשונה. 
                  מה שהתחיל כחלום פרטי הפך למשהו גדול הרבה יותר - 
                  מקום שבו אמנות פוגשת מקצוע, תשוקה פוגשת מצוינות.
                </p>

                <div className="pt-6 border-t border-gold/20">
                  <p className="text-sm tracking-[0.2em] text-gold/80 mb-1">
                    BAR SHEM TOV
                  </p>
                  <p className="text-xs tracking-[0.15em] text-lightgrey/60">
                    FOUNDER & CREATIVE DIRECTOR
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="text-3xl md:text-4xl font-thin text-offwhite mb-6">
            מוכן להיות חלק מהסיפור?
          </h3>
          <p className="text-lg text-lightgrey/80 mb-8">
            הצטרף למאות הבוגרים המצליחים שלנו ותתחיל לכתוב את הפרק שלך
          </p>
          <Button
            href="/courses"
            variant="primary"
            size="large"
            className="min-w-[250px] font-light tracking-wider"
          >
            לקורסים שלנו
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default AcademyStoryLight;