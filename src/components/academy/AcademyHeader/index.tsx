'use client';
import React, { useState, useEffect } from 'react';
// Import components
import HeaderBackground from './HeaderBackground';
import HeaderContent from './HeaderContent';
import TabSection from './TabSection';
import ScrollIndicator from './ScrollIndicator';
import { academyInfo, courses, instructors } from '@/lib/data';

interface AcademyHeaderProps {
  title?: string;
  description?: string;
}

const AcademyHeader: React.FC<AcademyHeaderProps> = ({
  description
}) => {
  // Custom description if not provided
  const headerDescription = description || 
    `באקדמיה של ${academyInfo.shortName}, אנו מכשירים את הדור הבא של ספרים מקצועיים עם הכלים, הידע והביטחון להצליח בתעשייה המתחדשת תמיד.`;
  
  // Filter to find featured courses and instructors
  const featuredCourses = courses.filter(course => 
    course.featured || course.category === 'beginner'
  ).slice(0, 3); // Limit to 3 courses
  
  const featuredInstructors = instructors.slice(0, 2);
  
  // State for scroll animation
  const [scrollY, setScrollY] = useState(0);
  
  // Update scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Helper function for instructor name lookup
  const getInstructorName = (instructorId: string): string => {
    const instructor = instructors.find(i => i.id === instructorId);
    return instructor ? instructor.name : instructorId;
  };
  
  // Create a subset of academyInfo that matches what HeaderContent expects
  const headerContentAcademyInfo = {
    established: academyInfo.established,
    stats: academyInfo.stats,
    accreditations: academyInfo.accreditations
  };
  
  return (
    <header className="relative overflow-hidden bg-charcoal" dir="rtl">
      {/* Hero section */}
      <div className="relative min-h-[90vh] flex flex-col">
        {/* Background with parallax effect */}
        <HeaderBackground scrollY={scrollY} />
        
        {/* Main content container */}
        <div className="container mx-auto px-6 pt-40 pb-20 md:pt-48 md:pb-32 flex flex-col flex-grow relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center h-full">
            {/* Left content column */}
            <HeaderContent 
              academyInfo={headerContentAcademyInfo}
              description={headerDescription}
            />
            
            {/* Right feature column - Course/Instructor tabs */}
            <TabSection 
              courses={featuredCourses} 
              instructors={featuredInstructors}
              getInstructorName={getInstructorName}
            />
          </div>
        </div>
        
        {/* Scroll indicator */}
        <ScrollIndicator scrollY={scrollY} />
      </div>
    </header>
  );
};

export default AcademyHeader;