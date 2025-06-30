'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuxurySection, LuxuryLabel, EditorialGrid, LuxuryButton } from '@/components/luxury';
import { X, ChevronLeft, ChevronRight, Grid3X3, Maximize2 } from 'lucide-react';

// Import types from your existing system
interface GalleryImage {
  id: string;
  category: string;
  title: string;
  src: string;
  description?: string;
  featured?: boolean;
  order?: number;
  date?: string;
  tags?: string[];
}

interface GalleryCategory {
  id: string;
  label: string;
  description: string;
  order: number;
}

interface LuxuryGalleryPageProps {
  images: GalleryImage[];
  categories: GalleryCategory[];
}

const LuxuryGalleryPage: React.FC<LuxuryGalleryPageProps> = ({ images, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');

  // Get all categories including "All"
  const allCategories = [
    { id: 'all', label: 'הכל', description: 'כל העבודות שלנו', order: 0 },
    ...categories,
  ];

  // Filter images based on selected category
  const filteredImages = useMemo(() => {
    if (!selectedCategory || selectedCategory === 'all') {
      return images;
    }
    return images.filter(img => img.category === selectedCategory);
  }, [images, selectedCategory]);

  // Count images per category
  const imageCounts = useMemo(() => {
    const counts: Record<string, number> = { all: images.length };
    categories.forEach(cat => {
      counts[cat.id] = images.filter(img => img.category === cat.id).length;
    });
    return counts;
  }, [images, categories]);

  // Handle lightbox navigation
  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    setCurrentIndex(filteredImages.findIndex(img => img.id === image.id));
  };

  const navigate = (direction: 'prev' | 'next') => {
    const newIndex =
      direction === 'next'
        ? (currentIndex + 1) % filteredImages.length
        : (currentIndex - 1 + filteredImages.length) % filteredImages.length;

    setCurrentIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-black overflow-hidden">
        {/* Background with subtle animation */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
          <motion.div
            className="absolute inset-0 bg-gradient-radial from-gold/5 to-transparent"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 text-center" dir="rtl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <LuxuryLabel size="sm" className="mb-6">
              PORTFOLIO
            </LuxuryLabel>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-thin text-offwhite mb-6">
              גלריית
              <span className="text-gold"> האקדמיה</span>
            </h1>

            <p className="text-xl text-lightgrey max-w-2xl mx-auto">
              תיעוד חיי האקדמיה - מרגעים בלתי נשכחים ועד יצירות מופת
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Controls Section */}
      <section
        className="bg-charcoal-dark py-6 sticky top-20 z-30 border-y border-gold/10"
        dir="rtl"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {allCategories.map(category => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id === 'all' ? null : category.id)}
                  className={`
                    px-6 py-3 text-xs uppercase tracking-[0.2em]
                    transition-all duration-500 relative overflow-hidden group
                    ${
                      selectedCategory === category.id ||
                      (!selectedCategory && category.id === 'all')
                        ? 'bg-gold text-black'
                        : 'border border-gold/30 text-offwhite hover:border-gold'
                    }
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">
                    {category.label} ({imageCounts[category.id] || 0})
                  </span>
                  {/* Hover effect */}
                  {!(
                    selectedCategory === category.id ||
                    (!selectedCategory && category.id === 'all')
                  ) && (
                    <div className="absolute inset-0 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
                  )}
                </motion.button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`
                  p-3 transition-all duration-300
                  ${
                    viewMode === 'grid'
                      ? 'bg-gold text-black'
                      : 'border border-gold/30 text-offwhite hover:border-gold'
                  }
                `}
                aria-label="תצוגת רשת"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('masonry')}
                className={`
                  p-3 transition-all duration-300
                  ${
                    viewMode === 'masonry'
                      ? 'bg-gold text-black'
                      : 'border border-gold/30 text-offwhite hover:border-gold'
                  }
                `}
                aria-label="תצוגת מייסונרי"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Category Description */}
          {selectedCategory && selectedCategory !== 'all' && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-lightgrey text-center lg:text-right mt-4"
            >
              {categories.find(cat => cat.id === selectedCategory)?.description}
            </motion.p>
          )}
        </div>
      </section>

      {/* Gallery Grid */}
      <LuxurySection size="large" bgColor="black" containerWidth="wide">
        {viewMode === 'grid' ? (
          <EditorialGrid columns={3} gap="small" mobileColumns={1} tabletColumns={2}>
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.02 }}
                  className="group cursor-pointer"
                  onClick={() => openLightbox(image)}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />

                    {/* Luxury Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Info on Hover */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {image.featured && (
                        <span className="absolute top-4 right-4 bg-gold text-black text-xs px-3 py-1 uppercase tracking-wider">
                          מומלץ
                        </span>
                      )}
                      <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">
                        {categories.find(cat => cat.id === image.category)?.label}
                      </p>
                      <h3 className="text-xl font-light text-offwhite">{image.title}</h3>
                      {image.tags && image.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {image.tags.slice(0, 2).map((tag, idx) => (
                            <span key={idx} className="text-xs text-lightgrey">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Border */}
                    <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/20 transition-all duration-500" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </EditorialGrid>
        ) : (
          // Masonry Layout
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.02 }}
                  className="break-inside-avoid mb-4 group cursor-pointer"
                  onClick={() => openLightbox(image)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Same overlay effects as grid */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <h3 className="text-lg font-light text-offwhite">{image.title}</h3>
                    </div>

                    <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/20 transition-all duration-500" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Load More Button (if needed) */}
        {filteredImages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl text-lightgrey mb-8">אין תמונות בקטגוריה זו</p>
            <LuxuryButton variant="outline" onClick={() => setSelectedCategory(null)}>
              הצג את כל התמונות
            </LuxuryButton>
          </motion.div>
        )}
      </LuxurySection>

      {/* Luxury Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 w-12 h-12 border border-gold/30 flex items-center justify-center hover:border-gold hover:bg-gold hover:text-black transition-all duration-500 z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation */}
            {filteredImages.length > 1 && (
              <>
                <button
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 border border-gold/30 flex items-center justify-center hover:border-gold hover:bg-gold hover:text-black transition-all duration-500"
                  onClick={e => {
                    e.stopPropagation();
                    navigate('prev');
                  }}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 border border-gold/30 flex items-center justify-center hover:border-gold hover:bg-gold hover:text-black transition-all duration-500"
                  onClick={e => {
                    e.stopPropagation();
                    navigate('next');
                  }}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-[90vw] max-h-[85vh] relative"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-w-full max-h-[85vh] object-contain"
              />

              {/* Image Info Overlay */}
              <div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-8"
                dir="rtl"
              >
                <div className="max-w-3xl">
                  <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">
                    {categories.find(cat => cat.id === selectedImage.category)?.label}
                    {selectedImage.date && (
                      <span className="text-lightgrey">
                        {' '}
                        • {new Date(selectedImage.date).toLocaleDateString('he-IL')}
                      </span>
                    )}
                  </p>
                  <h3 className="text-3xl font-light text-offwhite mb-2">{selectedImage.title}</h3>
                  {selectedImage.description && (
                    <p className="text-lightgrey mb-4">{selectedImage.description}</p>
                  )}
                  {selectedImage.tags && selectedImage.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedImage.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs border border-gold/30 px-3 py-1 text-gold"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Image Counter */}
                <div className="absolute top-4 right-4 text-xs text-lightgrey">
                  {currentIndex + 1} / {filteredImages.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LuxuryGalleryPage;
