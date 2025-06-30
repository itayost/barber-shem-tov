'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Grid3X3, LayoutGrid, Square, Pause, Play, ZoomIn } from 'lucide-react';

// Types (matching your existing system)
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

interface GalleryPageClientProps {
  images: GalleryImage[];
}

// Reusable Luxury Components
const LuxuryButton = ({
  variant = 'primary',
  size = 'default',
  children,
  className = '',
  active = false,
  ...props
}) => {
  const baseClasses = 'group relative overflow-hidden font-light uppercase transition-all duration-500';

  const variants = {
    primary: 'bg-gold text-black hover:text-gold',
    secondary: `border ${active ? 'border-gold text-gold' : 'border-gold/30 text-offwhite hover:border-gold hover:text-gold'}`,
    ghost: `${active ? 'text-gold' : 'text-offwhite hover:text-gold'}`
  };

  const sizes = {
    small: 'px-4 py-2 text-xs tracking-[0.2em]',
    default: 'px-6 py-3 text-sm tracking-[0.2em]',
    large: 'px-10 py-4 text-base tracking-[0.3em]'
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-offwhite transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
      )}
    </button>
  );
};

// Luxury Section Component
const LuxurySection = ({
  children,
  className = '',
  size = 'default',
  bgColor = 'black'
}) => {
  const paddingSizes = {
    small: 'py-12 md:py-16',
    default: 'py-16 md:py-24',
    large: 'py-20 md:py-32',
    hero: 'py-24 md:py-40'
  };

  const bgColors = {
    black: 'bg-black',
    charcoal: 'bg-charcoal',
    'charcoal-dark': 'bg-charcoal-dark'
  };

  return (
    <section
      className={`${paddingSizes[size]} ${bgColors[bgColor]} ${className}`}
      dir="rtl"
    >
      {children}
    </section>
  );
};

