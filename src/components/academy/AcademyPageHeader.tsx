// File: src/components/academy/AcademyPageHeader.tsx
import React from 'react';

const AcademyPageHeader = () => {
  return (
    <section className="pt-32 pb-16 bg-charcoal">
      <div className="container mx-auto px-6 text-center">
        <div className="inline-block text-gold text-sm font-medium px-4 py-1 border border-gold border-opacity-30 mb-4">
          המסלול שלך להצלחה
        </div>
        <h1 className="font-heebo text-h2 md:text-h1 mb-6">האקדמיה שלנו</h1>
        <p className="max-w-2xl mx-auto text-lightgrey">
          האקדמיה שלנו מציעה קורסים מקצועיים בספרות גברים מרמת המתחיל ועד לרמה המתקדמת.
          בהדרכת מומחים בעלי שנים של ניסיון, אנו מקנים לך את המיומנויות, הידע והביטחון
          להצליח בתעשייה תחרותית זו.
        </p>
      </div>
    </section>
  );
};

export default AcademyPageHeader;