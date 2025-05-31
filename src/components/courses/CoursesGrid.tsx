// src/components/courses/CoursesGrid.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import CourseCard from './CourseCard';
import { courses } from '@/lib/data';

interface CoursesGridProps {
  activeFilter: 'all' | 'beginner' | 'advanced';
}

const CoursesGrid: React.FC<CoursesGridProps> = ({ activeFilter }) => {
  // Filter courses
  const filteredCourses = activeFilter === 'all' 
    ? courses 
    : courses.filter(course => course.category === activeFilter);

  return (
    <section className="py-20 bg-charcoal" dir="rtl">
      <div className="container mx-auto px-4">
        {/* Results count */}
        {filteredCourses.length > 0 && (
          <motion.p 
            className="text-center text-lightgrey/60 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            מציג {filteredCourses.length} קורסים
            {activeFilter !== 'all' && (
              <span> ברמת {activeFilter === 'beginner' ? 'מתחילים' : 'מתקדמים'}</span>
            )}
          </motion.p>
        )}

        {/* Course cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {filteredCourses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>

        {/* Empty state */}
        {filteredCourses.length === 0 && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl mb-4 opacity-20">📚</div>
            <h3 className="text-2xl font-bold text-offwhite mb-4">
              אין קורסים זמינים כרגע
            </h3>
            <p className="text-lightgrey mb-8">
              נסה לבחור קטגוריה אחרת או צור איתנו קשר
            </p>
            <a 
              href="/contact"
              className="inline-block bg-gold text-charcoal py-3 px-6 font-medium hover:bg-gold/90 transition-colors"
            >
              צור קשר
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CoursesGrid;