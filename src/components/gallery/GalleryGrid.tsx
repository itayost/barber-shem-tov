// components/gallery/GalleryGrid.tsx
import React from 'react';
import GalleryItem from './GalleryItem';

interface GalleryImage {
  id: string;
  category: string;
  title: string;
  src: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (id: string) => void;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ images, onImageClick }) => {
  return (
    <section className="py-section-mobile md:py-section bg-charcoal">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <GalleryItem 
              key={image.id} 
              image={image} 
              onClick={() => onImageClick(image.id)} 
            />
          ))}
        </div>

        {/* If no results are found */}
        {images.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lightgrey">No gallery images found for this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default GalleryGrid;