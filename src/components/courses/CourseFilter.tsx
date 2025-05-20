// src/components/courses/CourseFilter.tsx
import React from 'react';
import Button from '@/components/common/Button';

interface CourseFilterProps {
  categories: Array<{
    id: string;
    label: string;
  }>;
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
}

const CourseFilter: React.FC<CourseFilterProps> = ({ 
  categories, 
  activeCategory, 
  setActiveCategory 
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
            כל הקורסים
          </Button>
          
          {categories.map((category) => (
            <Button 
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              variant={activeCategory === category.id ? 'primary' : 'secondary'}
              className="mb-2"
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseFilter;