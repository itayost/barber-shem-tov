import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Service } from '@/types';

interface CourseCardProps {
  course: Service;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const imagePlaceholder = `/images/academy/${course.id}.jpg`;
  
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="bg-charcoal border border-lightgrey border-opacity-10 hover:border-gold hover:border-opacity-30 transition-all duration-300 overflow-hidden h-full flex flex-col"
    >
      {/* Course image */}
      <div className="relative h-48 bg-brown bg-opacity-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={imagePlaceholder}
            alt={course.name_he}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            onError={(e) => {
              // Fallback if image doesn't exist
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent"></div>
        <div className="absolute bottom-0 right-0 p-4">
          <span className="bg-gold text-charcoal px-3 py-1 text-sm font-medium">₪{course.price}</span>
        </div>
      </div>
      
      {/* Course content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-heebo text-h4 mb-3 text-gold">{course.name_he}</h3>
        <p className="text-lightgrey mb-4 flex-grow">{course.description_he}</p>
        
        <div className="mt-auto pt-4 border-t border-lightgrey border-opacity-20 flex justify-between items-center">
          <span className="text-lightgrey text-sm">{course.duration_he}</span>
          <a 
            href={`/contact?course=${encodeURIComponent(course.name_he)}`}
            className="text-gold hover:underline"
          >
            מידע והרשמה
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;