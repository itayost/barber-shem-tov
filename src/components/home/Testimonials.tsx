// src/components/home/Testimonials.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Success stories data - focused on outcomes
const testimonials = [
  {
    id: 1,
    name: 'עמית יצחקי',
    photo: '/images/testimonials/amit.jpg',
    graduationYear: 2023,
    currentPosition: 'ספר ראשי במספרת אליט, תל אביב',
    beforeSalary: '₪4,500',
    afterSalary: '₪9,800',
    rating: 5,
    quote: 'תוך חודשיים מסיום הקורס קיבלתי הצעת עבודה במספרת יוקרה בתל אביב. השכר יותר מהכפיל את עצמו והעבודה מספקת בטירוף. האקדמיה לא רק לימדה אותי טכניקות - היא שינתה לי את החיים.',
    course: 'קורס מקצועי מתקדם',
    highlight: 'השכר הכפיל את עצמו תוך חודשיים'
  },
  {
    id: 2,
    name: 'דני כהן',
    photo: '/images/testimonials/danny.jpg',
    graduationYear: 2022,
    currentPosition: 'בעל מספרת "סטייל מאסטר", חיפה',
    beforeSalary: 'מובטל',
    afterSalary: '₪15,000+',
    rating: 5,
    quote: 'הגעתי לאקדמיה ללא שום ניסיון. היום אני בעל מספרה עצמאית עם 4 עובדים ורשימת המתנה של חודש וחצי. הליווי העסקי שקיבלתי פה היה קריטי להצלחה שלי.',
    course: 'מסלול יזמות + ניהול עסקי',
    highlight: 'ממובטל לבעל עסק מצליח תוך שנה'
  },
  {
    id: 3,
    name: 'רון אשכנזי',
    photo: '/images/testimonials/ron.jpg',
    graduationYear: 2023,
    currentPosition: 'ספר פרטי ללקוחות VIP',
    beforeSalary: '₪6,200',
    afterSalary: '₪12,500',
    rating: 5,
    quote: 'העברתי קריירה בגיל 35 ולא הייתי בטוח שזה יעבוד. האקדמיה לא רק הכשירה אותי טכנית אלא גם נתנה לי ביטחון עצמי. היום אני עובד עם לקוחות VIP ומרוויח פי שניים ממה שהרווחתי בעבר.',
    course: 'קורס התמחות VIP',
    highlight: 'החליף קריירה בהצלחה בגיל 35'
  }
];

const Testimonials: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7,
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Render stars
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-xl ${i < rating ? 'text-yellow-400' : 'text-gray-400'}`}>
        ⭐
      </span>
    ));
  };

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

        {/* Testimonials grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              className="bg-charcoal border border-lightgrey/10 p-8 hover:border-gold/30 transition-all duration-300 hover:-translate-y-2 group"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)"
              }}
            >
              {/* Header with photo and basic info */}
              <div className="flex items-start gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gold/30 flex-shrink-0">
                  <Image
                    src={testimonial.photo}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      // Fallback to colored avatar if image doesn't exist
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      if (target.parentElement) {
                        target.parentElement.innerHTML = `
                          <div class="w-full h-full bg-gold/20 flex items-center justify-center text-gold font-bold text-xl">
                            ${testimonial.name.charAt(0)}
                          </div>
                        `;
                      }
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-offwhite group-hover:text-gold transition-colors">
                    {testimonial.name}
                  </h3>
                  <p className="text-gold text-sm font-medium">
                    בוגר {testimonial.graduationYear}
                  </p>
                  <p className="text-lightgrey text-sm">
                    {testimonial.currentPosition}
                  </p>
                </div>
              </div>

              {/* Star rating */}
              <div className="flex gap-1 mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Highlight achievement */}
              <div className="bg-gold/10 border border-gold/20 p-3 mb-6 text-center">
                <p className="text-gold font-bold text-sm">
                  ✨ {testimonial.highlight}
                </p>
              </div>

              {/* Salary comparison */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-xs text-lightgrey mb-1">לפני:</div>
                  <div className="text-lg font-bold text-red-400">
                    {testimonial.beforeSalary}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-lightgrey mb-1">אחרי:</div>
                  <div className="text-lg font-bold text-green-400">
                    {testimonial.afterSalary}
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="mb-6">
                <div className="text-gold text-4xl mb-2 opacity-50">"</div>
                <p className="text-lightgrey leading-relaxed italic">
                  {testimonial.quote}
                </p>
                <div className="text-gold text-4xl text-left opacity-50">"</div>
              </div>

              {/* Course info */}
              <div className="pt-4 border-t border-lightgrey/10">
                <p className="text-xs text-lightgrey">
                  סיים: {testimonial.course}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

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
              🚀 הרשמה לקורס
            </motion.a>
            
            <motion.a
              href="/contact?consultation=true"
              className="border border-gold text-gold py-4 px-8 font-bold text-lg hover:bg-gold/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              💬 שיחת ייעוץ חינם
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