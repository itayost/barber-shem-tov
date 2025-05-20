// src/components/academy/CTASection/CourseExplorationCTA.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface CourseCategory {
  id: string;
  title: string;
  courses: { id: string; title: string; }[];
}

const CourseExplorationCTA: React.FC = () => {
  // Sample data - in a real app, this would come from props or a data store
  const courseCategories: CourseCategory[] = [
    {
      id: 'beginner',
      title: 'קורסים למתחילים',
      courses: [
        { id: 'basic-barbering', title: 'יסודות הספרות לגברים' },
        { id: 'basic-styling', title: 'יסודות העיצוב והסגנון' }
      ]
    },
    {
      id: 'advanced',
      title: 'קורסים מתקדמים',
      courses: [
        { id: 'advanced-techniques', title: 'טכניקות מתקדמות' },
        { id: 'styling-masterclass', title: 'מאסטרקלאס בעיצוב' }
      ]
    },
    {
      id: 'specialized',
      title: 'קורסים מתמחים',
      courses: [
        { id: 'beard-styling', title: 'עיצוב זקן מקצועי' },
        { id: 'business-management', title: 'ניהול עסקי למספרות' }
      ]
    }
  ];

  return (
    <div>
      <h3 className="text-h3 mb-6">גלה את המסלולים שלנו</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {courseCategories.map((category) => (
          <div key={category.id} className="border border-lightgrey/10 hover:border-gold/30 transition-colors duration-300 p-6">
            <h4 className="text-gold font-medium mb-4">{category.title}</h4>
            <ul className="space-y-3">
              {category.courses.map((course) => (
                <li key={course.id}>
                  <Link 
                    href={`/academy/courses/${course.id}`}
                    className="text-lightgrey hover:text-gold transition-colors flex items-center gap-2 group"
                  >
                    <span className="text-gold opacity-0 group-hover:opacity-100 transition-opacity">•</span>
                    <span>{course.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Link 
          href="/academy/courses"
          className="inline-flex items-center gap-2 bg-gold text-charcoal py-3 px-6 font-medium hover:bg-opacity-90 transition-colors"
        >
          <span>לכל הקורסים</span>
          <ArrowLeftIcon className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default CourseExplorationCTA;