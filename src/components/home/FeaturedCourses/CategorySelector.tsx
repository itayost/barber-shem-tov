// src/components/home/FeaturedCourses/CategorySelector.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface Category {
  id: string;
  label: string;
}

interface CategorySelectorProps {
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ 
  categories, 
  activeCategory, 
  setActiveCategory 
}) => {
  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-3 mt-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {categories.map((category, index) => (
        <motion.button
          key={category.id}
          className={`px-5 py-2 rounded-sm text-sm transition-all duration-300 relative ${
            activeCategory === category.id
              ? 'text-charcoal font-medium'
              : 'bg-charcoal border border-lightgrey/20 text-lightgrey hover:border-gold/30 hover:text-gold'
          }`}
          onClick={() => setActiveCategory(category.id)}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index }}
        >
          {category.label}
          {activeCategory === category.id && (
            <motion.div 
              className="absolute inset-0 -z-10 bg-gold"
              layoutId="activeCategoryBackground"
              initial={false}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default CategorySelector;