// src/components/academy/AcademyFounder.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { instructors } from '@/lib/data';

const AcademyFounderSection = () => {
  const founder = instructors[0]; // Bar Shem-Tov

  return (
    <section className="py-20 md:py-32 bg-charcoal text-offwhite">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Luxury Header */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <p className="text-xs tracking-[0.5em] text-gold mb-6">THE VISIONARY</p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-thin">מייסד האימפריה</h2>
        </motion.div>

        {/* Fashion Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Portrait - Left Side */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0">
              <Image
                src="/images/team/bar-editorial.jpg"
                alt={founder.name}
                fill
                className="object-cover grayscale"
                quality={90}
                priority
                onError={e => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  if (target.parentElement) {
                    target.parentElement.innerHTML = `
                      <div class="w-full h-full bg-gradient-to-b from-charcoal to-black flex items-center justify-center">
                        <div class="text-[180px] text-gold/10 font-serif">B</div>
                      </div>
                    `;
                  }
                }}
              />
              {/* Minimal Frame */}
              <div className="absolute inset-0 border border-gold/20" />
              <div className="absolute -inset-4 border border-gold/10" />
            </div>
          </motion.div>

          {/* Content - Right Side */}
          <motion.div
            className="lg:col-span-7 space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
          >
            {/* Name & Title */}
            <div>
              <h3 className="text-3xl md:text-5xl font-thin mb-2 text-gold">{founder.name}</h3>
              <p className="text-sm tracking-[0.3em] text-lightgrey/80 uppercase">
                {founder.title}
              </p>
            </div>

            {/* Luxury Divider */}
            <div className="flex items-center gap-8">
              <div className="h-px bg-gold/30 flex-1" />
              <span className="text-xs tracking-[0.5em] text-gold/60">EST. 2018</span>
              <div className="h-px bg-gold/30 flex-1" />
            </div>

            {/* Bio - Editorial Style */}
            <p className="text-lg md:text-xl font-light leading-relaxed text-lightgrey/90">
              {founder.bio}
            </p>

            {/* Achievements - Minimalist Luxury */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
              {[
                { number: '15+', label: 'שנות ניסיון' },
                { number: '500+', label: 'בוגרים מצליחים' },
                { number: '12', label: 'פרסים בינלאומיים' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <div className="text-3xl md:text-4xl font-thin text-gold mb-2">{stat.number}</div>
                  <div className="text-xs tracking-[0.3em] text-lightgrey/60 uppercase">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Signature Quote */}
            <motion.div
              className="relative pt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="absolute top-0 left-0 text-6xl text-gold/20 font-serif">"</div>
              <blockquote className="text-2xl md:text-3xl font-thin italic text-offwhite/90 pr-12">
                אמנות היא לא מה שאתה עושה,
                <span className="text-gold"> אלא איך אתה גורם למישהו להרגיש</span>
              </blockquote>
              <div className="absolute bottom-0 right-0 text-6xl text-gold/20 font-serif transform rotate-180">
                "
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Section - Timeline */}
        <motion.div
          className="mt-24 md:mt-32"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gold/20" />

            {/* Timeline Points */}
            <div className="relative grid grid-cols-3 md:grid-cols-5 gap-4">
              {[
                { year: '2018', title: 'הקמת האקדמיה' },
                { year: '2020', title: 'הסמכה בינלאומית' },
                { year: '2021', title: 'פרס מצוינות' },
                { year: '2023', title: '500 בוגרים' },
                { year: '2025', title: 'חזון לעתיד' },
              ].map((milestone, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="relative inline-block">
                    <div className="w-3 h-3 bg-gold rounded-full" />
                    <div className="absolute inset-0 bg-gold/30 rounded-full blur-lg" />
                  </div>
                  <div className="mt-4">
                    <div className="text-sm font-light text-gold">{milestone.year}</div>
                    <div className="text-xs tracking-wider text-lightgrey/60 mt-1">
                      {milestone.title}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AcademyFounderSection;
