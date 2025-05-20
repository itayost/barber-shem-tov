import React from 'react';
import { academyInfo } from '@/lib/data';

interface AcademyStatsSectionProps {
  showAccreditations?: boolean;
}

const AcademyStatsSection: React.FC<AcademyStatsSectionProps> = ({
  showAccreditations = true
}) => {
  // Stats from academyInfo
  const { stats, accreditations } = academyInfo;
  
  // Animation variant classes for stat items using luxury-card base
  const statItemClasses = "luxury-card p-8 transform transition-all duration-300 hover:-translate-y-2 hover:border-opacity-50 hover:shadow-lg overflow-hidden";

  return (
    <section className="py-section-mobile md:py-section bg-charcoal relative overflow-hidden" dir="rtl">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-1/2 h-full opacity-5">
        <div className="w-full h-full bg-gradient-to-r from-gold to-transparent"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block text-gold text-small font-medium px-4 py-1 border border-gold border-opacity-30 mb-4">
            האקדמיה במספרים
          </div>
          <h2 className="section-title text-center">הישגים <span className="text-gold">שמדברים בעד עצמם</span></h2>
          <p className="max-w-2xl mx-auto text-lightgrey">
            כבר <span className="hebrew-nums">{new Date().getFullYear() - academyInfo.established}</span> שנים אנחנו מובילים את תעשיית הספרות בישראל עם הכשרות מקצועיות ברמה הגבוהה ביותר
          </p>
        </div>
        
        {/* Key statistics in grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Graduates */}
          <div className={statItemClasses}>
            {/* Background number for visual interest */}
            <div className="absolute -top-6 -right-6 text-[120px] font-bold text-gold opacity-5 group-hover:opacity-10 transition-opacity z-0 leading-none">01</div>
            
            <div className="text-gold text-h1 font-bold mb-4 hebrew-nums">{stats.graduates}+</div>
            <div className="flex flex-col items-start">
              <h3 className="text-offwhite text-h4 mb-2">בוגרים מצליחים</h3>
              <p className="text-lightgrey text-small">ברחבי הארץ והעולם</p>
            </div>
          </div>
          
          {/* Placement rate */}
          <div className={statItemClasses}>
            <div className="absolute -top-6 -right-6 text-[120px] font-bold text-gold opacity-5 group-hover:opacity-10 transition-opacity z-0 leading-none">02</div>
            
            <div className="text-gold text-h1 font-bold mb-4 hebrew-nums">{stats.placementRate}%</div>
            <div className="flex flex-col items-start">
              <h3 className="text-offwhite text-h4 mb-2">שיעור השמה</h3>
              <p className="text-lightgrey text-small">תוך 3 חודשים מסיום הלימודים</p>
            </div>
          </div>
          
          {/* Salary increase */}
          <div className={statItemClasses}>
            <div className="absolute -top-6 -right-6 text-[120px] font-bold text-gold opacity-5 group-hover:opacity-10 transition-opacity z-0 leading-none">03</div>
            
            <div className="text-gold text-h1 font-bold mb-4 hebrew-nums">{stats.averageSalaryIncrease}%</div>
            <div className="flex flex-col items-start">
              <h3 className="text-offwhite text-h4 mb-2">גידול בהכנסה</h3>
              <p className="text-lightgrey text-small">בממוצע לאחר סיום הקורס</p>
            </div>
          </div>
          
          {/* Program count */}
          <div className={statItemClasses}>
            <div className="absolute -top-6 -right-6 text-[120px] font-bold text-gold opacity-5 group-hover:opacity-10 transition-opacity z-0 leading-none">04</div>
            
            <div className="text-gold text-h1 font-bold mb-4 hebrew-nums">{stats.programCount}+</div>
            <div className="flex flex-col items-start">
              <h3 className="text-offwhite text-h4 mb-2">תוכניות לימוד</h3>
              <p className="text-lightgrey text-small">מותאמות לכל רמת מיומנות</p>
            </div>
          </div>
        </div>
        
        {/* Additional achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Years box */}
          <div className="luxury-card p-8 flex items-center">
            <div className="w-24 h-24 bg-gold/10 flex items-center justify-center rounded-full border border-gold border-opacity-30 flex-shrink-0">
              <span className="text-gold text-h3 font-bold hebrew-nums">{new Date().getFullYear() - academyInfo.established}</span>
            </div>
            <div className="mr-6">
              <h3 className="text-offwhite text-h4 mb-2">שנות ניסיון</h3>
              <p className="text-lightgrey" style={{ lineHeight: 'var(--hebrew-line-height)' }}>
                מאז <span className="hebrew-nums">{academyInfo.established}</span> מכשירים את הדור הבא של המקצוענים בתעשיית הספרות
              </p>
            </div>
          </div>
          
          {/* Awards box */}
          <div className="luxury-card p-8 flex items-center">
            <div className="w-24 h-24 bg-gold/10 flex items-center justify-center rounded-full border border-gold border-opacity-30 flex-shrink-0">
              <span className="text-gold text-h3 font-bold hebrew-nums">{stats.industryAwards}</span>
            </div>
            <div className="mr-6">
              <h3 className="text-offwhite text-h4 mb-2">פרסי תעשייה</h3>
              <p className="text-lightgrey" style={{ lineHeight: 'var(--hebrew-line-height)' }}>
                הכרה בינלאומית במצוינות בהכשרה מקצועית בתחום הספרות
              </p>
            </div>
          </div>
        </div>
        
        {/* Accreditations section - conditionally rendered */}
        {showAccreditations && accreditations && accreditations.length > 0 && (
          <div className="text-center">
            <h3 className="font-heebo text-h4 text-gold mb-8">הסמכות ושיתופי פעולה</h3>
            
            <div className="flex flex-wrap justify-center items-center gap-10">
              {accreditations.map((accreditation, index) => (
                <div 
                  key={index} 
                  className="luxury-card px-6 py-4 min-w-[200px] hover:border-gold hover:border-opacity-30"
                >
                  <p className="text-offwhite">{accreditation}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AcademyStatsSection;