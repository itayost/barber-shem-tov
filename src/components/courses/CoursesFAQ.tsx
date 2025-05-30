// src/components/courses/CoursesFAQ.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

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

  const faqData = [
    {
      id: 'prerequisites',
      question: 'האם צריך ניסיון קודם בספרות?',
      answer: 'לא, הקורס למתחילים מיועד למי שאין ניסיון קודם. הקורס מתחיל מהבסיס ומלמד את כל מה שצריך לדעת כדי להתחיל לעבוד כספר מקצועי.'
    },
    {
      id: 'certification',
      question: 'האם מקבלים תעודה בסוף הקורס?',
      answer: 'כן, בסיום הקורס מקבלים תעודת הסמכה מקצועית המוכרת על ידי משרד העבודה והרווחה. התעודה מאפשרת לעבוד כספר מקצועי בכל מספרה בישראל.'
    },
    {
      id: 'payment',
      question: 'האם יש אפשרות לתשלומים?',
      answer: 'כן, אנו מציעים מספר אפשרויות תשלום נוחות, כולל תשלומים ללא ריבית. ניתן לשלם במזומן, אשראי או העברה בנקאית.'
    },
    {
      id: 'schedule',
      question: 'מה שעות הלימוד?',
      answer: 'הקורסים מתקיימים בשני מסלולים: בוקר (9:00-14:00) או ערב (17:00-22:00). ניתן לבחור את המסלול המתאים לך. הקורסים מתקיימים פעמיים בשבוע.'
    },
    {
      id: 'job',
      question: 'האם יש סיוע במציאת עבודה?',
      answer: 'כן, אנו מספקים ליווי אישי בחיפוש עבודה, כולל הכנת קורות חיים, הכנה לראיונות עבודה וקישור למעסיקים פוטנציאליים. שיעור ההשמה שלנו עומד על 92%.'
    },
    {
      id: 'tools',
      question: 'האם כלים מקצועיים כלולים במחיר?',
      answer: 'כן, כל התלמידים מקבלים ערכת כלים מקצועית הכוללת את כל הכלים הבסיסיים הנדרשים לעבודה. הערכה שווה כ-2,000₪ וכלולה במחיר הקורס.'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-charcoal to-brown/5 relative overflow-hidden" dir="rtl">
      {/* Enhanced background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brown/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Animated lines */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent animate-[shimmer_3s_infinite]"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent animate-[shimmer_3s_infinite]" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced section header */}
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
            כל מה שצריך לדעת על הקורסים שלנו
          </p>
        </motion.div>

        {/* Enhanced FAQ items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqData.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-gradient-to-br from-charcoal to-charcoal/80 border border-lightgrey/10 hover:border-gold/20 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl"
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
              
              <motion.div
                initial={false}
                animate={{ height: openItems.has(faq.id) ? 'auto' : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-0 text-lightgrey border-t border-gold/10">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced contact options */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-h3 font-bold mb-6">עדיין יש לך שאלות?</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="/contact?consultation=true"
              className="bg-gradient-to-r from-gold to-gold/80 text-charcoal py-3 px-6 font-bold hover:from-gold/90 hover:to-gold/70 transition-all rounded-lg shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              💬 קבל ייעוץ אישי
            </motion.a>
            <motion.a
              href="https://wa.me/972528691415"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 font-bold hover:from-green-600 hover:to-green-700 transition-all rounded-lg shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              📱 WhatsApp
            </motion.a>
            <motion.a
              href="tel:+972528691415"
              className="border border-gold text-gold py-3 px-6 font-bold hover:bg-gold/10 transition-all rounded-lg"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              📞 התקשר עכשיו
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CoursesFAQ;