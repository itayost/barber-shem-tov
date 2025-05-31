// components/home/ThreePathways.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ImageCourseCard from '@/components/home/ImageCourseCard';
import { courses } from '@/lib/data';

const ThreePathways: React.FC = () => {
  // Map courses to the new card format
  const courseData = [
    {
      type: 'קורס מקיף | מסלול מלא',
      title: 'ספרות בסיסית',
      subtitle: 'תוכנית מקצועית',
      duration: '4 שבועות | ספרות וטיפוח',
      imageUrl: '/images/courses/basic-course.jpg',
      enrollLink: `/contact?course=${encodeURIComponent(courses[0].name_he)}`,
      learnMoreLink: '/courses#basic'
    },
    {
      type: 'מאסטרקלאס | סופ״ש אינטנסיבי',
      title: 'עיצוב מתקדם',
      subtitle: 'השתלמות מקצועית',
      duration: '2 ימים | טכניקות מתקדמות',
      imageUrl: '/images/courses/advanced-course.jpg',
      enrollLink: `/contact?course=${encodeURIComponent(courses[1].name_he)}`,
      learnMoreLink: '/courses#advanced'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-black" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gold text-sm tracking-wider uppercase mb-3">
            אקדמיית בר שם טוב
          </p>
          
          <h2 className="text-3xl md:text-5xl font-bold text-offwhite mb-4">
            התוכניות שלנו
          </h2>
          
          <p className="text-lightgrey text-lg max-w-2xl mx-auto">
            קורסים מקצועיים המובילים לקריירה מצליחה בעולם הספרות
          </p>
        </motion.div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {courseData.map((course, index) => (
            <ImageCourseCard
              key={index}
              {...course}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThreePathways;