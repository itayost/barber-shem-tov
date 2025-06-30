'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Award, ArrowLeft } from 'lucide-react';
import { Course } from '@/lib/data';
import { LuxuryLabel, LuxuryHeading } from './Typography';

interface LuxuryCourseCardProps {
  course: Course;
  index?: number;
  variant?: 'default' | 'minimal' | 'detailed';
}

const LuxuryCourseCard: React.FC<LuxuryCourseCardProps> = ({
  course,
  index = 0,
  variant = 'default',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="group h-full"
    >
      <a href={`/courses/${course.id}`} className="block h-full">
        <div className="relative aspect-[3/4] overflow-hidden h-full">
          {/* Background Image */}
          <img
            src={`/images/courses/${course.id}.jpg`}
            alt={course.name_he}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

          {/* Featured Badge */}
          {course.featured && (
            <div className="absolute top-6 end-6 bg-gold text-black px-4 py-2">
              <span className="text-xs uppercase tracking-wider font-medium">מומלץ</span>
            </div>
          )}

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-8">
            {/* Category Label */}
            <LuxuryLabel size="xs" className="mb-3">
              {course.instructor === 'bar' ? 'עם בר שם טוב' : 'קורס מקצועי'}
            </LuxuryLabel>

            {/* Title */}
            <LuxuryHeading as="h3" size="h4" className="mb-4">
              {course.name_he}
            </LuxuryHeading>

            {/* Meta Info */}
            <div className="flex items-center gap-6 text-offwhite/80 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{course.duration_he}</span>
              </div>
              {course.maxStudents && (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">עד {course.maxStudents}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span className="text-sm">
                  {course.category === 'beginner' ? 'מתחילים' : 'מתקדמים'}
                </span>
              </div>
            </div>

            {/* Description - only show on hover */}
            <p className="text-lightgrey text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-3">
              {course.description_he}
            </p>

            {/* CTA */}
            <div className="inline-flex items-center gap-3 text-gold group-hover:gap-6 transition-all duration-500">
              <span className="text-sm uppercase tracking-wider">לפרטים נוספים</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </div>

            {/* Next Session */}
            {course.nextSession && (
              <p className="text-xs text-gold/70 mt-4">המחזור הבא: {course.nextSession}</p>
            )}
          </div>

          {/* Border on hover */}
          <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/20 transition-all duration-500" />

          {/* Additional hover overlay for darkening effect */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
        </div>
      </a>
    </motion.div>
  );
};

export default LuxuryCourseCard;
