'use client';
// components/gallery/GalleryClientWrapper.tsx
import { useState } from 'react';
import GalleryPageHeader from '@/components/gallery/GalleryPageHeader';
import GalleryFilter from '@/components/gallery/GalleryFilter';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import GalleryFooter from '@/components/gallery/GalleryFooter';
import GalleryLightbox from '@/components/gallery/GalleryLightbox';
import { GalleryImage } from '@/utils/galleryTypes';

interface GalleryClientWrapperProps {
  initialImages: GalleryImage[];
  categories: string[];
  categoryLabels: Record<string, string>;
}

export default function GalleryClientWrapper({
  initialImages,
  categories,
  categoryLabels
}: GalleryClientWrapperProps) {
  // State for category filter
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  // State for lightbox
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  
  // Filter images based on selected category
  const filteredImages = activeCategory 
    ? initialImages.filter(image => image.category === activeCategory)
    : initialImages;

  return (
    <>
      <GalleryPageHeader />
      
      <GalleryFilter 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory}
        categories={categories}
        categoryLabels={categoryLabels}
      />
      
      <GalleryGrid 
        images={filteredImages} 
        onImageClick={imageId => setLightboxImage(imageId)} 
      />
      
      <GalleryFooter />
      
      {lightboxImage && (
        <GalleryLightbox 
          imageId={lightboxImage} 
          images={initialImages}
          onClose={() => setLightboxImage(null)} 
          categoryLabels={categoryLabels}
        />
      )}
    </>
  );
}