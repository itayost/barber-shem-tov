// src/components/academy/FAQSection/FAQAccordion.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { FAQItem } from './index';

interface FAQAccordionProps {
  faqs: FAQItem[];
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ faqs }) => {
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
    <div className="max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, index) => (
        <motion.div
          key={faq.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="bg-charcoal border border-lightgrey/10 hover:border-gold/20 transition-colors duration-300"
        >
          <button
            onClick={() => toggleItem(faq.id)}
            className="w-full flex items-center justify-between p-6 text-right focus:outline-none"
            aria-expanded={openItems.has(faq.id)}
          >
            <h3 className="text-lg text-gold font-medium">{faq.question}</h3>
            <motion.div
              animate={{ rotate: openItems.has(faq.id) ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-gold flex-shrink-0 ml-4"
            >
              <ChevronDownIcon className="w-5 h-5" />
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
                <div className="p-6 pt-0 text-lightgrey">
                  <div 
                    className="prose prose-invert prose-gold max-w-none" 
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default FAQAccordion;