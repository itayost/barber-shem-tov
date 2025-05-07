import Hero from '@/components/home/Hero';
import FeaturedServices from '@/components/home/FeaturedServices';
import Testimonials from '@/components/home/Testimonials';
import HomeCarousel from '@/components/home/HomeCarousel';

export const metadata = {
  title: 'The Fader | מספרה מודרנית בטירת הכרמל',
  description: 'חווית ספרות מודרנית ויוקרתית בטירת הכרמל. עיצוב שיער, טיפוח זקן, תספורות ילדים ועוד. הזמינו תור עוד היום!',
  openGraph: {
    images: ['/images/hero-barbershop.jpg'],
  }
};

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