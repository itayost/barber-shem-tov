// File: src/lib/data.ts
export type Course = {
  id: string;
  name: string;
  name_he: string;
  description: string;
  description_he: string;
  price: number;
  duration: string;
  duration_he: string;
  category: 'beginner' | 'advanced' | 'professional' | 'workshop' | 'business';
  featured?: boolean;
  instructor: string;
  maxStudents?: number;
  prerequisites?: string;
  certification?: string;
};

// Gallery Types
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

// Gallery Categories Data
export const galleryCategories: GalleryCategory[] = [
  {
    id: 'experience',
    label: 'חוויות',
    description: 'רגעים בלתי נשכחים מתוך ההכשרה והעשייה',
    icon: '📸',
    order: 1
  },
  {
    id: 'space',
    label: 'המרחב',
    description: 'הסביבה המודרנית שלנו שמעצימה למידה ויצירה',
    icon: '🏢',
    order: 2
  },
  {
    id: 'work',
    label: 'עבודות',
    description: 'תוצרים יצירתיים ומקצועיים של המשתתפים',
    icon: '✂️',
    order: 3
  }
];

// Gallery helper functions
export const getCategoryById = (id: string): GalleryCategory | undefined => {
  return galleryCategories.find(cat => cat.id === id);
};

export const getCategoryLabel = (id: string): string => {
  const category = getCategoryById(id);
  return category?.label || id;
};

export const getCategoryLabelsMap = (): Record<string, string> => {
  return galleryCategories.reduce((acc, cat) => {
    acc[cat.id] = cat.label;
    return acc;
  }, {} as Record<string, string>);
};

// Courses data
export const courses: Course[] = [
  {
    id: 'basic-barbering-course',
    name: 'Basic Barbering Course',
    name_he: 'קורס ספרות בסיסי',
    description: 'Learn foundational barbering techniques in our intensive 4-week course designed for beginners.',
    description_he: 'למד טכניקות ספרות בסיסיות בקורס האינטנסיבי שלנו למתחילים בן 4 שבועות.',
    price: 3200,
    duration: '4 weeks',
    duration_he: '4 שבועות',
    category: 'beginner',
    featured: true,
    instructor: 'bar',
    maxStudents: 12,
    prerequisites: 'אין צורך בניסיון קודם',
    certification: 'תעודת יסודות הספרות'
  },
  {
    id: 'advanced-styling-masterclass',
    name: 'Advanced Styling Masterclass',
    name_he: 'מאסטרקלאס בעיצוב מתקדם',
    description: 'Perfect your craft with our advanced styling techniques and trending hair design course for professionals.',
    description_he: 'שפר את האומנות שלך עם טכניקות עיצוב מתקדמות וקורס עיצוב שיער טרנדי למקצוענים.',
    price: 1800,
    duration: '2 days',
    duration_he: 'יומיים',
    category: 'advanced',
    featured: true,
    instructor: 'bar',
    maxStudents: 8,
    prerequisites: 'ניסיון בסיסי בספרות',
    certification: 'תעודת השתתפות במאסטרקלאס'
  }
];

export const academyTestimonials = [
  {
    id: 1,
    name: 'עמית יצחקי',
    text: 'אחרי שבועיים בקורס המתקדם, שיפרתי משמעותית את הטכניקות שלי. המדריכים מקצועיים וסבלניים, והאווירה באקדמיה מעודדת יצירתיות וחדשנות.',
    rating: 5,
    course: 'קורס ספרות מתקדם',
    instructor: 'בר שם טוב',
    image: '/images/testimonials/amit.jpg',
    year: 2023
  },
  {
    id: 4,
    name: 'אורי גולן',
    text: 'הקורס הבסיסי של האקדמיה שינה את הקריירה שלי. המדריכים מקצועיים ביותר והידע שרכשתי אפשר לי לפתוח את העסק שלי תוך חצי שנה.',
    rating: 5,
    course: 'קורס ספרות בסיסי',
    instructor: 'בר שם טוב',
    image: '/images/testimonials/uri.jpg',
    year: 2022
  }
];

export const instructors = [
  {
    id: 'bar',
    name: 'בר שם טוב',
    title: 'מייסד ומנהל האקדמיה',
    bio: 'בר שם טוב הוא המייסד והמנהל של האקדמיה לאמנות הספרות. עם מעל 15 שנות ניסיון בתעשייה, בר משלב ידע טכני עמוק עם חזון יצירתי. הוא השתלם בטכניקות ספרות מתקדמות בלונדון ובניו יורק, והדריך מאות תלמידים שהפכו לספרים מובילים ולבעלי מספרות מצליחות. בר מוביל את הקורסים המתקדמים ואת תוכנית ניהול עסקי הספרות.',
    image: '/images/team/bar.jpg',
    expertise: ['טכניקות מתקדמות', 'ניהול עסקי', 'עיצוב שיער', 'אסטרטגיית מותג'],
    certifications: ['הסמכת מאסטר בארבר בינלאומית', 'תואר בניהול עסקים'],
    courses: ['basic-barbering-course', 'advanced-styling-masterclass']
  }
];

// Academy-specific business info
export const academyInfo = {
  name: 'The Fader - Barbershop & Academy',
  shortName: 'The Fader',
  address: 'העצמאות 4, טירת הכרמל',
  phone: '+972528691415',
  email: 'academy@modernbarber.com',
  established: 2018,
  hours: [
    { days: 'ראשון-חמישי', hours: '9:00-19:00' },
    { days: 'שישי', hours: '9:00-14:00' },
    { days: 'שבת', hours: 'סגור' }
  ],
  social: {
    instagram: 'https://www.instagram.com/barber_shemtov_academy/',
    facebook: 'https://www.facebook.com/barber.shemtov.academy',
    youtube: 'https://www.youtube.com/channel/shemtov_academy'
  },
  
  // Academy statistics
  stats: {
    graduates: 500,
    placementRate: 92,
    programCount: 15,
    industryAwards: 12,
    averageSalaryIncrease: 40,
  },
  
  // Accreditations and partnerships
  accreditations: [
    'משרד העבודה והרווחה',
    'International Barber Association',
    'איגוד הספרים המקצועיים בישראל'
  ],
  
  partners: [
    'רשת מספרות טופ סטייל',
    'חברת מוצרי שיער American Crew',
    'רשת חנויות מקצועיות לספרים',
  ],
  
  // Helper functions
  isOpenDay: function(dayNumber: number) {
    return dayNumber !== 6;
  },
  
  getHoursForDay: function(dayNumber: number) {
    if (dayNumber === 6) {
      return { isOpen: false, open: '', close: '' };
    }
    
    if (dayNumber === 5) {
      return { isOpen: true, open: '9:00', close: '14:00' };
    }
    
    return { isOpen: true, open: '9:00', close: '19:00' };
  }
};