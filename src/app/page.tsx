// src/app/page.tsx - Streamlined Homepage
import Hero from '@/components/home/Hero';
import ThreePathways from '@/components/home/ThreePathways';
import Testimonials from '@/components/home/Testimonials';
import NextSteps from '@/components/home/NextSteps';
import WhatsAppFloat from '@/components/common/WhatsAppFloat';

export default function Home() {
  return (
    <>
      {/* 1. Hero Section - Clear value proposition with 2 CTAs */}
      <Hero />
      
      {/* 2. Three Pathways - Simple course progression */}
      <ThreePathways />
      
      {/* 4. Testimonials - 3 success stories with real results */}
      <Testimonials />
      
      {/* 5. Next Steps - Simple 3-step process with large CTA */}
      <NextSteps />

      {/* WhatsApp floating button for immediate contact */}
      <WhatsAppFloat />
    </>
  );
}