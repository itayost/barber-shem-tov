// File: src/app/page.tsx
import Hero from '@/components/home/Hero';
import AcademyTestimonials from '@/components/home/AcademyTestimonials';
import AcademyGallery from '@/components/home/AcademyGallery';
import AcademyIntro from '@/components/home/AcademyIntro';
import AcademyFeatures from '@/components/home/AcademyFeatures';

export default function Home() {
  return (
    <>
      <Hero />
      <div className="relative bg-charcoal py-20">
        <AcademyIntro/>
        <AcademyFeatures/>
        <AcademyGallery/>
        <AcademyTestimonials />
      </div>
    </>
  );
}