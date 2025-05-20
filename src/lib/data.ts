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
  instructor: string; // All courses have an instructor
  maxStudents?: number; // Added maximum students allowed
  prerequisites?: string; // Added prerequisites
  certification?: string; // Added certification type
};

// Modified to include only the two main courses
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

export interface GalleryImage {
  id: string;
  category: string;
  title: string;
  src: string;
}

// Updated gallery categories to focus on academy
export const galleryCategories = {
  labels: {
    classroom: 'כיתות הלימוד',
    workshops: 'סדנאות',
    students: 'עבודות סטודנטים',
    graduates: 'בוגרים',
    events: 'אירועים'
  }
};

// Academy-specific business info
export const academyInfo = {
  name: 'The Fader - Barbershop & Academy',
  shortName: 'The Fader',
  address: 'העצמאות 4, טירת הכרמל',
  phone: '+972528691415',
  email: 'academy@modernbarber.com',
  established: 2018, // Updated to match site copy
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
    averageSalaryIncrease: 40, // percent
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
    return dayNumber !== 6; // Closed on Saturday (6)
  },
  
  getHoursForDay: function(dayNumber: number) {
    // Map of day numbers to day names - could be used for localization or display
    // const dayMap: Record<number, string> = {
    //   0: 'ראשון', // Sunday
    //   1: 'שני',   // Monday
    //   2: 'שלישי', // Tuesday
    //   3: 'רביעי', // Wednesday
    //   4: 'חמישי', // Thursday
    //   5: 'שישי',  // Friday
    //   6: 'שבת'    // Saturday
    // };
    
    // Check if it's Saturday (closed)
    if (dayNumber === 6) {
      return { isOpen: false, open: '', close: '' };
    }
    
    // Check if it's Friday (shorter hours)
    if (dayNumber === 5) {
      return { isOpen: true, open: '9:00', close: '14:00' };
    }
    
    // Regular hours for all other days
    return { isOpen: true, open: '9:00', close: '19:00' };
  }
};