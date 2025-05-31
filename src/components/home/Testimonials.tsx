// components/home/Testimonials.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Carousel from '@/components/common/Carousel';
import TestimonialCard from './TestimonialCard';
import { academyTestimonials } from '@/lib/data';

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-charcoal relative overflow-hidden" dir="rtl">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brown rounded-full blur-3xl"></div>
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
            סיפורי <span className="text-gold">הצלחה אמיתיים</span>
          </h2>
          <p className="text-lightgrey text-xl max-w-2xl mx-auto">
            הבוגרים שלנו משנים חיים - הנה הסיפורים שלהם
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <Carousel autoplayDelay={5000}>
          {academyTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              {...testimonial}
              index={index}
            />
          ))}
        </Carousel>

        {/* Call to action */}
        <motion.div 
          className="text-center mt-16 bg-gold/5 border border-gold/20 p-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-h3 font-bold mb-4">
            מוכן להיות <span className="text-gold">הסיפור הבא</span>?
          </h3>
          <p className="text-lightgrey text-lg mb-6">
            הצטרף ל-500+ בוגרים מצליחים שכבר שינו את החיים שלהם
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="/courses"
              className="bg-gold text-charcoal py-4 px-8 font-bold text-lg hover:bg-gold/90 transition-all shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              הרשמה לקורס
            </motion.a>
            
            <motion.a
              href="/contact?consultation=true"
              className="border border-gold text-gold py-4 px-8 font-bold text-lg hover:bg-gold/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              שיחת ייעוץ חינם
            </motion.a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-lightgrey/80">
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>ללא התחייבות</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>ייעוץ מקצועי</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>תשובה תוך 24 שעות</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;