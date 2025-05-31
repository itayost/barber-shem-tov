// src/app/courses/page.tsx
'use client';

import React, { useState } from 'react';
import CoursesHero from '@/components/courses/CoursesHero';
import CoursesGrid from '@/components/courses/CoursesGrid';
import CoursesComparison from '@/components/courses/CoursesComparison';
import CoursesFAQ from '@/components/courses/CoursesFAQ';
import CoursesCTA from '@/components/courses/CoursesCTA';

const CoursesPage = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'beginner' | 'advanced'>('all');

  return (
    <main className="bg-charcoal">
      {/* Hero with filters */}
      <CoursesHero 
        activeFilter={activeFilter} 
        onFilterChange={setActiveFilter} 
      />
      
      {/* Course cards grid */}
      <CoursesGrid activeFilter={activeFilter} />
      
      {/* Comparison section */}
      <CoursesComparison />
      
      {/* FAQ section */}
      <CoursesFAQ />
      
      {/* Bottom CTA */}
      <CoursesCTA />
    </main>
  );
};

export default CoursesPage;