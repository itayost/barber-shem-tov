// File: src/app/about/page.tsx
import { teamMembers } from '@/lib/data';

// Import components
import AboutPageHeader from '@/components/about/AboutPageHeader';
import BrandStorySection from '@/components/about/BrandStorySection';
import ExperienceSection from '@/components/about/ExperienceSection';
import TeamSection from '@/components/about/TeamSection';
import AboutCtaSection from '@/components/about/AboutCtaSection';


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