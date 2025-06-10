// src/app/academy/page.tsx - Step 1 & 2
import Hero from '@/components/common/Hero';
import AcademyStory from '@/components/academy/AcademyStory';

export default function AcademyPage() {
  return (
    <>
      {/* Step 1: Hero Section using common component */}
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
      
      {/* Step 2: Our Story Section */}
      <AcademyStory />
      
      {/* Step 3: Meet the Team - Coming Next */}
      
    </>
  );
}