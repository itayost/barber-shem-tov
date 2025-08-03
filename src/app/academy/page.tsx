// src/app/academy/page.tsx
import React from 'react';
import Hero from '@/components/common/Hero';
import AcademyOurStory from '@/components/academy/AcademyOurStory';
import AcademyFounderSection from '@/components/academy/AcademyFounder';
import AcademyOurStaff from '@/components/academy/AcademyStaff';
import { metadata as pageMetadata } from './metadata';

// Export metadata from the metadata.ts file
export const metadata = pageMetadata;

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