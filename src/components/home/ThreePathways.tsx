// src/components/home/ThreePathways.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/common/Button';
import Carousel from '@/components/common/Carousel';
import PathwayCard from '@/components/home/PathwayCard';
import { courses } from '@/lib/data';

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
  features: [
    course.prerequisites || '',
    course.certification || '',
    course.duration_he,
    `${course.price.toLocaleString()} ₪`
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
    : 'בנה את העסק שלך'
}));

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
        <Carousel>
          {pathways.map((pathway, index) => (
            <PathwayCard key={pathway.id} pathway={pathway} />
          ))}
        </Carousel>

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