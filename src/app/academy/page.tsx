// src/app/academy/page.tsx
import React from 'react';
import Hero from '@/components/common/Hero';
import { generateMetadata } from '@/utils/openGraphUtils';

// Import components directly without dynamic imports for now
import AcademyOurStory from '@/components/academy/AcademyOurStory';
import AcademyFounderSection from '@/components/academy/AcademyFounder';
import AcademyOurStaff from '@/components/academy/AcademyStaff';

// Metadata
export const metadata = generateMetadata(
  'academy',
  'האקדמיה | The Fader - מוסד להכשרת ספרים מקצועיים',
  'הכירו את האקדמיה המובילה לספרות בצפון. למדו על החזון, הצוות המקצועי וההישגים שהופכים אותנו למוסד המוביל בתחום.'
);

export default function AcademyPage() {
  return (
    <main className="min-h-screen bg-black overflow-x-hidden" dir="rtl">
      {/* Hero Section using common component */}
      <Hero
        title={
          <>
            האקדמיה למצוינות
            <br />
            <span className="text-gold">בספרות מקצועית</span>
          </>
        }
        subtitle="מאז 2018"
        backgroundImage="/images/hero/academy-hero.jpg"
        ctaText="לקורסים שלנו"
        ctaHref="/courses"
      />

      {/* Our Story Component */}
      <AcademyOurStory />

      {/* Founder Section Component */}
      <AcademyFounderSection />

      {/* Our Staff Component */}
      <AcademyOurStaff />
    </main>
  );
}
