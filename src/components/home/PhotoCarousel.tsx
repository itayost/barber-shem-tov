'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GalleryImage } from '@/utils/galleryTypes';

interface PhotoCarouselProps {
  images: GalleryImage[];
  categoryLabels: Record<string, string>;
  count?: number;
  autoPlayInterval?: number;
}

const PhotoCarousel: React.FC<PhotoCarouselProps> = ({ 
  images,
  categoryLabels,
  count = 4,
  autoPlayInterval = 5000 
}) => {
  const [photos, setPhotos] = useState<GalleryImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  
  // Get random photos on component mount
  useEffect(() => {
    const getRandomPhotos = () => {
      // Make a copy of the gallery images array
      const shuffled = [...images].sort(() => 0.5 - Math.random());
      // Take the first 'count' images
      return shuffled.slice(0, Math.min(count, shuffled.length));
    };
    
    setPhotos(getRandomPhotos());
  }, [images, count]);

  // Auto-rotate carousel
  useEffect(() => {
    if (isHovering || photos.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, autoPlayInterval);
    
    return () => clearInterval(interval);
  }, [autoPlayInterval, photos.length, isHovering]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  if (photos.length === 0) {
    return (
      <section className="py-section-mobile md:py-section bg-charcoal" dir="rtl">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-heebo text-h3 md:text-h2 mb-6">הגלריה שלנו</h2>
            <p className="max-w-2xl mx-auto text-lightgrey">
              טוען תמונות...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-section-mobile md:py-section bg-charcoal" dir="rtl">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-heebo text-h3 md:text-h2 mb-6">הגלריה שלנו</h2>
          <p className="max-w-2xl mx-auto text-lightgrey">
            הצצה לאווירה, לעיצובים ולחוויה המיוחדת שאנו מציעים במספרה שלנו.
          </p>
        </div>

        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Main carousel container */}
          <div className="relative h-96 overflow-hidden rounded-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={photos[currentIndex]?.id || 'empty'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
              >
                {photos[currentIndex] && (
                  <div className="h-full w-full relative">
                    {/* Using DIV with background-image for better control */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ 
                        backgroundImage: `url(${photos[currentIndex].src})` 
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent"></div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            
            {/* Category and description overlay */}
            {photos[currentIndex] && (
              <div className="absolute bottom-0 w-full px-6 py-4 text-right">
                <div className="bg-charcoal/60 p-4 max-w-lg mr-auto ml-0">
                  <div className="text-lightgrey text-sm mb-1 uppercase tracking-wider">
                    {categoryLabels[photos[currentIndex].category] || photos[currentIndex].category}
                  </div>
                  <p className="text-gold text-h4">
                    {photos[currentIndex].title}
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {/* Navigation arrows */}
          {photos.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-charcoal/60 text-gold hover:bg-charcoal/90 transition-colors duration-300"
                aria-label="תמונה קודמת"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
    
              <button
                onClick={goToNext}
                className="absolute top-1/2 left-4 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-charcoal/60 text-gold hover:bg-charcoal/90 transition-colors duration-300"
                aria-label="תמונה הבאה"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </>
          )}
          
          {/* Navigation dots */}
          {photos.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index 
                    ? 'bg-gold w-6' 
                    : 'bg-lightgrey bg-opacity-30 hover:bg-opacity-50'
                    }`}
                  aria-label={`עבור לתמונה ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* View gallery link */}
        <div className="mt-8 text-center">
          <a 
            href="/gallery" 
            className="inline-block text-gold hover:underline transition-colors duration-200"
          >
            צפה בגלריה המלאה
          </a>
        </div>
      </div>
    </section>
  );
};

export default PhotoCarousel;