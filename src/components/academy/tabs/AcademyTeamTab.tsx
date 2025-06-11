// src/components/academy/tabs/AcademyTeamTab.tsx - Luxury Fashion Editorial
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/common/Button';
import { instructors } from '@/lib/data';

const AcademyTeamTab: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const selectedInstructor = instructors.find(i => i.id === selectedMember) || instructors[0];

  return (
    <div className="relative -mx-8 md:-mx-12 -my-8 md:-my-12">
      {/* Full Bleed Fashion Layout */}
      
      {/* Team Grid - Fashion Editorial Style */}
      <section className="bg-black py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Header - Minimal Luxury */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <p className="text-xs tracking-[0.5em] text-gold mb-6">
              THE MASTERS
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-thin text-offwhite">
              אמנים של המחר
            </h1>
          </motion.div>

          {/* Team Portraits Grid - Vogue Style */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-gold/10">
            {instructors.map((member, index) => (
              <motion.div
                key={member.id}
                className="relative bg-black cursor-pointer group"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedMember(member.id)}
                whileHover={{ scale: 0.98 }}
              >
                {/* Portrait - Fashion Editorial */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  {!imageErrors[member.id] ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      quality={85}
                      sizes="(max-width: 768px) 50vw, 33vw"
                      onError={() => setImageErrors(prev => ({ ...prev, [member.id]: true }))}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-b from-charcoal-dark to-black flex items-center justify-center">
                      <span className="text-[120px] text-gold/10 font-serif">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  )}

                  {/* Overlay - Minimal Info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <p className="text-xs tracking-[0.3em] text-gold mb-2">
                        {member.title.toUpperCase()}
                      </p>
                      <h3 className="text-2xl font-light text-offwhite">
                        {member.name}
                      </h3>
                    </div>
                  </div>

                  {/* Selection Indicator */}
                  {selectedMember === member.id && (
                    <motion.div
                      className="absolute inset-0 border-2 border-gold pointer-events-none"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Member Detail - Fashion Magazine Feature */}
      <AnimatePresence mode="wait">
        <motion.section
          key={selectedInstructor.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-charcoal-dark py-20 md:py-32"
        >
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              {/* Large Portrait - Editorial Style */}
              <div className="lg:col-span-5">
                <motion.div
                  className="relative aspect-[3/4] max-w-lg mx-auto lg:mx-0"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {!imageErrors[selectedInstructor.id] ? (
                    <Image
                      src={selectedInstructor.image}
                      alt={selectedInstructor.name}
                      fill
                      className="object-cover"
                      quality={90}
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      priority
                      onError={() => setImageErrors(prev => ({ ...prev, [selectedInstructor.id]: true }))}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-b from-charcoal to-black flex items-center justify-center">
                      <span className="text-[180px] text-gold/10 font-serif">
                        {selectedInstructor.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  {/* Frame */}
                  <div className="absolute -inset-4 border border-gold/10" />
                </motion.div>
              </div>

              {/* Content - Magazine Article Style */}
              <div className="lg:col-span-7 space-y-12">
                {/* Name & Title - Editorial Typography */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-5xl md:text-7xl font-thin text-offwhite mb-4">
                    {selectedInstructor.name}
                  </h2>
                  <p className="text-xs tracking-[0.5em] text-gold">
                    {selectedInstructor.title.toUpperCase()}
                  </p>
                </motion.div>

                {/* Bio - Magazine Column Style */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-6"
                >
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p className="text-lightgrey/90 font-light leading-relaxed first-letter:text-6xl first-letter:font-serif first-letter:text-gold first-letter:mr-3 first-letter:float-left">
                      {selectedInstructor.bio}
                    </p>
                  </div>
                </motion.div>

                {/* Expertise - Minimal Tags */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-xs tracking-[0.3em] text-gold mb-6">
                    EXPERTISE
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {selectedInstructor.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs tracking-wider text-lightgrey/70 pb-2 border-b border-gold/20"
                      >
                        {skill.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Achievements - Editorial List */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-xs tracking-[0.3em] text-gold mb-6">
                    ACHIEVEMENTS
                  </p>
                  <ul className="space-y-3">
                    {selectedInstructor.certifications.map((cert, idx) => (
                      <li key={idx} className="flex items-start gap-4 text-lightgrey/80">
                        <span className="text-gold/60 text-xs mt-1">○</span>
                        <span className="font-light">{cert}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* CTA - Minimal Button */}
                {selectedInstructor.courses.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Button
                      href="/courses"
                      variant="secondary"
                      className="font-light tracking-wider px-8"
                    >
                      LEARN FROM {selectedInstructor.name.split(' ')[0].toUpperCase()}
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.section>
      </AnimatePresence>
    </div>
  );
};

export default AcademyTeamTab;