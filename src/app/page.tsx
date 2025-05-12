// File: src/app/page.tsx
import Hero from '@/components/home/Hero';
import FeaturedServices from '@/components/home/FeaturedServices';
import Testimonials from '@/components/home/Testimonials';
import HomeCarousel from '@/components/home/HomeCarousel';
import AcademyPromoSection from '@/components/home/AcademyPromoSection';

export default function Home() {
  return (
    <>
      <Hero />
      <div className="relative bg-charcoal py-20">
        <FeaturedServices />
        <AcademyPromoSection />
        <HomeCarousel/>
        <Testimonials />
      </div>
    </>
  );
}