// components/gallery/GalleryItem.tsx
import React from 'react';
import { GalleryImage } from '@/utils/galleryTypes';

interface GalleryItemProps {
  image: GalleryImage;
  onClick: () => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ image, onClick }) => {
  return (
    <div 
      className="aspect-[4/3] bg-brown bg-opacity-20 relative group cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      {/* Use standard img tag instead of Next.js Image for simplicity */}
      <img
        src={image.src}
        alt={image.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-charcoal bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
        <p className="text-offwhite font-playfair text-h4">{image.title}</p>
      </div>
    </div>
  );
};

export default GalleryItem;