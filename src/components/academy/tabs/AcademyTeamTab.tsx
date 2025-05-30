// src/components/academy/tabs/AcademyTeamTab.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/common/Button';
import { instructors } from '@/lib/data';

const AcademyTeamTab: React.FC = () => {
  const [selectedInstructor, setSelectedInstructor] = useState(instructors[0]);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="space-y-12">
      {/* Section Header */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          הצוות <span className="text-gold">המקצועי</span>
        </h2>
        <p className="text-lightgrey max-w-2xl mx-auto">
          למד מהמומחים המובילים בתעשייה - צוות מנוסה ומסור להצלחה שלך
        </p>
      </motion.div>

      {/* Team Grid */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {instructors.map((member) => (
          <motion.div
            key={member.id}
            variants={itemVariants}
            className={`
              relative cursor-pointer group
              ${selectedInstructor.id === member.id ? 'ring-2 ring-gold' : ''}
            `}
            onClick={() => setSelectedInstructor(member)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Member Card */}
            <div className="bg-charcoal-light/50 border border-lightgrey/10 overflow-hidden hover:border-gold/30 transition-all">
              {/* Image */}
              <div className="relative h-48 bg-gold/10">
                {!imageError[member.id] ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    onError={() => setImageError(prev => ({ ...prev, [member.id]: true }))}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-6xl text-gold/30">
                      {member.name.charAt(0)}
                    </div>
                  </div>
                )}
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-0 right-0 text-center">
                    <p className="text-gold text-sm">לחץ לפרטים</p>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 text-center">
                <h3 className="font-bold text-offwhite mb-1">{member.name}</h3>
                <p className="text-gold text-sm">{member.title}</p>
              </div>
            </div>

            {/* Active indicator */}
            {selectedInstructor.id === member.id && (
              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gold"></div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Selected Member Details */}
      <motion.div
        key={selectedInstructor.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-charcoal-light/50 to-brown/10 border border-gold/20 p-8 rounded-lg"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left - Image and Basic Info */}
          <div className="text-center">
            <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gold/30">
              {!imageError[selectedInstructor.id] ? (
                <Image
                  src={selectedInstructor.image}
                  alt={selectedInstructor.name}
                  fill
                  className="object-cover"
                  onError={() => setImageError(prev => ({ ...prev, [selectedInstructor.id]: true }))}
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gold/20">
                  <span className="text-6xl text-gold">
                    {selectedInstructor.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            
            <h3 className="text-2xl font-bold mb-2">{selectedInstructor.name}</h3>
            <p className="text-gold text-lg mb-4">{selectedInstructor.title}</p>
          </div>

          {/* Middle - Bio and Expertise */}
          <div className="md:col-span-2 space-y-6">
            {/* Bio */}
            <div>
              <h4 className="text-xl font-bold mb-3 text-gold">אודות</h4>
              <p className="text-lightgrey leading-relaxed">
                {selectedInstructor.bio}
              </p>
            </div>

            {/* Expertise */}
            <div>
              <h4 className="text-xl font-bold mb-3 text-gold">תחומי מומחיות</h4>
              <div className="flex flex-wrap gap-2">
                {selectedInstructor.expertise.map((skill) => (
                  <motion.span
                    key={skill}
                    className="bg-gold/10 text-gold px-4 py-2 text-sm border border-gold/20"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(201, 166, 107, 0.2)' }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h4 className="text-xl font-bold mb-3 text-gold">הסמכות</h4>
              <ul className="space-y-2">
                {selectedInstructor.certifications.map((cert, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-lightgrey">
                    <span className="text-gold mt-0.5"></span>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Courses */}
            {selectedInstructor.courses.length > 0 && (
              <div>
                <h4 className="text-xl font-bold mb-3 text-gold">קורסים</h4>
                <p className="text-lightgrey mb-4">
                  {selectedInstructor.name} מלמד בקורסים הבאים:
                </p>
                <Button href="/courses" variant="secondary">
                  צפה בקורסים
                </Button>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Bottom Stats */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="bg-charcoal-light/30 p-6 border border-lightgrey/10">
          <div className="text-3xl font-bold text-gold mb-2">{instructors.length}</div>
          <div className="text-lightgrey text-sm">אנשי צוות</div>
        </div>
        <div className="bg-charcoal-light/30 p-6 border border-lightgrey/10">
          <div className="text-3xl font-bold text-gold mb-2">45+</div>
          <div className="text-lightgrey text-sm">שנות ניסיון משותפות</div>
        </div>
        <div className="bg-charcoal-light/30 p-6 border border-lightgrey/10">
          <div className="text-3xl font-bold text-gold mb-2">15+</div>
          <div className="text-lightgrey text-sm">הסמכות בינלאומיות</div>
        </div>
        <div className="bg-charcoal-light/30 p-6 border border-lightgrey/10">
          <div className="text-3xl font-bold text-gold mb-2">500+</div>
          <div className="text-lightgrey text-sm">תלמידים הוכשרו</div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div 
        className="text-center bg-gold/10 border border-gold/20 p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h3 className="text-2xl font-bold mb-4">
          רוצה ללמוד <span className="text-gold">מהטובים ביותר</span>?
        </h3>
        <p className="text-lightgrey mb-6 max-w-2xl mx-auto">
          הצוות שלנו מחכה להכיר אותך ולהעביר את הידע והניסיון שצברנו לאורך השנים
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/contact?consultation=true" variant="primary">
            קבע פגישת ייעוץ
          </Button>
          <Button href="/courses" variant="secondary">
            ראה קורסים
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default AcademyTeamTab;