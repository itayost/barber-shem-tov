// src/components/academy/CTASection/index.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CourseExplorationCTA from './CourseExplorationCTA';
import ConsultationBooking from './ConsultationBooking';
import InformationRequestForm from './InformationRequestForm';
import VisitAcademyCTA from './VisitAcademyCTA';

// Types
type CTAType = 'courses' | 'consultation' | 'info' | 'visit';

interface CTASectionProps {
  title?: string;
  description?: string;
}

const CTASection: React.FC<CTASectionProps> = ({
  title = 'התחל את המסע שלך היום',
  description = 'בחר את האפשרות המתאימה לך ביותר כדי להתחיל את הקריירה שלך בספרות'
}) => {
  const [activeCTA, setActiveCTA] = useState<CTAType>('courses');

  const ctaOptions: { id: CTAType; title: string; description: string }[] = [
    {
      id: 'courses',
      title: 'לגלות את הקורסים',
      description: 'עיין בקורסים השונים ובחר את המסלול המתאים לך'
    },
    {
      id: 'consultation',
      title: 'ייעוץ אישי',
      description: 'קבע פגישת ייעוץ אישית עם אחד המדריכים'
    },
    {
      id: 'info',
      title: 'מידע נוסף',
      description: 'מלא טופס בסיסי ואנו ניצור איתך קשר עם פרטים'
    },
    {
      id: 'visit',
      title: 'ביקור באקדמיה',
      description: 'בוא לסיור היכרות עם הצוות והמתקנים שלנו'
    }
  ];

  // Animation variants
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-section-mobile md:py-section bg-gradient-to-b from-charcoal to-brown/30 relative" dir="rtl">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 right-1/4 w-96 h-96 bg-gold opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-gold opacity-5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="font-heebo text-h2 mb-4"
            variants={itemVariants}
          >
            {title}
          </motion.h2>
          <motion.p 
            className="text-lightgrey"
            variants={itemVariants}
          >
            {description}
          </motion.p>
        </motion.div>
        
        {/* CTA options */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {ctaOptions.map((option) => (
            <motion.button
              key={option.id}
              onClick={() => setActiveCTA(option.id)}
              className={`p-6 text-right transition-all duration-300 ${
                activeCTA === option.id
                  ? 'bg-gold/20 border-gold'
                  : 'bg-charcoal hover:bg-gold/10 border-lightgrey/10 hover:border-gold/30'
              } border`}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className={`font-bold text-lg mb-2 ${
                activeCTA === option.id ? 'text-gold' : 'text-offwhite'
              }`}>
                {option.title}
              </h3>
              <p className="text-sm text-lightgrey">{option.description}</p>
            </motion.button>
          ))}
        </motion.div>
        
        {/* Active CTA content */}
        <motion.div
          key={activeCTA}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto bg-charcoal border border-lightgrey/10 p-8"
        >
          {activeCTA === 'courses' && <CourseExplorationCTA />}
          {activeCTA === 'consultation' && <ConsultationBooking />}
          {activeCTA === 'info' && <InformationRequestForm />}
          {activeCTA === 'visit' && <VisitAcademyCTA />}
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;