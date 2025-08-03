// File: src/types/index.ts

// Academy hours type
export interface AcademyHours {
  days: string;
  hours: string;
}

// Academy social media accounts
export interface AcademySocial {
  instagram: string;
  facebook: string;
  tiktok: string;
}

// Academy statistics
export interface AcademyStats {
  graduates: number;
  placementRate: number;
  programCount: number;
  industryAwards: number;
  averageSalaryIncrease: number;
}

// Complete academy information type
export interface AcademyInfo {
  name: string;
  shortName: string;
  address: string;
  phone: string;
  email: string;
  established: number;
  hours: AcademyHours[];
  social: AcademySocial;
  
  // Academy statistics
  stats: AcademyStats;
  
  // Accreditations and partnerships
  accreditations: string[];
  partners: string[];
  
  // Helper functions
  isOpenDay: (dayNumber: number) => boolean;
  getHoursForDay: (dayNumber: number) => { isOpen: boolean, open: string, close: string };
}

// Course category type
export type CourseCategory = 'beginner' | 'advanced' | 'professional' | 'workshop' | 'business';

// Course type
export interface Course {
  id: string;
  name: string;
  name_he: string;
  description: string;
  description_he: string;
  price: number;
  duration: string;
  duration_he: string;
  category: CourseCategory;
  featured?: boolean;
  instructor: string;
  
  // Optional fields
  maxStudents?: number;
  prerequisites?: string;
  certification?: string;
  originalPrice?: number; // For discount display
  nextStartDate?: string; // Format: "YYYY-MM-DD"
  syllabus?: string[]; // Array of topics covered
  skillLevel?: 'beginner' | 'intermediate' | 'advanced' | 'all-levels';
  format?: 'in-person' | 'online' | 'hybrid';
}

// Instructor type
export interface Instructor {
  id: string;
  name: string;
  title: string;
  bio: string;
  image?: string;
  expertise: string[];
  certifications: string[];
  courses: string[]; // Course IDs they teach
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };
}

// Testimonial type
export interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
  course: string;
  instructor: string;
  image?: string;
  year: number;
  jobTitle?: string;
  company?: string;
}

// Gallery image type
export interface GalleryImage {
  id: string;
  category: string;
  title: string;
  src: string;
  description?: string;
  date?: string;
}

// Event type for workshops and special events
export interface AcademyEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD format
  time: string;
  instructor: string;
  price: number;
  location: string;
  description: string;
  maxAttendees: number;
  registrationType: 'free' | 'paid';
  image?: string;
  tags?: string[];
  registrationLink?: string;
}

// Keeping the old types for backward compatibility during migration
export interface BusinessHours {
  days: string;
  hours: string;
}

export interface BusinessSocial {
  instagram: string;
  tiktok: string;
}

export interface BusinessInfo {
  name: string;
  address: string;
  phone: string;
  email?: string;
  hours: BusinessHours[];
  social: BusinessSocial;
  academy?: {
    name: string;
    director: string;
    established: number;
    email: string;
  };
  isClosedDay: (dayNumber: number) => boolean;
  getHoursForDay: (dayNumber: number) => { isOpen: boolean, open: string, close: string };
}

export interface Service {
  id: string;
  name: string;
  name_he: string;
  description: string;
  description_he: string;
  price: number;
  duration: string;
  duration_he: string;
  category: 'haircut' | 'shave' | 'beard' | 'package' | 'special' | 'color' | 'academy';
  featured?: boolean;
  instructor?: string;
}

export interface GalleryCategory {
  id: string;
  label: string;
  description: string;
  order: number;
}