// src/components/home/SuccessStories.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { academyTestimonials } from '@/lib/data';
import Image from 'next/image';

const SuccessStories = () => {
  const [activeStory, setActiveStory] = useState(0);
  
  // Success metrics
  const metrics = [
    { value: '92%', label: 'מוצאים עבודה תוך 3 חודשים' },
    { value: '40%', label: 'עליה ממוצעת בהכנסה' },
    { value: '500+', label: 'בוגרים פעילים בתעשייה' },
    { value: '4.9/5', label: 'דירוג ממוצע מבוגרים' }
  ];

  return (
    <section className="py-20 bg-brown/5 relative overflow-hidden" dir="rtl">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm uppercase tracking-wider">סיפורי הצלחה</span>
          <h2 className="font-heebo text-4xl md:text-5xl font-bold mt-4 mb-6">
            הבוגרים שלנו מובילים את התעשייה
          </h2>
        </motion.div>
        
        {/* Success metrics */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 bg-charcoal/50 backdrop-blur-sm border border-gold/10"
            >
              <div className="text-gold text-3xl md:text-4xl font-bold mb-2">
                {metric.value}
              </div>
              <div className="text-lightgrey text-sm">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Testimonials carousel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Testimonial content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {/* Quote */}
                <div className="relative mb-8">
                  <svg className="absolute -top-4 -right-4 w-16 h-16 text-gold/10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.5 10.5C6.5 8.01 8.51 6 11 6V9C11 10.1 10.1 11 9 11H8.5V12.5C8.5 13.6 9.4 14.5 10.5 14.5V16.5C8.01 16.5 6 14.49 6 12V10.5H6.5ZM14.5 10.5C14.5 8.01 16.51 6 19 6V9C19 10.1 18.1 11 17 11H16.5V12.5C16.5 13.6 17.4 14.5 18.5 14.5V16.5C16.01 16.5 14 14.49 14 12V10.5H14.5Z" />
                  </svg>
                  <p className="text-xl md:text-2xl text-offwhite leading-relaxed relative z-10">
                    {academyTestimonials[activeStory].text}
                  </p>
                </div>
                
                {/* Student info */}
                <div className="border-r-4 border-gold pr-6">
                  <h4 className="text-gold text-xl font-bold mb-1">
                    {academyTestimonials[activeStory].name}
                  </h4>
                  <p className="text-lightgrey mb-2">
                    בוגר {academyTestimonials[activeStory].year} • {academyTestimonials[activeStory].course}
                  </p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i}
                        className={`w-5 h-5 ${i < academyTestimonials[activeStory].rating ? 'text-gold' : 'text-lightgrey/30'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation dots */}
            <div className="flex gap-2 mt-8">
              {academyTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStory(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeStory 
                      ? 'w-8 bg-gold' 
                      : 'bg-lightgrey/30 hover:bg-lightgrey/50'
                  }`}
                  aria-label={`סיפור ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
          
          {/* Success image/graphic */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gold/10 rounded-full blur-3xl"></div>
              
              {/* Main image container */}
              <div className="relative bg-gradient-to-br from-gold/20 to-transparent p-8 rounded-sm">
                <div className="aspect-square relative overflow-hidden rounded-sm">
                  <Image
                    src={academyTestimonials[activeStory].image || "/images/testimonials/default.jpg"}
                    alt={academyTestimonials[activeStory].name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/images/testimonials/default.jpg";
                    }}
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent"></div>
                  
                  {/* Success badge */}
                  <div className="absolute bottom-4 right-4 bg-gold text-charcoal px-4 py-2 font-bold">
                    סיפור הצלחה
                  </div>
                </div>
                
                {/* Floating elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute -top-4 -left-4 bg-charcoal border border-gold/30 p-4"
                >
                  <div className="text-gold text-2xl font-bold">{academyTestimonials[activeStory].year}</div>
                  <div className="text-lightgrey text-sm">שנת סיום</div>
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, delay: 1.5 }}
                  className="absolute -bottom-4 -right-4 bg-charcoal border border-gold/30 p-4"
                >
                  <div className="text-gold text-2xl font-bold">#{activeStory + 1}</div>
                  <div className="text-lightgrey text-sm">בוגר מצטיין</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lightgrey mb-6">
            רוצה להיות סיפור ההצלחה הבא שלנו?
          </p>
          <Button href="/contact" variant="primary" size="large">
            התחל את המסע שלך
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default SuccessStories;