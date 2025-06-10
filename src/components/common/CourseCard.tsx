// src/components/common/CourseCard.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/common/Button';
import SimpleCTA from '@/components/common/SimpleCTA';
import { Course } from '@/lib/data';

interface CourseCardProps {
  course: Course;
  index?: number;
  variant?: 'minimal' | 'detailed'; // minimal for home, detailed for courses page
  className?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  index = 0,
  variant = 'minimal',
  className = ''
}) => {
  const [imageError, setImageError] = useState(false);
  
  // Course image path - assumes images follow naming convention
  const courseImage = `/images/courses/${course.id}.jpg`;
  const fallbackImage = `/images/courses/${course.category}-course.jpg`;

  return (
    <motion.div
      className={`relative overflow-hidden group bg-charcoal flex items-center ${
        variant === 'minimal' ? 'min-h-[600px]' : 'min-h-[700px]'
      } ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {!imageError ? (
          <Image
            src={courseImage}
            alt={course.name_he}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src.includes(course.id)) {
                // Try fallback image
                target.src = fallbackImage;
              } else {
                // If fallback also fails, show gradient
                setImageError(true);
              }
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gold/20 to-brown/20" />
        )}
        
        {/* Dark Overlay */}
        <div className={`absolute inset-0 ${
          variant === 'detailed' 
            ? 'bg-gradient-to-t from-black via-black/80 to-black/50' 
            : 'bg-black/50'
        }`} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 sm:px-8 py-12 text-center">
        {/* Spacer for minimal variant */}
        {variant === 'minimal' && <div className="h-8 md:h-12" />}

        {/* Category */}
        <motion.p 
          className="text-gold text-sm uppercase tracking-wider mb-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {course.category === 'beginner' ? 'קורס למתחילים' : 
           course.category === 'advanced' ? 'קורס מתקדמים' :
           course.category === 'professional' ? 'קורס מקצועי' :
           course.category === 'workshop' ? 'סדנה' : 'קורס עסקי'}
        </motion.p>

        {/* Title */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-offwhite mb-3">
            {course.name_he}
          </h2>
          <p className="text-lg md:text-xl text-gold/80">
            {course.duration_he}
          </p>
        </motion.div>

        {/* Description - shown in both variants */}
        <motion.p 
          className="text-lightgrey text-base md:text-lg mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {course.description_he}
        </motion.p>

        {/* Additional Details for Detailed Variant */}
        {variant === 'detailed' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            {/* Features List */}
            {course.features && course.features.length > 0 && (
              <div className="bg-black/40 backdrop-blur-sm border border-gold/20 p-6 rounded-lg mb-6 max-w-xl mx-auto">
                <h3 className="text-gold font-bold mb-4">מה תלמדו בקורס:</h3>
                <ul className="text-lightgrey text-sm space-y-2 text-right">
                  {course.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}

        {/* Enhanced CTA */}
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: variant === 'detailed' ? 0.6 : 0.5 }}
        >
          <SimpleCTA
            courseName={course.name_he}
            courseDuration={course.duration_he}
            size="large"
          />
          
          {/* Secondary CTA for minimal variant */}
          {variant === 'minimal' && (
            <Button
              href="/courses"
              variant="secondary"
              size="large"
              className="mt-4 min-w-[200px]"
            >
              לכל הקורסים
            </Button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CourseCard;