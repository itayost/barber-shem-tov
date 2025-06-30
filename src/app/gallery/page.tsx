// src/app/gallery/page.tsx
import { loadGalleryImages, getGalleryCategories, getCategoryLabels } from '@/utils/galleryUtils';
import { galleryCategories, GalleryCategory } from '@/lib/data';
import LuxuryGalleryPage from '@/components/gallery/LuxuryGalleryPage';
import { Metadata } from 'next';

// Generate metadata for the page
export const metadata: Metadata = {
  title: 'גלריה | The Fader Academy - תיעוד חיי האקדמיה',
  description:
    'צפו בתיעוד המרשים של חיי האקדמיה - מרגעים בלתי נשכחים, עבודות מופת של תלמידינו, והמרחב היוקרתי שלנו',
  openGraph: {
    title: 'גלריה | The Fader Academy',
    description: 'תיעוד חיי האקדמיה - מרגעים בלתי נשכחים ועד יצירות מופת',
    images: [{ url: '/images/og/gallery-og.jpg' }],
  },
};

export default function GalleryPage() {
  // Load images from the file system
  const images = loadGalleryImages();

  // Get categories - either from defined list or dynamically from folders
  const categoryIds = getGalleryCategories();
  const categoryLabels = getCategoryLabels();

  // Merge with defined categories to ensure we have all the metadata
  const categories: GalleryCategory[] = categoryIds
    .map(id => {
      const definedCategory = galleryCategories.find(cat => cat.id === id);
      if (definedCategory) {
        return definedCategory;
      }
      // For dynamic categories not in our defined list
      return {
        id,
        label: categoryLabels[id] || id,
        description: `תמונות מקטגוריית ${categoryLabels[id] || id}`,
        order: 999, // Put dynamic categories at the end
      };
    })
    .sort((a, b) => a.order - b.order);

  return <LuxuryGalleryPage images={images} categories={categories} />;
}
