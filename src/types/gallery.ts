// src/types/gallery.ts

export interface GalleryImage {
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

export interface GalleryCategory {
  id: string;
  label: string;
  description: string;
  icon: string;
  order: number;
}

export interface GalleryMetadata {
  [filename: string]: {
    title?: string;
    description?: string;
    featured?: boolean;
    order?: number;
    date?: string;
    tags?: string[];
  };
}