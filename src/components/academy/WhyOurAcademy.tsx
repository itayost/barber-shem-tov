// src/components/academy/WhyOurAcademy.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

const reasons = [
  {
    id: 'practical',
    icon: '🎯',
    title: '70% התנסות מעשית',
    description: 'עבודה עם לקוחות אמיתיים מהיום הראשון',
    details: [
      '20+ לקוחות בקורס',
      'הדרכה צמודה',
      'ביקורת בונה',
      'בניית ביטחון'
    ],
    color: 'border-green-500/30 hover:border-green-500/50'
  },
  {
    id: 'small-groups',
    icon: '👥',
    title: 'כיתות קטנות',
    description: 'מקסימום 12 תלמידים לכיתה',
    details: [
      'יחס אישי',
      'למידה מותאמת',
      'תשומת לב מלאה',
      'אווירה משפחתית'
    ],
    color: 'border-blue-500/30 hover:border-blue-500/50'
  },
  {
    id: 'job-network',
    icon: '🤝',
    title: 'רשת השמה',
    description: '50+ מספרות שותפות',
    details: [
      'ראיונות מובטחים',
      'המלצות אישיות',
      'ליווי עד השמה',
      'קשרים בתעשייה'
    ],
    color: 'border-purple-500/30 hover:border-purple-500/50'
  },
  {
    id: 'flexible',
    icon: '💰',
    title: 'גמישות בתשלום',
    description: 'תנאי תשלום נוחים',
    details: [
      'עד 4 תשלומים',
      'ללא ריבית',
      'מחירים הוגנים',
      'שקיפות מלאה'
    ],
    color: 'border-gold/30 hover:border-gold/50'
  }
];

const WhyOurAcademy: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section className="py-20 md:py-32 bg-charcoal relative overflow-hidden" dir="rtl">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-h2 md:text-5xl font-bold mb-4">
            מה מייחד את <span className="text-gold">האקדמיה שלנו</span>?
          </h2>
          <p className="text-lightgrey text-xl max-w-2xl mx-auto">
            4 סיבות למה הבוגרים שלנו מצליחים יותר
          </p>
        </motion.div>

        {/* Reasons grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.id}
              variants={itemVariants}
              className={`bg-charcoal border-2 p-8 transition-all duration-300 hover:-translate-y-2 ${reason.color}`}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
              }}
            >
              {/* Icon */}
              <div className="text-6xl mb-6 text-center">
                {reason.icon}
              </div>

              {/* Title */}
              <h3 className="text-h4 font-bold mb-3 text-center text-offwhite">
                {reason.title}
              </h3>

              {/* Description */}
              <p className="text-gold text-center mb-6 font-medium">
                {reason.description}
              </p>

              {/* Details list */}
              <ul className="space-y-2">
                {reason.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center text-lightgrey text-sm">
                    <span className="text-gold ml-2">✓</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom emphasis */}
        <motion.div 
          className="text-center mt-16 bg-gold/5 border border-gold/20 p-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-h3 font-bold mb-4">
            התוצאה? <span className="text-gold">הצלחה מוכחת</span>
          </h3>
          <p className="text-lightgrey text-lg">
            92% מהבוגרים שלנו מוצאים עבודה תוך 3 חודשים עם שכר התחלתי ממוצע של ₪7,500
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyOurAcademy;