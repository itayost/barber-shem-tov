// src/components/gallery/EnhancedGalleryFilter.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import TabNavigation, { Tab } from '@/components/common/TabNavigation';
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

  // Convert categories to tab format with unique IDs
  const tabs: Tab[] = [
    {
      id: 'all', // Unique ID
      label: 'הכל',
      count: totalImages
    },
    ...categories.map(category => ({
      id: category.id, // Ensure category IDs are unique
      label: category.label,
      count: imageCounts[category.id] || 0,
      // You can add icons based on category
      icon: category.id === 'experience' ? '✨' : 
            category.id === 'space' ? '🏢' : 
            category.id === 'work' ? '💇' : undefined
    }))
  ];

  const handleTabChange = (tabId: string) => {
    setActiveCategory(tabId === 'all' ? null : tabId);
  };

  const currentActiveTab = activeCategory || 'all';

  return (
    <>
      {/* Filter description */}
      <div className="bg-charcoal pt-8 pb-4" dir="rtl">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
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
          </motion.div>
        </div>
      </div>

      {/* Sticky Tab Navigation */}
      <div className="sticky top-16 z-20 bg-charcoal" dir="rtl">
        <TabNavigation
          tabs={tabs}
          activeTab={currentActiveTab}
          onTabChange={handleTabChange}
          variant="underline" // Clean filter style
          showCounts={true}
          fullWidth={true} // Spread across container
          animated={true}
          className="border-b border-lightgrey/20"
        />
      </div>

      {/* Category description */}
      {activeCategory && (
        <div className="bg-charcoal pb-4" dir="rtl">
          <div className="container mx-auto px-6">
            <motion.div
              key={`desc-${activeCategory}`} // Unique key for description
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center mt-4"
            >
              <p className="text-lightgrey text-sm max-w-2xl mx-auto">
                {categories.find(cat => cat.id === activeCategory)?.description}
              </p>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
};

export default EnhancedGalleryFilter;