// Main Gallery Component
const GalleryPageClient: React.FC<GalleryPageClientProps> = ({ images = [] }) => {
  // Import categories from your data
  const categories = [
    { id: 'experience', label: 'חוויות', description: 'רגעים בלתי נשכחים מתוך ההכשרה והעשייה', order: 1 },
    { id: 'space', label: 'המרחב', description: 'הסביבה המודרנית שלנו שמעצימה למידה ויצירה', order: 2 },
    { id: 'work', label: 'עבודות', description: 'תוצרים יצירתיים ומקצועיים של המשתתפים', order: 3 },
  ];
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get all categories including "All"
  const allCategories = useMemo(() => [
    { id: 'all', label: 'הכל', description: 'כל העבודות שלנו', order: 0 },
    ...categories,
  ], [categories]);

  // Filter images based on selected category
  const filteredImages = useMemo(() => {
    if (!selectedCategory || selectedCategory === 'all') {
      return images;
    }
    return images.filter(img => img.category === selectedCategory);
  }, [images, selectedCategory]);

  // Count images per category
  const imageCounts = useMemo(() => {
    const counts = { all: images.length };
    categories.forEach(cat => {
      counts[cat.id] = images.filter(img => img.category === cat.id).length;
    });
    return counts;
  }, [images, categories]);

  // Lightbox navigation
  const openLightbox = useCallback((image) => {
    const index = filteredImages.findIndex(img => img.id === image.id);
    setSelectedImage(image);
    setCurrentImageIndex(index);
    setIsPlaying(false);
  }, [filteredImages]);

  const navigate = useCallback((direction) => {
    const newIndex = direction === 'next'
      ? (currentImageIndex + 1) % filteredImages.length
      : (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;

    setCurrentImageIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  }, [currentImageIndex, filteredImages]);

  // Slideshow functionality
  useEffect(() => {
    if (!isPlaying || !selectedImage) return;

    const interval = setInterval(() => {
      navigate('next');
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying, selectedImage, navigate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;

      switch (e.key) {
        case 'Escape':
          setSelectedImage(null);
          break;
        case 'ArrowLeft':
          navigate('next'); // RTL reversed
          break;
        case 'ArrowRight':
          navigate('prev'); // RTL reversed
          break;
        case ' ':
          e.preventDefault();
          setIsPlaying(!isPlaying);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, navigate, isPlaying]);

  return (
    <>
      {/* Hero Section */}
      <LuxurySection size="hero" bgColor="black">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Label */}
            <p className="text-xs tracking-[0.3em] md:tracking-[0.5em] text-gold mb-4 md:mb-6 uppercase">
              גלריית עבודות
            </p>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-thin text-offwhite mb-4 md:mb-6">
              אמנות
              <span className="text-gold"> הספרות</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl lg:text-2xl font-light text-lightgrey max-w-3xl mx-auto">
              כל תספורת היא יצירת אמנות. כל לקוח הוא בד ציור חי
            </p>
          </motion.div>
        </div>
      </LuxurySection>

      {/* Filters Section */}
      <LuxurySection size="small" bgColor="charcoal-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12">
            {allCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <LuxuryButton
                  variant="secondary"
                  size="small"
                  active={selectedCategory === category.id}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.label}
                  <span className="ms-2 text-gold/70">
                    ({imageCounts[category.id] || 0})
                  </span>
                </LuxuryButton>
              </motion.div>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 md:p-3 border transition-all duration-300 ${viewMode === 'grid'
                  ? 'border-gold text-gold'
                  : 'border-gold/30 text-offwhite hover:border-gold hover:text-gold'
                }`}
              aria-label="תצוגת רשת"
            >
              <Grid3X3 className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              onClick={() => setViewMode('masonry')}
              className={`p-2 md:p-3 border transition-all duration-300 ${viewMode === 'masonry'
                  ? 'border-gold text-gold'
                  : 'border-gold/30 text-offwhite hover:border-gold hover:text-gold'
                }`}
              aria-label="תצוגת בנייה"
            >
              <LayoutGrid className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              onClick={() => setViewMode('minimal')}
              className={`p-2 md:p-3 border transition-all duration-300 ${viewMode === 'minimal'
                  ? 'border-gold text-gold'
                  : 'border-gold/30 text-offwhite hover:border-gold hover:text-gold'
                }`}
              aria-label="תצוגה מינימלית"
            >
              <Square className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </LuxurySection>

      {/* Gallery Grid */}
      <LuxurySection size="large" bgColor="black">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {filteredImages.length > 0 ? (
            <div
              className={`
                grid gap-px md:gap-0.5
                ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : ''}
                ${viewMode === 'masonry' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : ''}
                ${viewMode === 'minimal' ? 'grid-cols-1 md:grid-cols-2' : ''}
              `}
            >
              <AnimatePresence mode="popLayout">
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      duration: 0.5,
                      delay: Math.min(index * 0.02, 0.3),
                      layout: { duration: 0.4 }
                    }}
                    className={`
                      group relative cursor-pointer overflow-hidden
                      ${viewMode === 'grid' ? 'aspect-square' : ''}
                      ${viewMode === 'masonry' ? index % 3 === 0 ? 'row-span-2' : '' : ''}
                      ${viewMode === 'minimal' ? 'aspect-[4/3]' : ''}
                    `}
                    onClick={() => openLightbox(image)}
                  >
                    {/* Image */}
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />

                    {/* Luxury Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      {/* Featured Badge */}
                      {image.featured && (
                        <span className="absolute top-4 right-4 bg-gold text-black text-xs px-3 py-1 uppercase tracking-wider">
                          מומלץ
                        </span>
                      )}

                      {/* Category Label */}
                      <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">
                        {categories.find(cat => cat.id === image.category)?.label || image.category}
                      </p>

                      {/* Title */}
                      <h3 className="text-lg md:text-xl font-light text-offwhite mb-1">
                        {image.title}
                      </h3>

                      {/* View Icon */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 md:w-16 md:h-16 border border-gold/50 flex items-center justify-center">
                          <ZoomIn className="w-5 h-5 md:w-6 md:h-6 text-gold" />
                        </div>
                      </div>
                    </div>

                    {/* Border Effect */}
                    <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/20 transition-all duration-500" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            // Empty State
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-xl text-lightgrey mb-8">אין תמונות בקטגוריה זו</p>
              <LuxuryButton variant="secondary" onClick={() => setSelectedCategory('all')}>
                הצג את כל התמונות
              </LuxuryButton>
            </motion.div>
          )}
        </div>
      </LuxurySection>

      {/* CTA Section */}
      <LuxurySection size="default" bgColor="charcoal-dark">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs uppercase tracking-[0.5em] text-gold mb-6">
              רוצה להיות חלק מהגלריה?
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-thin text-offwhite mb-6">
              הזמן תור
              <span className="text-gold"> עכשיו</span>
            </h2>
            <p className="text-lg md:text-xl text-lightgrey mb-8 max-w-2xl mx-auto">
              כל לקוח שלנו מקבל תיעוד מקצועי של התוצאה הסופית. היה חלק מגלריית היצירות שלנו
            </p>
            <LuxuryButton variant="primary" size="large">
              קבע תור
            </LuxuryButton>
          </motion.div>
        </div>
      </LuxurySection>

      {/* Luxury Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 border border-gold/30 flex items-center justify-center hover:border-gold transition-all duration-300 z-10"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              aria-label="סגור"
            >
              <X className="w-5 h-5 md:w-6 md:h-6 text-offwhite" />
            </button>

            {/* Main Content */}
            <div className="h-full flex items-center justify-center p-4 md:p-8">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-7xl max-h-[90vh] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Image Container */}
                <div className="relative h-full flex items-center justify-center">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    className="max-w-full max-h-[80vh] object-contain"
                  />

                  {/* Navigation Arrows */}
                  <button
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 border border-gold/30 flex items-center justify-center hover:border-gold transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('prev');
                    }}
                    aria-label="הקודם"
                  >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-offwhite" />
                  </button>

                  <button
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 border border-gold/30 flex items-center justify-center hover:border-gold transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('next');
                    }}
                    aria-label="הבא"
                  >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-offwhite" />
                  </button>
                </div>

                {/* Info Panel */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 md:p-8"
                  dir="rtl"
                >
                  <div className="max-w-3xl">
                    {/* Category & Date */}
                    <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">
                      {categories.find(cat => cat.id === selectedImage.category)?.label || selectedImage.category}
                      {selectedImage.date && (
                        <span className="text-lightgrey">
                          {' '}• {new Date(selectedImage.date).toLocaleDateString('he-IL')}
                        </span>
                      )}
                    </p>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-light text-offwhite mb-2">
                      {selectedImage.title}
                    </h3>

                    {/* Description */}
                    {selectedImage.description && (
                      <p className="text-base md:text-lg text-lightgrey mb-4">
                        {selectedImage.description}
                      </p>
                    )}

                    {/* Tags */}
                    {selectedImage.tags && selectedImage.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {selectedImage.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-xs border border-gold/30 px-3 py-1 text-gold hover:border-gold transition-colors duration-300"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Controls */}
                  <div className="absolute top-4 left-4 flex items-center gap-4">
                    {/* Image Counter */}
                    <span className="text-xs text-lightgrey">
                      {currentImageIndex + 1} / {filteredImages.length}
                    </span>

                    {/* Slideshow Button */}
                    <button
                      className="w-8 h-8 border border-gold/30 flex items-center justify-center hover:border-gold transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPlaying(!isPlaying);
                      }}
                      aria-label={isPlaying ? 'עצור מצגת' : 'הפעל מצגת'}
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 text-offwhite" />
                      ) : (
                        <Play className="w-4 h-4 text-offwhite" />
                      )}
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom CSS for Masonry Layout */}
      <style jsx>{`
        @media (min-width: 768px) {
          .grid > *:nth-child(3n-2) {
            ${viewMode === 'masonry' ? 'grid-row: span 2;' : ''}
          }
        }
      `}</style>
    </>
  );
};

export default GalleryPageClient;
