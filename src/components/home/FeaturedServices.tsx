import { services } from '@/lib/data';
import Button from '../common/Button';
import ServiceCard from '../services/ServiceCard';

const FeaturedServices = () => {
  // Filter featured services, separating regular services and academy courses
  const featuredServices = services.filter(service => service.featured);
  const featuredRegularServices = featuredServices.filter(service => service.category !== 'academy');
  const featuredAcademyCourses = featuredServices.filter(service => service.category === 'academy');
  
  return (
    <section id="introduction" className="py-section-mobile md:py-section bg-charcoal">
      <div className="container mx-auto px-6">
        {/* Main section title */}
        <div className="text-center mb-16">
          <h2 className="font-heebo text-h3 md:text-h2 text-gold mb-6">שירותים מובילים</h2>
          <p className="max-w-2xl mx-auto text-lightgrey">
            ברוכים הבאים לחווית הספרות המובילה של הצפון. יצרנו מרחב שבו טכניקה מדויקת פוגשת שירות מחושב, 
            המציע לכם יותר מסתם תספורת - מפלט מהשגרה וכן הזדמנות ללמוד את אמנות הספרות.
          </p>
        </div>
        
        {/* Regular services section */}
        <div className="mb-16">
          <h3 className="font-heebo text-h4 text-gold mb-6 text-center">שירותי ספרות</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredRegularServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <div className="text-center mt-6">
            <Button href="/services" variant="secondary">
              צפה בכל השירותים
            </Button>
          </div>
        </div>
        
        {/* Academy courses section */}
        <div>
          <h3 className="font-heebo text-h4 text-gold mb-6 text-center">האקדמיה שלנו</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredAcademyCourses.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <div className="text-center mt-6">
            <Button href="/academy" variant="primary">
              גלה את האקדמיה שלנו
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;