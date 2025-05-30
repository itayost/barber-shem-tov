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

  const teamMembers = [
    ...instructors,
    {
      id: 'sarah',
      name: 'שרה כהן',
      title: 'מנהלת האקדמיה',
      bio: 'שרה מביאה ניסיון של 10 שנים בניהול מוסדות חינוך מקצועיים. היא אחראית על התפעול השוטף של האקדמיה ועל חוויית הלמידה של התלמידים.',
      image: '/images/team/sarah.jpg',
      expertise: ['ניהול אקדמי', 'פיתוח תוכניות לימודים', 'ייעוץ קריירה'],
      certifications: ['MA בחינוך', 'תעודת ניהול מוסדות חינוך'],
      courses: []
    },
    {
      id: 'david',
      name: 'דוד לוי',
      title: 'מדריך בכיר',
      bio: 'דוד הוא ספר מומחה עם 12 שנות ניסיון. מתמחה בטכניקות חיתוך מתקדמות ועיצוב זקן. זוכה תחרויות ספרות ארציות.',
      image: '/images/team/david.jpg',
      expertise: ['טכניקות Fade', 'עיצוב זקן', 'תספורות קלאסיות'],
      certifications: ['Master Barber International', 'מדריך מוסמך'],
      courses: ['basic-barbering-course']
    }
  ];

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
        {teamMembers.map((member) => (
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
            
            {/* Social Links (if available) */}
            <div className="flex justify-center gap-4">
              <motion.a
                href="#"
                className="text-lightgrey hover:text-gold transition-colors"
                whileHover={{ scale: 1.2 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </motion.a>
              <motion.a
                href="#"
                className="text-lightgrey hover:text-gold transition-colors"
                whileHover={{ scale: 1.2 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </motion.a>
            </div>
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
                    <span className="text-gold mt-0.5">🏆</span>
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
          <div className="text-3xl font-bold text-gold mb-2">{teamMembers.length}</div>
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