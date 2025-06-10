// src/components/courses/CourseCard.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SimpleCTA from '@/components/common/SimpleCTA';
import { Course } from '@/lib/data';

interface CourseCardProps {
  course: Course;
  index: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, index }) => {
  const isAdvanced = course.category === 'advanced';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative h-full"
    >
      <div className="bg-gradient-to-b from-charcoal to-black border border-gold/10 p-6 sm:p-8 h-full flex flex-col hover:border-gold/30 transition-all duration-300 group">
        {/* Featured badge - Mobile Sized */}
        {course.featured && (
          <div className="absolute -top-3 -right-3 bg-gold text-charcoal px-3 sm:px-4 py-1 text-xs font-bold shadow-lg">
            פופולרי
          </div>
        )}

        {/* Course header - Mobile First */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-start justify-between mb-3">
            <h2 className="text-xl sm:text-2xl font-bold text-offwhite group-hover:text-gold transition-colors">
              {course.name_he}
            </h2>
            <span className="text-2xl sm:text-3xl opacity-50">
              {isAdvanced ? '🎓' : '📚'}
            </span>
          </div>
          <p className="text-lightgrey/80 text-xs sm:text-sm leading-relaxed">
            {course.description_he}
          </p>
        </div>

        {/* Key info - Mobile Optimized */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
          <div className="bg-black/40 backdrop-blur-sm p-3 sm:p-4 text-center rounded-lg">
            <div className="text-xs text-lightgrey/60 mb-1">משך</div>
            <div className="text-gold font-medium text-sm sm:text-base">{course.duration_he}</div>
          </div>
          <div className="bg-black/40 backdrop-blur-sm p-3 sm:p-4 text-center rounded-lg">
            <div className="text-xs text-lightgrey/60 mb-1">מחיר</div>
            <div className="text-lg sm:text-xl font-bold text-offwhite">
              ₪{course.price.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Features - Mobile Optimized */}
        <div className="flex-1 mb-4 sm:mb-6">
          <ul className="space-y-2">
            {(course.features || [
              'הכשרה מעשית מלאה',
              'ציוד מקצועי כלול',
              'תעודה מוכרת'
            ]).slice(0, 3).map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                <span className="text-lightgrey/80 leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Prerequisites/Certification */}
        {(course.prerequisites || course.certification) && (
          <div className="text-xs text-lightgrey/60 pb-4 mb-4 border-b border-white/10">
            {course.prerequisites && (
              <p className="mb-1">📋 {course.prerequisites}</p>
            )}
            {course.certification && (
              <p>🏆 {course.certification}</p>
            )}
          </div>
        )}

        {/* Simple CTA - Mobile First */}
        <div className="mt-auto">
          <SimpleCTA
            courseName={course.name_he}
            courseDuration={course.duration_he}
            size="medium"
            showPhone={true}
          />
        </div>

        {/* Spots indicator - Mobile Positioned */}
        {course.urgentNote && (
          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-xs text-orange-400 animate-pulse">
            🔥 נותרו מקומות בודדים
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CourseCard;