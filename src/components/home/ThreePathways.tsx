// src/components/home/ThreePathways.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/common/Button';
import Carousel from '@/components/common/Carousel';
import PathwayCard from '@/components/home/PathwayCard';
import { courses } from '@/lib/data';

const ThreePathways: React.FC = () => {
  // Map courses to pathway format
  const pathways = courses.map((course) => ({
    id: course.id,
    title: course.name_he,
    subtitle: course.category === 'beginner'
      ? 'צעד ראשון לקריירה'
      : course.category === 'advanced'
      ? 'העמק את המקצועיות'
      : 'הפוך למומחה מוביל',
    duration: course.duration_he,
    price: course.price,
    description: course.description_he,
    features: course.features || [
      course.prerequisites || 'מתאים לכולם',
      course.certification || 'תעודה מקצועית',
      `${course.maxStudents || 12} תלמידים מקסימום בכיתה`,
      'ליווי אישי צמוד'
    ],
    icon: course.category === 'beginner'
      ? '🎯'
      : course.category === 'advanced'
      ? '⚡'
      : '👑',
    popular: course.featured || false,
    nextStep: course.category === 'beginner'
      ? 'התחל מהבסיס'
      : course.category === 'advanced'
      ? 'שדרג את הכישורים'
      : 'בנה את העסק שלך',
    instructor: 'בר שם טוב',
    nextSession: course.nextSession || '15 בינואר',
    prerequisites: course.prerequisites,
    certification: course.certification
  }));

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-charcoal relative overflow-hidden" dir="rtl">
      {/* Background decorative elements - Subtle on mobile */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 right-0 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-gold rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-brown rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header - Mobile optimized */}
        <motion.div 
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            בחר את <span className="text-gold">המסלול שלך</span>
          </h2>
          <p className="text-lightgrey text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4">
            מתחיל מהבסיס ועד להפיכה למומחה מוביל
          </p>
        </motion.div>

        {/* Pathway cards carousel - Mobile optimized */}
        <motion.div 
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Carousel autoplayDelay={5000}>
            {pathways.map((pathway) => (
              <div key={pathway.id} className="px-2 sm:px-4">
                <PathwayCard pathway={pathway} />
              </div>
            ))}
          </Carousel>
        </motion.div>

        {/* Bottom CTA - Mobile friendly */}
        <motion.div 
          className="text-center mt-8 sm:mt-12 md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-lightgrey mb-4 sm:mb-6 text-sm sm:text-base md:text-lg">
            לא בטוח איזה מסלול מתאים לך?
          </p>
          <Button 
            href="/contact?consultation=true" 
            variant="secondary"
            size="medium"
            className="min-w-[200px]"
          >
            💬 קבל ייעוץ אישי חינם
          </Button>
        </motion.div>

        {/* Trust indicators - Mobile optimized */}
        <motion.div 
          className="mt-8 sm:mt-12 flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-lightgrey/80"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center gap-1">
            <span className="text-green-400">✓</span>
            <span>ללא התחייבות</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-green-400">✓</span>
            <span>15 דקות בלבד</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-green-400">✓</span>
            <span>תשובה תוך 24 שעות</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ThreePathways;