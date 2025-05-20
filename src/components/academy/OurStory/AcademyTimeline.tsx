// src/components/academy/OurStory/AcademyTimeline.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { academyInfo } from '@/lib/data';

// Timeline milestones data
const milestones = [
  {
    year: academyInfo.established,
    title: 'הקמת האקדמיה',
    description: 'האקדמיה נוסדה עם החזון להכשיר את הדור הבא של ספרים מקצועיים.'
  },
  {
    year: academyInfo.established + 1,
    title: 'פתיחת הקורס הראשון',
    description: '12 תלמידים סיימו בהצלחה את מחזור הלימודים הראשון שלנו.'
  },
  {
    year: academyInfo.established + 2,
    title: 'הרחבת מסלולי הלימוד',
    description: 'הוספנו קורסים מתקדמים ומיוחדים בתחומי התמחויות שונים.'
  },
  {
    year: 2023,
    title: 'הכרה והסמכה רשמית',
    description: 'קיבלנו הכרה רשמית ממשרד העבודה והרווחה והסמכות בינלאומיות.'
  },
  {
    year: 2024,
    title: 'הקמת סדנאות מומחים',
    description: 'השקנו סדרת סדנאות עם מומחים בינלאומיים לתלמידים ובוגרים.'
  }
];

const AcademyTimeline: React.FC = () => {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute top-0 right-[15px] lg:right-1/2 lg:translate-x-[7px] w-[2px] h-full bg-gold/20"></div>
      
      {/* Timeline events */}
      <div className="ml-8 lg:mx-0">
        {milestones.map((milestone, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative pb-16 ${index % 2 === 0 ? 'lg:pr-12 lg:text-right lg:ml-auto lg:mr-0 lg:w-1/2' : 'lg:pl-12 lg:mr-auto lg:ml-0 lg:w-1/2 lg:text-left'}`}
          >
            {/* Year dot */}
            <div className={`absolute top-0 right-0 lg:right-auto ${index % 2 === 0 ? 'lg:right-0 lg:translate-x-1/2' : 'lg:left-0 lg:-translate-x-1/2'} w-8 h-8 rounded-full bg-charcoal border-4 border-gold flex items-center justify-center z-10`}>
              <div className="w-2 h-2 rounded-full bg-gold"></div>
            </div>
            
            {/* Content */}
            <div className={`pt-1 pr-10 lg:pr-0 ${index % 2 === 0 ? '' : 'lg:pl-0'}`}>
              <div className="text-gold text-xl font-bold mb-2">{milestone.year}</div>
              <h3 className="text-h4 mb-2">{milestone.title}</h3>
              <p className="text-lightgrey">{milestone.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AcademyTimeline;