// src/components/home/ThreePathways.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import CourseCard from '@/components/common/CourseCard';
import { courses } from '@/lib/data';

const ThreePathways: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-charcoal" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gold text-sm tracking-wider uppercase mb-3">The Fader Academy</p>

          <h2 className="text-3xl md:text-5xl font-bold text-offwhite mb-4">התוכניות שלנו</h2>

          <p className="text-lightgrey text-lg max-w-2xl mx-auto">
            קורסים מקצועיים המובילים לקריירה מצליחה בעולם הספרות
          </p>
        </motion.div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {courses.slice(0, 2).map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} variant="minimal" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThreePathways;
