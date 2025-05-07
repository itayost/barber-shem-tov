// File: src/app/about/page.tsx
import { teamMembers } from '@/lib/data';

// Import components
import AboutPageHeader from '@/components/about/AboutPageHeader';
import BrandStorySection from '@/components/about/BrandStorySection';
import ExperienceSection from '@/components/about/ExperienceSection';
import TeamSection from '@/components/about/TeamSection';
import AboutCtaSection from '@/components/about/AboutCtaSection';

export const metadata = {
  title: 'אודות | The Fader מספרה בטירת הכרמל',
  description: 'הכירו את הצוות המקצועי שלנו וגלו את הסיפור מאחורי המספרה המודרנית המובילה בטירת הכרמל.',
  openGraph: {
    images: ['/images/team/bar.jpg'],
  }
};

export default function AboutPage() {
  return (
    <>
      <AboutPageHeader />
      <BrandStorySection />
      <ExperienceSection />
      <TeamSection teamMembers={teamMembers} />
      <AboutCtaSection />
    </>
  );
}