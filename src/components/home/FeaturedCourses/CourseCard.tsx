// src/components/home/FeaturedCourses/CourseCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/common/Button';
import { instructors } from '@/lib/data';

interface Course {
  id: string;
  name_he: string;
  description_he: string;
  price: number;
  duration_he: string;
  category: string;
  level?: string;
  featured?: boolean;
  isSpecialized?: boolean;
  image?: string;
  instructor?: string;
}

interface CourseCardProps {
  course: Course;
  delay?: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, delay = 0 }) => {
  // Get instructor name if available
  const getInstructorName = (instructorId?: string) => {
    if (!instructorId) return null;
    const instructor = instructors.find(i => i.id === instructorId);
    return instructor ? instructor.name : null;
  };
  
  const instructorName = getInstructorName(course.instructor);
  
  // Default image path based on category
  const imagePath = course.image || `/images/courses/${course.category}-default.jpg`;
  
  return (
    <motion.div
      className="bg-charcoal border border-lightgrey/10 overflow-hidden group h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        y: -5,
        borderColor: "rgba(201, 166, 107, 0.3)",
        boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.3)"
      }}
    >
      {/* Course image with overlay effects */}
      <div className="relative h-48 overflow-hidden">
        <div className="h-full w-full relative">
          <Image
            src={imagePath}
            alt={course.name_he}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              // Fallback if image doesn't exist
              const fallbackImg = "/images/courses/default-course.jpg";
              const target = e.target as HTMLImageElement;
              if (target.src !== fallbackImg) {
                target.src = fallbackImg;
              }
            }}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300"></div>
          
          {/* Golden accent line on left */}
          <div className="absolute top-0 bottom-0 left-0 w-1 bg-gold/70 transform group-hover:scale-y-100 origin-center transition-transform duration-300"></div>
        </div>
        
        {/* Price tag */}
        <div className="absolute top-4 right-4 bg-gold text-charcoal px-3 py-1 text-sm font-medium shadow-md">
          {course.price.toLocaleString()}₪
        </div>
        
        {/* Featured badge if applicable */}
        {course.featured && (
          <div className="absolute top-4 left-4 bg-charcoal/80 backdrop-blur-sm border-l-2 border-gold px-3 py-1 text-xs text-gold font-medium shadow-md">
            קורס מומלץ
          </div>
        )}
      </div>
      
      {/* Course details */}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="font-heebo text-h4 mb-2 text-gold group-hover:translate-x-1 transition-transform duration-300">
          {course.name_he}
        </h3>
        
        <p className="text-lightgrey mb-4 line-clamp-3">
          {course.description_he}
        </p>
        
        {/* Course meta */}
        <div className="mt-auto space-y-3">
          {instructorName && (
            <div className="flex items-center text-sm text-lightgrey">
              <span className="w-4 h-4 rounded-full bg-gold/20 flex items-center justify-center mr-2">
                <svg className="w-2.5 h-2.5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                </svg>
              </span>
              מדריך: {instructorName}
            </div>
          )}
          
          <div className="flex items-center text-sm text-lightgrey">
            <span className="w-4 h-4 rounded-full bg-gold/20 flex items-center justify-center mr-2">
              <svg className="w-2.5 h-2.5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
              </svg>
            </span>
            {course.duration_he}
          </div>
          
          <div className="pt-4 border-t border-lightgrey/10 flex justify-between items-center">
            <span className="text-sm text-lightgrey bg-lightgrey/10 px-3 py-1 rounded-sm">
              {course.category === 'beginner' || course.level === 'beginner' 
                ? 'למתחילים'
                : course.category === 'advanced' || course.level === 'advanced'
                ? 'מתקדמים'
                : course.category === 'professional'
                ? 'מקצועי'
                : 'התמחות'}
            </span>
            
            <Button 
              href={`/academy/courses/${course.id}`} 
              variant="tertiary"
              className="group/btn"
            >
              <span className="flex items-center">
                פרטים נוספים
                <motion.svg 
                  className="w-4 h-4 mr-1 transform rotate-180" 
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
              </span>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;