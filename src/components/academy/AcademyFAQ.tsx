// File: src/components/academy/AcademyFAQ.tsx
import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const AcademyFAQ: React.FC = () => {
  // FAQ data
  const faqItems: FAQItem[] = [
    {
      question: 'האם נדרש ניסיון קודם לקורסים למתחילים?',
      answer: 'לא, הקורסים למתחילים שלנו מיועדים לאנשים ללא ניסיון קודם בספרות. אנו מלמדים את כל היסודות מאפס ומספקים את כל הכלים והידע הדרושים להתחיל בתעשייה.',
    },
    {
      question: 'כמה זמן לוקח להשלים את הקורס הבסיסי?',
      answer: 'הקורס הבסיסי שלנו נמשך כ-4 שבועות, עם מפגשים של 3-4 שעות, מספר פעמים בשבוע. זמן זה מאפשר לך ללמוד את היסודות ולתרגל מספיק כדי לבנות ביטחון במיומנויות החדשות שלך.',
    },
    {
      question: 'האם ניתן למצוא עבודה לאחר סיום הקורס?',
      answer: 'כן, אנו עוזרים לבוגרים שלנו למצוא הזדמנויות עבודה. יש לנו קשרים עם מספרות רבות באזור, ואנו מציעים גם תמיכה בכתיבת קורות חיים והכנה לראיונות עבודה כחלק מהקורסים שלנו.',
    },
    {
      question: 'האם אקבל תעודה רשמית בסוף הקורס?',
      answer: 'כן, כל המשתתפים שמסיימים בהצלחה את הקורסים שלנו מקבלים תעודת הסמכה מוכרת בתעשייה, המאשרת את המיומנויות והידע שרכשו.',
    },
    {
      question: 'מה כוללים דמי הלימוד?',
      answer: 'דמי הלימוד כוללים את כל חומרי הלימוד, השימוש בכלים ובציוד במהלך הקורס, וגישה למשאבים מקוונים. בנוסף, תקבל ערכת כלים בסיסית שתוכל לקחת איתך בסיום הקורס.',
    },
    {
      question: 'האם אתם מציעים אפשרויות תשלום?',
      answer: 'כן, אנו מציעים מספר אפשרויות תשלום, כולל תשלומים. אנא צור איתנו קשר לדיון בפתרונות המימון הזמינים ולמציאת התוכנית המתאימה לצרכים שלך.',
    },
  ];

  // State to track which FAQ is open
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Toggle FAQ open/close
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-section-mobile md:py-section bg-charcoal" dir="rtl">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heebo text-h3 mb-6">שאלות נפוצות</h2>
          <p className="max-w-2xl mx-auto text-lightgrey">
            כאן תמצא תשובות לשאלות הנפוצות ביותר שלנו על האקדמיה והקורסים שלנו.
            אם יש לך שאלה נוספת, אל תהסס לפנות אלינו ישירות.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className="border border-lightgrey border-opacity-20 bg-charcoal"
            >
              <button
                className="w-full text-right py-4 px-6 flex items-center justify-between focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-gold">{item.question}</span>
                <span className="text-gold transition-transform duration-300 transform">
                  {openIndex === index ? (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 transform -rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </span>
              </button>
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 pb-4' : 'max-h-0'
                }`}
              >
                <p className="text-lightgrey">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AcademyFAQ;