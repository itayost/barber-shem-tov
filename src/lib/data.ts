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
  features?: string[];
  nextSession?: string;
  paymentOptions?: boolean;
  urgentNote?: string;
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
    order: 1,
  },
  {
    id: 'space',
    label: 'המרחב',
    description: 'הסביבה המודרנית שלנו שמעצימה למידה ויצירה',
    order: 2,
  },
  {
    id: 'work',
    label: 'עבודות',
    description: 'תוצרים יצירתיים ומקצועיים של המשתתפים',
    order: 3,
  },
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
  return galleryCategories.reduce(
    (acc, cat) => {
      acc[cat.id] = cat.label;
      return acc;
    },
    {} as Record<string, string>
  );
};

// Courses data
export const courses: Course[] = [
  {
    id: 'basic-barbering-course',
    name: 'Basic Barbering Course',
    name_he: 'קורס ספרות בסיסי',
    description:
      'Learn foundational barbering techniques in our intensive 8-9 week course designed for beginners.',
    description_he: 'בואו ללהיכנס לעולם הברבר וללמוד את הטכניקות החדשניות',
    price: 3200,
    duration: '8-9 weeks',
    duration_he: '8-9 שבועות',
    category: 'beginner',
    featured: true,
    instructor: 'bar',
    maxStudents: 12,
    prerequisites: 'אין צורך בניסיון קודם',
    certification: 'תעודת יסודות הספרות',
    features: [
      'למידה מהבסיס ללא ניסיון קודם',
      'למידת טכניקות פיידינג חדשניות',
      'למידת כימייה (גוונים וצביעת השיער)',
      'לימוד טכניקת פנסים',
      'לימוד עיצוב הזקן',
      'לימוד עבודה נכונה עם מספריים טכניקת גזירה',
      'התנסות עם שיער ארוך',
      'עבודה עם 20+ לקוחות אמיתיים',
      'ערכת כלים מקצועית כלולה',
      'תעודת הסמכה מוכרת',
      'ליווי בכניסה לתחום',
      'גישה לקהילת בוגרים',
    ],
    nextSession: '15 בינואר',
    paymentOptions: true,
    urgentNote: 'יש למהר!',
  },
  {
    id: 'advanced-styling-masterclass',
    name: 'Advanced Styling Masterclass',
    name_he: 'השתלמות מאסטרקלאס למתקדמים',
    description:
      'Perfect your craft with our advanced styling techniques and trending hair design course for professionals.',
    description_he:
      'קורס עיצוב שיער טרנדי למקצוענים - מיועד לחיזוק יכולות ספציפיות וטכניקות עיצוב מתקדמות.',
    price: 1800,
    duration: '2 days',
    duration_he: 'יומיים',
    category: 'advanced',
    featured: true,
    instructor: 'bar',
    maxStudents: 8,
    prerequisites: 'ניסיון בסיסי בספרות',
    certification: 'תעודת השתתפות במאסטרקלאס',
    features: [
      'מאסטרקלאס: ציורי ראש בפנסים',
      'ציורי ראש בצבע',
      'פיידים מושלמים',
      'כימיה מתקדמים',
      'תספורות מספריים',
      'טכניקות עיצוב מתקדמות',
      'הדגמות חיות ומעשיות',
      'קבלת פידבק אישי מהמדריך',
      'תעודת השתתפות מקצועית',
    ],
    nextSession: '28 בינואר',
    paymentOptions: true,
    urgentNote: 'מספר מקומות מוגבל!',
  },
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
    year: 2023,
  },
  {
    id: 4,
    name: 'אורי גולן',
    text: 'הקורס הבסיסי של האקדמיה שינה את הקריירה שלי. המדריכים מקצועיים ביותר והידע שרכשתי אפשר לי לפתוח את העסק שלי תוך חצי שנה.',
    rating: 5,
    course: 'קורס ספרות בסיסי',
    instructor: 'בר שם טוב',
    image: '/images/testimonials/yarin.jpg',
    year: 2022,
  },
  {
    id: 5,
    name: 'נועה לוי',
    text: 'חוויה מדהימה! הקורס נתן לי כלים מעשיים וביטחון עצמי להתחיל לעבוד בתחום. ממליצה בחום על האקדמיה לכל מי שחולם להפוך לספר מקצועי.',
    rating: 5,
    course: 'קורס ספרות בסיסי',
    instructor: 'בר שם טוב',
    image: '/images/testimonials/danny.jpg',
    year: 2023,
  },
];

