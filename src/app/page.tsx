// src/app/page.tsx
import { Hero, ThreePathways, Testimonials, GalleryPreview, FinalCTA } from '@/components/home';

export default function Home() {
  return (
    <div className="relative">
      <Hero
        title={
          <>
            צור את העתיד שלך
            <br />
            <span className="text-gold">כאמן ספרות מוביל</span>
          </>
        }
        subtitle="The Fader Academy - המקום שבו קריירות נולדות"
        backgroundImages={[
          '/images/hero/luxury-hero-1.jpg',
          '/images/hero/luxury-hero-2.jpg',
          '/images/hero/luxury-hero-3.jpg',
        ]}
        ctaText="הרשמה לקורס"
        ctaHref="/apply"
        secondaryCtaText="קביעת פגישה"
        secondaryCtaHref="/contact"
        verticalText="EST. 2018 • EXCELLENCE IN BARBERING"
        overlay="medium"
        height="full"
        showScrollIndicator={true}
        autoPlayInterval={5000}
      />

      <ThreePathways />

      <Testimonials />

      <GalleryPreview />

      <FinalCTA />
    </div>
  );
}
