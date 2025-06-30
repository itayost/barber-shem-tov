// src/app/contact/page.tsx
import ContactHero from '@/components/contact/ContactHero';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactFAQ from '@/components/contact/ContactFAQ';
import LuxurySection from '@/components/luxury/LuxurySection';
import LuxuryButton from '@/components/luxury/LuxuryButton';
import { generateMetadata } from '@/utils/openGraphUtils';

// Metadata
export const metadata = generateMetadata(
  'contact',
  'צור קשר | The Fader Academy',
  'נשמח לשמוע ממך! צור קשר לקביעת פגישת ייעוץ או כל שאלה אחרת.'
);

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black">
      <ContactHero />

      {/* Main Contact Section */}
      <section className="py-24 md:py-32 bg-black" dir="rtl">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] md:tracking-[0.5em] text-gold mb-4 md:mb-6 uppercase">
              יצירת קשר
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-thin text-offwhite leading-tight">
              נשמח לעמוד
              <span className="text-gold"> לרשותכם</span>
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-lightgrey mt-4 md:mt-6 max-w-3xl mx-auto">
              צוות האקדמיה זמין לכל שאלה, ייעוץ או מידע נוסף
            </p>
          </div>
          <ContactInfo />
        </div>
      </section>

      {/* FAQ Section */}
      <ContactFAQ />

      {/* Final CTA */}
      <section className="py-20 md:py-24 bg-charcoal-dark text-center" dir="rtl">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-thin text-offwhite leading-tight mb-8">
            מוכנים להתחיל?
          </h2>
          <p className="text-xl text-lightgrey max-w-2xl mx-auto mb-8">
            ההרשמה לקורס הבא בעיצומה. אל תחמיצו את ההזדמנות להצטרף למחזור הקרוב
          </p>
          <LuxuryButton variant="primary" size="large" href="/apply">
            להרשמה לקורס
          </LuxuryButton>
        </div>
      </section>
    </main>
  );
}
