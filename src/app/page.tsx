// src/app/page.tsx - Updated
import Hero from '@/components/common/Hero';
import ThreePathways from '@/components/home/ThreePathways';
import Testimonials from '@/components/home/Testimonials';

// Option 3: Enhanced home page with special features
export default function Home() {
  return (
    <div className="relative">
      <Hero
        title="צור את העתיד שלך כאמן ספרות מוביל"
        subtitle="The Fader Academy"
        backgroundImages={[
          '/images/hero/homeHero1.jpg',
          '/images/hero/homeHero2.jpg',
          '/images/hero/homeHero3.jpg',
        ]}
        ctaText="הרשמה לקורס"
        ctaHref="/apply"
      />

      {/* Add a transition element between hero and content */}
      <div className="relative z-20 -mt-20">
        <div className="h-20 bg-gradient-to-b from-transparent to-black" />
      </div>

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
