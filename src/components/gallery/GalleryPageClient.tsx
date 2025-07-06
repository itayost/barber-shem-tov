'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  LayoutGrid,
  Square,
  Pause,
  Play,
  ZoomIn,
} from 'lucide-react';

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

// Button Props Interface
interface LuxuryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'default' | 'large';
  children: React.ReactNode;
  active?: boolean;
}

// Section Props Interface
interface LuxurySectionProps {
  children: React.ReactNode;
  className?: string;
  size?: 'small' | 'default' | 'large' | 'hero';
  bgColor?: 'black' | 'charcoal' | 'charcoal-dark';
}

// Reusable Luxury Components
const LuxuryButton: React.FC<LuxuryButtonProps> = ({
  variant = 'primary',
  size = 'default',
  children,
  className = '',
  active = false,
  ...props
}) => {
  const baseClasses =
    'group relative overflow-hidden font-light uppercase transition-all duration-500';

  const variants = {
    primary: 'bg-gold text-black hover:text-gold',
    secondary: `border ${active ? 'border-gold text-gold' : 'border-gold/30 text-offwhite hover:border-gold hover:text-gold'}`,
    ghost: `${active ? 'text-gold' : 'text-offwhite hover:text-gold'}`,
  };

  const sizes = {
    small: 'px-4 py-2 text-xs tracking-[0.2em]',
    default: 'px-6 py-3 text-sm tracking-[0.2em]',
    large: 'px-10 py-4 text-base tracking-[0.3em]',
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
const LuxurySection: React.FC<LuxurySectionProps> = ({
  children,
  className = '',
  size = 'default',
  bgColor = 'black',
}) => {
  const paddingSizes = {
    small: 'py-12 md:py-16',
    default: 'py-16 md:py-24',
    large: 'py-20 md:py-32',
    hero: 'py-24 md:py-40',
  };

  const bgColors = {
    black: 'bg-black',
    charcoal: 'bg-charcoal',
    'charcoal-dark': 'bg-charcoal-dark',
  };

  return (
    <section className={`${paddingSizes[size]} ${bgColors[bgColor]} ${className}`} dir="rtl">
      {children}
    </section>
  );
};

// Main Gallery Component
const GalleryPageClient: React.FC<GalleryPageClientProps> = ({ images = [] }) => {
  // Import categories from your data
  const categories: GalleryCategory[] = [
    {
      id: 'experience',
      label: 'חוויות',
      description: 'רגעים בלתי נשכחים מתוך ההכשרה והעשייה',
      order: 1,
    },
    {
      id: 'space',
      label: 'המרחב',
      description: 'הסביבה המודרנית שלנו שמעצימה למידה ויצירה',
      order: 2,
    },
    { id: 'work', label: 'עבודות', description: 'תוצרים יצירתיים ומקצועיים של המשתתפים', order: 3 },
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [viewMode, setViewMode] = useState('grid');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get all categories including "All"
  const allCategories = useMemo(
    () => [{ id: 'all', label: 'הכל', description: 'כל העבודות שלנו', order: 0 }, ...categories],
    []
  );

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
  }, [images]);

  // Lightbox navigation
  const openLightbox = useCallback(
    (image: GalleryImage) => {
      const index = filteredImages.findIndex(img => img.id === image.id);
      setSelectedImage(image);
      setCurrentImageIndex(index);
      setIsPlaying(false);
    },
    [filteredImages]
  );

  const navigate = useCallback(
    (direction: 'next' | 'prev') => {
      const newIndex =
        direction === 'next'
          ? (currentImageIndex + 1) % filteredImages.length
          : (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;

      setSelectedImage(filteredImages[newIndex]);
      setCurrentImageIndex(newIndex);
    },
    [currentImageIndex, filteredImages]
  );

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
    setIsPlaying(false);
  }, []);

  // Slideshow functionality
  useEffect(() => {
    if (!isPlaying || !selectedImage) return;

    const timer = setTimeout(() => {
      navigate('next');
    }, 3000);

    return () => clearTimeout(timer);
  }, [isPlaying, selectedImage, navigate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;

      switch (e.key) {
        case 'ArrowLeft':
          navigate('prev');
          break;
        case 'ArrowRight':
          navigate('next');
          break;
        case 'Escape':
          closeLightbox();
          break;
        case ' ':
          e.preventDefault();
          setIsPlaying(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, navigate, closeLightbox]);

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
            <p className="text-xs uppercase tracking-[0.3em] md:tracking-[0.5em] text-gold mb-6">
              גלריית העבודות
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-thin text-offwhite mb-6">
              אמנות הספרות
              <span className="text-gold"> בפעולה</span>
            </h1>
            <p className="text-lg md:text-xl text-lightgrey max-w-3xl mx-auto">
              כל לקוח הוא בד ציור חי
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
                  <span className="ms-2 text-gold/70">({imageCounts[category.id] || 0})</span>
                </LuxuryButton>
              </motion.div>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 md:p-3 border transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'border-gold text-gold'
                  : 'border-gold/30 text-offwhite hover:border-gold hover:text-gold'
              }`}
              aria-label="תצוגת רשת"
            >
              <Grid3X3 className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              onClick={() => setViewMode('masonry')}
              className={`p-2 md:p-3 border transition-all duration-300 ${
                viewMode === 'masonry'
                  ? 'border-gold text-gold'
                  : 'border-gold/30 text-offwhite hover:border-gold hover:text-gold'
              }`}
              aria-label="תצוגת בנייה"
            >
              <LayoutGrid className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              onClick={() => setViewMode('minimal')}
              className={`p-2 md:p-3 border transition-all duration-300 ${
                viewMode === 'minimal'
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
                ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                    : viewMode === 'masonry'
                      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto'
                      : 'grid-cols-1 md:grid-cols-4 lg:grid-cols-6'
                }
              `}
            >
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`
                    relative overflow-hidden cursor-pointer group
                    ${viewMode === 'grid' ? 'aspect-[3/4]' : ''}
                    ${viewMode === 'minimal' ? 'aspect-square' : ''}
                  `}
                  onClick={() => openLightbox(image)}
                >
                  {/* Image */}
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6" dir="rtl">
                      <p className="text-xs uppercase tracking-[0.2em] text-gold mb-2">
                        {categories.find(cat => cat.id === image.category)?.label || image.category}
                      </p>
                      <h3 className="text-lg md:text-xl font-light text-offwhite">{image.title}</h3>
                    </div>
                  </div>

                  {/* Hover Icon */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ZoomIn className="w-8 h-8 text-offwhite" />
                  </div>

                  {/* Border Effect */}
                  <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 transition-all duration-500" />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-lightgrey">לא נמצאו תמונות בקטגוריה זו</p>
            </div>
          )}
        </div>
      </LuxurySection>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <div className="relative w-full h-full flex items-center justify-center p-4 md:p-8">
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 border border-gold/30 flex items-center justify-center hover:border-gold transition-all duration-300 z-50"
                onClick={closeLightbox}
                aria-label="סגור"
              >
                <X className="w-5 h-5 md:w-6 md:h-6 text-offwhite" />
              </button>

              {/* Main Content */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-7xl mx-auto w-full h-full flex items-center justify-center"
                onClick={e => e.stopPropagation()}
              >
                {/* Image Container */}
                <div className="relative w-full h-full max-h-[80vh] flex items-center justify-center">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    className="max-w-full max-h-full object-contain"
                  />

                  {/* Navigation Buttons */}
                  <button
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 border border-gold/30 flex items-center justify-center hover:border-gold transition-all duration-300"
                    onClick={e => {
                      e.stopPropagation();
                      navigate('prev');
                    }}
                    aria-label="הקודם"
                  >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-offwhite" />
                  </button>

                  <button
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 border border-gold/30 flex items-center justify-center hover:border-gold transition-all duration-300"
                    onClick={e => {
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
                      {categories.find(cat => cat.id === selectedImage.category)?.label ||
                        selectedImage.category}
                      {selectedImage.date && (
                        <span className="text-lightgrey">
                          {' '}
                          • {new Date(selectedImage.date).toLocaleDateString('he-IL')}
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
                      onClick={e => {
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
