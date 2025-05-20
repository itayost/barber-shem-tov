// src/components/academy/OurStory/CoreValues.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Core values data
const values = [
  {
    id: 'excellence',
    title: 'מצוינות',
    description: 'אנו מקדמים את הסטנדרטים הגבוהים ביותר בכל היבט של הלימוד והעבודה המקצועית.',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
  },
  {
    id: 'innovation',
    title: 'חדשנות',
    description: 'אנו מעודדים חשיבה יצירתית וחיפוש מתמיד אחר טכניקות וגישות חדשות.',
    icon: 'M11 17.25V16.75a5 5 0 0010 0V12h2a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2h2v4.75A2.25 2.25 0 009.25 19h1.5A2.25 2.25 0 0013 16.75'
  },
  {
    id: 'expertise',
    title: 'מקצועיות',
    description: 'הידע והמיומנות הטכנית הם הבסיס לכל מה שאנחנו מלמדים.',
    icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
  },
  {
    id: 'community',
    title: 'קהילתיות',
    description: 'אנו יוצרים סביבה תומכת ומעצימה שבה כל תלמיד יכול לפרוח.',
    icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z'
  }
];

const CoreValues: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {values.map((value, index) => (
        <motion.div
          key={value.id}
          className="bg-charcoal border border-lightgrey/10 p-6 hover:border-gold/30 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
        >
          {/* Icon */}
          <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={value.icon} />
            </svg>
          </div>
          
          {/* Content */}
          <h4 className="text-gold font-bold text-h5 mb-2">{value.title}</h4>
          <p className="text-lightgrey">{value.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default CoreValues;