// app/page.tsx
import Hero from '@/components/home/Hero';
import ThreePathways from '@/components/home/ThreePathways';
import Testimonials from '@/components/home/Testimonials';
import NextSteps from '@/components/home/NextSteps';
import WhatsAppFloat from '@/components/common/WhatsAppFloat';

export default function Home() {
  return (
    <main className="relative">
      {/* Fixed Hero Section */}
      <Hero />
      
      {/* Scrolling Content Container */}
      <div className="relative z-10">
        {/* First section with background to cover hero */}
        <section className="relative bg-black">
          <ThreePathways />
        </section>
        
        {/* Subsequent sections */}
        <section className="relative bg-charcoal">
          <Testimonials />
        </section>
        
        <section className="relative bg-black">
          <NextSteps />
        </section>
      </div>

      {/* WhatsApp floating button */}
      <WhatsAppFloat />
    </main>
  );
}