// File: src/components/academy/CourseCard.tsx
import React from 'react';
import Link from 'next/link';
import Button from '@/components/common/Button';
import { Course, instructors } from '@/lib/data';

// Extended Course interface to include optional properties that aren't in the base type
interface ExtendedCourse extends Course {
  nextStartDate?: string;
  originalPrice?: number;
}

interface CourseCardProps {
  course: ExtendedCourse;
  variant?: 'default' | 'compact' | 'featured';
  showInstructor?: boolean;
  showPrerequisites?: boolean;
  className?: string;
  onEnroll?: (courseId: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  variant = 'default',
  showInstructor = true,
  showPrerequisites = true,
  className = '',
  onEnroll,
}) => {
  // Get instructor details
  const getInstructorDetails = (instructorId: string) => {
    return instructors.find(instructor => instructor.id === instructorId);
  };
  
  const instructor = getInstructorDetails(course.instructor);

  // Calculate discounted price if present
  const originalPrice = course.originalPrice;
  const hasDiscount = originalPrice && originalPrice > course.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((originalPrice - course.price) / originalPrice) * 100) 
    : 0;

  // Now nextStartDate is properly typed
  const nextStartDate = course.nextStartDate;

  return (
    <div 
      className={`bg-charcoal border border-lightgrey/10 hover:border-gold/30 
      transition-all duration-700 group relative overflow-hidden 
      shadow-lg hover:shadow-2xl transform hover:-translate-y-2 
      ${variant === 'featured' ? 'border-gold/20 shadow-gold/5' : ''}
      ${className}`}
    >
      {/* Enhanced background gradient with multiple layers for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal to-brown/20 opacity-80 z-0 
                     transition-opacity duration-700 group-hover:opacity-70"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 via-transparent to-transparent opacity-0 z-0 
                     transition-opacity duration-1000 group-hover:opacity-30"></div>
      
      {/* Course category badge with glass morphism effect */}
      <div className="absolute top-6 right-6 bg-gold/10 backdrop-blur-sm text-gold text-sm font-medium 
                     px-4 py-1.5 border border-gold/20 z-10 rounded-sm
                     transition-all duration-500 group-hover:bg-gold/15 group-hover:border-gold/30">
        {getCategoryLabel(course.category)}
      </div>
      
      {/* Featured badge with enhanced styling */}
      {course.featured && variant !== 'compact' && (
        <div className="absolute top-6 left-6 bg-gold text-charcoal text-xs font-bold 
                       px-4 py-1.5 z-10 shadow-md transform group-hover:scale-105
                       transition-transform duration-500">
          מומלץ
        </div>
      )}
      
      {/* Discount badge with pulsing effect */}
      {hasDiscount && (
        <div className="absolute top-16 left-0 bg-burgundy text-offwhite text-xs font-bold 
                       px-4 py-1.5 z-10 shadow-lg group-hover:shadow-burgundy/20
                       transition-all duration-700">
          הנחה {discountPercentage}%
        </div>
      )}
      
      {/* Enhanced decorative luxury elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-[1]">
        {/* Diagonal pattern */}
        <div className="absolute top-0 left-0 w-full h-32 opacity-5 bg-diagonal-pattern
                       transition-opacity duration-700 group-hover:opacity-7"></div>
        
        {/* Golden circle with more dramatic animation */}
        <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-gold opacity-5 
                       transform translate-x-1/2 translate-y-1/2 
                       transition-all duration-1000 ease-in-out group-hover:opacity-10 group-hover:scale-150"></div>
        
        {/* Enhanced accent line with more dramatic effect */}
        <div className="absolute top-32 left-0 w-1 h-32 bg-gold opacity-10 
                      transition-all duration-700 group-hover:opacity-30 group-hover:h-64"></div>
                      
        {/* Additional subtle decorative element */}
        <div className="absolute top-0 right-0 w-20 h-20 opacity-5 
                       border-t border-r border-gold/30 
                       transition-all duration-700 group-hover:w-24 group-hover:h-24 group-hover:opacity-10"></div>
      </div>
      
      {/* Main content with improved spacing */}
      <div className={`p-8 ${variant === 'compact' ? 'pt-14' : 'pt-16'} relative z-10`}>
        {/* Course title with more elegant hover effect */}
        <h3 className="font-heebo text-h4 mb-4 text-offwhite group-hover:text-gold 
                      transition-colors duration-500 relative">
          {course.name_he}
          <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-gold/70 
                         transition-all duration-700 ease-in-out group-hover:w-full"></span>
        </h3>
        
        {variant !== 'compact' && (
          <p className={`text-lightgrey mb-6 ${variant === 'featured' ? 'line-clamp-4' : 'line-clamp-3'} 
                        min-h-[4.5rem] leading-relaxed transition-colors duration-500 
                        group-hover:text-lightgrey/90`}>
            {course.description_he}
          </p>
        )}
        
        {/* Course details with enhanced glass morphism */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-charcoal/50 backdrop-blur-sm p-4 border border-lightgrey/10 
                         transition-all duration-700 group-hover:border-gold/20 
                         shadow-sm group-hover:shadow-md group-hover:bg-charcoal/40">
            <div className="text-gold font-medium mb-1">משך הקורס</div>
            <div className="text-offwhite transition-all duration-500 group-hover:text-gold/90">
              {course.duration_he}
            </div>
          </div>
          
          <div className="bg-charcoal/50 backdrop-blur-sm p-4 border border-lightgrey/10 
                         transition-all duration-700 group-hover:border-gold/20 
                         shadow-sm group-hover:shadow-md group-hover:bg-charcoal/40">
            <div className="text-gold font-medium mb-1">מחיר</div>
            {hasDiscount ? (
              <div>
                <span className="text-lightgrey line-through text-sm mr-2">{formatPrice(originalPrice as number)} ₪</span>
                <span className="text-offwhite font-bold transition-all duration-500 group-hover:text-gold">
                  {formatPrice(course.price)} ₪
                </span>
              </div>
            ) : (
              <div className="text-offwhite transition-all duration-500 group-hover:text-gold/90">
                {formatPrice(course.price)} ₪
              </div>
            )}
          </div>
        </div>
        
        {/* Course features with enhanced luxury styling */}
        <div className="mb-8 space-y-3">
          {/* Prerequisites */}
          {showPrerequisites && course.prerequisites && variant !== 'compact' && (
            <div className="flex items-start px-4 py-2.5 bg-charcoal/30 border-r-2 border-gold/40 
                           transform transition-all duration-500 ease-in-out group-hover:border-gold 
                           group-hover:translate-x-1 group-hover:bg-charcoal/40 hover:shadow-sm">
              <div className="text-gold mt-1 mr-2 flex-shrink-0">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <span className="text-gold font-medium text-sm">דרישות קדם: </span>
                <span className="text-lightgrey text-sm group-hover:text-lightgrey/95 transition-colors duration-500">{course.prerequisites}</span>
              </div>
            </div>
          )}
          
          {/* Certification */}
          {course.certification && (variant === 'featured' || variant === 'default') && (
            <div className="flex items-start px-4 py-2.5 bg-charcoal/30 border-r-2 border-gold/40 
                           transform transition-all duration-500 ease-in-out group-hover:border-gold 
                           group-hover:translate-x-1 group-hover:bg-charcoal/40 hover:shadow-sm">
              <div className="text-gold mt-1 mr-2 flex-shrink-0">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <span className="text-gold font-medium text-sm">תעודה: </span>
                <span className="text-lightgrey text-sm group-hover:text-lightgrey/95 transition-colors duration-500">{course.certification}</span>
              </div>
            </div>
          )}
          
          {/* Maximum students */}
          {course.maxStudents && (variant === 'featured' || variant === 'default') && (
            <div className="flex items-start px-4 py-2.5 bg-charcoal/30 border-r-2 border-gold/40 
                           transform transition-all duration-500 ease-in-out group-hover:border-gold 
                           group-hover:translate-x-1 group-hover:bg-charcoal/40 hover:shadow-sm">
              <div className="text-gold mt-1 mr-2 flex-shrink-0">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <div>
                <span className="text-gold font-medium text-sm">כיתה קטנה: </span>
                <span className="text-lightgrey text-sm group-hover:text-lightgrey/95 transition-colors duration-500">מקסימום {course.maxStudents} סטודנטים</span>
              </div>
            </div>
          )}
          
          {/* Next start date if available */}
          {nextStartDate && (variant === 'featured' || variant === 'default') && (
            <div className="flex items-start px-4 py-2.5 bg-charcoal/30 border-r-2 border-gold/40 
                           transform transition-all duration-500 ease-in-out group-hover:border-gold 
                           group-hover:translate-x-1 group-hover:bg-charcoal/40 hover:shadow-sm">
              <div className="text-gold mt-1 mr-2 flex-shrink-0">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <span className="text-gold font-medium text-sm">מחזור הבא: </span>
                <span className="text-lightgrey text-sm group-hover:text-lightgrey/95 transition-colors duration-500">{formatDate(nextStartDate)}</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer with instructor and buttons - enhanced styling */}
        <div className="flex items-center justify-between pt-4 border-t border-lightgrey/20 group-hover:border-gold/10 transition-colors duration-700">
          {/* Instructor info with enhanced styling */}
          {showInstructor && instructor && (
            <div className="text-sm flex items-center">
              <span className="text-lightgrey transition-colors duration-500 group-hover:text-lightgrey/90">מדריך: </span>
              <span className="text-gold mr-1 transition-all duration-500 group-hover:text-gold/95 group-hover:mr-1.5">
                {instructor.name}
              </span>
            </div>
          )}
          
          {/* Action buttons with enhanced styling */}
          <div className="flex gap-3 relative z-10">
            {/* Details button with enhanced animation */}
            <Button 
              href={`/academy/courses/${course.id}`} 
              variant="tertiary"
              className="group-hover:text-gold transition-all duration-500"
              ariaLabel={`פרטים נוספים על ${course.name_he}`}
            >
              <span className="relative">
                פרטים נוספים
                <span className="inline-block mr-1 transform transition-transform duration-700 ease-in-out 
                               group-hover:translate-x-2">←</span>
              </span>
            </Button>
            
            {/* Enroll button - only for featured variant */}
            {variant === 'featured' && (
              <Button 
                variant="primary"
                size="small"
                className="shadow-md hover:shadow-lg transition-all duration-500"
                onClick={onEnroll ? () => onEnroll(course.id) : undefined}
                href={onEnroll ? undefined : `/academy/apply?course=${course.id}`}
                ariaLabel={`הרשמה לקורס ${course.name_he}`}
              >
                הרשמה
              </Button>
            )}
          </div>
        </div>
        
        {/* Accessible clickable overlay */}
        <Link 
          href={`/courses/${course.id}`}
          className="absolute inset-0 z-0" 
          aria-hidden="true"
          aria-label={`פרטים נוספים על ${course.name_he}`}
        />
      </div>
    </div>
  );
};

// Helper function to format price with commas
const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Helper function to format date
const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  
  const months = [
    'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
    'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
  ];
  
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  return `${day} ב${month}, ${year}`;
};

// Helper function to get category label - updated to match all possible categories in data
const getCategoryLabel = (category: string): string => {
  const categoryMap: Record<string, string> = {
    'beginner': 'למתחילים',
    'advanced': 'מתקדם',
    'professional': 'הסמכה מקצועית',
    'workshop': 'סדנה',
    'business': 'ניהול עסקי'
  };
  
  return categoryMap[category] || category;
};

export default CourseCard;