// src/components/academy/AcademyFounder.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { instructors } from '@/lib/data';

const AcademyFounderSection = () => {
  const founder = instructors[0]; // Bar Shem-Tov

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-offwhite text-charcoal">
      <div className="container mx-auto px-6 md:px-12">
        {/* Mobile Layout */}
        <div className="lg:hidden">
          {/* Mobile Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold text-sm uppercase tracking-[0.2em] block mb-4">המייסד</span>
            <h2 className="text-3xl md:text-4xl font-light">החזון מאחורי המותג</h2>
          </motion.div>

          {/* Mobile Portrait */}
          <motion.div
            className="relative h-[400px] mb-8 rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={founder.image || '/images/team/bar.jpg'}
              alt={founder.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
            <div className="absolute bottom-6 right-6 text-white">
              <h3 className="text-2xl font-light mb-1">{founder.name}</h3>
              <p className="text-gold">{founder.title}</p>
            </div>
          </motion.div>

          {/* Mobile Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-charcoal/80 leading-relaxed">{founder.bio}</p>

            {/* Achievements */}
            <div>
              <h4 className="text-lg font-medium mb-3">הישגים מרכזיים</h4>
              <ul className="space-y-2">
                {[
                  'מייסד האקדמיה המובילה לספרות בצפון',
                  'השתלמות בלונדון ובניו יורק',
                  'מנטור ליותר מ-500 ספרים מקצועיים',
                ].map((achievement, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-gold mr-2">•</span>
                    <span className="text-sm text-charcoal/80">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Left Column - Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <span className="text-gold text-sm uppercase tracking-[0.2em] block mb-4">
                המייסד
              </span>
              <h2 className="text-4xl md:text-5xl font-light mb-6">החזון מאחורי המותג</h2>
              <h3 className="text-2xl font-light mb-2">{founder.name}</h3>
              <p className="text-gold mb-6">{founder.title}</p>
            </div>

            <p className="text-charcoal/80 leading-relaxed text-lg">{founder.bio}</p>

            {/* Achievements */}
            <div>
              <h4 className="text-xl font-medium mb-4">הישגים מרכזיים</h4>
              <ul className="space-y-3">
                {[
                  'מייסד האקדמיה המובילה לספרות בצפון',
                  'השתלמות בלונדון ובניו יורק',
                  'מנטור ליותר מ-500 ספרים מקצועיים',
                ].map((achievement, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-gold mr-3 text-lg">•</span>
                    <span className="text-charcoal/80">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Milestones */}
            <div className="border-r-2 border-gold pr-6 space-y-4">
              <div>
                <div className="text-xl font-medium">2018</div>
                <div className="text-charcoal/60">ייסוד האקדמיה</div>
              </div>
              <div>
                <div className="text-xl font-medium">2020</div>
                <div className="text-charcoal/60">הסמכה בינלאומית</div>
              </div>
              <div>
                <div className="text-xl font-medium">2023</div>
                <div className="text-charcoal/60">500 בוגרים</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Portrait */}
          <motion.div
            className="relative h-[600px] rounded-lg overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={founder.image || '/images/team/bar.jpg'}
              alt={founder.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AcademyFounderSection;
