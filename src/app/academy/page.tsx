// src/app/academy/page.tsx - Streamlined Academy Page
import AcademyHero from '@/components/academy/AcademyHero';
import WhyOurAcademy from '@/components/academy/WhyOurAcademy';
import MeetTheFounder from '@/components/academy/MeetTheFounder';
import AcademyResults from '@/components/academy/AcademyResults';
import AcademyBottomCTA from '@/components/academy/AcademyBottomCTA';
import WhatsAppFloat from '@/components/common/WhatsAppFloat';

export default function AcademyPage() {
  return (
    <>
      {/* 1. Academy Hero - Clear value proposition with stats */}
      <AcademyHero />
      
      {/* 2. Why Our Academy - 4 key differentiators */}
      <WhyOurAcademy />
      
      {/* 3. Academy Results - Numbers that matter */}
      <AcademyResults />
      
      {/* 4. Meet The Founder - Personal connection and trust */}
      <MeetTheFounder />
      
      {/* 5. Bottom CTA - Multiple ways to take action */}
      <AcademyBottomCTA />
      
      {/* WhatsApp floating button for immediate contact */}
      <WhatsAppFloat />
    </>
  );
}