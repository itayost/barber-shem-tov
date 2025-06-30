'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { LuxurySection, LuxuryLabel } from '@/components/luxury';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  quote: string;
  course: string;
  year: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'יונתן כהן',
    role: 'בעל מספרה, תל אביב',
    image: '/images/testimonials/testimonial-1.jpg',
    quote:
      'האקדמיה של The Fader שינתה את חיי המקצועיים. הידע, הכלים והביטחון שקיבלתי כאן הם הבסיס להצלחה שלי היום.',
    course: 'קורס מתקדם',
    year: '2022',
  },
  {
    id: '2',
    name: 'מיכל לוי',
    role: 'ספרית בכירה, חיפה',
    image: '/images/testimonials/testimonial-2.jpg',
    quote:
      'המקצועיות, תשומת הלב לפרטים והליווי האישי הפכו אותי מתלמידה לאמנית אמיתית. אני גאה להיות בוגרת האקדמיה.',
    course: 'קורס בסיסי',
    year: '2021',
  },
  {
    id: '3',
    name: 'דניאל אברהם',
    role: 'מנהל רשת מספרות',
    image: '/images/testimonials/testimonial-3.jpg',
    quote:
      'ההשקעה בקורס הייתה ההחלטה הטובה ביותר שעשיתי. היום אני מנהל רשת מצליחה ומעסיק בוגרים של האקדמיה.',
    course: 'קורס מתקדם',
    year: '2020',
  },
];

const LuxuryTestimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const navigate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex(prev => {
      if (newDirection === 1) {
        return prev === testimonials.length - 1 ? 0 : prev + 1;
      }
      return prev === 0 ? testimonials.length - 1 : prev - 1;
    });
  };

  const currentTestimonial = testimonials[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <LuxurySection
      label="סיפורי הצלחה"
      title="בוגרים"
      accent="מספרים"
      size="large"
      bgColor="charcoal"
    >
      <div className="relative max-w-6xl mx-auto mt-16 md:mt-20">
        {/* Main Testimonial Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <motion.div
            className="relative aspect-[3/4] lg:aspect-[4/5] overflow-hidden order-2 lg:order-1"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={currentTestimonial.id}
                src={currentTestimonial.image}
                alt={currentTestimonial.name}
                className="absolute inset-0 w-full h-full object-cover grayscale"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.5 },
                }}
              />
            </AnimatePresence>

            {/* Border overlay */}
            <div className="absolute inset-0 border border-gold/20 pointer-events-none" />

            {/* Quote icon */}
            <div className="absolute top-8 start-8 w-16 h-16 bg-black/80 backdrop-blur-sm flex items-center justify-center">
              <Quote className="w-8 h-8 text-gold" />
            </div>
          </motion.div>

          {/* Content Side */}
          <div className="relative order-1 lg:order-2">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentTestimonial.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.5 },
                }}
                className="space-y-6"
              >
                {/* Quote */}
                <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light text-offwhite leading-relaxed">
                  "{currentTestimonial.quote}"
                </blockquote>

                {/* Author Info */}
                <div className="space-y-2">
                  <h4 className="text-xl font-light text-gold">{currentTestimonial.name}</h4>
                  <p className="text-lightgrey">{currentTestimonial.role}</p>
                  <div className="flex items-center gap-4 text-sm text-darkgrey">
                    <span>{currentTestimonial.course}</span>
                    <span>•</span>
                    <span>בוגר {currentTestimonial.year}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center gap-8 mt-12">
              {/* Progress Indicators */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const newDirection = index > currentIndex ? 1 : -1;
                      setDirection(newDirection);
                      setCurrentIndex(index);
                    }}
                    className={`
                      h-px w-12 transition-all duration-500
                      ${index === currentIndex ? 'bg-gold' : 'bg-gold/20 hover:bg-gold/40'}
                    `}
                    aria-label={`עדות ${index + 1}`}
                  />
                ))}
              </div>

              {/* Arrow Navigation */}
              <div className="flex gap-4 ms-auto">
                <button
                  onClick={() => navigate(-1)}
                  className="
                    w-12 h-12 border border-gold/20
                    flex items-center justify-center
                    hover:border-gold hover:bg-gold hover:text-black
                    transition-all duration-500
                  "
                  aria-label="הקודם"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigate(1)}
                  className="
                    w-12 h-12 border border-gold/20
                    flex items-center justify-center
                    hover:border-gold hover:bg-gold hover:text-black
                    transition-all duration-500
                  "
                  aria-label="הבא"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-20 border-t border-gold/10"
        >
          {[
            { number: '300+', label: 'בוגרים' },
            { number: '95%', label: 'שיעור השמה' },
            { number: '7', label: 'שנות ניסיון' },
            { number: '4.9', label: 'דירוג ממוצע' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-thin text-gold mb-2">{stat.number}</div>
              <LuxuryLabel size="xs" color="lightgrey">
                {stat.label}
              </LuxuryLabel>
            </div>
          ))}
        </motion.div>
      </div>
    </LuxurySection>
  );
};

export default LuxuryTestimonials;