export const instructors = [
  {
    id: 'bar',
    name: 'בר שם טוב',
    title: 'מייסד ומנהל האקדמיה',
    bio: 'בר שם טוב הוא המייסד והבעלים של אקדמיית The Fader – ספר, מנטור, ואיש חזון עם ניסיון של מעל 10 שנה בתחום. את הדרך שלו התחיל מספר קטן עם חלום גדול, והיום הוא מוביל תלמידים שבחרו ללמוד את מקצוע הספרות מהלב – ולעשות מזה קריירה אמיתית. בר ידוע בגישה הישירה, בתשומת הלב לכל תלמיד, וביכולת לחבר בין טכניקה מדויקת, מיתוג אישי וניהול עסק מצליח. במהלך השנים פיתח תוכנית הכשרה ייחודית שמקנה כלים פרקטיים, תרגול מהיום הראשון, וליווי אמיתי גם אחרי הקורס. החזון: להפוך כל תלמיד שרוצה – לברבר עם מטרה.',
    image: '/images/team/bar.jpg',
    expertise: ['טכניקות מתקדמות', 'ניהול עסקי', 'עיצוב שיער', 'אסטרטגיית מותג'],
    certifications: ['הסמכת מאסטר בארבר בינלאומית', 'תואר בניהול עסקים'],
    courses: ['basic-barbering-course', 'advanced-styling-masterclass'],
  },
  {
    id: 'yarin',
    name: 'ירין "בזוקי" דרעי',
    title: 'מדריך בכיר',
    bio: 'ירין הוא ספר עם ותק של מעל 8 שנה בתספורות גברים, המתמחה בטכניקות חידוד ועיצוב זקן, עם ניסיון עשיר בהדרכה מקצועית. הוא מדריך מוביל בקורסי הספרות של האקדמיה, מעביר סדנאות מתקדמות בנושא פיידים וטכניקות עיצוב מודרניות, וזוכה להערכה בזכות הגישה המדויקת והסבלנית שלו לכל תלמיד. ירין ידוע ביכולת שלו לפרק כל טכניקה למשהו פשוט, נגיש וברור – ולגרום למתחילים להאמין בעצמם מהתספורת הראשונה.',
    image: '/images/team/yarin.jpg',
    expertise: ['ציורי ראש', 'טכניקות Fade', 'עיצוב זקן', 'תספורות קלאסיות', 'חיתוך במכונה'],
    certifications: ['Master Barber International', 'מדריך מוסמך', 'זוכה אליפות ישראל בספרות 2021'],
    courses: ['basic-barbering-course'],
  },
  {
    id: 'or',
    name: 'אור',
    title: 'ברבר ומדריך',
    bio: 'אור הוא ספר מקצועי שמביא איתו שילוב נדיר של דיוק, סבלנות ויצירתיות. הוא מתמחה בדירוגים מושלמים, טכניקות גזירה מתקדמות, ועיצוב שיער שמדבר בשפה אישית לכל לקוח. מעבר לכישרון בידיים, אור מביא גישה נעימה, יחס אנושי, ויכולת להבין בדיוק מה הלקוח רוצה – גם כשזה לא נאמר במילים. הוא חלק בלתי נפרד מהצוות המקצועי שלנו, ומשמש גם כמדריך מעשי לתלמידים בקורסים.',
    image: '/images/team/or.jpg',
    expertise: ['דירוגים מדויקים', 'גזירות קלאסיות ומודרניות', 'עיצוב והתאמה אישית ללקוח'],
    certifications: ['ספר מוסמך', 'מדריך מעשי'],
    courses: ['basic-barbering-course'],
  },
  {
    id: 'itzik',
    name: 'איציק',
    title: 'מדריך בקורסים – התמחות בתספורות ילדים ונוער',
    bio: 'איציק הוא מדריך בקורס הספרות עם גישה ייחודית, שמבוססת על סבלנות, דיוק ויכולת לעבוד גם עם הקהל הצעיר ביותר – ילדים. בקורסים הוא מלמד איך לגשת נכון ללקוחות צעירים, איך להתמודד עם חוסר שיתוף פעולה או תזוזות, ואיך לשלב מקצועיות עם רוגע – גם כשמדובר בילד בן 5 על הכיסא. איציק מעביר לתלמידים כלים פרקטיים לתספורת בטוחה, מדויקת ונעימה, ומקנה ביטחון לכל מי שחושש להחזיק מכונה ליד ילד בפעם הראשונה.',
    image: '/images/team/itzik.jpg',
    expertise: [
      'תספורות לילדים ונוער',
      'יצירת קשר עם הלקוח הקטן',
      'תרגול סבלנות, מגע נכון, ודיוק תחת תנועה',
      'טכניקות מיוחדות לעבודה עם ילדים',
    ],
    certifications: ['ספר מוסמך', 'מדריך מעשי', 'מומחה לתספורות ילדים'],
    courses: ['basic-barbering-course'],
  },
];

