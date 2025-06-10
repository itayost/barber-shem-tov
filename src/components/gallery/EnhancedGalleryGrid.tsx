// src/components/gallery/EnhancedGalleryGrid.tsx - Updated with key validation
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GalleryImage } from '@/lib/data';
import Image from 'next/image';

interface EnhancedGalleryGridProps {
  images: GalleryImage[];
  onImageClick: (image: GalleryImage) => void;
}

const EnhancedGalleryGrid: React.FC<EnhancedGalleryGridProps> = ({ 
  images, 
  onImageClick 
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.4,
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Validate and ensure unique keys
  const validImages = images.filter((image, index) => {
    if (!image.id) {
      console.error(`Image at index ${index} has no ID:`, image);
      return false;
    }
    return true;
  });

  // Check for duplicate IDs
  const seenIds = new Set<string>();
  const uniqueImages = validImages.filter((image) => {
    if (seenIds.has(image.id)) {
      console.error(`Duplicate image ID found: ${image.id}`);
      return false;
    }
    seenIds.add(image.id);
    return true;
  });

  return (
    <section className="py-16 bg-charcoal" dir="rtl">
      <div className="container mx-auto px-6">
        {uniqueImages.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {uniqueImages.map((image, index) => (
              <motion.div
                key={image.id || `gallery-image-${index}`} // Fallback key just in case
                variants={itemVariants}
                className="group relative cursor-pointer"
                onClick={() => onImageClick(image)}
                whileHover={{ y: -5 }}
              >
                {/* Image container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-brown/20">
                  {/* Featured badge */}
                  {image.featured && (
                    <div className="absolute top-4 right-4 bg-gold text-charcoal px-3 py-1 text-sm font-bold z-10">
                      מומלץ
                    </div>
                  )}

                  {/* Image */}
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      if (target.parentElement) {
                        target.parentElement.innerHTML = `
                          <div class="w-full h-full bg-brown/20 flex items-center justify-center">
                            <div class="text-center">
                              <div class="text-4xl text-gold/50 mb-2">📷</div>
                              <div class="text-gold/50 text-sm">תמונה בקרוב</div>
                            </div>
                          </div>
                        `;
                      }
                    }}
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-offwhite font-bold text-lg mb-2">
                        {image.title}
                      </h3>
                      {image.description && (
                        <p className="text-lightgrey text-sm line-clamp-2">
                          {image.description}
                        </p>
                      )}
                      {image.date && (
                        <p className="text-gold text-xs mt-2">
                          {new Date(image.date).toLocaleDateString('he-IL')}
                        </p>
                      )}
                    </div>

                    {/* View icon */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="bg-gold/20 backdrop-blur-sm rounded-full p-4 border border-gold/50">
                        <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                {image.tags && image.tags.length > 0 && (
                  <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                    {image.tags.slice(0, 2).map((tag, idx) => (
                      <span 
                        key={`${image.id}-tag-${idx}`} // Unique key for tags
                        className="bg-charcoal/80 backdrop-blur-sm text-gold text-xs px-2 py-1"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // Empty state
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-h3 mb-4">אין תמונות בקטגוריה זו</h3>
            <p className="text-lightgrey">נסה לבחור קטגוריה אחרת או חזור מאוחר יותר</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default EnhancedGalleryGrid;