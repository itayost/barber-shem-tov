// src/app/academy/page.tsx
import { AcademyHero, OurStory, Founder, Staff, AcademyCTA } from '@/components/academy';
import { generateMetadata } from '@/utils/openGraphUtils';

// Metadata
export const metadata = generateMetadata(
  'academy',
  'האקדמיה | The Fader - מוסד להכשרת ספרים מקצועיים',
  'הכירו את האקדמיה המובילה לספרות בצפון. למדו על החזון, הצוות המקצועי וההישגים שהופכים אותנו למוסד המוביל בתחום.'
);

export default function AcademyPage() {
  return (
    <main className="min-h-screen bg-black">
      <AcademyHero />
      <OurStory />
      <Founder />
      <Staff />
      <AcademyCTA />
    </main>
  );
}
