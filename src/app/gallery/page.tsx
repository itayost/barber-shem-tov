// app/gallery/page.tsx
import fs from 'fs';
import path from 'path';
import GalleryClientWrapper from '@/components/gallery/GalleryClientWrapper';
import { galleryCategories } from '@/lib/data';
import { GalleryImage } from '@/utils/galleryTypes';


// Function to get image title from filename
function getImageTitle(filename: string): string {
  // Remove file extension
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
  
  // Replace hyphens with spaces and capitalize first letter of each word
  return nameWithoutExt
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Get all category folders
function getGalleryCategories(): string[] {
  const galleryPath = path.join(process.cwd(), 'public', 'images', 'gallery');
  
  // Check if directory exists
  if (!fs.existsSync(galleryPath)) {
    console.warn(`Gallery directory not found: ${galleryPath}`);
    return Object.keys(galleryCategories.labels);
  }
  
  return fs.readdirSync(galleryPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

// Load all gallery images
function loadGalleryImages(): GalleryImage[] {
  const galleryPath = path.join(process.cwd(), 'public', 'images', 'gallery');
  
  // Check if directory exists
  if (!fs.existsSync(galleryPath)) {
    console.warn(`Gallery directory not found: ${galleryPath}`);
    return [];
  }
  
  const categories = getGalleryCategories();
  const images: GalleryImage[] = [];
  
  categories.forEach(category => {
    const categoryPath = path.join(galleryPath, category);
    
    if (!fs.existsSync(categoryPath)) {
      return;
    }
    
    const files = fs.readdirSync(categoryPath)
      .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));
    
    files.forEach(file => {
      const id = `${category}-${file.replace(/\.[^/.]+$/, '')}`;
      const title = getImageTitle(file);
      const src = `/images/gallery/${category}/${file}`;
      
      images.push({
        id,
        category,
        title,
        src
      });
    });
  });
  
  return images;
}

export default function GalleryPage() {
  // Load images and categories from the filesystem
  const images = loadGalleryImages();
  const categories = getGalleryCategories();
  const categoryLabels = galleryCategories.labels;
  
  return (
    <GalleryClientWrapper 
      initialImages={images}
      categories={categories}
      categoryLabels={categoryLabels}
    />
  );
}