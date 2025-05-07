export type Service = {
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
};

export const services: Service[] = [
  {
    id: 'vip-appointment',
    name: 'VIP Appointment',
    name_he: 'תור VIP',
    description: 'Premium appointment slot that allows you to book even when our schedule is full. Priority service with flexible timing.',
    description_he: 'יאפשר לך לקבוע תור גם כשהיומן מלא.',
    price: 150,
    duration: 'Varies',
    duration_he: 'משתנה',
    category: 'special',
    featured: true,
  },
  {
    id: 'haircut-beard-combo',
    name: 'Haircut & Beard Combo',
    name_he: 'תספורת + זקן',
    description: 'Complete look refresh with precision haircut and professional beard grooming in one session.',
    description_he: 'תספורת מקצועית בשילוב עיצוב וטיפוח זקן.',
    price: 80,
    duration: '45 minutes',
    duration_he: '45 דקות',
    category: 'package',
    featured: true,
  },
  {
    id: 'kids-haircut',
    name: "Kid's Haircut",
    name_he: 'תספורת ילד',
    description: 'Gentle and patient approach for our younger clients. Fun and stress-free experience.',
    description_he: 'תספורת מותאמת לילדים בגישה סבלנית ומקצועית.',
    price: 70,
    duration: '30 minutes',
    duration_he: '30 דקות',
    category: 'haircut',
  },
  {
    id: 'mens-haircut',
    name: "Men's Haircut",
    name_he: 'תספורת גבר',
    description: 'Classic men haircut with attention to detail and personalized styling.',
    description_he: 'תספורת גבר קלאסית עם תשומת לב לפרטים ועיצוב מותאם אישית.',
    price: 70,
    duration: '30 minutes',
    duration_he: '30 דקות',
    category: 'haircut',
    featured: true,
  },
  {
    id: 'chalakah',
    name: 'Chalakah - First Haircut',
    name_he: 'תספורת "חאלקה"',
    description: 'Special ceremonial first haircut for boys. A meaningful experience with extra care and attention.',
    description_he: 'תספורת ראשונה לילד.',
    price: 100,
    duration: '45 minutes',
    duration_he: '45 דקות',
    category: 'special',
  },
  {
    id: 'full-color',
    name: 'Full Head Color',
    name_he: 'צבע כל הראש',
    description: 'Complete color transformation with premium products for vibrant, long-lasting results.',
    description_he: 'צביעת שיער מלאה עם מוצרים איכותיים.',
    price: 300,
    duration: '120 minutes',
    duration_he: '120 דקות',
    category: 'color',
  },
  {
    id: 'color-highlights',
    name: 'Color Highlights',
    name_he: 'גוונים',
    description: 'Subtle or bold highlights to add dimension and texture to your hair.',
    description_he: 'גוונים לשיער להוספת עומק ומרקם.',
    price: 150,
    duration: '90 minutes',
    duration_he: '90 דקות',
    category: 'color',
  },
  {
    id: 'haircut-punch-card',
    name: 'Haircut Punch Card',
    name_he: 'כרטיסייה תספורת',
    description: 'Prepaid card for multiple haircuts at a discounted rate. Credit card payment only.',
    description_he: 'תשלום באשראי.',
    price: 700,
    duration: 'Multiple visits',
    duration_he: 'ביקורים מרובים',
    category: 'package',
  },
  {
    id: 'haircut-beard-punch-card',
    name: 'Haircut & Beard Punch Card',
    name_he: 'כרטיסיית תספורת + זקן',
    description: 'Prepaid card for multiple haircut and beard combo services at a discounted rate. Credit card payment only.',
    description_he: 'תשלום באשראי.',
    price: 800,
    duration: 'Multiple visits',
    duration_he: 'ביקורים מרובים',
    category: 'package',
  },
  {
    id: 'laser-facial',
    name: 'Full Face Laser Treatment',
    name_he: 'טיפול לייזר לכל הפנים',
    description: 'Advanced laser treatment for the entire face to improve skin texture and appearance.',
    description_he: 'טיפול לייזר מתקדם לכל הפנים.',
    price: 150,
    duration: '45 minutes',
    duration_he: '45 דקות',
    category: 'special',
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'דוד כהן',
    text: 'תשומת הלב לפרטים יוצאת דופן. תספורת האקזקיוטיב שלי הותאמה במושלם למבנה הפנים שלי ולצרכי סגנון החיים שלי. הוויסקי על חשבון הבית היה מגע נחמד.',
    rating: 5,
  },
  {
    id: 2,
    name: 'מיכאל לוי',
    text: 'סוף סוף מצאתי מקום שיודע לעצב כמו שצריך את הזקן שלי. טיפול המגבת החמה והארומתרפיה הפכו את זה לחוויית יוקרה אמיתית.',
    rating: 5,
  },
  {
    id: 3,
    name: 'יונתן מילר',
    text: 'חווית האב והבן הייתה מושלמת עבור התספורת המקצועית הראשונה של הבן שלי. הספרים היו סבלניים והפכו את זה למיוחד עבור שנינו.',
    rating: 5,
  },
];

