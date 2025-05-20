// src/components/academy/FAQSection/CategoryTabs.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CategoryTabsProps {
  categories: string[];
  categoryLabels: Record<string, string>;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  categoryLabels,
  activeCategory,
  setActiveCategory
}) => {
  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-2 mb-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`px-4 py-2 rounded-sm text-sm transition-all duration-300 ${
            activeCategory === category
              ? 'bg-gold text-charcoal font-medium'
              : 'bg-charcoal border border-lightgrey/20 text-lightgrey hover:border-gold/30 hover:text-gold'
          }`}
        >
          {categoryLabels[category] || category}
        </button>
      ))}
    </motion.div>
  );
};

export default CategoryTabs;