// File: src/types/index.ts
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
  category: 'haircut' | 'shave' | 'beard' | 'package' | 'special' | 'color';
  featured?: boolean;
}
