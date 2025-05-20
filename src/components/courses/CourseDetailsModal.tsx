// src/components/courses/CourseDetailsModal.tsx
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Button from '@/components/common/Button';

interface CourseDetailsModalProps {
  course: {
    id: string;
    name_he: string;
    description_he: string;
    price: number;
    duration_he: string;
    category: string;
    instructor: string;
    prerequisites?: string;
    certification?: string;
    maxStudents?: number;
  } | null;
  instructors: Array<{
    id: string;
    name: string;
    image?: string;
    expertise?: string[];
  }>;
  onClose: () => void;
}

const CourseDetailsModal: React.FC<CourseDetailsModalProps> = ({ 
  course, 
  instructors,
  onClose 
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Category translations
  const categoryLabels: Record<string, string> = {
    'beginner': 'למתחילים',
    'advanced': 'מתקדם',
    'professional': 'מקצועי',
    'workshop': 'סדנה',
    'business': 'ניהול עסקי'
  };
  
  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  
  // Escape key to close
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);
  
  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  if (!course) return null;
  
  const instructor = instructors.find(inst => inst.id === course.instructor);

  return (
    <div className="fixed inset-0 bg-charcoal/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-10">
      <div 
        ref={modalRef} 
        className="bg-charcoal border border-gold border-opacity-20 max-w-4xl w-full max-h-[90vh] overflow-auto shadow-xl"
        dir="rtl"
      >
        {/* Modal header */}
        <div className="bg-gold bg-opacity-10 border-b border-gold border-opacity-20 p-6 flex justify-between items-center sticky top-0 z-10 backdrop-blur-sm">
          <h2 className="font-heebo text-h3 text-gold">{course.name_he}</h2>
          <button 
            onClick={onClose}
            className="text-lightgrey hover:text-gold transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Modal content */}
        <div className="p-6">
          {/* Course highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-charcoal-light p-4 text-center border border-lightgrey border-opacity-10">
              <div className="text-gold text-h3 font-bold mb-2">{course.price}₪</div>
              <p className="text-lightgrey">מחיר הקורס</p>
            </div>
            
            <div className="bg-charcoal-light p-4 text-center border border-lightgrey border-opacity-10">
              <div className="text-gold text-h3 font-bold mb-2">{course.duration_he}</div>
              <p className="text-lightgrey">משך הקורס</p>
            </div>
            
            <div className="bg-charcoal-light p-4 text-center border border-lightgrey border-opacity-10">
              <div className="text-gold text-h3 font-bold mb-2">{course.maxStudents || 12}</div>
              <p className="text-lightgrey">מקסימום משתתפים</p>
            </div>
          </div>
          
          {/* Course details */}
          <div className="mb-8">
            <div className="inline-block px-3 py-1 bg-gold/10 border border-gold/30 text-gold text-sm mb-4">
              {categoryLabels[course.category] || course.category}
            </div>
            
            <p className="text-lightgrey mb-8 leading-relaxed">
              {course.description_he}
            </p>
            
            {/* Prerequisites */}
            {course.prerequisites && (
              <div className="mb-6">
                <h3 className="font-heebo text-h4 text-gold mb-2">דרישות קדם</h3>
                <p className="text-lightgrey">{course.prerequisites}</p>
              </div>
            )}
            
            {/* Certification */}
            {course.certification && (
              <div className="mb-6">
                <h3 className="font-heebo text-h4 text-gold mb-2">תעודה</h3>
                <p className="text-lightgrey">{course.certification}</p>
              </div>
            )}
          </div>
          
          {/* Instructor information */}
          {instructor && (
            <div className="flex flex-col md:flex-row bg-charcoal-light p-6 border border-lightgrey border-opacity-10 mb-8">
              <div className="w-24 h-24 md:ml-6 rounded-full overflow-hidden relative bg-gold bg-opacity-10 mb-4 md:mb-0 mx-auto md:mx-0">
                {instructor.image ? (
                  <Image
                    src={instructor.image}
                    alt={instructor.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full w-full text-gold font-bold text-h2">
                    {instructor.name.charAt(0)}
                  </div>
                )}
              </div>
              
              <div className="flex-1 text-center md:text-right">
                <h3 className="font-heebo text-h4 text-offwhite mb-2">{instructor.name}</h3>
                <p className="text-gold mb-4">מדריך הקורס</p>
                
                {instructor.expertise && instructor.expertise.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {instructor.expertise.map((skill, index) => (
                      <span 
                        key={index}
                        className="bg-gold bg-opacity-10 text-gold text-xs px-2 py-1 rounded-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Call to action */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-lightgrey">
              מעוניין להירשם או לקבל מידע נוסף?
            </div>
            
            <div className="flex gap-4">
              <Button
                variant="secondary"
                href="/contact?subject=info"
              >
                שאלות נוספות
              </Button>
              
              <Button 
                variant="primary"
                href={`/contact?course=${encodeURIComponent(course.name_he)}`}
              >
                הרשמה לקורס
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsModal;