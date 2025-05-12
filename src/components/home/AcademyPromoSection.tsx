// File: src/components/home/AcademyPromoSection.tsx
import React from 'react';
// Removed unused motion import
import Button from '../common/Button';
import { academyTestimonials } from '@/lib/data';

const AcademyPromoSection = () => {
  return (
    <section className="py-section-mobile md:py-section bg-brown bg-opacity-5 relative overflow-hidden" dir="rtl">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-pattern"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block text-gold text-sm font-medium px-4 py-1 border border-gold border-opacity-30 mb-4">
            המכללה לספרות
          </div>
          <h2 className="font-heebo text-h2 md:text-h1 mb-6">האקדמיה שלנו</h2>
          <p className="max-w-2xl mx-auto text-lightgrey mb-6">
            התחל קריירה חדשה בעולם הספרות המקצועית או שדרג את המיומנויות שלך עם הקורסים המקצועיים המובילים שלנו. 
            בהדרכת מומחים בתעשייה עם שנים של ניסיון.
          </p>
        </div>
        
        {/* Course Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-charcoal p-6 border border-lightgrey border-opacity-10 hover:border-gold hover:border-opacity-30 transition-all duration-300">
            <div className="text-gold text-h2 font-bold mb-4">01</div>
            <h3 className="font-heebo text-h4 mb-4">קורסים למתחילים</h3>
            <p className="text-lightgrey mb-6">
              פתח את הקריירה שלך עם יסודות הספרות המודרנית. 
              למד את הטכניקות והכלים הדרושים להצלחה בתעשייה.
            </p>
            <Button href="/academy#beginner" variant="tertiary">
              גלה עוד
            </Button>
          </div>
          
          <div className="bg-charcoal p-6 border border-lightgrey border-opacity-10 hover:border-gold hover:border-opacity-30 transition-all duration-300">
            <div className="text-gold text-h2 font-bold mb-4">02</div>
            <h3 className="font-heebo text-h4 mb-4">קורסים מתקדמים</h3>
            <p className="text-lightgrey mb-6">
              העלה את המיומנויות שלך לרמה הבאה עם טכניקות מתקדמות וטרנדים עכשוויים. 
              לספרים מקצועיים שרוצים להתקדם.
            </p>
            <Button href="/academy#advanced" variant="tertiary">
              גלה עוד
            </Button>
          </div>
          
          <div className="bg-charcoal p-6 border border-lightgrey border-opacity-10 hover:border-gold hover:border-opacity-30 transition-all duration-300">
            <div className="text-gold text-h2 font-bold mb-4">03</div>
            <h3 className="font-heebo text-h4 mb-4">סדנאות מקצועיות</h3>
            <p className="text-lightgrey mb-6">
              סדנאות ממוקדות בנושאים ספציפיים כמו עיצוב זקן, צביעת שיער, ועסקים. 
              מושלם להתמקצעות והתמחות.
            </p>
            <Button href="/academy#workshops" variant="tertiary">
              גלה עוד
            </Button>
          </div>
        </div>
        
        {/* Academy Testimonials */}
        <div className="text-center mb-10">
          <h3 className="font-heebo text-h3 mb-6">מה הסטודנטים שלנו אומרים</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {academyTestimonials && academyTestimonials.length > 0 ? (
              academyTestimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-charcoal p-6 border border-lightgrey border-opacity-10"
                >
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-gold"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-lightgrey italic mb-4">&ldquo;{testimonial.text}&rdquo;</p>
                  <p className="text-gold font-medium mb-1">{testimonial.name}</p>
                  <p className="text-sm text-lightgrey">{testimonial.course}</p>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center">
                <p className="text-lightgrey">עדויות סטודנטים יתווספו בקרוב.</p>
              </div>
            )}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="text-center">
          <Button href="/academy" variant="primary">
            גלה את כל הקורסים שלנו
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AcademyPromoSection;