'use client';

import { useState, useEffect, useCallback } from 'react';
import { testimonials } from '@/lib/data';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        goToNextSlide();
      }
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isAnimating]);

  // Navigation functions
  const goToSlide = useCallback((index: number) => {
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500); // Match duration with CSS transition
  }, []);

  const goToNextSlide = useCallback(() => {
    const newIndex = (currentIndex + 1) % testimonials.length;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToPrevSlide = useCallback(() => {
    const newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  // Render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg 
          key={i}
          className={`w-5 h-5 ${i <= rating ? 'text-gold' : 'text-lightgrey text-opacity-30'}`}
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <section className="py-section-mobile md:py-section bg-brown bg-opacity-10 relative overflow-hidden" dir="rtl">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-pattern"></div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="font-playfair text-h3 md:text-h2 mb-6">חוויות לקוחות</h2>
        <p className="text-lightgrey max-w-xl mx-auto mb-16">
          מה הלקוחות שלנו אומרים על החוויה במספרה שלנו
        </p>
        
        <div className="max-w-3xl mx-auto relative">
          {/* Arrow navigation - FIXED FOR RTL */}
          <div className="absolute top-1/2 -translate-y-1/2 z-10 w-full flex justify-between pointer-events-none">
            <button
              onClick={goToNextSlide}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-charcoal bg-opacity-40 text-gold hover:bg-opacity-80 focus:outline-none transition-all duration-300 transform -translate-x-4 pointer-events-auto"
              aria-label="הטסטימוניאל הבא"
              disabled={isAnimating}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={goToPrevSlide}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-charcoal bg-opacity-40 text-gold hover:bg-opacity-80 focus:outline-none transition-all duration-300 transform translate-x-4 pointer-events-auto"
              aria-label="הטסטימוניאל הקודם"
              disabled={isAnimating}
            >
              <svg className="w-6 h-6 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Testimonial card with shadow effect */}
          <div className="relative bg-charcoal bg-opacity-40 backdrop-blur-sm p-8 md:p-10 rounded-sm border border-gold border-opacity-10 shadow-xl">
            {/* Inner card content with subtle animation */}
            <div className="overflow-hidden">
              <div 
                className="transition-all duration-500 ease-in-out flex"
                style={{ transform: `translateX(${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div 
                    key={testimonial.id}
                    className="min-w-full px-6"
                  >
                    {/* Quote icon */}
                    <div className="mb-6">
                      <svg className="w-12 h-12 text-gold opacity-30 mx-auto" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M6.5 10.5C6.5 8.01 8.51 6 11 6V9C11 10.1 10.1 11 9 11H8.5V12.5C8.5 13.6 9.4 14.5 10.5 14.5V16.5C8.01 16.5 6 14.49 6 12V10.5H6.5ZM14.5 10.5C14.5 8.01 16.51 6 19 6V9C19 10.1 18.1 11 17 11H16.5V12.5C16.5 13.6 17.4 14.5 18.5 14.5V16.5C16.01 16.5 14 14.49 14 12V10.5H14.5Z" />
                      </svg>
                    </div>
                    
                    {/* Testimonial text */}
                    <p className="text-lg md:text-xl mb-6 text-offwhite leading-relaxed">
                      &ldquo;{testimonial.text}&ldquo;
                    </p>
                    
                    {/* Client name */}
                    <p className="font-medium mb-3 text-gold">{testimonial.name}</p>
                    
                    {/* Star rating */}
                    <div className="flex justify-center gap-1 mb-2">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'bg-gold w-6' // Extended width for active dot
                    : 'bg-lightgrey bg-opacity-30 hover:bg-opacity-50'
                }`}
                aria-label={`צפה בטסטימוניאל ${index + 1}`}
                disabled={isAnimating}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;