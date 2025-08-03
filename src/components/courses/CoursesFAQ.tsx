// src/components/courses/CoursesFAQ.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CoursesFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData = [
    {
      question: 'האם צריך ניסיון קודם?',
      answer: 'לקורס למתחילים - לא נדרש ניסיון כלל. אנחנו מתחילים מהבסיס ומלמדים הכל צעד אחר צעד.'
    },
    {
      question: 'מה כולל מחיר הקורס?',
      answer: 'המחיר כולל את כל החומרים, ערכת כלים מקצועית, תעודה, וליווי אישי עד למציאת עבודה.'
    },
    {
      question: 'האם יש אפשרות לתשלומים?',
      answer: 'כן, אנחנו מציעים תשלומים נוחים ללא ריבית. ניתן לפרוס עד 12 תשלומים.'
    },
    {
      question: 'כמה זמן לוקח למצוא עבודה?',
      answer: 'רוב הבוגרים שלנו מוצאים עבודה תוך 30 יום מסיום הקורס. אנחנו מלווים עד להשמה מלאה.'
    },
    {
      question: 'איפה מתקיימים הקורסים?',
      answer: 'הקורסים מתקיימים באקדמיה שלנו בטירת הכרמל, במרחב מודרני ומאובזר.'
    }
  ];

  return (
    <section className="py-20 bg-charcoal" dir="rtl">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-light text-offwhite mb-4">
            שאלות <span className="font-normal text-gold">נפוצות</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-black/30 border border-gold/10 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-right flex items-center justify-between hover:bg-gold/5 transition-colors"
              >
                <span className="font-medium text-offwhite">{faq.question}</span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gold text-xl"
                >
                  ↓
                </motion.span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-4 text-lightgrey/80">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact for more questions */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-lightgrey/60 mb-4">יש לך שאלה נוספת?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="tel:+972528691415"
              className="text-gold hover:text-gold/80 transition-colors"
            >
              📞 052-869-1415
            </a>
            <span className="text-lightgrey/30">|</span>
            <a 
              href="https://wa.me/972528691415"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              💬 WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CoursesFAQ;