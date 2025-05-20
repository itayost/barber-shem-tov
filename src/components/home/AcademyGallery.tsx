// components/home/HomeCarousel.tsx
import { loadGalleryImages, getCategoryLabels } from '@/utils/galleryUtils';
import PhotoCarousel from './PhotoCarousel';

export default function HomeCarousel() {
  // Load gallery images from the file system
  const images = loadGalleryImages();
  const categoryLabels = getCategoryLabels();
  
  // If no images found, don't render anything
  if (images.length === 0) {
    return null;
  }
  
  return (
    <PhotoCarousel 
      images={images}
      categoryLabels={categoryLabels}
      count={6}
    />
  );
}