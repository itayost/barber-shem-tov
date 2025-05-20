// src/components/academy/FAQSection/index.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import FAQAccordion from './FAQAccordion';
import StillHaveQuestions from './StillHaveQuestions';

// FAQ items type
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  description?: string;
  faqs: FAQItem[];
}

const FAQSection: React.FC<FAQSectionProps> = ({
  title = 'שאלות נפוצות',
  description = 'כאן תמצאו תשובות לשאלות הנפוצות ביותר שלנו על האקדמיה והקורסים',
  faqs
}) => {
  return (
    <section className="py-section-mobile md:py-section bg-charcoal relative overflow-hidden" dir="rtl">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
        <div className="w-full h-full bg-gradient-to-l from-gold via-gold/50 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="font-heebo text-h2 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h2>
          <motion.p 
            className="text-lightgrey"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {description}
          </motion.p>
        </div>

        {/* FAQ accordion items */}
        <FAQAccordion faqs={faqs} />

        {/* "Still have questions" section */}
        <StillHaveQuestions />
      </div>
    </section>
  );
};

export default FAQSection;