import Hero from '@/components/home/Hero';
import FeaturedServices from '@/components/home/FeaturedServices';
import Testimonials from '@/components/home/Testimonials';
import HomeCarousel from '@/components/home/HomeCarousel';
import QuickInfo from '@/components/home/QuickInfo';

export default function Home() {
  return (
    <>
      <Hero />
      <div className="relative bg-charcoal py-20">
        <FeaturedServices />
        <HomeCarousel/>
        <Testimonials />
      </div>
    </>
  );
}