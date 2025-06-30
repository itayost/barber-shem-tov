'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuxurySection } from '@/components/luxury';
import { Plus, Minus } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: 'כמה זמן נמשך הקורס הבסיסי?',
    answer:
      'הקורס הבסיסי נמשך 6 חודשים, עם מפגשים פעמיים בשבוע. כל מפגש נמשך כ-4 שעות הכוללות לימוד תיאורטי והתנסות מעשית.',
  },
  {
    question: 'האם יש דרישות קדם להרשמה?',
    answer:
      'לקורס הבסיסי אין דרישות קדם - הוא מיועד למתחילים ללא ניסיון קודם. לקורסים המתקדמים נדרש ניסיון של שנתיים לפחות או סיום קורס בסיסי.',
  },
  {
    question: 'האם מקבלים תעודה בסיום הקורס?',
    answer:
      'כן, בסיום הקורס ולאחר עמידה בכל הדרישות, הבוגרים מקבלים תעודה מוכרת ממשרד העבודה והרווחה.',
  },
  {
    question: 'מה כולל מחיר הקורס?',
    answer:
      'המחיר כולל את כל החומרים הלימודיים, ערכת כלים מקצועית בסיסית, חומרי עבודה במהלך הקורס, וליווי בחיפוש עבודה לאחר הסיום.',
  },
  {
    question: 'האם ניתן לשלם בתשלומים?',
    answer:
      'כן, אנו מציעים מגוון אפשרויות תשלום כולל פריסה עד 12 תשלומים ללא ריבית, וכן הסדרי מימון נוחים נוספים.',
  },
  {
    question: 'מה לוח הזמנים של הלימודים?',
    answer:
      'הלימודים מתקיימים בימים א׳-ה׳ בשעות הבוקר (09:00-13:00) או הערב (17:00-21:00). ניתן לבחור את המסלול המתאים לכם.',
  },
];

const ContactFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <LuxurySection
      label="שאלות נפוצות"
      title="יש לך"
      accent="שאלות?"
      size="large"
      bgColor="charcoal"
    >
      <div className="max-w-3xl mx-auto mt-16">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="border border-gold/20 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 flex items-center justify-between text-right hover:bg-gold/5 transition-colors duration-300"
              >
                <h3 className="text-lg font-light text-offwhite pl-4">{faq.question}</h3>
                <div className="flex-shrink-0">
                  <motion.div
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-gold" />
                    ) : (
                      <Plus className="w-5 h-5 text-gold" />
                    )}
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6 pt-2">
                      <p className="text-lightgrey font-light leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16 pt-16 border-t border-gold/10"
        >
          <p className="text-xl text-lightgrey mb-6">לא מצאת את התשובה שחיפשת?</p>
          <a
            href="#contact-form"
            className="inline-flex items-center gap-3 text-gold hover:gap-6 transition-all duration-500"
          >
            <span className="text-sm uppercase tracking-wider">שלח לנו הודעה</span>
            <span>←</span>
          </a>
        </motion.div>
      </div>
    </LuxurySection>
  );
};

export default ContactFAQ;
