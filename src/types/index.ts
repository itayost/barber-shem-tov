// File: src/types/index.ts
export interface BusinessHours {
  days: string;
  hours: string;
}

export interface BusinessSocial {
  instagram: string;
  facebook: string;
  tiktok: string;
}

export interface BusinessInfo {
  name: string;
  address: string;
  phone: string;
  email?: string;
  hours: BusinessHours[];
  social?: BusinessSocial;
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
  category: 'haircut' | 'shave' | 'beard' | 'package';
  featured?: boolean;
}
