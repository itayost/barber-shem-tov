'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { instructors } from '@/lib/data';

const AcademyOurStaff = () => {
  const [selectedStaff, setSelectedStaff] = useState(0);
  const currentStaff = instructors[selectedStaff];

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-charcoal text-offwhite">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold text-sm uppercase tracking-[0.2em] block mb-4">
            הצוות שלנו
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light">
            המאסטרים
            <span className="text-gold"> שמובילים</span>
          </h2>
          <p className="text-lg text-lightgrey mt-4 max-w-2xl mx-auto">
            מאחורי כל ספר גדול עומד מורה גדול עוד יותר
          </p>
        </motion.div>

        {/* Staff Selector - Mobile: Horizontal Scroll, Desktop: Tabs */}
        <motion.div
          className="mb-8 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex gap-4 overflow-x-auto pb-4 md:justify-center scrollbar-hide">
            {instructors.map((staff, index) => (
              <button
                key={staff.id}
                onClick={() => setSelectedStaff(index)}
                className={`
                  flex-shrink-0 px-6 py-4 rounded-lg transition-all duration-300
                  ${
                    selectedStaff === index
                      ? 'bg-gold text-charcoal'
                      : 'bg-charcoal-light hover:bg-charcoal-light/80 text-offwhite'
                  }
                `}
              >
                <div className="text-xs opacity-60 mb-1">0{index + 1}</div>
                <h3 className="text-lg font-medium">{staff.name}</h3>
                <p className="text-sm opacity-80">{staff.title}</p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Staff Feature */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStaff.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
          >
            {/* Portrait */}
            <div className="relative">
              <div className="aspect-[3/4] lg:aspect-square relative rounded-lg overflow-hidden">
                <Image
                  src={currentStaff.image || `/images/team/${currentStaff.id}.jpg`}
                  alt={currentStaff.name}
                  fill
                  className="object-cover"
                />
                {/* Stats Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex gap-8 text-white">
                    <div>
                      <div className="text-3xl md:text-4xl font-light text-gold">
                        {currentStaff.id === 'bar' ? '15+' : '12'}
                      </div>
                      <div className="text-sm opacity-80">שנות ניסיון</div>
                    </div>
                    <div>
                      <div className="text-3xl md:text-4xl font-light text-gold">
                        {currentStaff.id === 'bar' ? '500+' : '200+'}
                      </div>
                      <div className="text-sm opacity-80">תלמידים</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              {/* Name & Title */}
              <div>
                <h3 className="text-2xl md:text-3xl font-light mb-2">{currentStaff.name}</h3>
                <p className="text-gold text-lg">{currentStaff.title}</p>
              </div>

              {/* Quote */}
              <div className="text-xl md:text-2xl font-light italic text-gold/80 leading-relaxed">
                "כל תלמיד הוא עולם ומלואו"
              </div>

              {/* Bio */}
              <p className="text-lightgrey leading-relaxed">{currentStaff.bio}</p>

              {/* Expertise */}
              <div>
                <h4 className="text-lg font-medium mb-4">תחומי התמחות</h4>
                <div className="grid grid-cols-2 gap-3">
                  {currentStaff.expertise.map((specialty, i) => (
                    <div
                      key={i}
                      className="border border-gold/30 px-4 py-3 text-center text-sm rounded hover:bg-gold hover:text-charcoal hover:border-gold transition-all duration-300"
                    >
                      {specialty}
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h4 className="text-lg font-medium mb-3">הסמכות</h4>
                <ul className="space-y-2">
                  {currentStaff.certifications.map((cert, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-gold mr-2">✓</span>
                      <span className="text-sm text-lightgrey">{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Guest Instructors */}
        <motion.div
          className="mt-16 md:mt-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="bg-charcoal-light rounded-lg p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-light text-center mb-8">
              מרצים אורחים
              <span className="text-gold"> בינלאומיים</span>
            </h3>

            <p className="text-center text-lightgrey mb-12 max-w-2xl mx-auto">
              האקדמיה מארחת באופן קבוע ספרים בינלאומיים ומומחים מהתעשייה לסדנאות מיוחדות
              ומאסטרקלאסים
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { city: 'לונדון', specialty: 'טכניקות קלאסיות' },
                { city: 'ניו יורק', specialty: 'סגנונות מודרניים' },
                { city: 'פריז', specialty: 'אומנות השיער' },
                { city: 'טוקיו', specialty: 'דיוק וטכניקה' },
              ].map((guest, i) => (
                <motion.div
                  key={guest.city}
                  className="bg-charcoal rounded-lg p-6 text-center hover:bg-gold hover:text-charcoal transition-all duration-300 cursor-pointer group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🌍</div>
                  <h4 className="font-medium">{guest.city}</h4>
                  <p className="text-xs opacity-80 mt-1">{guest.specialty}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Teaching Philosophy */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl font-light text-gold/80 leading-relaxed italic">
              "הפילוסופיה שלנו פשוטה - כל תלמיד הוא עולם ומלואו. אנחנו מאמינים בהוראה מותאמת אישית,
              ליווי צמוד, והקניית כלים שילוו את הבוגרים שלנו לאורך כל הקריירה"
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AcademyOurStaff;
