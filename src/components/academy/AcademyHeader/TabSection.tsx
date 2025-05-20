// src/components/academy/AcademyHeader/TabSection.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/common/Button';

interface Course {
  id: string;
  name_he: string;
  description_he: string;
  price: number;
  duration_he: string;
  instructor: string;
}

interface Instructor {
  id: string;
  name: string;
  title: string;
  bio?: string;
  expertise?: string[];
  image?: string;
}

interface TabSectionProps {
  courses: Course[];
  instructors: Instructor[];
  getInstructorName: (id: string) => string;
}

const TabSection: React.FC<TabSectionProps> = ({ 
  courses, 
  instructors,
  getInstructorName
}) => {
  const [activeTab, setActiveTab] = useState<'courses' | 'instructors'>('courses');

  return (
    <motion.div 
      className="lg:col-span-6 xl:col-span-7 bg-charcoal/60 backdrop-blur-sm border border-lightgrey/10 rounded-sm shadow-xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5 }}
    >
      {/* Tab navigation */}
      <div className="flex border-b border-lightgrey/10">
        {/* Refined tab buttons with more specific types and improved accessibility */}
        <TabButton 
          isActive={activeTab === 'courses'} 
          onClick={() => setActiveTab('courses')}
          label="קורסים מובילים"
        />
        <TabButton 
          isActive={activeTab === 'instructors'} 
          onClick={() => setActiveTab('instructors')}
          label="המדריכים שלנו"
        />
      </div>
      
      {/* Tab content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {activeTab === 'courses' ? (
            <CoursesList 
              courses={courses} 
              getInstructorName={getInstructorName} 
            />
          ) : (
            <InstructorsList 
              instructors={instructors} 
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Improved Tab Button component with better types and accessibility
interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  label: string;
}

const TabButton: React.FC<TabButtonProps> = ({ isActive, onClick, label }) => (
  <button 
    className={`flex-1 py-4 px-6 text-center font-medium transition-colors relative ${
      isActive ? 'text-gold' : 'text-lightgrey hover:text-gold'
    }`}
    onClick={onClick}
    aria-selected={isActive}
    role="tab"
  >
    {label}
    {isActive && (
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
        layoutId="activeTab"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
    )}
  </button>
);

// Courses List Component
interface CoursesListProps {
  courses: Course[];
  getInstructorName: (id: string) => string;
}

const CoursesList: React.FC<CoursesListProps> = ({ courses, getInstructorName }) => {
  return (
    <motion.div
      key="courses"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course, index) => (
          <CourseCard 
            key={course.id} 
            course={course} 
            delay={index * 0.1}
            getInstructorName={getInstructorName}
          />
        ))}
      </div>
      <div className="text-center mt-6">
        <Button href="/academy/courses" variant="tertiary">
          לכל הקורסים <span className="inline-block mr-1">→</span>
        </Button>
      </div>
    </motion.div>
  );
};

// Instructors List Component
interface InstructorsListProps {
  instructors: Instructor[];
}

const InstructorsList: React.FC<InstructorsListProps> = ({ instructors }) => {
  return (
    <motion.div
      key="instructors"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-1 gap-6">
        {instructors.map((instructor, index) => (
          <InstructorCard 
            key={instructor.id} 
            instructor={instructor} 
            delay={index * 0.1} 
          />
        ))}
      </div>
      <div className="text-center mt-6">
        <Button href="/academy/instructors" variant="tertiary">
          לכל המדריכים <span className="inline-block mr-1">→</span>
        </Button>
      </div>
    </motion.div>
  );
};

// Course Card Component - improved with proper typing
interface CourseCardProps {
  course: Course;
  delay: number;
  getInstructorName: (id: string) => string;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, delay, getInstructorName }) => {
  return (
    <motion.div 
      className="bg-charcoal border border-lightgrey/10 hover:border-gold/30 transition-all duration-300 h-full flex flex-col"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
        borderColor: "rgba(201, 166, 107, 0.3)"
      }}
    >
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-h5 text-offwhite">{course.name_he}</h3>
          <div className="bg-gold/20 px-2 py-1 text-gold text-xs font-medium whitespace-nowrap mr-2">
            {course.price.toLocaleString()}₪
          </div>
        </div>
        
        <p className="text-lightgrey text-sm mb-4 line-clamp-2">{course.description_he}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center">
            <span className="text-xs text-lightgrey ml-2">מדריך:</span>
            <span className="text-sm text-gold">{getInstructorName(course.instructor)}</span>
          </div>
          <span className="text-xs text-lightgrey">{course.duration_he}</span>
        </div>
      </div>
      
      <div className="border-t border-lightgrey/10 p-3 flex justify-end mt-auto">
        <Button 
          href={`/academy/courses/${course.id}`} 
          variant="tertiary"
        >
          פרטים נוספים
        </Button>
      </div>
    </motion.div>
  );
};

// Instructor Card Component - improved with proper typing
interface InstructorCardProps {
  instructor: Instructor;
  delay: number;
}

const InstructorCard: React.FC<InstructorCardProps> = ({ instructor, delay }) => {
  return (
    <motion.div 
      className="flex items-center gap-4 p-4 bg-charcoal border border-lightgrey/10 hover:border-gold/30 transition-all duration-300"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ 
        y: -3,
        borderColor: "rgba(201, 166, 107, 0.3)"
      }}
    >
      {/* Instructor image with proper fallback */}
      <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-brown/20 border border-gold/20">
        {instructor.image ? (
          <Image 
            src={instructor.image} 
            alt={instructor.name} 
            width={64} 
            height={64} 
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gold">
            {instructor.name.charAt(0)}
          </div>
        )}
      </div>
      
      {/* Instructor info with better text handling */}
      <div className="flex-grow overflow-hidden">
        <h3 className="font-bold text-offwhite truncate">{instructor.name}</h3>
        <p className="text-gold text-sm truncate">{instructor.title}</p>
        <p className="text-lightgrey text-xs mt-1 line-clamp-2">
          {instructor.expertise?.join(' • ') || 
           (instructor.bio && `${instructor.bio.substring(0, 60)}...`) || 
           'מומחה באמנות הספרות המקצועית'}
        </p>
      </div>
      
      <Button 
        href={`/academy/instructors/${instructor.id}`} 
        variant="tertiary"
        className="flex-shrink-0"
      >
        פרופיל
      </Button>
    </motion.div>
  );
};

export default TabSection;