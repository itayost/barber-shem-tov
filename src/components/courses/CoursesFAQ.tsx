// src/components/courses/CoursesFAQ.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

// Enrollment-focused FAQs
const faqData = [
  {
    id: 'no-experience',
    question: 'האם אני יכול להתחיל ללא ניסיון בכלל?',
    answer: 'בהחלט! הקורס למתחילים מיועד בדיוק לאנשים ללא ניסיון קודם. נתחיל מהבסיס המוחלט - איך להחזיק מספריים נכון, זוויות חיתוך, וטכניקות יסוד. תוך שבועיים תכבר תרגיש בטוח עם לקוחות אמיתיים.',
    category: 'enrollment'
  },
  {
    id: 'job-placement',
    question: 'איך אתם עוזרים למצוא עבודה אחרי הקורס?',
    answer: 'יש לנו רשת של 50+ מספרות שותפות שמחפשות כל הזמן ספרים מוכשרים. אנחנו מכינים אותך לראיונות, עוזרים לבנות CV מקצועי, ונותנים המלצות אישיות. 92% מהבוגרים שלנו מוצאים עבודה תוך 3 חודשים.',
    category: 'career'
  },
  {
    id: 'payment-plans',
    question: 'האם יש אפשרות לתשלום במספר תשלומים?',
    answer: 'כן! אנחנו מבינים שזו השקעה גדולה. קורסים מעל ₪3,000 ניתן לפרוס עד 4 תשלומים ללא ריבית. קורסים קטנים יותר ניתן לחלק ל-2 תשלומים. נדבר על זה בשיחת הייעוץ ונמצא פתרון שמתאים לך.',
    category: 'payment'
  },
  {
    id: 'time-commitment',
    question: 'כמה זמן בשבוע צריך להשקיע בקורס?',
    answer: 'הקורס למתחילים: 3 פעמים בשבוע, 4 שעות בכל מפגש = 12 שעות שבועיות. הקורס המתקדם: 2 ימים אינטנסיביים בסוף השבוע. אנחנו גמישים עם לוחות זמנים ויש מספר אפשרויות שעות.',
    category: 'schedule'
  },
  {
    id: 'certification',
    question: 'התעודה מוכרת ויעזור לי למצוא עבודה?',
    answer: 'בהחלט! התעודה שלנו מוכרת במשרד העבודה והרווחה ובאיגוד הספרים הבינלאומי. מספרות רואות את התעודה שלנו כסימן איכות. בנוסף, יש לנו מוניטין מעולה בתעשייה כבר מ-2018.',
    category: 'certification'
  },
  {
    id: 'what-included',
    question: 'מה בדיוק כלול במחיר הקורס?',
    answer: 'כל מה שאתה צריך: כל השיעורים, עבודה עם לקוחות אמיתיים, ערכת כלים מקצועית (בקורס המתחילים), חומרי לימוד, תעודת הסמכה, וליווי בחיפוש עבודה. אין עלויות נסתרות!',
    category: 'value'
  }
];

const CoursesFAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section className="py-20 bg-charcoal relative overflow-hidden" dir="rtl">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-h2 md:text-4xl font-bold mb-4">
            שאלות <span className="text-gold">נפוצות</span>
          </h2>
          <p className="text-lightgrey text-xl max-w-2xl mx-auto">
            כל מה שרציתם לדעת על ההרשמה והקורסים
          </p>
        </motion.div>

        {/* FAQ items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqData.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-charcoal border border-lightgrey/10 hover:border-gold/20 transition-all duration-300"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full flex items-center justify-between p-6 text-right focus:outline-none group"
                aria-expanded={openItems.has(faq.id)}
              >
                <h3 className="text-lg font-bold text-offwhite group-hover:text-gold transition-colors pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openItems.has(faq.id) ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gold flex-shrink-0"
                >
                  <ChevronDownIcon className="w-6 h-6" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openItems.has(faq.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0">
                      <div className="bg-gold/5 border border-gold/10 p-4">
                        <p className="text-lightgrey leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <motion.div 
          className="mt-16 bg-gradient-to-r from-gold/10 to-brown/10 border border-gold/20 p-8 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-h3 font-bold mb-4">עדיין יש לך שאלות?</h3>
          <p className="text-lightgrey mb-6 text-lg">
            אנחנו כאן בשבילך! צור איתנו קשר ונענה על כל השאלות שלך
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.a
              href="/contact?consultation=true"
              className="bg-gold text-charcoal py-4 px-8 font-bold text-lg hover:bg-gold/90 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📞 שיחת ייעוץ חינם
            </motion.a>
            
            <motion.a
              href="https://wa.me/972528691415?text=היי! יש לי כמה שאלות על הקורסים 🤔"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white py-4 px-8 font-bold text-lg hover:bg-green-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              💬 WhatsApp
            </motion.a>
            
            <motion.a
              href="tel:+972528691415"
              className="border border-gold text-gold py-4 px-8 font-bold text-lg hover:bg-gold/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📱 052-869-1415
            </motion.a>
          </div>

          {/* Quick response promise */}
          <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-lightgrey/80">
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>תשובה תוך 24 שעות</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>ללא התחייבות</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>ייעוץ מקצועי</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CoursesFAQ;