// src/app/gallery/page.tsx
import { loadGalleryImages } from '@/utils/galleryUtils';
import GalleryPageClient from '@/components/gallery/GalleryPageClient';
import { metadata as pageMetadata } from './metadata';

// Export metadata properly for Next.js
export const metadata = pageMetadata;

export default function GalleryPage() {
  // Load images on the server
  const images = loadGalleryImages();
  
  return (
    <>
      <GalleryPageClient images={images} />
    </>
  );
}