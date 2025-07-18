// src/utils/galleryUtils.ts - Updated with key validation
import fs from 'fs';
import path from 'path';
import { GalleryImage, GalleryMetadata, galleryCategories, getCategoryLabelsMap } from '@/lib/data';

// Function to generate a unique ID
function generateUniqueId(category: string, filename: string, index: number): string {
  // Remove file extension and create a safe ID
  const safeName = filename.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9-_]/g, '-');
  return `${category}-${safeName}-${index}`;
}

// Function to get image title from filename
export function getImageTitle(filename: string): string {
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
  const nameWithSpaces = nameWithoutExt.replace(/[-_]/g, ' ');
  return nameWithSpaces
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Get all category folders
export function getGalleryCategories(): string[] {
  const galleryPath = path.join(process.cwd(), 'public', 'images', 'gallery');
  
  if (!fs.existsSync(galleryPath)) {
    console.warn(`Gallery directory not found: ${galleryPath}`);
    return galleryCategories.map(cat => cat.id);
  }
  
  const folders = fs.readdirSync(galleryPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  const definedCategories = galleryCategories.map(cat => cat.id);
  const allCategories = [...new Set([...folders, ...definedCategories])];
  
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
    } catch (error) {
      console.warn(`Failed to parse metadata.json in ${categoryPath}:`, error);
    }
  }
  
  return {};
}

// Load all gallery images with validation
export function loadGalleryImages(): GalleryImage[] {
  const galleryPath = path.join(process.cwd(), 'public', 'images', 'gallery');
  
  if (!fs.existsSync(galleryPath)) {
    console.warn(`Gallery directory not found: ${galleryPath}`);
    return [];
  }
  
  const categories = getGalleryCategories();
  const images: GalleryImage[] = [];
  const usedIds = new Set<string>(); // Track used IDs to prevent duplicates
  
  categories.forEach(category => {
    const categoryPath = path.join(galleryPath, category);
    
    if (!fs.existsSync(categoryPath)) {
      return;
    }
    
    const metadata = loadImageMetadata(categoryPath);
    
    const files = fs.readdirSync(categoryPath)
      .filter(file => /\.(jpg|jpeg|png)$/i.test(file)) // Exclude .webp files
      .sort();
    
    files.forEach((file, index) => {
      const fileKey = file.replace(/\.[^/.]+$/, '');
      
      // Generate a guaranteed unique ID
      let id = generateUniqueId(category, file, index);
      
      // Ensure the ID is truly unique
      let counter = 0;
      while (usedIds.has(id)) {
        counter++;
        id = `${generateUniqueId(category, file, index)}-${counter}`;
        console.warn(`Duplicate ID detected, generated new ID: ${id}`);
      }
      
      usedIds.add(id);
      
      const imageMetadata = metadata[fileKey] || {};
      const title = imageMetadata.title || getImageTitle(file);
      const src = `/images/gallery/${category}/${file}`;
      
      // Validate the image object
      const image: GalleryImage = {
        id: id, // Guaranteed unique
        category: category || 'uncategorized',
        title: title || 'Untitled',
        src: src || '',
        description: imageMetadata.description,
        featured: imageMetadata.featured || false,
        order: imageMetadata.order ?? index,
        date: imageMetadata.date,
        tags: imageMetadata.tags
      };
      
      // Only add if image has valid required fields
      if (image.id && image.category && image.src) {
        images.push(image);
      } else {
        console.error(`Invalid image data for file ${file}:`, image);
      }
    });
  });
  
  // Final validation - check for any remaining duplicates
  const finalIds = new Set<string>();
  const validImages = images.filter(img => {
    if (!img.id || finalIds.has(img.id)) {
      console.error(`Filtering out image with duplicate or missing ID: ${img.id}`);
      return false;
    }
    finalIds.add(img.id);
    return true;
  });
  
  // Sort images by category order, then featured, then custom order
  return validImages.sort((a, b) => {
    const catA = galleryCategories.find(cat => cat.id === a.category);
    const catB = galleryCategories.find(cat => cat.id === b.category);
    const catOrderA = catA?.order ?? 999;
    const catOrderB = catB?.order ?? 999;
    
    if (catOrderA !== catOrderB) {
      return catOrderA - catOrderB;
    }
    
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1;
    }
    
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
  
  galleryCategories.forEach(cat => {
    counts[cat.id] = 0;
  });
  
  allImages.forEach(img => {
    counts[img.category] = (counts[img.category] || 0) + 1;
  });
  
  return counts;
}

// Get recent images (based on date)
export function getRecentImages(limit: number = 6): GalleryImage[] {
  const allImages = loadGalleryImages();
  
  const imagesWithDates = allImages
    .filter(img => img.date)
    .sort((a, b) => {
      const dateA = new Date(a.date!).getTime();
      const dateB = new Date(b.date!).getTime();
      return dateB - dateA;
    });
  
  return imagesWithDates.slice(0, limit);
}