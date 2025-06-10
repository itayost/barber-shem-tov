// src/components/common/CourseCard.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/common/Button';
import { Course } from '@/lib/data';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  
  // Course image path - assumes images follow naming convention
  const courseImage = `/images/courses/${course.id}.jpg`;
  const fallbackImage = `/images/courses/${course.category}-course.jpg`;

  // Handle enrollment navigation
  const handleEnroll = () => {
    const encodedCourseName = encodeURIComponent(course.name_he);
    router.push(`/apply?course=${encodedCourseName}`);
  };

  // WhatsApp message
  const handleWhatsApp = () => {
    const message = `היי! מעוניין ב${course.name_he} (${course.duration_he}). אשמח לפרטים נוספים 🎯`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/972528691415?text=${encodedMessage}`, '_blank');
  };

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
            ? 'bg-gradient-to-t from-black via-black/80 to-black/60' 
            : 'bg-black/60'
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
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: variant === 'detailed' ? 0.6 : 0.5 }}
        >
          {/* Primary CTA Button */}
          <Button
            onClick={handleEnroll}
            variant="primary"
            size="large"
            className="min-w-[200px] animate-shine"
          >
            הרשמה מהירה
          </Button>
          
          {/* Quick Contact Options */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleWhatsApp}
              className="text-green-500 hover:text-green-400 transition-colors flex items-center gap-1.5 text-sm group"
            >
              <svg className="w-4 h-4 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
              </svg>
              <span>WhatsApp</span>
            </button>

            <span className="text-lightgrey/30">|</span>

            <a
              href="tel:+972528691415"
              className="text-gold hover:text-gold/80 transition-colors flex items-center gap-1.5 text-sm group"
            >
              <svg className="w-4 h-4 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="hebrew-nums">052-869-1415</span>
            </a>
          </div>
          
          {/* Secondary CTA for minimal variant */}
          {variant === 'minimal' && (
            <Button
              href="/courses"
              variant="secondary"
              size="large"
              className="min-w-[200px]"
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