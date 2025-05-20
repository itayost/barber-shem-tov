// src/components/home/FeaturedCourses/index.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/common/Button';
import CourseCard from './CourseCard';
import CategorySelector from './CategorySelector';
import SectionHeader from './SectionHeader';
import { courses } from '@/lib/data';

const FeaturedCourses = () => {
  // Group courses by category for filtering
  const courseCategories = {
    'beginner': courses.filter(course => course.category === 'beginner' || course.level === 'beginner'),
    'advanced': courses.filter(course => course.category === 'advanced' || course.level === 'advanced'),
    'professional': courses.filter(course => course.category === 'professional'),
    'specialized': courses.filter(course => course.category === 'specialized' || course.isSpecialized)
  };
  
  // Get all featured courses
  const featuredCourses = courses.filter(course => course.featured);
  
  // State for active category
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Define which courses to display based on selected category
  const displayCourses = activeCategory === 'all' 
    ? featuredCourses.slice(0, 3) // Limit to 3 featured courses
    : courseCategories[activeCategory as keyof typeof courseCategories]?.slice(0, 3) || [];

  return (
    <section className="py-section-mobile md:py-section bg-brown/5" dir="rtl">
      {/* Background decorative elements */}
      <div className="absolute left-0 top-1/4 w-full h-32 overflow-hidden pointer-events-none opacity-5">
        <div className="w-full h-full bg-[url('/images/pattern-bg.svg')] bg-repeat-x"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section header with animations */}
        <SectionHeader 
          title="הקורסים המובילים שלנו"
          description="בחר מבין מגוון הקורסים שלנו, המציעים את הטכניקות, הידע וההכשרה המעשית הדרושים להצלחה בעולם הספרות המודרני"
        />
        
        {/* Category selector with animation */}
        <CategorySelector 
          categories={[
            { id: 'all', label: 'קורסים מובילים' },
            { id: 'beginner', label: 'למתחילים' },
            { id: 'advanced', label: 'מתקדמים' },
            { id: 'professional', label: 'מקצועיים' },
            { id: 'specialized', label: 'התמחויות' }
          ]}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        
        {/* Course cards with animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {displayCourses.length > 0 ? (
            displayCourses.map((course, index) => (
              <CourseCard 
                key={course.id} 
                course={course} 
                delay={index * 0.1} 
              />
            ))
          ) : (
            <div className="col-span-3 text-center py-16">
              <p className="text-lightgrey">אין קורסים זמינים בקטגוריה זו כרגע.</p>
            </div>
          )}
        </div>
        
        {/* CTA button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button 
            href="/academy/courses" 
            variant="primary"
          >
            לכל הקורסים שלנו
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCourses;