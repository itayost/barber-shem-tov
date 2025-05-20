// File: src/components/home/AcademyCoursesPreview.tsx
import React from 'react';
import Button from '@/components/common/Button';
import CourseCard from '@/components/academy/CourseCard';
import { courses } from '@/lib/data';

const AcademyCoursesPreview = () => {
  // Filter featured courses only
  const featuredCourses = courses.filter(course => course.featured);
  
  // Get up to 3 featured courses, or 3 random courses if none are featured
  const coursesToShow = featuredCourses.length > 0 
    ? featuredCourses.slice(0, 3) 
    : courses.sort(() => 0.5 - Math.random()).slice(0, 3);
  
  return (
    <section className="py-section-mobile md:py-section bg-charcoal relative" dir="rtl">
      {/* Decorative background elements */}
      <div className="absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-gold/5 to-transparent"></div>
      <div className="absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-gold/5 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block text-gold text-sm font-medium px-4 py-1 border border-gold border-opacity-30 mb-4">
            הקורסים המובילים שלנו
          </div>
          <h2 className="font-heebo text-h3 md:text-h2 mb-6">תוכניות הכשרה <span className="text-gold">מקצועיות</span></h2>
          <p className="max-w-2xl mx-auto text-lightgrey">
            האקדמיה שלנו מציעה מגוון קורסים מקיפים המותאמים לכל שלב בקריירה שלך -
            מיסודות הספרות ועד לטכניקות המתקדמות ביותר
          </p>
        </div>
        
        {/* Courses Grid - using CourseCard component */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {coursesToShow.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course}
              variant={course.id === 'professional-barber-program' ? 'featured' : 'default'}
              showPrerequisites={true}
              showInstructor={true}
            />
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-lightgrey mb-6">
            מעוניין לראות את כל הקורסים שלנו? בחר מבין 15+ תוכניות הכשרה מותאמות אישית.
          </p>
          <Button 
            href="/academy/courses" 
            variant="primary"
          >
            צפה בכל הקורסים
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AcademyCoursesPreview;