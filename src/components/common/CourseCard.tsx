'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Course } from '@/lib/data';
import { Clock, Users, ArrowLeft } from 'lucide-react';

export const CourseCardClean: React.FC<{ course: Course; index: number }> = ({ course, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const categoryLabels = {
    beginner: 'למתחילים',
    advanced: 'למתקדמים',
    professional: 'מקצועי',
    workshop: 'סדנה',
    business: 'עסקי',
  };

  return (
    <motion.article
      className="relative aspect-[4/5] md:aspect-[16/9] overflow-hidden cursor-pointer group bg-charcoal"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Loading Skeleton */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-charcoal animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        </div>
      )}

      {/* Background Image with lazy loading */}
      <div className="absolute inset-0">
        <motion.img
          src={course.image}
          alt={course.name_he}
          className="w-full h-full object-cover"
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          animate={{
            scale: isHovered ? 1.05 : 1,
            opacity: imageLoaded ? 1 : 0,
          }}
          transition={{
            scale: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
            opacity: { duration: 0.3 },
          }}
        />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90" />

      {/* Content - Always visible */}
      <div className="relative h-full flex flex-col justify-between p-6 md:p-8 lg:p-10">
        {/* Top Section - Tags */}
        <div className="flex flex-wrap gap-2">
          {course.featured && (
            <span className="bg-gold text-black px-3 py-1 text-xs tracking-wider uppercase font-medium">
              מומלץ
            </span>
          )}

          <span className="bg-white/10 backdrop-blur-sm text-white px-3 py-1 text-xs tracking-wider uppercase">
            {categoryLabels[course.category]}
          </span>

          {course.urgentNote && (
            <span className="bg-gold/20 backdrop-blur-sm text-gold px-3 py-1 text-xs">
              {course.urgentNote}
            </span>
          )}
        </div>

        {/* Bottom Section - Course Info */}
        <div>
          {/* Title */}
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-thin text-white mb-3 leading-tight">
            {course.name_he}
          </h3>

          {/* Description */}
          <p className="text-white/80 text-sm md:text-base leading-relaxed mb-6 line-clamp-2 md:line-clamp-3">
            {course.description_he}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{course.duration_he}</span>
            </div>

            {course.maxStudents && (
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>עד {course.maxStudents} תלמידים</span>
              </div>
            )}

            <div className="flex items-center gap-1">
              <span className="text-2xl font-thin text-gold">
                ₪{course.price.toLocaleString('he-IL')}
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <motion.button
            className="group/btn relative overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 text-white hover:border-gold/50 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-3 text-sm tracking-wider uppercase">
              פרטים נוספים
              <motion.span animate={{ x: isHovered ? -5 : 0 }} transition={{ duration: 0.3 }}>
                <ArrowLeft className="w-4 h-4" />
              </motion.span>
            </span>

            {/* Hover Background */}
            <motion.div
              className="absolute inset-0 bg-gold"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </div>

      {/* Side Accent Line */}
      <motion.div
        className="absolute top-0 start-0 w-1 h-full bg-gold"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ transformOrigin: 'top' }}
      />
    </motion.article>
  );
};

// Grid Wrapper
export const CleanCourseGrid: React.FC<{ courses: Course[] }> = ({ courses }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      {courses.map((course, index) => (
        <CourseCardClean key={course.id} course={course} index={index} />
      ))}
    </div>
  );
};
