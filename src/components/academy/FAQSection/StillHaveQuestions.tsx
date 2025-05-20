// src/components/academy/FAQSection/StillHaveQuestions.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

const StillHaveQuestions: React.FC = () => {
  return (
    <motion.div 
      className="mt-16 bg-gold/10 border border-gold/20 rounded-sm p-8 text-center max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-h3 mb-4">עדיין יש לך שאלות?</h3>
      <p className="text-lightgrey mb-6">
        אנחנו כאן כדי לעזור. צור איתנו קשר ישירות ונשמח לענות על כל השאלות שלך.
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <a
          href="/contact?subject=academy-question"
          className="bg-gold text-charcoal py-3 px-6 font-medium hover:bg-opacity-90 transition-colors">
        
          צור קשר
        </a>
      </div>
    </motion.div>
  );
};

export default StillHaveQuestions;