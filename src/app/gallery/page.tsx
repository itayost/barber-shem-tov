// src/app/gallery/page.tsx
import { loadGalleryImages } from '@/utils/galleryUtils';
import GalleryPageClient from '@/components/gallery/GalleryPageClient';
import WhatsAppFloat from '@/components/common/WhatsAppFloat';
import { Metadata } from 'next';

// Generate metadata for the page
export const metadata: Metadata = {
  title: 'גלריה | The Fader - אקדמיה לספרות',
  description: 'צפו בכיתות הלימוד המודרניות, עבודות הסטודנטים המרשימות, וסיפורי ההצלחה של הבוגרים שלנו',
  openGraph: {
    title: 'גלריה | The Fader - אקדמיה לספרות',
    description: 'צפו בכיתות הלימוד המודרניות, עבודות הסטודנטים המרשימות, וסיפורי ההצלחה של הבוגרים שלנו',
    images: [{ url: '/images/og/gallery-og.jpg' }],
  },
};

export default function GalleryPage() {
  // Load images on the server
  const images = loadGalleryImages();
  
  return (
    <>
      <GalleryPageClient images={images} />
      <WhatsAppFloat />
    </>
  );
}