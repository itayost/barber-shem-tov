// src/app/academy/page.tsx
import Hero from '@/components/common/Hero';
import AcademyInfoTabs from '@/components/academy/AcademyInfoTabs';

export default function AcademyPage() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title={
          <>
            האקדמיה שמכשירה
            <br />
            <span className="text-gold">את המקצוענים הבאים</span>
          </>
        }
        subtitle="מאחורי הקלעים של The Fader"
        backgroundImage="/images/hero/academy-hero.jpg"
      />
      
      {/* Tabs Section with Our Story and Team */}
      <AcademyInfoTabs />
    </>
  );
}