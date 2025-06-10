// src/app/courses/page.tsx
'use client';

import React, { useState } from 'react';
import Hero from '@/components/common/Hero';
import CoursesGrid from '@/components/courses/CoursesGrid';
import CoursesComparison from '@/components/courses/CoursesComparison';
import CoursesFAQ from '@/components/courses/CoursesFAQ';
import CoursesCTA from '@/components/courses/CoursesCTA';
import QuickEnrollFloat from '@/components/common/QuickEnrollFloat';


const CoursesPage = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'beginner' | 'advanced'>('all');

  return (
    <main className="bg-charcoal">
      <Hero
        title={<>הקרוסים <span className="text-gold">שלנו</span></>}
        subtitle="לכל גיל, לכל רמה"
        backgroundImage="/images/hero/courses-hero.jpg"
      />
      
      {/* Course cards grid */}
      <CoursesGrid activeFilter={activeFilter} />
      
      {/* Comparison section */}
      <CoursesComparison />
      
      {/* FAQ section */}
      <CoursesFAQ />
      
      {/* Bottom CTA */}
      <CoursesCTA />
      <QuickEnrollFloat />
    </main>
  );
};

export default CoursesPage;