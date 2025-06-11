// src/components/common/CourseCard.tsx - CSS-only animations
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Button from '@/components/common/Button';
import { Course } from '@/lib/data';
import { useRouter } from 'next/navigation';

interface CourseCardProps {
  course: Course;
  index?: number;
  variant?: 'minimal' | 'detailed';
  className?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  index = 0,
  variant = 'minimal',
  className = ''
}) => {
  const [imageError, setImageError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  const courseImage = `/images/courses/${course.id}.jpg`;
  const fallbackImage = `/images/courses/${course.category}-course.jpg`;

  const handleEnroll = () => {
    const encodedCourseName = encodeURIComponent(course.name_he);
    router.push(`/apply?course=${encodedCourseName}`);
  };

  // Intersection observer for animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animationDelay = index * 100; // Stagger effect

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden group bg-charcoal flex items-center ${
        variant === 'minimal' ? 'min-h-[600px]' : 'min-h-[700px]'
      } ${isVisible ? 'animate-fadeInUp' : 'opacity-0'} ${className}`}
      style={{ animationDelay: `${animationDelay}ms` }}
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
            priority={index === 0}
            quality={70}
            loading={index === 0 ? "eager" : "lazy"}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src.includes(course.id)) {
                target.src = fallbackImage;
              } else {
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
        {variant === 'minimal' && <div className="h-8 md:h-12" />}

        {/* Category */}
        <p className={`text-gold text-sm uppercase tracking-wider mb-6 ${
          isVisible ? 'animate-fadeIn animation-delay-200' : 'opacity-0'
        }`}>
          {course.category === 'beginner' ? 'קורס למתחילים' : 
            course.category === 'advanced' ? 'קורס מתקדמים' :
              course.category === 'professional' ? 'קורס מקצועי' :
                course.category === 'workshop' ? 'סדנה' : 'קורס עסקי'}
        </p>

        {/* Title */}
        <div className={`mb-8 ${
          isVisible ? 'animate-fadeIn animation-delay-300' : 'opacity-0'
        }`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-offwhite mb-3">
            {course.name_he}
          </h2>
          <p className="text-lg md:text-xl text-gold/80">
            {course.duration_he}
          </p>
        </div>

        {/* Description */}
        <p className={`text-lightgrey text-base md:text-lg mb-8 max-w-2xl mx-auto ${
          isVisible ? 'animate-fadeIn animation-delay-400' : 'opacity-0'
        }`}>
          {course.description_he}
        </p>

        {/* Additional Details for Detailed Variant */}
        {variant === 'detailed' && course.features && course.features.length > 0 && (
          <div className={`mb-8 ${
            isVisible ? 'animate-fadeIn animation-delay-500' : 'opacity-0'
          }`}>
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
          </div>
        )}

        {/* CTA */}
        <div className={`flex flex-col items-center gap-4 ${
          isVisible ? 'animate-fadeIn animation-delay-600' : 'opacity-0'
        }`}>
          <Button
            onClick={handleEnroll}
            variant="primary"
            size="large"
            className="min-w-[200px] animate-shine"
          >
            הרשמה מהירה
          </Button>
          
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
        </div>
      </div>
    </div>
  );
};

export default CourseCard;