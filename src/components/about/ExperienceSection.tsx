// File: src/components/about/ExperienceSection.tsx
import React from 'react';
import Button from '@/components/common/Button';

const ExperienceSection = () => {
  return (
    <section className="py-section-mobile md:py-section bg-brown bg-opacity-10 relative" dir="rtl">
      {/* Background pattern/overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-pattern"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heebo text-h3 mb-8">החוויה</h2>
          <p className="text-lg text-lightgrey mb-8">
            הספרים שלנו לוקחים את הזמן להבין בדיוק מה אתם מחפשים, ומציעים הדרכה
            המבוססת על תווי הפנים, הסגנון ואורח החיים שלכם. אנחנו לא ממהרים - הזמן שלכם איתנו הוא עניין של
            השגת התוצאה המושלמת ונהנים מהחוויה לאורך הדרך.
          </p>
          <Button href="/services" variant="secondary">
            גלה את השירותים שלנו
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;