// src/app/courses/page.tsx - Complete Streamlined Courses Page
'use client';

import React, { useState } from 'react';
import CoursesHero from '@/components/courses/CoursesHero';
import CourseCards from '@/components/courses/CourseCards';
import ComparisonTable from '@/components/courses/ComparisonTable';
import CoursesFAQ from '@/components/courses/CoursesFAQ';
import CoursesBottomCTA from '@/components/courses/CoursesBottomCTA';
import WhatsAppFloat from '@/components/common/WhatsAppFloat';

export default function CoursesPage() {
  // Filter state for courses
  const [activeFilter, setActiveFilter] = useState<'all' | 'beginner' | 'advanced'>('all');

  return (
    <>
      {/* 1. Courses Hero - Clear headline + filter buttons */}
      <CoursesHero 
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      
      {/* 2. Course Cards - Large, detailed cards with comprehensive info */}
      <CourseCards activeFilter={activeFilter} />
      
      {/* 3. Comparison Table - Help decision making */}
      <ComparisonTable />
      
      {/* 4. FAQ Section - Address enrollment concerns */}
      <CoursesFAQ />
      
      {/* 5. Bottom CTA - Multiple contact options */}
      <CoursesBottomCTA />

      {/* WhatsApp floating button for immediate contact */}
      <WhatsAppFloat />
    </>
  );
}