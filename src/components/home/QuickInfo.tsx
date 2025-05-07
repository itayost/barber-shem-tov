import { businessInfo } from '@/lib/data';
import Button from '../common/Button';

const QuickInfo = () => {
  return (
    <section className="py-section-mobile md:py-section bg-charcoal">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Location */}
          <div className="text-center md:text-right">
            <h3 className="font-heebo text-h4 text-gold mb-4">מיקום</h3>
            <p className="mb-3">{businessInfo.address}</p>
            <Button 
              href="https://goo.gl/maps/123" // Replace with actual Google Maps link
              variant="tertiary"
            >
              קבל הוראות הגעה
            </Button>
          </div>

          {/* Hours */}
          <div className="text-center md:text-right">
            <h3 className="font-heebo text-h4 text-gold mb-4">שעות פעילות</h3>
            <ul>
              {businessInfo.hours.map((schedule, index) => (
                <li key={index} className="mb-2">
                  <span className="font-medium">{schedule.days}:</span> {schedule.hours}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <h3 className="font-heebo text-h4 text-gold mb-4">צור קשר</h3>
            <p className="mb-3">
              <a 
                href={`tel:${businessInfo.phone}`} 
                className="text-gold hover:underline"
              >
                הזמן תור בטלפון
              </a>
            </p>
            <p className="mb-6">הזמנה מקוונת בקרוב</p>
            <Button href="/contact" variant="primary">
              בקש תור
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickInfo;