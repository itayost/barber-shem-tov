'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LuxurySection, EditorialGrid, EditorialCard } from '@/components/luxury';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  experience: string;
  image: string;
}

const staffMembers: StaffMember[] = [
  {
    id: '1',
    name: 'דניאל כהן',
    role: 'מדריך בכיר',
    specialties: ['תספורות קלאסיות', 'עיצוב זקן'],
    experience: '10 שנים',
    image: '/images/staff/daniel-cohen.jpg',
  },
  {
    id: '2',
    name: 'מיכאל לוי',
    role: 'מומחה צביעה',
    specialties: ['טכניקות צביעה', 'בלונדינים'],
    experience: '8 שנים',
    image: '/images/staff/michael-levi.jpg',
  },
  {
    id: '3',
    name: 'יונתן אברהם',
    role: 'מדריך טכני',
    specialties: ['Fade', 'עיצובים מודרניים'],
    experience: '12 שנים',
    image: '/images/staff/yonatan-abraham.jpg',
  },
  {
    id: '4',
    name: 'אורי ישראלי',
    role: 'יועץ עסקי',
    specialties: ['ניהול עסק', 'שיווק דיגיטלי'],
    experience: '15 שנים',
    image: '/images/staff/ori-israeli.jpg',
  },
];

const Staff: React.FC = () => {
  return (
    <LuxurySection
      label="הצוות שלנו"
      title="מומחים"
      accent="מובילים"
      subtitle="למדו מהטובים בתעשייה"
      size="large"
      bgColor="charcoal"
    >
      <EditorialGrid columns={4} gap="default" className="mt-16">
        {staffMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
          >
            <div className="group">
              {/* Portrait */}
              <div className="relative aspect-[3/4] overflow-hidden mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-xs uppercase tracking-wider text-gold mb-2">
                      {member.experience} ניסיון
                    </p>
                    <div className="space-y-1">
                      {member.specialties.map(specialty => (
                        <p key={specialty} className="text-sm text-offwhite/80">
                          • {specialty}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Border */}
                <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/20 transition-all duration-500" />
              </div>

              {/* Info */}
              <div className="text-center">
                <h3 className="text-xl font-light text-offwhite mb-1">{member.name}</h3>
                <p className="text-sm uppercase tracking-wider text-gold">{member.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </EditorialGrid>

      {/* Join Team CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mt-20 pt-20 border-t border-gold/10"
      >
        <h3 className="text-2xl md:text-3xl font-light text-offwhite mb-4">
          רוצים להצטרף לצוות שלנו?
        </h3>
        <p className="text-lightgrey mb-8 max-w-2xl mx-auto">
          אנחנו תמיד מחפשים מדריכים מוכשרים ומקצועיים להצטרף למשפחת The Fader
        </p>
        <a
          href="/careers"
          className="inline-flex items-center gap-3 text-gold hover:gap-6 transition-all duration-500"
        >
          <span className="text-sm uppercase tracking-wider">משרות פתוחות</span>
          <span>←</span>
        </a>
      </motion.div>
    </LuxurySection>
  );
};

export default Staff;
