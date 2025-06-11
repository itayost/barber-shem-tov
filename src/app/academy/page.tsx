// src/app/academy/page.tsx
import Hero from '@/components/common/Hero';
import AcademyStoryLight from '@/components/academy/tabs/AcademyStoryLight';

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
      
      {/* Our Story Section - Lightweight version */}
      <section className="py-20 md:py-32 bg-black" dir="rtl">
        <div className="container mx-auto px-4 sm:px-6">
          <AcademyStoryLight />
        </div>
      </section>
    </>
  );
}