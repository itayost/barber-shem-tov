'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
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
import Image from 'next/image';

// Types
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

// Mobile-First Luxury Button Component
interface LuxuryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'default' | 'large';
  children: React.ReactNode;
  active?: boolean;
}

const LuxuryButton: React.FC<LuxuryButtonProps> = ({
  variant = 'primary',
  size = 'default',
  children,
  className = '',
  active = false,
  ...props
}) => {
  const baseClasses =
    'group relative overflow-hidden font-light uppercase transition-all duration-300 touch-manipulation';

  const variants = {
    primary: 'bg-gold text-black hover:text-gold active:bg-gold-light',
    secondary: `border ${active ? 'border-gold text-gold' : 'border-gold/30 text-offwhite hover:border-gold hover:text-gold active:border-gold/50'}`,
    ghost: `${active ? 'text-gold' : 'text-offwhite hover:text-gold active:text-gold/80'}`,
  };

  // Mobile-first sizing
  const sizes = {
    small: 'px-3 py-2 text-xs sm:px-4 sm:py-2 tracking-wider sm:tracking-[0.2em]',
    default: 'px-4 py-2.5 text-sm sm:px-6 sm:py-3 tracking-wider sm:tracking-[0.2em]',
    large: 'px-6 py-3 text-base sm:px-10 sm:py-4 tracking-wider sm:tracking-[0.3em]',
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-offwhite transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right" />
      )}
    </button>
  );
};

// Mobile-First Luxury Section Component
interface LuxurySectionProps {
  children: React.ReactNode;
  className?: string;
  size?: 'small' | 'default' | 'large' | 'hero';
  bgColor?: 'black' | 'charcoal' | 'charcoal-dark';
}

