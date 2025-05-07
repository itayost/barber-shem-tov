'use client';

import { useState } from 'react';
import { services } from '@/lib/data';
import ServiceCard from '@/components/services/ServiceCard';
import Button from '@/components/common/Button';

export default function ServicesPage() {
  // State for category filter
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Get unique categories
  const categories = [...new Set(services.map(service => service.category))];
  
  // Filter services based on selected category
  const filteredServices = activeCategory 
    ? services.filter(service => service.category === activeCategory)
    : services;

  return (
    <>
      {/* Page header section */}
      <section className="pt-32 pb-16 bg-charcoal">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-heebo text-h2 md:text-h1 mb-6">השירותים שלנו</h1>
          <p className="max-w-2xl mx-auto text-lightgrey mb-10">
            תפריט השירותים שלנו מעוצב סביב הצרכים של הג'נטלמן המודרני. כל טיפול משלב
            טכניקות מסורתיות עם סגנון עכשווי. תיהנו ממשקה חינם עם כל
            שירות בזמן שאתם מתרגעים במרחב המעוצב שלנו.
          </p>
        </div>
      </section>

      {/* Category filter section */}
      <section className="py-8 bg-charcoal border-t border-b border-lightgrey border-opacity-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => setActiveCategory(null)}
              variant={activeCategory === null ? 'primary' : 'secondary'}
              className="mb-2"
            >
              כל השירותים
            </Button>
            
            {categories.map((category) => {
              const categoryLabels: Record<string, string> = {
                'haircut': 'תספורות',
                'beard': 'זקן',
                'shave': 'גילוח',
                'package': 'חבילות',
                'special': 'שירותים מיוחדים',
                'color': 'צבע'
              };
              return (
                <Button 
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  variant={activeCategory === category ? 'primary' : 'secondary'}
                  className="mb-2"
                >
                  {categoryLabels[category]} 
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services listing section */}
      <section className="py-section-mobile md:py-section bg-charcoal">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} showDetails={true} />
            ))}
          </div>
          
          {/* Special notes */}
          <div className="mt-16 p-8 border border-lightgrey border-opacity-10 bg-charcoal bg-opacity-50">
            <h3 className="font-heebo text-h4 text-gold mb-4">הערות לשירות</h3>
            <ul className="space-y-3 text-lightgrey">
              <li className="flex items-start">
                <span className="text-gold ml-2">•</span>
                אורחים ללא תיאום מראש מתקבלים בברכה כאשר יש מקומות פנויים, אך לתורים מתואמים יש עדיפות. אנו ממליצים להזמין מראש כדי להבטיח את השעה המועדפת עליכם.
              </li>
              <li className="flex items-start">
                <span className="text-gold ml-2">•</span>
                כל שירות תספורת כולל משקה חינם לבחירתכם - קפה איכותי, תה מובחר, או משהו חזק יותר אם אתם מעדיפים.
              </li>
            </ul>
          </div>
          
          {/* Booking CTA */}
          <div className="mt-16 text-center">
            <h3 className="font-heebo text-h3 mb-4">מוכנים לחוות את השירות שלנו?</h3>
            <p className="max-w-xl mx-auto mb-6 text-lightgrey">
              הזמינו את התור שלכם היום כדי להבטיח את המועד המועדף עליכם.
            </p>
            <Button href="/contact" variant="primary">
              הזמן תור
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}