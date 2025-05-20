// src/app/courses/page.tsx
'use client';

import React, { useState } from 'react';
import { courses, instructors } from '@/lib/data';
import CourseCard from '@/components/academy/CourseCard';
import CourseFilter from '@/components/courses/CourseFilter';
import CourseDetailsModal from '@/components/courses/CourseDetailsModal';

export default function CoursesPage() {
  // State for filter and modal
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  
  // Get unique categories for filter
  const courseCategories = Array.from(
    new Set(courses.map(course => course.category))
  ).map(category => {
    const labels: Record<string, string> = {
      'beginner': 'למתחילים',
      'advanced': 'מתקדם',
      'professional': 'מקצועי',
      'workshop': 'סדנה',
      'business': 'ניהול עסקי'
    };
    
    return {
      id: category,
      label: labels[category] || category
    };
  });
  
  // Filter courses based on selected category
  const filteredCourses = activeCategory 
    ? courses.filter(course => course.category === activeCategory)
    : courses;
  
  // Find selected course for modal
  const selectedCourse = selectedCourseId 
    ? courses.find(course => course.id === selectedCourseId) 
    : null;
  
  // Show course details modal
  const handleShowDetails = (courseId: string) => {
    setSelectedCourseId(courseId);
  };
  
  // Close course details modal
  const handleCloseDetails = () => {
    setSelectedCourseId(null);
  };

  return (
    <>
      {/* Page header */}
      <section className="pt-32 pb-16 bg-charcoal">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-heebo text-h2 md:text-h1 mb-6">הקורסים שלנו</h1>
          <p className="max-w-2xl mx-auto text-lightgrey">
            האקדמיה שלנו מציעה מגוון קורסים, מקורסי יסוד למתחילים ועד השתלמויות מתקדמות למקצוענים.
            אנחנו מזמינים אותך לגלות את הקורס המושלם עבורך ולהתחיל את המסע המקצועי שלך איתנו.
          </p>
        </div>
      </section>
      
      {/* Category filters */}
      <CourseFilter 
        categories={courseCategories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      
      {/* Courses grid */}
      <section className="py-section-mobile md:py-section bg-charcoal">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map(course => (
              <CourseCard 
                key={course.id}
                course={course}
                instructors={instructors}
                onShowDetails={handleShowDetails}
              />
            ))}
          </div>
          
          {/* No courses message */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-20">
              <p className="text-lightgrey text-lg">לא נמצאו קורסים בקטגוריה זו</p>
              <button 
                onClick={() => setActiveCategory(null)}
                className="text-gold hover:underline mt-4"
              >
                הצג את כל הקורסים
              </button>
            </div>
          )}
          
          {/* Course details modal */}
          {selectedCourseId && (
            <CourseDetailsModal 
              course={selectedCourse}
              instructors={instructors}
              onClose={handleCloseDetails}
            />
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-section-mobile md:py-section bg-brown bg-opacity-5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-heebo text-h3 mb-6">מוכן להתחיל את הקריירה שלך?</h2>
          <p className="max-w-2xl mx-auto text-lightgrey mb-8">
            צור איתנו קשר עוד היום כדי לקבל ייעוץ אישי לגבי הקורס המתאים ביותר עבורך
            ולהתחיל את המסע המקצועי שלך בעולם הספרות.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/contact" 
              className="bg-gold text-charcoal py-3 px-6 font-medium hover:bg-opacity-90 transition-all"
            >
              פנה ליועץ אישי
            </a>
            
            <a 
              href="/about" 
              className="bg-transparent text-gold border border-gold py-3 px-6 font-medium hover:bg-gold hover:bg-opacity-10 transition-all"
            >
              קרא עוד על האקדמיה
            </a>
          </div>
        </div>
      </section>
    </>
  );
}