// src/pages/academy/index.tsx or src/app/academy/page.tsx
import FAQSection, { FAQItem } from '@/components/academy/FAQSection';
import CTASection from '@/components/academy/CTASection';
import AcademyHeader from '@/components/academy/AcademyHeader';
import OurStory from '@/components/academy/OurStory';

// Sample FAQ data
const faqItems: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'האם נדרש ניסיון קודם בספרות?',
    answer: 'לא, הקורסים הבסיסיים שלנו מיועדים למתחילים ללא ניסיון קודם. אנו מלמדים את כל היסודות מאפס.'
  },
  {
    id: 'faq-2',
    question: 'כמה זמן לוקח להשלים את הקורס הבסיסי?',
    answer: 'הקורס הבסיסי שלנו נמשך כ-4 שבועות, עם מפגשים של 3-4 שעות, מספר פעמים בשבוע.'
  },
  {
    id: 'faq-3',
    question: 'האם ניתן למצוא עבודה לאחר סיום הקורס?',
    answer: 'כן, אנו עוזרים לבוגרים שלנו למצוא הזדמנויות עבודה. יש לנו קשרים עם מספרות רבות באזור, ואנו מציעים גם תמיכה בכתיבת קורות חיים והכנה לראיונות עבודה.'
  },
  {
    id: 'faq-4',
    question: 'האם אקבל תעודה רשמית בסוף הקורס?',
    answer: 'כן, כל המשתתפים שמסיימים בהצלחה את הקורסים שלנו מקבלים תעודת הסמכה מוכרת בתעשייה, המאשרת את המיומנויות והידע שרכשו.'
  },
  {
    id: 'faq-5',
    question: 'מה כוללים דמי הלימוד?',
    answer: 'דמי הלימוד כוללים את כל חומרי הלימוד, השימוש בכלים ובציוד במהלך הקורס, וגישה למשאבים מקוונים. בנוסף, תקבל ערכת כלים בסיסית שתוכל לקחת איתך בסיום הקורס.'
  }
];

export default function AcademyPage() {
  return (
    <>
      <AcademyHeader />
      
      <OurStory/>
      
      <FAQSection faqs={faqItems} />
      
      <CTASection />
    </>
  );
}