const LuxurySection: React.FC<LuxurySectionProps> = ({
  children,
  className = '',
  size = 'default',
  bgColor = 'black',
}) => {
  // Mobile-first padding
  const paddingSizes = {
    small: 'py-8 sm:py-12 md:py-16',
    default: 'py-12 sm:py-16 md:py-24',
    large: 'py-16 sm:py-20 md:py-32',
    hero: 'py-20 sm:py-24 md:py-40',
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

// Main Gallery Component - Mobile First
const GalleryPageClient: React.FC<GalleryPageClientProps> = ({ images = [] }) => {
  // State
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [viewMode, setViewMode] = useState('grid');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Categories
  const categories: GalleryCategory[] = [
    { id: 'experience', label: 'חוויות', description: 'רגעים בלתי נשכחים', order: 1 },
    { id: 'space', label: 'המרחב', description: 'הסביבה המודרנית שלנו', order: 2 },
    { id: 'work', label: 'עבודות', description: 'תוצרים יצירתיים', order: 3 },
  ];

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile-first animation variants
  const itemVariants = {
    hidden: {
      opacity: 0,
      scale: isMobile ? 0.98 : 0.95,
      y: isMobile ? 10 : 20
    },
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.3 : 0.5,
        delay: isMobile ? index * 0.02 : index * 0.05,
        ease: "easeOut"
      }
    })
  };

  const heroVariants = {
    hidden: { opacity: 0, y: isMobile ? 20 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.5 : 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  // All categories including "All"
  const allCategories = useMemo(
    () => [{ id: 'all', label: 'הכל', description: 'כל העבודות שלנו', order: 0 }, ...categories],
    []
  );

  // Filter images
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

  // Lightbox functions
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

  // Slideshow
  useEffect(() => {
    if (!isPlaying || !selectedImage) return;

    const timer = setTimeout(() => {
      navigate('next');
    }, isMobile ? 4000 : 3000); // Slower on mobile

    return () => clearTimeout(timer);
  }, [isPlaying, selectedImage, navigate, isMobile]);

  // Keyboard navigation (desktop only)
  useEffect(() => {
    if (isMobile) return;

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
  }, [selectedImage, navigate, closeLightbox, isMobile]);

  return (
    <>
      {/* Hero Section - Mobile First */}
      <LuxurySection size="hero" bgColor="black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 text-center">
          <motion.div
            variants={prefersReducedMotion ? {} : heroVariants}
            initial={prefersReducedMotion ? {} : "hidden"}
            animate={prefersReducedMotion ? {} : "visible"}
          >
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.5em] text-gold mb-4 sm:mb-6">
              גלריית העבודות
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-thin text-offwhite mb-4 sm:mb-6">
              אמנות הספרות
              <span className="text-gold"> בפעולה</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-lightgrey max-w-3xl mx-auto">
              כל לקוח הוא בד ציור חי
            </p>
          </motion.div>
        </div>
      </LuxurySection>

      {/* Filters Section - Mobile Optimized */}
      <LuxurySection size="small" bgColor="charcoal-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          {/* Category Filters - Mobile scroll */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-12">
            {allCategories.map((category, index) => (
              <motion.div
                key={category.id}
                custom={index}
                variants={prefersReducedMotion ? {} : itemVariants}
                initial={prefersReducedMotion ? {} : "hidden"}
                animate={prefersReducedMotion ? {} : "visible"}
              >
                <LuxuryButton
                  variant="secondary"
                  size="small"
                  active={selectedCategory === category.id}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.label}
                  <span className="ms-1 sm:ms-2 text-gold/70 text-[10px] sm:text-xs">
                    ({imageCounts[category.id] || 0})
                  </span>
                </LuxuryButton>
              </motion.div>
            ))}
          </div>

          {/* View Mode Toggle - Touch optimized */}
          <div className="flex justify-center gap-1 sm:gap-2">
            {[
              { mode: 'grid', icon: Grid3X3, label: 'תצוגת רשת' },
              { mode: 'masonry', icon: LayoutGrid, label: 'תצוגת בנייה' },
              { mode: 'minimal', icon: Square, label: 'תצוגה מינימלית' },
            ].map(({ mode, icon: Icon, label }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`p-3 sm:p-3 md:p-3 min-w-[44px] min-h-[44px] border transition-all duration-300 touch-manipulation ${viewMode === mode ? 'border-gold text-gold' : 'border-gold/30 text-offwhite hover:border-gold hover:text-gold active:border-gold/50'}`}
                aria-label={label}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            ))}
          </div>
        </div>
      </LuxurySection>

      {/* Gallery Grid - Mobile First */}
      <LuxurySection size="large" bgColor="black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          {filteredImages.length > 0 ? (
            <div
              className={`grid gap-0.5 sm:gap-px md:gap-0.5 ${viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  : viewMode === 'masonry'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto'
                    : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'
                }`}
            >
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  custom={index}
                  variants={prefersReducedMotion ? {} : itemVariants}
                  initial={prefersReducedMotion ? {} : "hidden"}
                  animate={prefersReducedMotion ? {} : "visible"}
                  className={`relative overflow-hidden cursor-pointer group touch-manipulation ${viewMode === 'grid' ? 'aspect-[3/4]' : ''} ${viewMode === 'minimal' ? 'aspect-square' : ''}`}
                  onClick={() => openLightbox(image)}
                >
                  {/* Mobile-optimized image */}
                  <Image
                    src={image.src}
                    alt={image.title}
                    width={viewMode === 'minimal' ? 300 : 600}
                    height={viewMode === 'minimal' ? 300 : 800}
                    className="w-full h-full object-cover transition-transform duration-500 sm:duration-700 group-hover:scale-105"
                    quality={isMobile ? 60 : 75}
                    loading="lazy"
                  />

                  {/* Mobile-friendly overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 sm:duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6" dir="rtl">
                      <p className="text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-[0.2em] text-gold mb-1 sm:mb-2">
                        {categories.find(cat => cat.id === image.category)?.label || image.category}
                      </p>
                      <h3 className="text-sm sm:text-base md:text-xl font-light text-offwhite">
                        {image.title}
                      </h3>
                    </div>
                  </div>

                  {/* Hover Icon - Desktop only */}
                  {!isMobile && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <ZoomIn className="w-8 h-8 text-offwhite" />
                    </div>
                  )}

                  {/* Border Effect */}
                  <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 transition-all duration-300 sm:duration-500" />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 sm:py-20">
              <p className="text-lg sm:text-xl text-lightgrey">לא נמצאו תמונות בקטגוריה זו</p>
            </div>
          )}
        </div>
      </LuxurySection>

      {/* Lightbox - Mobile Optimized */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-4 md:p-8">
              {/* Close Button - Touch friendly */}
              <button
                className="absolute top-2 right-2 sm:top-4 sm:right-4 md:top-8 md:right-8 w-12 h-12 sm:w-12 sm:h-12 min-w-[44px] min-h-[44px] border border-gold/30 flex items-center justify-center hover:border-gold active:border-gold-light transition-all duration-300 z-50 touch-manipulation"
                onClick={closeLightbox}
                aria-label="סגור"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-offwhite" />
              </button>

              {/* Main Content */}
              <motion.div
                initial={{ scale: isMobile ? 0.95 : 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: isMobile ? 0.95 : 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-7xl mx-auto w-full h-full flex items-center justify-center"
                onClick={e => e.stopPropagation()}
              >
                {/* Image Container */}
                <div className="relative w-full h-full max-h-[70vh] sm:max-h-[80vh] flex items-center justify-center">
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    width={1200}
                    height={800}
                    className="max-w-full max-h-full object-contain"
                    quality={isMobile ? 70 : 85}
                    priority
                  />

                  {/* Navigation Buttons - Touch optimized */}
                  <button
                    className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-12 sm:h-12 min-w-[44px] min-h-[44px] border border-gold/30 flex items-center justify-center hover:border-gold active:border-gold-light transition-all duration-300 touch-manipulation"
                    onClick={e => {
                      e.stopPropagation();
                      navigate('prev');
                    }}
                    aria-label="הקודם"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-offwhite" />
                  </button>

                  <button
                    className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-12 sm:h-12 min-w-[44px] min-h-[44px] border border-gold/30 flex items-center justify-center hover:border-gold active:border-gold-light transition-all duration-300 touch-manipulation"
                    onClick={e => {
                      e.stopPropagation();
                      navigate('next');
                    }}
                    aria-label="הבא"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-offwhite" />
                  </button>
                </div>

                {/* Info Panel - Mobile optimized */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 sm:p-6 md:p-8"
                  dir="rtl"
                >
                  <div className="max-w-3xl">
                    {/* Category & Date */}
                    <p className="text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-[0.3em] text-gold mb-2 sm:mb-3">
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
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-thin text-offwhite mb-2">
                      {selectedImage.title}
                    </h3>

                    {/* Description - Hide on small mobile */}
                    {selectedImage.description && (
                      <p className="hidden sm:block text-sm sm:text-base md:text-lg text-lightgrey mb-4">
                        {selectedImage.description}
                      </p>
                    )}

                    {/* Tags - Mobile scroll */}
                    {selectedImage.tags && selectedImage.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {selectedImage.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] sm:text-xs border border-gold/30 px-2 py-1 sm:px-3 text-gold hover:border-gold transition-colors duration-300"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Controls - Mobile friendly */}
                  <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex items-center gap-2 sm:gap-4">
                    {/* Image Counter */}
                    <span className="text-[10px] sm:text-xs text-lightgrey">
                      {currentImageIndex + 1} / {filteredImages.length}
                    </span>

                    {/* Slideshow Button */}
                    <button
                      className="w-8 h-8 sm:w-8 sm:h-8 min-w-[32px] min-h-[32px] border border-gold/30 flex items-center justify-center hover:border-gold active:border-gold-light transition-all duration-300 touch-manipulation"
                      onClick={e => {
                        e.stopPropagation();
                        setIsPlaying(!isPlaying);
                      }}
                      aria-label={isPlaying ? 'עצור מצגת' : 'הפעל מצגת'}
                    >
                      {isPlaying ? (
                        <Pause className="w-3 h-3 sm:w-4 sm:h-4 text-offwhite" />
                      ) : (
                        <Play className="w-3 h-3 sm:w-4 sm:h-4 text-offwhite" />
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
        @media (min-width: 640px) {
          .grid > *:nth-child(3n-2) {
            ${viewMode === 'masonry' ? 'grid-row: span 2;' : ''}
          }
        }
      `}</style>
    </>
  );
};

export default GalleryPageClient;
