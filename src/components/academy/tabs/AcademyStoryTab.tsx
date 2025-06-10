// src/components/academy/tabs/AcademyStoryTab.tsx - Luxury Version
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/common/Button';

const AcademyStoryTab: React.FC = () => {
  const milestones = [
    {
      year: 2018,
      title: 'החלום נולד',
      description: 'עם מספריים ביד אחת וחזון בלב, פתחתי דלת לכיתה קטנה עם 12 תלמידים.',
      highlight: 'הקורס הראשון'
    },
    {
      year: 2020,
      title: 'למרות הכל, צמחנו',
      description: 'כשהעולם נעצר, אנחנו המשכנו. הפכנו אתגרים להזדמנויות.',
      highlight: 'השמה בזמן קורונה'
    },
    {
      year: 2023,
      title: 'הפכנו למשפחה',
      description: 'כבר לא רק אקדמיה - אנחנו קהילה של 500+ בוגרים.',
      highlight: 'האקדמיה #1 בצפון'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Founder's Message - Mobile First */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Founder Image */}
        <div className="relative inline-block mb-8">
          <motion.div 
            className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-gold/30 mx-auto"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src="/images/team/bar.jpg"
              alt="בר שם טוב"
              width={160}
              height={160}
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                if (target.parentElement) {
                  target.parentElement.innerHTML = `
                    <div class="w-full h-full bg-gradient-to-br from-gold/20 to-brown/10 flex items-center justify-center">
                      <span class="text-5xl text-gold/50 font-light">ב</span>
                    </div>
                  `;
                }
              }}
            />
          </motion.div>
          {/* Decorative circle */}
          <div className="absolute -inset-4 border border-gold/10 rounded-full" />
        </div>

        {/* Quote */}
        <div className="max-w-3xl mx-auto">
          <div className="text-6xl md:text-8xl text-gold/10 font-serif leading-none mb-4">&ldquo;</div>
          
          <motion.p 
            className="text-lg md:text-xl text-lightgrey/90 leading-relaxed mb-6 font-light italic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            כשהייתי ספר צעיר, תמיד חלמתי על מקום שבו אפשר ללמוד את המקצוע הזה אחרת. 
            לא רק טכניקות וכלים, אלא את הקסם שבמגע האנושי.
          </motion.p>
          
          <motion.p 
            className="text-gold text-sm tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            — BAR SHEM TOV, FOUNDER
          </motion.p>
        </div>
      </motion.div>

      {/* Timeline - Luxury Minimal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-center text-xs tracking-[0.3em] text-gold mb-8">
          OUR JOURNEY
        </h3>
        
        <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Year - Large Display */}
              <div className="text-6xl md:text-7xl font-thin text-gold/10 mb-4">
                {milestone.year}
              </div>
              
              {/* Content */}
              <h4 className="text-xl font-light text-offwhite mb-2">
                {milestone.title}
              </h4>
              <p className="text-lightgrey/70 text-sm leading-relaxed mb-4">
                {milestone.description}
              </p>
              
              {/* Highlight Badge */}
              <div className="inline-block">
                <span className="text-xs tracking-wider text-gold/80 border-b border-gold/30 pb-1">
                  {milestone.highlight}
                </span>
              </div>
              
              {/* Connector Line - Desktop Only */}
              {index < milestones.length - 1 && (
                <div className="hidden md:block absolute top-12 left-full w-full h-[1px] bg-gradient-to-r from-gold/20 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Vision Statement */}
      <motion.div
        className="text-center bg-gradient-to-br from-gold/5 to-transparent border border-gold/10 p-8 md:p-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl md:text-3xl font-light mb-6">
          והמסע <span className="text-gold italic font-serif">רק מתחיל</span>
        </h3>
        
        <p className="text-lightgrey/80 text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto font-light">
          החזון שלנו פשוט: להמשיך לגדול, להמשיך להשפיע, להמשיך לשנות חיים.
        </p>
        
        {/* Future Goals */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl font-thin text-gold">1000+</div>
            <div className="text-xs tracking-wider text-lightgrey/60">GRADUATES BY 2026</div>
          </motion.div>
          
          <div className="hidden md:block w-16 h-[1px] bg-gold/20" />
          
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl font-thin text-gold">2</div>
            <div className="text-xs tracking-wider text-lightgrey/60">NEW LOCATIONS</div>
          </motion.div>
          
          <div className="hidden md:block w-16 h-[1px] bg-gold/20" />
          
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl font-thin text-gold">∞</div>
            <div className="text-xs tracking-wider text-lightgrey/60">OPPORTUNITIES</div>
          </motion.div>
        </div>
        
        {/* CTA */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button 
            href="/courses" 
            variant="primary" 
            size="large"
            className="font-light tracking-wider"
          >
            התחל את המסע שלך
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AcademyStoryTab;