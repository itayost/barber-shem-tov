// src/app/academy/page.tsx - Complete Academy Page
import FAQSection, { FAQItem } from '@/components/academy/FAQSection';
import CTASection from '@/components/academy/CTASection';
import AcademyHeader from '@/components/academy/AcademyHeader';
import OurStory from '@/components/academy/OurStory';
import InstructorsSection from '@/components/academy/InstructorsSection';
import WhatsAppFloat from '@/components/common/WhatsAppFloat';
import { instructors } from '@/lib/data';

// Academy-specific FAQ data
const academyFAQs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'מהי גישת ההוראה של האקדמיה?',
    answer: 'אנו מאמינים בלמידה מעשית - 70% מהזמן תעבוד עם לקוחות אמיתיים תחת הדרכה צמודה. שילוב של תיאוריה וניסיון מעשי מבטיח שתסיים עם הכישורים והביטחון לעבוד מיד.'
  },
  {
    id: 'faq-2',
    question: 'איך האקדמיה עוזרת בהשמה לעבודה?',
    answer: 'יש לנו רשת של 50+ מספרות שותפות שמחפשות בוגרים שלנו. אנו מספקים: הכנה לראיונות, בניית CV מקצועי, המלצות אישיות, וליווי עד למציאת עבודה. 92% מהבוגרים מוצאים עבודה תוך 3 חודשים.'
  },
  {
    id: 'faq-3',
    question: 'האם ההסמכה שלכם מוכרת?',
    answer: 'בהחלט! האקדמיה מוכרת על ידי משרד העבודה והרווחה, וחברה באיגוד הספרים הבינלאומי. התעודות שלנו מוכרות בכל מספרה בארץ ונחשבות לסימן איכות בתעשייה.'
  },
  {
    id: 'faq-4',
    question: 'מה מייחד אתכם מאקדמיות אחרות?',
    answer: 'ניסיון של 7 שנים, מעל 500 בוגרים מצליחים, צוות מדריכים מהמובילים בתעשייה, כיתות קטנות (עד 12 תלמידים), והתמקדות בהשמה ובהצלחה ארוכת טווח של הבוגרים.'
  },
  {
    id: 'faq-5',
    question: 'האם יש אפשרות לסיור באקדמיה?',
    answer: 'כמובן! אנחנו מעודדים מועמדים לבוא לסיור היכרות. תוכלו לראות את הכיתות, להכיר את הצוות, ולקבל תחושה של האווירה. צרו קשר לתיאום סיור אישי.'
  },
  {
    id: 'faq-6',
    question: 'איך נראה יום טיפוסי באקדמיה?',
    answer: 'מתחילים בהדגמה טכנית (שעה), אחר כך תרגול מודרך (שעה), ואז עבודה עם לקוחות אמיתיים (2 שעות). כל יום מסתיים בסיכום ומשוב אישי. האווירה תומכת ומעודדת למידה.'
  }
];

export default function AcademyPage() {
  return (
    <>
      {/* 1. Academy Header - Hero section with stats and featured content */}
      <AcademyHeader />
      
      {/* 2. Our Story - Timeline, founder message, values, vision */}
      <OurStory />
      
      {/* 3. Instructors Section - Showcase the teaching team */}
      <InstructorsSection instructors={instructors} />
      
      {/* 4. FAQ Section - Address common questions about the academy */}
      <FAQSection 
        faqs={academyFAQs}
        title="שאלות נפוצות על האקדמיה"
        description="כל מה שרציתם לדעת על האקדמיה, גישת ההוראה, וההסמכות שלנו"
      />
      
      {/* 5. CTA Section - Multiple engagement options */}
      <CTASection 
        title="מוכנים לקחת את הצעד הבא?"
        description="בחרו את הדרך הנוחה לכם ליצור איתנו קשר ולהתחיל את המסע"
      />
      
      {/* WhatsApp floating button for immediate contact */}
      <WhatsAppFloat />
    </>
  );
}