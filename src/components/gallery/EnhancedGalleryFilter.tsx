// src/components/gallery/EnhancedGalleryFilter.tsx
'use client';

import React, { useState, useEffect } from 'react';
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
  const [navbarHeight, setNavbarHeight] = useState(60); // Default to scrolled height
  const totalImages = Object.values(imageCounts).reduce((sum, count) => sum + count, 0);

  // Detect navbar height dynamically
  useEffect(() => {
    const updateNavbarHeight = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        const height = navbar.getBoundingClientRect().height;
        setNavbarHeight(height);
      }
    };

    // Initial check
    updateNavbarHeight();

    // Listen for scroll to update when navbar changes
    const handleScroll = () => {
      updateNavbarHeight();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateNavbarHeight);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateNavbarHeight);
    };
  }, []);

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

      {/* Sticky Tab Navigation with dynamic top position */}
      <div 
        className="sticky z-20 bg-charcoal" 
        style={{ top: `${navbarHeight}px` }}
        dir="rtl"
      >
        <TabNavigation
          tabs={tabs}
          activeTab={currentActiveTab}
          onTabChange={handleTabChange}
          variant="pills" // Modern look
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