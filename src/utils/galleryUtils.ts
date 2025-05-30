// src/utils/galleryUtils.ts
import fs from 'fs';
import path from 'path';
import { GalleryImage, GalleryMetadata, galleryCategories, getCategoryLabelsMap } from '@/lib/data';

// Function to get image title from filename
export function getImageTitle(filename: string): string {
  // Remove file extension
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
  
  // Replace hyphens and underscores with spaces
  const nameWithSpaces = nameWithoutExt.replace(/[-_]/g, ' ');
  
  // Capitalize first letter of each word
  return nameWithSpaces
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Get all category folders
export function getGalleryCategories(): string[] {
  const galleryPath = path.join(process.cwd(), 'public', 'images', 'gallery');
  
  // Check if directory exists
  if (!fs.existsSync(galleryPath)) {
    console.warn(`Gallery directory not found: ${galleryPath}`);
    // Return default categories from data
    return galleryCategories.map(cat => cat.id);
  }
  
  const folders = fs.readdirSync(galleryPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  // Get defined categories
  const definedCategories = galleryCategories.map(cat => cat.id);
  const allCategories = [...new Set([...folders, ...definedCategories])];
  
  // Sort categories by predefined order
  return allCategories.sort((a, b) => {
    const catA = galleryCategories.find(cat => cat.id === a);
    const catB = galleryCategories.find(cat => cat.id === b);
    const orderA = catA?.order ?? 999;
    const orderB = catB?.order ?? 999;
    return orderA - orderB;
  });
}

// Get category labels
export function getCategoryLabels(): Record<string, string> {
  return getCategoryLabelsMap();
}

// Check if image metadata file exists
function loadImageMetadata(categoryPath: string): GalleryMetadata {
  const metadataPath = path.join(categoryPath, 'metadata.json');
  
  if (fs.existsSync(metadataPath)) {
    try {
      const content = fs.readFileSync(metadataPath, 'utf-8');
      return JSON.parse(content);
    } catch {
      console.warn(`Failed to parse metadata.json in ${categoryPath}`);
    }
  }
  
  return {};
}

// Load all gallery images
export function loadGalleryImages(): GalleryImage[] {
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
    
    // Skip if category folder doesn't exist
    if (!fs.existsSync(categoryPath)) {
      return;
    }
    
    // Load metadata if exists
    const metadata = loadImageMetadata(categoryPath);
    
    const files = fs.readdirSync(categoryPath)
      .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .sort(); // Basic alphabetical sort
    
    files.forEach((file, index) => {
      const fileKey = file.replace(/\.[^/.]+$/, '');
      const id = `${category}-${fileKey}`;
      const imageMetadata = metadata[fileKey] || {};
      
      // Use custom title from metadata or generate from filename
      const title = imageMetadata.title || getImageTitle(file);
      const src = `/images/gallery/${category}/${file}`;
      
      images.push({
        id,
        category,
        title,
        src,
        description: imageMetadata.description,
        featured: imageMetadata.featured || false,
        order: imageMetadata.order ?? index,
        date: imageMetadata.date,
        tags: imageMetadata.tags
      });
    });
  });
  
  // Sort images by category order, then featured, then custom order
  return images.sort((a, b) => {
    // First sort by category order
    const catA = galleryCategories.find(cat => cat.id === a.category);
    const catB = galleryCategories.find(cat => cat.id === b.category);
    const catOrderA = catA?.order ?? 999;
    const catOrderB = catB?.order ?? 999;
    
    if (catOrderA !== catOrderB) {
      return catOrderA - catOrderB;
    }
    
    // Within same category, featured first
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1;
    }
    
    // Then by custom order
    return (a.order ?? 0) - (b.order ?? 0);
  });
}

// Get featured images (for homepage or highlights)
export function getFeaturedImages(limit?: number): GalleryImage[] {
  const allImages = loadGalleryImages();
  const featured = allImages.filter(img => img.featured);
  
  if (limit && featured.length > limit) {
    return featured.slice(0, limit);
  }
  
  // If not enough featured images, add some regular ones
  if (limit && featured.length < limit) {
    const regularImages = allImages.filter(img => !img.featured);
    return [...featured, ...regularImages.slice(0, limit - featured.length)];
  }
  
  return featured;
}

// Get images by category
export function getImagesByCategory(category: string): GalleryImage[] {
  const allImages = loadGalleryImages();
  return allImages.filter(img => img.category === category);
}

// Get image count by category
export function getImageCountByCategory(): Record<string, number> {
  const allImages = loadGalleryImages();
  const counts: Record<string, number> = {};
  
  // Initialize with all categories
  galleryCategories.forEach(cat => {
    counts[cat.id] = 0;
  });
  
  // Count images
  allImages.forEach(img => {
    counts[img.category] = (counts[img.category] || 0) + 1;
  });
  
  return counts;
}

// Get recent images (based on date)
export function getRecentImages(limit: number = 6): GalleryImage[] {
  const allImages = loadGalleryImages();
  
  // Filter images with dates and sort by date descending
  const imagesWithDates = allImages
    .filter(img => img.date)
    .sort((a, b) => {
      const dateA = new Date(a.date!).getTime();
      const dateB = new Date(b.date!).getTime();
      return dateB - dateA;
    });
  
  return imagesWithDates.slice(0, limit);
}