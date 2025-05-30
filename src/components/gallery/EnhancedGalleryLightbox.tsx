// src/components/gallery/EnhancedGalleryLightbox.tsx
'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { GalleryImage, getCategoryLabel } from '@/lib/data';

interface EnhancedGalleryLightboxProps {
  image: GalleryImage | null;
  images: GalleryImage[];
  onClose: () => void;
  onNavigate: (image: GalleryImage) => void;
}

const EnhancedGalleryLightbox: React.FC<EnhancedGalleryLightboxProps> = ({ 
  image, 
  images,
  onClose,
  onNavigate
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigateNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % images.length;
    onNavigate(images[nextIndex]);
  }, [currentIndex, images, onNavigate]);

  const navigatePrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    onNavigate(images[prevIndex]);
  }, [currentIndex, images, onNavigate]);

  useEffect(() => {
    if (image) {
      const index = images.findIndex(img => img.id === image.id);
      setCurrentIndex(index !== -1 ? index : 0);
    }
  }, [image, images]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!image) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          navigatePrev();
          break;
        case 'ArrowRight':
          navigateNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, images, image, navigateNext, navigatePrev, onClose]);

  if (!image) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-charcoal/95 backdrop-blur-md z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        dir="rtl"
      >
        <div className="relative w-full h-full max-w-7xl mx-auto p-4 md:p-8 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <motion.h2 
                className="text-offwhite text-2xl font-bold mb-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {image.title}
              </motion.h2>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gold">{getCategoryLabel(image.category)}</span>
                {image.date && (
                  <span className="text-lightgrey">
                    {new Date(image.date).toLocaleDateString('he-IL')}
                  </span>
                )}
                <span className="text-lightgrey">
                  {currentIndex + 1} / {images.length}
                </span>
              </div>
            </div>

            {/* Close button */}
            <motion.button 
              className="text-offwhite hover:text-gold transition-colors p-2"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>

          {/* Main image container */}
          <div 
            className="flex-1 relative flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Navigation buttons */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-offwhite hover:text-gold transition-colors p-4 bg-charcoal/50 backdrop-blur-sm rounded-full z-10"
              onClick={(e) => {
                e.stopPropagation();
                navigatePrev();
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-offwhite hover:text-gold transition-colors p-4 bg-charcoal/50 backdrop-blur-sm rounded-full z-10"
              onClick={(e) => {
                e.stopPropagation();
                navigateNext();
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Image */}
            <motion.div 
              className="relative w-full h-full max-h-[70vh]"
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={image.src}
                alt={image.title}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-contain"
                priority
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  if (target.parentElement) {
                    target.parentElement.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center">
                        <div class="text-center">
                          <div class="text-6xl text-gold/50 mb-4"></div>
                          <div class="text-gold/50 text-xl">תמונה לא זמינה</div>
                        </div>
                      </div>
                    `;
                  }
                }}
              />
            </motion.div>
          </div>

          {/* Description and tags */}
          {(image.description || image.tags) && (
            <motion.div 
              className="mt-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {image.description && (
                <p className="text-lightgrey mb-2">{image.description}</p>
              )}
              {image.tags && image.tags.length > 0 && (
                <div className="flex justify-center gap-2">
                  {image.tags.map((tag, idx) => (
                    <span key={idx} className="text-gold text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Thumbnail strip */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {images.map((img, idx) => (
              <motion.button
                key={img.id}
                className={`relative w-20 h-16 flex-shrink-0 overflow-hidden ${
                  idx === currentIndex ? 'ring-2 ring-gold' : 'opacity-60 hover:opacity-100'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate(img);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EnhancedGalleryLightbox;