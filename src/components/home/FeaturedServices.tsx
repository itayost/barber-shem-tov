import { services } from '@/lib/data';
import Button from '../common/Button';
import ServiceCard from '../services/ServiceCard';

const FeaturedServices = () => {
  // מסנן רק שירותים מובחרים
  const featuredServices = services.filter(service => service.featured);
  
  return (
    <section id="introduction" className="py-section-mobile md:py-section bg-charcoal">
      <div className="container mx-auto px-6">
        {/* כותרת מדור */}
        <div className="text-center mb-16">
          <h2 className="font-heebo text-h3 md:text-h2 text-gold mb-6">שירותים מובילים</h2>
          <p className="max-w-2xl mx-auto text-lightgrey">
            ברוכים הבאים לחווית הספרות המובילה של הצפון. יצרנו מרחב שבו טכניקה מדויקת פוגשת שירות מחושב, המציע לכם יותר מסתם תספורת - מפלט מהשגרה.
          </p>
        </div>
        {/* רשת שירותים */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
        {/* כפתור לכל השירותים */}
        <div className="text-center mt-12">
          <Button href="/services" variant="secondary">
            צפה בכל השירותים
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;