// src/app/page.tsx - Updated
import Hero from '@/components/common/Hero';
import ThreePathways from '@/components/home/ThreePathways';
import Testimonials from '@/components/home/Testimonials';

export default function Home() {
  return (
    <div className="relative">
      <Hero
        title={<>צור את העתיד שלך<br /><span className="text-gold">כאמן ספרות מוביל</span></>}
        subtitle="The Fader Academy"
        backgroundImages={[
          "/images/hero/homeHero1.jpg",
          "/images/hero/homeHero2.jpg", 
          "/images/hero/homeHero3.jpg"
        ]}
        ctaText="הרשמה לקורס"
        ctaHref="/apply" // Changed from /courses
      />
      
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
      </div>
    </div>
  );
}