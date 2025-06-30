// src/components/home/FinalCTA.tsx
'use client';

import React from 'react';
import { LuxurySection, LuxuryButton } from '@/components/luxury';

const FinalCTA: React.FC = () => {
  return (
    <LuxurySection
      title={
        <>
          מוכנים להתחיל
          <br />
          <span className="text-gold">את המסע שלכם?</span>
        </>
      }
      size="hero"
      bgColor="charcoal-dark"
      textAlign="center"
    >
      <p className="text-xl md:text-2xl text-lightgrey max-w-3xl mx-auto mb-12">
        הצטרפו לאקדמיה המובילה בצפון וקבלו את הכלים, הידע והביטחון להצליח בעולם הספרות המקצועית
      </p>

      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        <LuxuryButton variant="primary" size="large" href="/apply">
          הרשמה לקורס
        </LuxuryButton>
        <LuxuryButton variant="outline" size="large" href="/contact">
          דברו איתנו
        </LuxuryButton>
      </div>
    </LuxurySection>
  );
};

export default FinalCTA;
