// File: src/components/academy/CoursesList.tsx
import React, { useState } from 'react';
import Button from '@/components/common/Button';
import { Service } from '@/lib/data';

interface CoursesListProps {
  courses: Service[];
}

const CoursesList: React.FC<CoursesListProps> = ({ courses }) => {
  // State for filtering courses
  const [filter, setFilter] = useState<'all' | 'beginner' | 'advanced' | 'workshops'>('all');
  
  // Group courses by difficulty/type
  const beginnerCourses = courses.filter(
    course => course.name_he.includes('בסיסי') || course.description_he.includes('מתחילים')
  );
  
  const advancedCourses = courses.filter(
    course => course.name_he.includes('מתקדם') || course.description_he.includes('מתקדם')
  );
  
  const workshopCourses = courses.filter(
    course => course.name_he.includes('סדנ') || course.description_he.includes('סדנ')
  );
  
  // Note: We're not using filteredCourses, instead we're conditionally showing each section
  // So we can remove this unused variable

  return (
    <section id="courses" className="py-section-mobile md:py-section bg-charcoal">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-heebo text-h3 mb-6">הקורסים שלנו</h2>
          <p className="max-w-2xl mx-auto text-lightgrey mb-8">
            האקדמיה שלנו מציעה מגוון קורסים, החל מיסודות בסיסיים למתחילים ועד טכניקות מתקדמות למקצוענים.
            בחר את המסלול המתאים לך ולמטרות שלך.
          </p>
          
          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button 
              onClick={() => setFilter('all')} 
              variant={filter === 'all' ? 'primary' : 'secondary'}
            >
              כל הקורסים
            </Button>
            <Button 
              onClick={() => setFilter('beginner')} 
              variant={filter === 'beginner' ? 'primary' : 'secondary'}
            >
              למתחילים
            </Button>
            <Button 
              onClick={() => setFilter('advanced')} 
              variant={filter === 'advanced' ? 'primary' : 'secondary'}
            >
              מתקדמים
            </Button>
            <Button 
              onClick={() => setFilter('workshops')} 
              variant={filter === 'workshops' ? 'primary' : 'secondary'}
            >
              סדנאות
            </Button>
          </div>
        </div>
        
        {/* Course sections */}
        <div id="beginner" className={`mb-16 ${filter !== 'all' && filter !== 'beginner' ? 'hidden' : ''}`}>
          <h3 className="font-heebo text-h4 text-gold mb-8 text-center">קורסים למתחילים</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {beginnerCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
        
        <div id="advanced" className={`mb-16 ${filter !== 'all' && filter !== 'advanced' ? 'hidden' : ''}`}>
          <h3 className="font-heebo text-h4 text-gold mb-8 text-center">קורסים מתקדמים</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advancedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
        
        <div id="workshops" className={filter !== 'all' && filter !== 'workshops' ? 'hidden' : ''}>
          <h3 className="font-heebo text-h4 text-gold mb-8 text-center">סדנאות מקצועיות</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {workshopCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
        
        {/* Empty state when no courses match the filter */}
        {filter === 'beginner' && beginnerCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lightgrey">לא נמצאו קורסים למתחילים</p>
          </div>
        )}
        
        {filter === 'advanced' && advancedCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lightgrey">לא נמצאו קורסים מתקדמים</p>
          </div>
        )}
        
        {filter === 'workshops' && workshopCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lightgrey">לא נמצאו סדנאות</p>
          </div>
        )}
      </div>
    </section>
  );
};

// Course Card Component
interface CourseCardProps {
  course: Service;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-charcoal border border-lightgrey border-opacity-10 hover:border-gold hover:border-opacity-30 transition-all duration-300 overflow-hidden">
      {/* Course image placeholder */}
      <div className="relative h-48 bg-brown bg-opacity-20">
        {/* Would be replaced with actual course image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-gold text-h3">{course.name_he}</span>
        </div>
      </div>
      
      {/* Course content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-heebo text-h4">{course.name_he}</h3>
          <span className="bg-gold text-charcoal px-3 py-1 text-sm font-medium">₪{course.price}</span>
        </div>
        
        <p className="text-lightgrey mb-6">{course.description_he}</p>
        
        <div className="flex items-center justify-between pt-4 border-t border-lightgrey border-opacity-20">
          <span className="text-lightgrey">{course.duration_he}</span>
          <Button href={`/contact?course=${encodeURIComponent(course.name_he)}`} variant="tertiary">
            הרשם עכשיו
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CoursesList;