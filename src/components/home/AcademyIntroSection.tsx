import React from 'react';
import Button from '../common/Button';
import Image from 'next/image';
import { academyInfo, instructors } from '@/lib/data';

interface AcademyIntroSectionProps {
  id?: string;
}

const AcademyIntroSection: React.FC<AcademyIntroSectionProps> = ({ 
  id = "introduction" 
}) => {
  const foundingYear = academyInfo.established;
  const currentYear = new Date().getFullYear();
  const yearsOfOperation = currentYear - foundingYear;
  
  // Find the director from instructors
  const director = instructors.find(instructor => instructor.id === 'bar');
  // Get featured course - using simple approach to avoid errors
  const featuredCourse = {
    id: 'basic-barbering-course',
    name_he: 'קורס ספרות בסיסי',
    duration_he: '4 שבועות',
    price: 3200
  };

  return (
    <section 
      id={id}
      className="py-section-mobile md:py-section bg-charcoal relative overflow-hidden"
      dir="rtl"
    >
      {/* Animated decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="w-1/3 h-full bg-gradient-to-r from-gold to-transparent opacity-10 absolute left-0"></div>
        <div className="absolute -top-96 -right-96 w-[800px] h-[800px] rounded-full bg-gold opacity-[0.03] blur-3xl"></div>
        <div className="absolute left-1/4 -bottom-64 w-[400px] h-[400px] rounded-full bg-gold opacity-[0.02] blur-2xl"></div>
        
        {/* SVG diagonal lines */}
        <svg className="absolute top-0 right-0 w-full h-full opacity-[0.07]" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="70" y1="0" x2="100" y2="30" stroke="#C9A66B" strokeWidth="0.2" />
          <line x1="80" y1="0" x2="100" y2="20" stroke="#C9A66B" strokeWidth="0.2" />
          <line x1="90" y1="0" x2="100" y2="10" stroke="#C9A66B" strokeWidth="0.2" />
        </svg>
      </div>
      
      <div className="container-custom relative z-10">
        {/* Header with emphasis badge */}
        <div className="text-center mb-16">
          <div className="inline-block text-gold text-small font-medium px-5 py-1.5 border border-gold border-opacity-30 mb-5 backdrop-blur-sm bg-charcoal/30 shadow-sm transform hover:scale-105 transition-all duration-500">
            הכשרות מקצועיות מובילות מאז {foundingYear}
          </div>
          <h2 className="font-heebo text-h3 md:text-h2 mb-5">{academyInfo.name.split(' ').slice(0, 3).join(' ')}<br/>
          <span className="text-gold">{academyInfo.name.split(' ').slice(3).join(' ')}</span></h2>
          <div className="w-24 h-0.5 bg-gold mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-lightgrey text-lg">
            אנו מכשירים את הדור הבא של ספרים מקצועיים עם הכלים, הידע והביטחון להצליח בתעשייה
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text content - with proper Hebrew styling */}
          <div>
            <div className="space-y-7">
              <p className="text-lightgrey text-lg" style={{ lineHeight: 'var(--hebrew-line-height)', letterSpacing: 'var(--hebrew-letter-spacing)' }}>
                ברוכים הבאים לאקדמיה המובילה לאמנות הספרות בישראל, המקום שבו תשוקה למצוינות פוגשת הכשרה מקצועית ברמה הגבוהה ביותר. מאז היווסדנו בשנת {foundingYear}, הכשרנו <span className="text-gold font-medium">{academyInfo.stats.graduates}+ ספרים מקצועיים</span> שמובילים את התעשייה בסטנדרטים הגבוהים ביותר.
              </p>
              
              <div className="border-r-4 border-gold pr-6 py-4 bg-gold/5">
                <p className="text-gold italic font-medium text-lg mb-2">
                  "אנו לא רק מלמדים טכניקות - אנו מעצבים את העתיד של תעשיית הספרות בישראל."
                </p>
                <div className="flex items-center">
                  {director?.image && (
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                      <Image 
                        src={director.image} 
                        alt={director.name} 
                        width={40} 
                        height={40}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <p className="text-lightgrey">— {director?.name || academyInfo.director}, {director?.title || 'מייסד ומנהל האקדמיה'}</p>
                </div>
              </div>
              
              <p className="text-lightgrey text-lg" style={{ lineHeight: 'var(--hebrew-line-height)', letterSpacing: 'var(--hebrew-letter-spacing)' }}>
                האקדמיה שלנו משלבת טכניקות מסורתיות עם חדשנות עכשווית, ומעניקה לסטודנטים שלנו את הכלים, הידע והביטחון להצליח בעולם הספרות המתפתח תמיד. הצוות שלנו מורכב ממומחים מובילים בתעשייה, עם שיעור השמה מרשים של <span className="text-gold font-medium">{academyInfo.stats.placementRate}%</span> המוכיח את האיכות של ההכשרה שלנו.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-5 mt-10">
              <Button 
                href="/courses" 
                variant="primary"
                className="px-8 py-4 text-base"
              >
                גלה את התוכניות שלנו
              </Button>
              <Button 
                href="/academy" 
                variant="secondary"
                className="px-8 py-4 text-base"
              >
                עוד על האקדמיה
              </Button>
            </div>
          </div>
          
          {/* Image section with enhanced styling */}
          <div className="relative">
            {/* Gold decorative border */}
            <div className="absolute -top-3 -right-3 w-full h-full border-2 border-gold opacity-40"></div>
            
            {/* Main image with enhanced hover effects */}
            <div className="relative aspect-[4/3] overflow-hidden group">
              <Image 
                src="/images/academy-classroom.jpg" 
                alt={`${academyInfo.name} - כיתת לימוד`}
                fill
                className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
                priority
              />
              
              {/* Enhanced overlay with smoother gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-700"></div>
              
              {/* Golden accent line with animation */}
              <div className="absolute top-0 bottom-0 left-0 w-1 bg-gold group-hover:bg-opacity-90 group-hover:w-1.5 transition-all duration-500"></div>
              
              {/* Year established badge with enhanced styling */}
              <div className="absolute top-6 right-6 bg-charcoal/80 backdrop-blur-sm py-2.5 px-5 border-r-2 border-gold transform group-hover:translate-y-1 transition-transform duration-500">
                <p className="text-gold font-medium text-small hebrew-nums">{yearsOfOperation} שנות ניסיון</p>
              </div>
              
              {/* Stats box with enhanced data display */}
              <div className="absolute bottom-0 right-0 left-0 p-8">
                <div className="bg-charcoal/80 backdrop-blur p-6 border-r-4 border-gold transition-all duration-500 group-hover:border-r-[6px]">
                  <div className="grid grid-cols-3 gap-6 mb-5">
                    <div className="text-center group/stat">
                      <p className="text-gold text-h3 font-bold hebrew-nums transform transition-transform duration-500 group-hover/stat:scale-110">{academyInfo.stats.graduates}+</p>
                      <p className="text-lightgrey text-small">בוגרים</p>
                    </div>
                    <div className="text-center group/stat">
                      <p className="text-gold text-h3 font-bold hebrew-nums transform transition-transform duration-500 group-hover/stat:scale-110">{academyInfo.stats.placementRate}%</p>
                      <p className="text-lightgrey text-small">השמה</p>
                    </div>
                    <div className="text-center group/stat">
                      <p className="text-gold text-h3 font-bold hebrew-nums transform transition-transform duration-500 group-hover/stat:scale-110">{academyInfo.stats.programCount}</p>
                      <p className="text-lightgrey text-small">קורסים</p>
                    </div>
                  </div>
                  
                  {/* Featured course teaser */}
                  <div className="flex items-center justify-between pt-4 border-t border-lightgrey/10">
                    <div>
                      <p className="text-gold font-medium">{featuredCourse.name_he}</p>
                      <p className="text-lightgrey text-small">{featuredCourse.duration_he} • {featuredCourse.price}₪</p>
                    </div>
                    <Button 
                      href={`/academy/courses/${featuredCourse.id}`} 
                      variant="tertiary"
                      className="flex-shrink-0"
                    >
                      <span className="inline-flex items-center">
                        פרטים נוספים
                        <svg 
                          className="w-4 h-4 mr-1 transform rotate-180" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced award seal */}
            {academyInfo.stats.industryAwards > 0 && (
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-gold flex items-center justify-center text-charcoal transform rotate-12 hover:rotate-0 transition-all duration-500 border-2 border-charcoal shadow-lg">
                <div className="text-center">
                  <p className="font-bold text-small leading-tight">אקדמיה מובילה</p>
                  <p className="text-small leading-tight hebrew-nums">{currentYear}</p>
                  <p className="text-mini leading-tight opacity-80 mt-1">{academyInfo.stats.industryAwards} פרסים</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        
      </div>
    </section>
  );
};

export default AcademyIntroSection;