// Academy-specific business info
export const academyInfo = {
  name: 'The Fader - Barbershop & Academy',
  shortName: 'The Fader',
  address: 'העצמאות 4, טירת הכרמל',
  phone: '052-8691415',
  email: 'academythefader@gmail.com',
  established: 2018,

  // Our Story
  story: {
    title: 'הסיפור שלנו',
    content: `מסע של מצוינות: האקדמיה שלנו נולדה מתוך חזון פשוט אבל עוצמתי – להרים את הסטנדרט של מקצוע הספרות בישראל, ולהפוך אותו לאיכות בינלאומית.
מה שהתחיל כמספרה מקומית בטירת הכרמל ב־2018, הפך עם השנים לאקדמיה מקצועית שמוציאה בוגרים מצטיינים – ולמקום שמגדל דור חדש של ברברים שלא מתפשרים על מקצועיות, רמה ואופי.
אנחנו גאים בשיעור ההצלחה הגבוה, בקבוצות הקטנות, בליווי האישי, ובעיקר – בדרך שבה אנחנו הופכים אנשים עם תשוקה למקצוענים אמיתיים.`,
  },

  hours: [
    { days: 'ראשון-חמישי', hours: '9:00-19:00' },
    { days: 'שישי', hours: '9:00-14:00' },
    { days: 'שבת', hours: 'סגור' },
  ],
  social: {
    instagram: 'https://www.instagram.com/barber_shemtov/',
    facebook: 'https://www.facebook.com/people/Barber-shem-tov/100063887357860/',
    tiktok: 'https://www.tiktok.com/@barber_shem_tov',
  },

  // Academy statistics
  stats: {
    graduates: 100,
    placementRate: 92,
    programCount: 15,
    industryAwards: 12,
    averageSalaryIncrease: 40,
  },

  // Accreditations and partnerships
  accreditations: [
    'משרד העבודה והרווחה',
    'International Barber Association',
    'איגוד הספרים המקצועיים בישראל',
  ],

  partners: ['רשת מספרות טופ סטייל', 'חברת מוצרי שיער American Crew', 'רשת חנויות מקצועיות לספרים'],

  // Helper functions
  isOpenDay: function (dayNumber: number) {
    return dayNumber !== 6;
  },

  getHoursForDay: function (dayNumber: number) {
    if (dayNumber === 6) {
      return { isOpen: false, open: '', close: '' };
    }

    if (dayNumber === 5) {
      return { isOpen: true, open: '9:00', close: '14:00' };
    }

    return { isOpen: true, open: '9:00', close: '19:00' };
  },
};
