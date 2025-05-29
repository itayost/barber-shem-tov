// src/components/home/ThreePathways.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/common/Button';

// Pathway data
const pathways = [
  {
    id: 'beginner',
    title: 'מתחיל',
    subtitle: 'צעד ראשון לקריירה',
    duration: '4 שבועות',
    price: '3,200',
    description: 'למד את יסודות הספרות המקצועית עם התמחות מעשית',
    features: [
      'טכניקות בסיסיות',
      'עבודה עם לקוחות',
      'תעודת הסמכה',
      'תמיכה בהשמה'
    ],
    icon: '🎯',
    popular: false,
    nextStep: 'התחל מהבסיס'
  },
  {
    id: 'advanced',
    title: 'מתקדם',
    subtitle: 'העמק את המקצועיות',
    duration: 'יומיים',
    price: '1,800',
    description: 'טכניקות מתקדמות ועיצוב טרנדי למקצוענים',
    features: [
      'טכניקות מתקדמות',
      'עיצוב טרנדי',
      'לקוחות VIP',
      'תעודת מומחה'
    ],
    icon: '⚡',
    popular: true,
    nextStep: 'שדרג את הכישורים'
  },
  {
    id: 'master',
    title: 'מאסטר',
    subtitle: 'הפוך למומחה מוביל',
    duration: 'חודש',
    price: '5,500',
    description: 'השתלמות מקיפה + ניהול עסקי לפתיחת מספרה',
    features: [
      'כל הטכניקות',
      'ניהול עסקי',
      'מרכז הכשרה',
      'ליווי עד להצלחה'
    ],
    icon: '👑',
    popular: false,
    nextStep: 'בנה את העסק שלך'
  }
];

const ThreePathways: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
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
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-brown rounded-full blur-3xl"></div>
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
          <h2 className="text-h2 md:text-5xl font-bold mb-4">
            בחר את <span className="text-gold">המסלול שלך</span>
          </h2>
          <p className="text-lightgrey text-xl max-w-2xl mx-auto">
            מתחיל מהבסיס ועד להפיכה למומחה מוביל - יש לנו מסלול בדיוק בשבילך
          </p>
        </motion.div>

        {/* Pathway cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {pathways.map((pathway, index) => (
            <motion.div
              key={pathway.id}
              variants={cardVariants}
              className={`relative bg-charcoal border-2 p-8 transition-all duration-300 hover:-translate-y-2 group ${
                pathway.popular 
                  ? 'border-gold shadow-gold/20 shadow-2xl' 
                  : 'border-lightgrey/20 hover:border-gold/50'
              }`}
              whileHover={{ 
                scale: 1.02,
                boxShadow: pathway.popular 
                  ? "0 25px 50px rgba(201, 166, 107, 0.3)" 
                  : "0 20px 40px rgba(0, 0, 0, 0.2)"
              }}
            >
              {/* Popular badge */}
              {pathway.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gold text-charcoal px-6 py-2 text-sm font-bold">
                  הכי פופולרי 🔥
                </div>
              )}

              {/* Pathway number */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-gold rounded-full flex items-center justify-center text-charcoal font-bold text-xl">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="text-6xl mb-6 text-center">
                {pathway.icon}
              </div>

              {/* Title */}
              <h3 className="text-h3 font-bold mb-2 text-center">
                {pathway.title}
              </h3>
              <p className="text-gold text-center mb-6 font-medium">
                {pathway.subtitle}
              </p>

              {/* Price and duration */}
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-offwhite mb-2">
                  ₪{pathway.price}
                </div>
                <div className="text-lightgrey">
                  משך: {pathway.duration}
                </div>
              </div>

              {/* Description */}
              <p className="text-lightgrey text-center mb-6 leading-relaxed">
                {pathway.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {pathway.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-lightgrey">
                    <span className="text-gold ml-3 mt-1 flex-shrink-0">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <div className="mt-auto">
                <Button
                  href={`/courses?pathway=${pathway.id}`}
                  variant={pathway.popular ? "primary" : "secondary"}
                  className="w-full py-4 text-lg font-bold group-hover:scale-105 transition-transform"
                >
                  {pathway.nextStep}
                </Button>
              </div>

              {/* Pathway progression arrow (except last) */}
              {index < pathways.length - 1 && (
                <div className="hidden md:block absolute -left-4 top-1/2 transform -translate-y-1/2 text-gold/50">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-lightgrey mb-6 text-lg">
            לא בטוח איזה מסלול מתאים לך?
          </p>
          <Button 
            href="/contact?consultation=true" 
            variant="tertiary"
            className="text-xl"
          >
            קבל ייעוץ אישי חינם 💬
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ThreePathways;