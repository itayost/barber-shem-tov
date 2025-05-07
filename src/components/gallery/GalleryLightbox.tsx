// components/gallery/GalleryLightbox.tsx
import React from 'react';
import Image from 'next/image';
import { GalleryImage } from '@/utils/galleryTypes';

interface GalleryLightboxProps {
  imageId: string;
  images: GalleryImage[];
  onClose: () => void;
  categoryLabels: Record<string, string>;
}

const GalleryLightbox: React.FC<GalleryLightboxProps> = ({ 
  imageId, 
  images,
  onClose,
  categoryLabels
}) => {
  // Find the selected image
  const selectedImage = images.find(img => img.id === imageId);
  
  if (!selectedImage) return null;
  
  // Prevent click propagation to avoid closing the lightbox when clicking the image
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  
  return (
    <div 
      className="fixed inset-0 bg-charcoal bg-opacity-95 z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div className="relative max-w-4xl w-full" onClick={handleContentClick}>
        {/* Close button */}
        <button 
          className="absolute top-4 right-4 text-offwhite hover:text-gold z-10"
          onClick={onClose}
          aria-label="Close lightbox"
        >
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        {/* Image */}
        <div className="aspect-video bg-brown bg-opacity-20 relative overflow-hidden">
          <Image
            src={selectedImage.src}
            alt={selectedImage.title}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-contain"
            priority
          />
        </div>
        
        {/* Title */}
        <div className="text-center mt-4">
          <h3 className="text-gold text-h4">{selectedImage.title}</h3>
          <p className="text-lightgrey">{categoryLabels[selectedImage.category] || selectedImage.category}</p>
        </div>
      </div>
    </div>
  );
};

export default GalleryLightbox;