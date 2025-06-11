// src/components/academy/tabs/AcademyStoryTab.tsx - Luxury Fashion Editorial
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/common/Button';
import LuxuryCarousel from '@/components/common/LuxuryCarousel';

const AcademyStoryTab: React.FC = () => {
  // Luxury Editorial Chapters
  const chapters = [
    {
      roman: 'I',
      year: 'MMXVIII',
      title: 'GENESIS',
      subtitle: 'THE BEGINNING',
      content: 'מספריים ביד. חזון בלב. חלום שנולד.',
      image: '/images/academy/chapter-1.jpg',
      quote: '"לפעמים כל מה שצריך זה להתחיל"'
    },
    {
      roman: 'II',
      year: 'MMXX',
      title: 'RESILIENCE',
      subtitle: 'THE TEST',
      content: 'כשהעולם עצר. אנחנו המשכנו. חזקים מתמיד.',
      image: '/images/academy/chapter-2.jpg',
      quote: '"משבר הוא הזדמנות בתחפושת"'
    },
    {
      roman: 'III',
      year: 'MMXXIII',
      title: 'LEGACY',
      subtitle: 'THE FAMILY',
      content: 'לא רק אקדמיה. משפחה. קהילה. מורשת.',
      image: '/images/academy/chapter-3.jpg',
      quote: '"ביחד אנחנו יוצרים היסטוריה"'
    }
  ];

  // Create carousel slides with editorial design
  const editorialSlides = chapters.map((chapter, index) => (
    <div key={index} className="relative h-[80vh] min-h-[600px]">
      {/* Full Height Editorial Image */}
      <div className="absolute inset-0">
        <Image
          src={chapter.image}
          alt={chapter.title}
          fill
          className="object-cover"
          quality={90}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            if (target.parentElement) {
              target.parentElement.innerHTML = `
                <div class="w-full h-full bg-gradient-to-b from-charcoal to-black flex items-center justify-center">
                  <div class="text-[200px] text-gold/5 font-serif">${chapter.roman}</div>
                </div>
              `;
            }
          }}
        />
        {/* Luxury Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      {/* Editorial Content */}
      <div className="relative h-full flex items-end">
        <div className="w-full p-8 md:p-16 lg:p-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-4xl"
          >
            {/* Chapter Number - Fashion Magazine Style */}
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-[80px] md:text-[120px] font-serif leading-none text-gold/20">
                {chapter.roman}
              </span>
              <span className="text-xs tracking-[0.3em] text-gold/60">
                {chapter.year}
              </span>
            </div>

            {/* Title - Editorial Typography */}
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-thin tracking-wider text-offwhite mb-2">
              {chapter.title}
            </h2>
            
            <p className="text-xs tracking-[0.5em] text-gold mb-8">
              {chapter.subtitle}
            </p>

            {/* Content - Minimalist */}
            <p className="text-xl md:text-2xl font-light text-lightgrey/90 mb-8 max-w-2xl leading-relaxed">
              {chapter.content}
            </p>

            {/* Quote - Fashion Editorial Style */}
            <p className="text-sm md:text-base italic text-gold/80 font-light">
              {chapter.quote}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="space-y-0">
      {/* Main Story Carousel - Full Bleed */}
      <div className="-mx-8 md:-mx-12 -mt-8 md:-mt-12">
        <LuxuryCarousel
          slides={editorialSlides}
          variant="editorial"
          showDots={true}
          showArrows={false}
          autoPlayInterval={8000}
          height="auto"
          className="bg-black"
        />
      </div>

      {/* Founder Section - Vogue Style */}
      <section className="relative py-24 md:py-32 bg-black">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Portrait - Fashion Editorial */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="relative aspect-[3/4] max-w-md mx-auto">
                <Image
                  src="/images/team/bar-editorial.jpg"
                  alt="Bar Shem Tov"
                  fill
                  className="object-cover grayscale"
                  quality={90}
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
                {/* Frame */}
                <div className="absolute inset-0 border border-gold/20" />
                <div className="absolute -inset-4 border border-gold/10" />
              </div>
            </motion.div>

            {/* Quote - Minimalist Luxury */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="space-y-8"
            >
              <div>
                <p className="text-xs tracking-[0.5em] text-gold mb-8">
                  
                </p>
                
                <h3 className="text-4xl md:text-5xl font-thin text-offwhite mb-8 leading-tight">
                  &ldquo;אמנות היא לא מה שאתה עושה,
                  <br />
                  <span className="text-gold">אלא איך אתה גורם למישהו להרגיש&rdquo;</span>
                </h3>
                
                <p className="text-lg font-light text-lightgrey/80 leading-relaxed">
                  שבע שנים חלפו מאז פתחתי את הדלתות לראשונה. 
                  מה שהתחיל כחלום פרטי הפך למשהו גדול הרבה יותר - 
                  מקום שבו אמנות פוגשת מקצוע, תשוקה פוגשת מצוינות.
                </p>
              </div>

              <div className="pt-8 border-t border-gold/20">
                <p className="text-xs tracking-[0.3em] text-gold/80">
                  BAR SHEM TOV
                </p>
                <p className="text-xs tracking-[0.2em] text-lightgrey/60">
                  FOUNDER & CREATIVE DIRECTOR
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Future Vision - Minimalist Luxury */}
      <section className="py-24 md:py-32 bg-black text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-8"
        >
          <p className="text-xs tracking-[0.5em] text-gold mb-8">
            THE FUTURE
          </p>
          
          <h3 className="text-3xl md:text-5xl font-thin text-offwhite mb-12 leading-tight">
            המסע רק מתחיל
          </h3>

          {/* Minimalist Timeline */}
          <div className="flex justify-center items-center gap-8 mb-16">
            <span className="text-sm text-lightgrey/60">2018</span>
            <div className="w-32 h-px bg-gold/30" />
            <span className="text-sm text-gold">2025</span>
            <div className="w-32 h-px bg-gold/10" />
            <span className="text-sm text-lightgrey/30">∞</span>
          </div>

          <Button
            href="/courses"
            variant="primary"
            size="large"
            className="min-w-[250px] font-light tracking-wider border-gold/30 hover:border-gold/60"
          >
            BE PART OF THE STORY
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default AcademyStoryTab;