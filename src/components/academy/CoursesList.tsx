import React, { useState } from 'react';
import { Course } from '@/lib/data';
import Button from '../common/Button';
import CourseCard from './CourseCard';

interface CoursesListProps {
  courses: Course[];
}

const CoursesList: React.FC<CoursesListProps> = ({ courses }) => {
  // State for category filter
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // The only two categories we have
  const categories = ['beginner', 'advanced'];
  
  // Category labels in Hebrew
  const categoryLabels: Record<string, string> = {
    'beginner': 'למתחילים',
    'advanced': 'מתקדמים'
  };
  
  // Filter courses based on selected category
  const filteredCourses = activeCategory 
    ? courses.filter(course => course.category === activeCategory)
    : courses;

  // Count courses in each category
  const getCategoryCount = (category: string) => {
    return courses.filter(course => course.category === category).length;
  };

  return (
    <section className="py-section-mobile md:py-section bg-charcoal" dir="rtl">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="section-title">הקורסים <span className="text-gold">שלנו</span></h2>
          <p className="max-w-2xl mx-auto text-lightgrey mb-8" style={{ lineHeight: 'var(--hebrew-line-height)' }}>
            בחר בין קורס למתחילים או השתלמות מקצועית למתקדמים
          </p>
          
          {/* Simplified category filter */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <Button 
              onClick={() => setActiveCategory(null)}
              variant={activeCategory === null ? 'primary' : 'secondary'}
            >
              הכל ({courses.length})
            </Button>
            
            {categories.map((category) => (
              <Button 
                key={category}
                onClick={() => setActiveCategory(category)}
                variant={activeCategory === category ? 'primary' : 'secondary'}
              >
                {categoryLabels[category]} ({getCategoryCount(category)})
              </Button>
            ))}
          </div>
        </div>
        
        {/* Courses display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              variant={course.featured ? "featured" : "default"}
              className="h-full"
            />
          ))}
        </div>
        
        {/* No courses message */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12 border border-lightgrey/10 bg-brown/5 rounded-sm">
            <p className="text-lightgrey py-8">אין קורסים בקטגוריה זו כרגע.</p>
          </div>
        )}
        
        {/* Additional info section */}
        <div className="mt-16 text-center">
          <p className="text-lightgrey mb-4">מעוניינים במידע נוסף על הקורסים שלנו?</p>
          <Button 
            href="/academy/contact"
            variant="secondary"
          >
            צור קשר לייעוץ אישי
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CoursesList;