// src/app/academy/page.tsx - Interactive & Engaging Academy Page
import Hero from '@/components/common/Hero';
import AcademyTabsSection from '@/components/academy/AcademyTabsSection';
import AcademyQuickActions from '@/components/academy/AcademyQuickActions';
import QuickEnrollFloat from '@/components/common/QuickEnrollFloat';


export default function AcademyPage() {
  return (
    <>
      <Hero
        title={<>הסיפור <span className="text-gold">שלנו</span></>}
        subtitle="מחלום למציאות"
        backgroundImage="/images/hero/academy-hero.jpg"
      />
      
      {/* 2. Tabbed Content - Story, Results, Team */}
      <AcademyTabsSection />
      
      {/* 3. Quick Actions - Multiple ways to engage */}
      <AcademyQuickActions />

      <QuickEnrollFloat />
    </>
  );
}