export const teamMembers = [
  {
    id: 'bar',
    name: 'בר שם טוב',
    title: 'המייסד והבעלים',
    bio: 'בר שם טוב הוא המייסד והבעלים של המספרה. עם אהבה עמוקה למסורת הספרות וחזון לחוויית לקוח יוצאת דופן, בר יצר מרחב שמשלב בין אומנות הספרות המסורתית לבין סגנון ואווירה מודרניים.',
    image: '/images/team/bar.jpg',
  },
  {
    id: 'yarin',
    name: 'ירין',
    title: 'ספר מקצועי',
    bio: 'ירין, הידוע גם בכינויו "בזוקי", מביא אנרגיה ייחודית וסגנון אישי לצוות שלנו. עם עין חדה לטרנדים עכשוויים וטכניקה מדויקת, הוא מתמחה ביצירת מראה שמשלב עדכניות עם קלאסיות.',
    image: '/images/team/yarin.jpg',
  },
  {
    id: 'or',
    name: 'אור',
    title: 'ספר מקצועי',
    bio: 'אור מביא לצוות מיומנות טכנית מרשימה ותשוקה לפרטים הקטנים. גישתו הרגועה והקשובה הופכת כל תספורת לחוויה מרגיעה ומדויקת. מתמחה במראות נקיים וקלאסיים עם נגיעה מודרנית.',
    image: '/images/team/or.jpg',
  },
  {
    id: 'itzik',
    name: 'איציק',
    title: 'ספר מקצועי',
    bio: 'עם שנים של ניסיון בתעשייה, איציק מביא עושר של ידע וטכניקות מסורתיות למספרה. מומחיותו בעיצוב זקן וטיפולי פנים הופכת אותו לחלק חיוני מהצוות, המציע חווית טיפוח מקיפה ללקוחותינו.',
    image: '/images/team/itzik.jpg',
  }
];

export interface GalleryImage {
  id: string;
  category: string;
  title: string;
  src: string;
}

// Add the category labels mapping for the gallery
export const galleryCategories = {
  labels: {
    space: 'המרחב שלנו',
    experience: 'החוויה',
    work: 'עבודות אחרונות',
  }
};

// Updated businessInfo to reflect that the shop is only closed on Mondays
export const businessInfo = {
  name: 'ברבר שם טוב',
  address: 'העצמאות 4, טירת הכרמל',
  phone: '+972528691415',
  email: 'info@modernbarber.com',
  hours: [
    { days: 'שלישי-שישי', hours: '9:00-19:00' },
    { days: 'שבת', hours: '9:00-15:00' },
    { days: 'ראשון', hours: '9:00-19:00' }, // Added Sunday as a working day
    { days: 'שני', hours: 'סגור' }, // Only Monday is closed
  ],
  social: {
    instagram: 'https://www.instagram.com/barber_shemtov/',
    tiktok: 'https://www.tiktok.com/@barber_shem_tov'
  },
  
  // Add a helper function for closed days (for form validation)
  isClosedDay: function(dayNumber: number) {
    // 1 = Monday in JavaScript Date
    return dayNumber === 1;
  },
  
  // Add a helper function to get hours for a specific day
  getHoursForDay: function(dayNumber: number) {
    const dayMap: Record<number, string> = {
      0: 'ראשון', // Sunday
      1: 'שני',   // Monday
      2: 'שלישי', // Tuesday
      3: 'רביעי', // Wednesday
      4: 'חמישי', // Thursday
      5: 'שישי',  // Friday
      6: 'שבת'    // Saturday
    };
    
    const dayName = dayMap[dayNumber];
    
    // Find the hours entry for this day
    for (const entry of this.hours) {
      if (entry.days.includes(dayName)) {
        // Parse the hours if this isn't a closed day
        if (entry.hours !== 'סגור') {
          const [open, close] = entry.hours.split('-');
          return { isOpen: true, open: open.trim(), close: close.trim() };
        } else {
          return { isOpen: false, open: '', close: '' };
        }
      }
    }
    
    // Default return if no match found
    return { isOpen: false, open: '', close: '' };
  }
};