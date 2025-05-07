// components/gallery/GalleryFilter.tsx
import React from 'react';
import Button from '@/components/common/Button';

interface GalleryFilterProps {
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
  categories: string[];
  categoryLabels: Record<string, string>;
}

const GalleryFilter: React.FC<GalleryFilterProps> = ({
  activeCategory,
  setActiveCategory,
  categories,
  categoryLabels
}) => {
  return (
    <section className="py-8 bg-charcoal border-t border-b border-lightgrey border-opacity-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            onClick={() => setActiveCategory(null)}
            variant={activeCategory === null ? 'primary' : 'secondary'}
            className="mb-2"
          >
            הכל
          </Button>
          
          {categories.map((category) => (
            <Button 
              key={category}
              onClick={() => setActiveCategory(category)}
              variant={activeCategory === category ? 'primary' : 'secondary'}
              className="mb-2"
            >
              {categoryLabels[category] || category}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryFilter;