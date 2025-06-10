// src/components/academy/tabs/AcademyTeamTab.tsx - Luxury Version
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/common/Button';
import { instructors } from '@/lib/data';

const AcademyTeamTab: React.FC = () => {
  const [selectedInstructor, setSelectedInstructor] = useState(instructors[0]);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="space-y-16">
      {/* Section Header */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-xs tracking-[0.3em] text-gold mb-4">
          MEET THE MASTERS
        </h2>
        <p className="text-2xl md:text-3xl font-light text-offwhite">
          הצוות <span className="text-gold italic font-serif">המקצועי</span>
        </p>
      </motion.div>

      {/* Team Grid - Mobile First */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {instructors.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative cursor-pointer group ${
              selectedInstructor.id === member.id ? 'ring-1 ring-gold/50' : ''
            }`}
            onClick={() => setSelectedInstructor(member)}
            onMouseEnter={() => setHoveredId(member.id)}
            onMouseLeave={() => setHoveredId(null)}
            whileHover={{ y: -5 }}
          >
            {/* Member Card - Luxury Minimal */}
            <div className="bg-gradient-to-b from-charcoal-light/30 to-transparent overflow-hidden">
              {/* Image Container */}
              <div className="relative aspect-[3/4] bg-gradient-to-br from-gold/10 to-brown/10">
                {!imageError[member.id] ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    onError={() => setImageError(prev => ({ ...prev, [member.id]: true }))}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-6xl md:text-7xl text-gold/20 font-light">
                      {member.name.charAt(0)}
                    </div>
                  </div>
                )}
                
                {/* Overlay on Hover */}
                <AnimatePresence>
                  {hoveredId === member.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent flex items-end"
                    >
                      <div className="p-4 text-center w-full">
                        <p className="text-xs tracking-wider text-gold">VIEW PROFILE</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Basic Info */}
              <div className="p-4 text-center">
                <h3 className="font-light text-sm md:text-base text-offwhite mb-1">
                  {member.name}
                </h3>
                <p className="text-xs tracking-wider text-gold/80">
                  {member.title.toUpperCase()}
                </p>
              </div>
            </div>

            {/* Active Indicator */}
            {selectedInstructor.id === member.id && (
              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gold/50"></div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Selected Member Details - Luxury Editorial */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedInstructor.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-charcoal-light/20 to-transparent border border-gold/10 p-8 md:p-12"
        >
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Portrait - Mobile: Center, Desktop: Left */}
            <div className="text-center">
              <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto mb-6">
                {/* Decorative Frame */}
                <div className="absolute -inset-4 border border-gold/10 rounded-full" />
                
                {/* Image */}
                <div className="relative w-full h-full rounded-full overflow-hidden border border-gold/30">
                  {!imageError[selectedInstructor.id] ? (
                    <Image
                      src={selectedInstructor.image}
                      alt={selectedInstructor.name}
                      fill
                      className="object-cover"
                      onError={() => setImageError(prev => ({ ...prev, [selectedInstructor.id]: true }))}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gradient-to-br from-gold/20 to-brown/10">
                      <span className="text-6xl text-gold/50 font-light">
                        {selectedInstructor.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Name & Title */}
              <h3 className="text-2xl md:text-3xl font-light mb-2">{selectedInstructor.name}</h3>
              <p className="text-xs tracking-[0.2em] text-gold mb-4">
                {selectedInstructor.title.toUpperCase()}
              </p>
              
              {/* Decorative Line */}
              <div className="w-16 h-[1px] bg-gold/30 mx-auto" />
            </div>

            {/* Details - Mobile: Stack, Desktop: Span 2 cols */}
            <div className="md:col-span-2 space-y-8">
              {/* Bio - Luxury Typography */}
              <div>
                <h4 className="text-xs tracking-[0.3em] text-gold mb-4">BIOGRAPHY</h4>
                <p className="text-lightgrey/90 leading-relaxed font-light">
                  {selectedInstructor.bio}
                </p>
              </div>

              {/* Expertise - Minimal Tags */}
              <div>
                <h4 className="text-xs tracking-[0.3em] text-gold mb-4">EXPERTISE</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedInstructor.expertise.map((skill) => (
                    <motion.span
                      key={skill}
                      className="text-xs tracking-wider text-lightgrey/70 border border-gold/20 px-4 py-2"
                      whileHover={{ 
                        borderColor: 'rgba(201, 166, 107, 0.5)',
                        color: 'rgba(201, 166, 107, 0.8)'
                      }}
                    >
                      {skill.toUpperCase()}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Certifications - Editorial List */}
              <div>
                <h4 className="text-xs tracking-[0.3em] text-gold mb-4">CERTIFICATIONS</h4>
                <ul className="space-y-2">
                  {selectedInstructor.certifications.map((cert, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-lightgrey/80 font-light">
                      <span className="text-gold/60 mt-0.5 text-xs">○</span>
                      <span className="text-sm">{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              {selectedInstructor.courses.length > 0 && (
                <div className="pt-4">
                  <p className="text-xs tracking-wider text-lightgrey/60 mb-4">
                    TEACHES IN OUR PROGRAMS
                  </p>
                  <Button 
                    href="/courses" 
                    variant="secondary"
                    className="font-light tracking-wider"
                  >
                    צפה בקורסים
                  </Button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Team Stats - Luxury Minimal */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {[
          { value: instructors.length, label: 'INSTRUCTORS' },
          { value: '45+', label: 'YEARS EXPERIENCE' },
          { value: '15+', label: 'CERTIFICATIONS' },
          { value: '500+', label: 'STUDENTS TRAINED' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="bg-gradient-to-br from-charcoal-light/10 to-transparent border border-gold/10 p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ borderColor: 'rgba(201, 166, 107, 0.3)' }}
          >
            <div className="text-3xl font-thin text-gold mb-2">{stat.value}</div>
            <div className="text-[10px] tracking-[0.2em] text-lightgrey/60">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom CTA */}
      <motion.div 
        className="text-center bg-gradient-to-br from-gold/5 to-transparent border border-gold/10 p-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h3 className="text-xl md:text-2xl font-light mb-4">
          רוצה ללמוד <span className="text-gold italic font-serif">מהטובים ביותר</span>?
        </h3>
        <p className="text-lightgrey/80 mb-6 max-w-2xl mx-auto font-light">
          הצוות שלנו מחכה להכיר אותך ולהעביר את הידע והניסיון שצברנו
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            href="/contact?consultation=true" 
            variant="primary"
            className="font-light tracking-wider"
          >
            קבע פגישת ייעוץ
          </Button>
          <Button 
            href="/courses" 
            variant="secondary"
            className="font-light tracking-wider"
          >
            ראה קורסים
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default AcademyTeamTab;