// src/components/gallery/EnhancedGalleryFilter.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GalleryCategory } from '@/lib/data';

interface EnhancedGalleryFilterProps {
  categories: GalleryCategory[];
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
  imageCounts: Record<string, number>;
}

const EnhancedGalleryFilter: React.FC<EnhancedGalleryFilterProps> = ({
  categories,
  activeCategory,
  setActiveCategory,
  imageCounts
}) => {
  const totalImages = Object.values(imageCounts).reduce((sum, count) => sum + count, 0);

  return (
    <section className="py-8 bg-charcoal border-t border-b border-lightgrey/10 sticky top-16 z-20" dir="rtl">
      <div className="container mx-auto px-6">
        {/* Filter description */}
        <div className="text-center mb-6">
          <p className="text-lightgrey">
            {activeCategory ? (
              <>
                מציג: <span className="text-gold font-bold">
                  {categories.find(cat => cat.id === activeCategory)?.label}
                </span> ({imageCounts[activeCategory] || 0} תמונות)
              </>
            ) : (
              <>מציג את כל {totalImages} התמונות</>
            )}
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar px-1 py-2 whitespace-nowrap">
          <motion.button
            onClick={() => setActiveCategory(null)}
            className={`px-6 py-3 font-medium transition-all duration-300 border ${
              activeCategory === null
                ? 'bg-gold text-charcoal border-gold shadow-lg'
                : 'bg-transparent text-gold border-gold/50 hover:border-gold hover:bg-gold/10'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center gap-2">
              <span>🎨</span>
              <span>הכל</span>
              <span className="text-sm">({totalImages})</span>
            </span>
          </motion.button>

          {categories.map((category) => {
            const count = imageCounts[category.id] || 0;
            const isActive = activeCategory === category.id;

            return (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`shrink-0 px-6 py-3 font-medium transition-all duration-300 border relative overflow-hidden ${
                  isActive
                    ? 'bg-gold text-charcoal border-gold shadow-lg'
                    : 'bg-transparent text-gold border-gold/50 hover:border-gold hover:bg-gold/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={count === 0}
              >
                <span className={`flex items-center gap-2 ${count === 0 ? 'opacity-50' : ''}`}>
                  <span>{category.icon}</span>
                  <span>{category.label}</span>
                  <span className="text-sm">({count})</span>
                </span>

                {/* Active indicator animation */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gold -z-10"
                    layoutId="activeCategory"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Category description */}
        {activeCategory && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center mt-6"
          >
            <p className="text-lightgrey text-sm max-w-2xl mx-auto">
              {categories.find(cat => cat.id === activeCategory)?.description}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default EnhancedGalleryFilter;