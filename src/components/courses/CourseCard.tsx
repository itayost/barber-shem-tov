// src/components/courses/CourseCard.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/common/Button';
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
      <div className="bg-gradient-to-b from-charcoal to-black border border-gold/10 p-8 h-full flex flex-col hover:border-gold/30 transition-all duration-300 group">
        {/* Featured badge */}
        {course.featured && (
          <div className="absolute -top-3 -right-3 bg-gold text-charcoal px-4 py-1 text-xs font-bold shadow-lg">
            פופולרי
          </div>
        )}

        {/* Course header */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-3">
            <h2 className="text-2xl font-bold text-offwhite group-hover:text-gold transition-colors">
              {course.name_he}
            </h2>
            <span className="text-3xl opacity-50">
              {isAdvanced ? '🎓' : '📚'}
            </span>
          </div>
          <p className="text-lightgrey/80 text-sm leading-relaxed">
            {course.description_he}
          </p>
        </div>

        {/* Key info */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-black/40 backdrop-blur-sm p-4 text-center">
            <div className="text-xs text-lightgrey/60 mb-1">משך הקורס</div>
            <div className="text-gold font-medium">{course.duration_he}</div>
          </div>
          <div className="bg-black/40 backdrop-blur-sm p-4 text-center">
            <div className="text-xs text-lightgrey/60 mb-1">השקעה</div>
            <div className="text-xl font-bold text-offwhite">
              ₪{course.price.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Features - only top 3 */}
        <div className="flex-1 mb-6">
          <ul className="space-y-2">
            {(course.features || [
              'הכשרה מעשית מלאה',
              'ציוד מקצועי כלול',
              'תעודה מוכרת'
            ]).slice(0, 3).map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                <span className="text-lightgrey/80">{feature}</span>
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

        {/* CTAs */}
        <div className="space-y-3 mt-auto">
          <Button 
            href={`/contact?course=${encodeURIComponent(course.name_he)}`}
            variant="primary"
            fullWidth
            size="medium"
            className="group"
          >
            <span className="flex items-center justify-center gap-2">
              הרשמה לקורס
              <span className="group-hover:translate-x-1 transition-transform">←</span>
            </span>
          </Button>
          
          <a 
            href={`https://wa.me/972528691415?text=היי! מעניין אותי ${course.name_he}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-green-400 hover:text-green-300 text-sm transition-colors py-2"
          >
            <span className="flex items-center justify-center gap-2">
              💬 שאל בWhatsApp
            </span>
          </a>
        </div>

        {/* Spots indicator */}
        {course.urgentNote && (
          <div className="absolute bottom-4 left-4 text-xs text-orange-400 animate-pulse">
            🔥 נותרו מקומות בודדים
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CourseCard;