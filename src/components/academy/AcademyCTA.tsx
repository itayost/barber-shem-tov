// src/components/academy/AcademyCTA.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { academyInfo } from '@/lib/data';

const AcademyCTA = () => {
  return (
    <section className="relative py-24 md:py-32 bg-black text-offwhite overflow-hidden">
      {/* Luxury Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-gold/5 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Luxury Header */}
          <motion.p
            className="text-xs tracking-[0.5em] text-gold mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            BEGIN YOUR JOURNEY
          </motion.p>

          {/* Main Headline - Fashion Editorial */}
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-thin mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            הצטרף לאליטה
            <br />
            <span className="text-gold">של הספרות</span>
          </motion.h2>

          {/* Subheading */}
          <motion.p
            className="text-lg md:text-xl font-light text-lightgrey/80 mb-16 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {academyInfo.stats.graduates}+ בוגרים שהפכו את האמנות שלהם למורשת
          </motion.p>

          {/* Luxury Stats - Minimalist Grid */}
          <motion.div
            className="grid grid-cols-3 gap-px bg-gold/10 max-w-4xl mx-auto mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {[
              { value: `${academyInfo.stats.placementRate}%`, label: 'PLACEMENT' },
              { value: `${academyInfo.stats.industryAwards}`, label: 'AWARDS' },
              { value: `${academyInfo.stats.averageSalaryIncrease}%+`, label: 'GROWTH' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-black p-8 md:p-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <div className="text-3xl md:text-5xl font-thin text-gold mb-3">{stat.value}</div>
                <div className="text-xs tracking-[0.3em] text-lightgrey/60">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons - Luxury Style */}
          <motion.div
            className="flex flex-col md:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Link
              href="/courses"
              className="group relative overflow-hidden bg-gold text-black px-12 py-5 text-sm tracking-[0.2em] uppercase transition-all duration-500 hover:text-gold"
            >
              <span className="relative z-10 font-light">EXPLORE COURSES</span>
              <div className="absolute inset-0 bg-offwhite transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Link>

            <Link
              href="/contact"
              className="group relative px-12 py-5 text-sm tracking-[0.2em] uppercase border border-gold/30 hover:border-gold transition-all duration-500"
            >
              <span className="font-light text-offwhite">PRIVATE CONSULTATION</span>
            </Link>
          </motion.div>

          {/* Luxury Divider */}
          <motion.div
            className="my-20 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="h-px bg-gold/20 flex-1 max-w-xs" />
            <div className="mx-8 text-gold/40 text-sm">✦</div>
            <div className="h-px bg-gold/20 flex-1 max-w-xs" />
          </motion.div>

          {/* Contact - Minimalist Luxury */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <p className="text-xs tracking-[0.3em] text-gold/60 uppercase">For Inquiries</p>
            <a
              href={`tel:${academyInfo.phone}`}
              className="block text-2xl md:text-3xl font-thin text-offwhite hover:text-gold transition-colors duration-300"
            >
              {academyInfo.phone}
            </a>
            <p className="text-sm text-lightgrey/60 font-light">{academyInfo.address}</p>
          </motion.div>

          {/* Trust Badges - Subtle */}
          <motion.div
            className="mt-20 pt-20 border-t border-gold/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p className="text-xs tracking-[0.5em] text-gold/40 mb-8 uppercase">
              In Partnership With
            </p>
            <div className="flex flex-wrap justify-center gap-12">
              {academyInfo.partners.map((partner, index) => (
                <motion.span
                  key={index}
                  className="text-xs tracking-[0.2em] text-lightgrey/40 uppercase font-light"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                >
                  {partner}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AcademyCTA;
