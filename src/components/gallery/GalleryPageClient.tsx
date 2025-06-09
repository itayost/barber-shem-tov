// src/components/gallery/GalleryPageClient.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { GalleryImage, galleryCategories } from '@/lib/data';
import Hero from '@/components/common/Hero'; // Changed from GalleryHero
import EnhancedGalleryFilter from './EnhancedGalleryFilter';
import EnhancedGalleryGrid from './EnhancedGalleryGrid';
import EnhancedGalleryLightbox from './EnhancedGalleryLightbox';
import GalleryBottomCTA from './GalleryBottomCTA';

interface GalleryPageClientProps {
  images: GalleryImage[];
}

const GalleryPageClient: React.FC<GalleryPageClientProps> = ({ images }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Calculate image counts by category
  const imageCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    
    // Initialize all categories with 0
    galleryCategories.forEach(cat => {
      counts[cat.id] = 0;
    });
    
    // Count images
    images.forEach(img => {
      if (counts[img.category] !== undefined) {
        counts[img.category]++;
      }
    });
    
    return counts;
  }, [images]);

  // Filter images based on active category
  const filteredImages = useMemo(() => {
    if (!activeCategory) return images;
    return images.filter(img => img.category === activeCategory);
  }, [images, activeCategory]);

  // Handle image selection for lightbox
  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  // Handle lightbox navigation
  const handleLightboxNavigate = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  // Handle lightbox close
  const handleLightboxClose = () => {
    setSelectedImage(null);
  };

  return (
    <>
      {/* Hero Section using Common Hero Component */}
      <Hero
        title={<>גלריה <span className="text-gold">האקדמיה</span></>}
        subtitle="תיעוד חיי האקדמיה"
        backgroundImage="/images/hero/gallery-hero.jpg"
      />
      
      {/* Filter Section */}
      <EnhancedGalleryFilter
        categories={galleryCategories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        imageCounts={imageCounts}
      />
      
      {/* Gallery Grid */}
      <EnhancedGalleryGrid
        images={filteredImages}
        onImageClick={handleImageClick}
      />
      
      {/* Lightbox */}
      <EnhancedGalleryLightbox
        image={selectedImage}
        images={filteredImages}
        onClose={handleLightboxClose}
        onNavigate={handleLightboxNavigate}
      />
      
      {/* Bottom CTA */}
      <GalleryBottomCTA />
    </>
  );
};

export default GalleryPageClient;