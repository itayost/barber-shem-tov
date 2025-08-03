// src/app/courses/CoursesPageClient.tsx
'use client';

import React, { useState } from 'react';
import Hero from '@/components/common/Hero';
import CoursesGrid from '@/components/courses/CoursesGrid';
import CoursesFAQ from '@/components/courses/CoursesFAQ';
import CoursesCTA from '@/components/courses/CoursesCTA';

const CoursesPageClient = () => {
  const [activeFilter] = useState<'all' | 'beginner' | 'advanced'>('all');

  return (
    <main className="bg-charcoal">
      <Hero
        title={<>הקורסים <span className="text-gold">שלנו</span></>}
        subtitle="לכל גיל, לכל רמה"
        backgroundImage="/images/hero/courses-hero.jpg"
      />
      
      {/* Course cards grid */}
      <CoursesGrid activeFilter={activeFilter} />
      
      {/* FAQ section */}
      <CoursesFAQ />
      
      {/* Bottom CTA */}
      <CoursesCTA />
    </main>
  );
};

export default CoursesPageClient;