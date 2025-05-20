// src/components/home/AcademyFeatures/FeaturedCourse.tsx
import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/common/Button';
import { courses, instructors } from '@/lib/data';
import FeatureListItem from './FeatureListItem';

const FeaturedCourse = () => {
  // Find the featured professional course
  const featuredProfessionalCourse = React.useMemo(() => {
    // First try to find a featured professional course
    const featured = courses.find(course => 
      course.category === 'professional' && course.featured
    );
    
    // If none is marked as featured, use any professional course
    if (!featured) {
      return courses.find(course => course.category === 'professional');
    }
    
    return featured;
  }, []);
  
  // Get instructor name
  const getInstructorName = (instructorId: string): string => {
    const instructor = instructors.find(i => i.id === instructorId);
    return instructor ? instructor.name : instructorId;
  };

  return (
    <motion.div 
      className="bg-gold/10 p-8 border border-gold border-opacity-30 mb-8"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.02, 
        boxShadow: "0 10px 25px -5px rgba(201, 166, 107, 0.1), 0 8px 10px -6px rgba(201, 166, 107, 0.1)",
        borderColor: "rgba(201, 166, 107, 0.5)"
      }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {featuredProfessionalCourse ? (
        <>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
              <h3 className="font-heebo text-h4 text-gold">קורס מוביל</h3>
            </div>
            <div className="bg-gold text-charcoal text-sm font-medium px-3 py-1">
              החל מ-{featuredProfessionalCourse.price.toLocaleString()}₪
            </div>
          </div>
          
          <h4 className="font-heebo text-h3 mb-4">{featuredProfessionalCourse.name_he}</h4>
          <p className="text-lightgrey mb-4">
            {featuredProfessionalCourse.description_he}
          </p>
          
          <ul className="space-y-3 mb-6 text-lightgrey">
            <FeatureListItem text={`משך: ${featuredProfessionalCourse.duration_he}`} />
            {featuredProfessionalCourse.certification && (
              <FeatureListItem text={`תעודה: ${featuredProfessionalCourse.certification}`} />
            )}
            {featuredProfessionalCourse.prerequisites && (
              <FeatureListItem text={`דרישות קדם: ${featuredProfessionalCourse.prerequisites}`} />
            )}
            {featuredProfessionalCourse.instructor && (
              <FeatureListItem text={`מדריך: ${getInstructorName(featuredProfessionalCourse.instructor)}`} />
            )}
            {featuredProfessionalCourse.maxStudents && (
              <FeatureListItem text={`מספר מקומות: ${featuredProfessionalCourse.maxStudents} סטודנטים`} />
            )}
            <FeatureListItem text="התמחות מעשית מובטחת" />
          </ul>
        </>
      ) : (
        <div className="py-6 text-center">
          <h3 className="font-heebo text-h4 text-gold mb-4">גלה את הקורסים שלנו</h3>
          <p className="text-lightgrey mb-6">
            האקדמיה שלנו מציעה מגוון קורסים מקצועיים למתחילים ולמתקדמים בתחום הספרות.
          </p>
        </div>
      )}
      
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button 
          href={`/academy/courses/${featuredProfessionalCourse?.id || ''}`} 
          variant="primary" 
          className="w-full"
        >
          פרטים והרשמה
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default FeaturedCourse;