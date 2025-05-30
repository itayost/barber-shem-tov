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

  // Convert categories to tab format
  const tabs: Tab[] = [
    {
      id: 'all',
      label: 'הכל',
      icon: '🎨',
      count: totalImages
    },
    ...categories.map(category => ({
      id: category.id,
      label: category.label,
      icon: category.icon,
      count: imageCounts[category.id] || 0
    }))
  ];

  const handleTabChange = (tabId: string) => {
    setActiveCategory(tabId === 'all' ? null : tabId);
  };

  const currentActiveTab = activeCategory || 'all';

  return (
    <>
      {/* Filter description - separate from sticky container */}
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
      <div className="sticky top-16 z-20" dir="rtl">
        <TabNavigation
          tabs={tabs}
          activeTab={currentActiveTab}
          onTabChange={handleTabChange}
          sticky={false} // Set to false since we're handling sticky at parent level
          showCounts={true}
          variant="compact"
        />
      </div>

      {/* Category description */}
      {activeCategory && (
        <div className="bg-charcoal pb-4" dir="rtl">
          <div className="container mx-auto px-6">
            <motion.div
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