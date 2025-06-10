// src/app/academy/page.tsx - Complete Luxury Academy Page
import Hero from '@/components/common/Hero';
import AcademyStory from '@/components/academy/AcademyStory';
import AcademyTabsSection from '@/components/academy/AcademyTabsSection';
import AcademyQuickActions from '@/components/academy/AcademyQuickActions';

// New sections we'll create
//import AcademyWhyChooseUs from '@/components/academy/AcademyWhyChooseUs';
//import AcademyStudentJourney from '@/components/academy/AcademyStudentJourney';
//import AcademyBottomCTA from '@/components/academy/AcademyBottomCTA';

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
      
      {/* Our Story Section with Luxury Carousel */}
      <AcademyStory />
      

      
      {/* Enhanced Tabs Section */}
      <AcademyTabsSection />
      
      
      {/* Quick Actions */}
      <AcademyQuickActions />
    </>
  );
}