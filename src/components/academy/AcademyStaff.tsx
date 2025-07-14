// src/components/academy/AcademyStaff.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { instructors } from '@/lib/data';

const AcademyOurStaff = () => {
  const [selectedStaff, setSelectedStaff] = useState(0);
  const currentStaff = instructors[selectedStaff];

  return (
    <section className="py-24 md:py-32 bg-charcoal text-offwhite">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Luxury Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <p className="text-xs tracking-[0.5em] text-gold mb-6">THE MASTERS</p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-thin">
            אמני
            <span className="text-gold"> המחר</span>
          </h2>
        </motion.div>

        {/* Staff Grid - Fashion Editorial Style */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Staff Selector - Minimalist Tabs */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-px">
              {instructors.map((staff, index) => (
                <button
                  key={staff.id}
                  onClick={() => setSelectedStaff(index)}
                  className={`
                    w-full text-left p-6 transition-all duration-500 group
                    ${selectedStaff === index ? 'bg-gold text-black' : 'bg-black hover:bg-charcoal'}
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs tracking-[0.3em] mb-2 opacity-60">0{index + 1}</p>
                      <h3 className="text-xl font-light mb-1">{staff.name}</h3>
                      <p className="text-xs tracking-wider opacity-60 uppercase">{staff.title}</p>
                    </div>
                    <div
                      className={`
                      transition-all duration-300
                      ${selectedStaff === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}
                    `}
                    >
                      <span className="text-2xl font-thin">→</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Staff Feature - Magazine Layout */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStaff.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
              >
                {/* Portrait - Fashion Editorial */}
                <motion.div
                  className="relative"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={currentStaff.image || `/images/team/${currentStaff.id}.jpg`}
                      alt={currentStaff.name}
                      fill
                      className="object-cover grayscale"
                      quality={90}
                      onError={e => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        if (target.parentElement) {
                          target.parentElement.innerHTML = `
                            <div class="w-full h-full bg-gradient-to-b from-charcoal to-black flex items-center justify-center">
                              <div class="text-[120px] text-gold/10 font-serif">
                                ${currentStaff.name.charAt(0)}
                              </div>
                            </div>
                          `;
                        }
                      }}
                    />
                    {/* Luxury Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Stats Overlay - Bottom Corner */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="flex gap-8">
                        <div>
                          <div className="text-3xl font-thin text-gold">
                            {currentStaff.id === 'bar' ? '15+' : '12+'}
                          </div>
                          <div className="text-xs tracking-[0.2em] opacity-80 uppercase">Years</div>
                        </div>
                        <div>
                          <div className="text-3xl font-thin text-gold">
                            {currentStaff.id === 'bar' ? '500+' : '200+'}
                          </div>
                          <div className="text-xs tracking-[0.2em] opacity-80 uppercase">
                            Students
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Content - Editorial Style */}
                <motion.div
                  className="space-y-8"
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {/* Bio - Magazine Typography */}
                  <div>
                    <p className="text-lg md:text-xl font-light leading-relaxed text-lightgrey/90">
                      {currentStaff.bio}
                    </p>
                  </div>

                  {/* Expertise - Minimalist List */}
                  <div>
                    <p className="text-xs tracking-[0.3em] text-gold mb-4">EXPERTISE</p>
                    <div className="grid grid-cols-2 gap-3">
                      {currentStaff.expertise.map((skill, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="text-gold/60 text-xs">◆</span>
                          <span className="text-sm font-light">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademyOurStaff;
