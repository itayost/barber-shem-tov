// src/components/home/CourseHighlights.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { courses } from '@/lib/data';
import Button from '@/components/common/Button';

const CourseHighlights = () => {
  // Get featured courses or main courses
  const highlightedCourses = courses.filter(course => course.featured).slice(0, 3);
  
  // If no featured courses, take first 3
  const displayCourses = highlightedCourses.length > 0 
    ? highlightedCourses 
    : courses.slice(0, 3);

  const courseFeatures = {
    'beginner': {
      icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
      highlights: ['ללא ניסיון נדרש', 'ציוד כלול', 'תעודה מוכרת']
    },
    'advanced': {
      icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
      highlights: ['טכניקות מתקדמות', 'מאסטרקלאס', 'פרויקטים אישיים']
    },
    'professional': {
      icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
      highlights: ['הסמכה מקצועית', 'התמחות מעשית', 'ליווי קריירה']
    }
  };

  return (
    <section className="py-20 bg-charcoal relative overflow-hidden" dir="rtl">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute right-0 top-0 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm uppercase tracking-wider">מסלולי הלימוד</span>
          <h2 className="font-heebo text-4xl md:text-5xl font-bold mt-4 mb-6">
            בחר את המסלול המתאים לך
          </h2>
          <p className="text-lightgrey text-lg max-w-2xl mx-auto">
            מקורסים בסיסיים למתחילים ועד הכשרות מתקדמות למקצוענים - 
            כל מסלול מותאם לרמה ולצרכים שלך
          </p>
        </motion.div>
        
        {/* Courses grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {displayCourses.map((course, index) => {
            const features = courseFeatures[course.category] || courseFeatures['professional'];
            
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-charcoal border border-lightgrey/10 p-8 h-full hover:border-gold/30 transition-all duration-300 hover:shadow-2xl">
                  {/* Course badge */}
                  {course.featured && (
                    <div className="absolute -top-3 right-8 bg-gold text-charcoal px-4 py-1 text-sm font-medium">
                      פופולרי
                    </div>
                  )}
                  
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                    <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={features.icon} />
                    </svg>
                  </div>
                  
                  {/* Course name */}
                  <h3 className="font-heebo text-2xl font-bold mb-4 group-hover:text-gold transition-colors">
                    {course.name_he}
                  </h3>
                  
                  {/* Course description */}
                  <p className="text-lightgrey mb-6 line-clamp-3">
                    {course.description_he}
                  </p>
                  
                  {/* Course details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center py-2 border-b border-lightgrey/10">
                      <span className="text-lightgrey">משך הקורס</span>
                      <span className="text-gold font-medium">{course.duration_he}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-lightgrey/10">
                      <span className="text-lightgrey">מחיר</span>
                      <span className="text-gold font-medium">{course.price.toLocaleString()}₪</span>
                    </div>
                  </div>
                  
                  {/* Features list */}
                  <ul className="space-y-2 mb-8">
                    {features.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-lightgrey">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* CTA button */}
                  <Button 
                    href={`/courses/${course.id}`}
                    variant="secondary"
                    className="w-full group-hover:bg-gold group-hover:text-charcoal transition-all"
                  >
                    פרטים נוספים
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* View all courses button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button href="/courses" variant="primary" size="large">
            לכל הקורסים שלנו
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CourseHighlights;