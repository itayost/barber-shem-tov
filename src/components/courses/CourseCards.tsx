// src/components/courses/CourseCards.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { courses, instructors } from '@/lib/data';

interface CourseCardsProps {
  activeFilter: 'all' | 'beginner' | 'advanced';
}

const CourseCards: React.FC<CourseCardsProps> = ({ activeFilter }) => {
  // Filter courses based on active filter
  const filteredCourses = activeFilter === 'all' 
    ? courses 
    : courses.filter(course => course.category === activeFilter);

  // Enhanced course data with additional details
  const enhancedCourses = filteredCourses.map(course => {
    const instructor = instructors.find(inst => inst.id === course.instructor);
    
    return {
      ...course,
      instructorName: instructor?.name || 'מדריך מקצועי',
      paymentPlan: course.price > 3000 ? 'אפשרות לתשלומים' : 'תשלום יחיד',
      nextStartDate: course.category === 'beginner' ? '15 בינואר' : '22 בינואר',
      spotsLeft: course.category === 'beginner' ? 3 : 7,
      whatsappLink: `https://wa.me/972528691415?text=היי! אשמח לקבל פרטים על ${course.name_he} 🎯`,
      features: course.category === 'beginner' 
        ? [
            'למידה מהבסיס ללא ניסיון קודם',
            'עבודה עם 20+ לקוחות אמיתיים',
            'ערכת כלים מקצועית כלולה',
            'תעודת הסמכה מוכרת',
            'ליווי בחיפוש עבודה',
            'גישה לקהילת בוגרים'
          ]
        : [
            'טכניקות עיצוב מתקדמות',
            'סדנאות עם מומחים בינלאומיים',
            'לקוחות VIP ויוקרה',
            'תעודת מומחה מתקדם',
            'רשת קשרים מקצועית',
            'הזדמנויות עבודה בחו"ל'
          ]
    };
  });

  return (
    <section className="py-20 bg-charcoal relative overflow-hidden" dir="rtl">
      <div className="container mx-auto px-6">
        {/* Results count */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-lightgrey">
            נמצאו <span className="text-gold font-bold">{enhancedCourses.length}</span> קורסים 
            {activeFilter !== 'all' && (
              <span> בקטגוריה <span className="text-gold">
                {activeFilter === 'beginner' ? 'למתחילים' : 'מתקדמים'}
              </span></span>
            )}
          </p>
        </motion.div>

        {/* Course cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {enhancedCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-charcoal border border-lightgrey/10 hover:border-gold/30 transition-all duration-300 overflow-hidden group"
              whileHover={{ y: -5, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)" }}
            >
              {/* Course header with enhanced gradient */}
              <div className="relative p-8 bg-gradient-to-br from-gold/20 via-gold/10 to-brown/10">
                {/* Enhanced popular badge */}
                {course.featured && (
                  <motion.div 
                    className="absolute top-4 left-4 bg-gradient-to-r from-gold to-gold/80 text-charcoal px-4 py-2 text-sm font-bold rounded-full shadow-lg"
                    whileHover={{ scale: 1.05 }}
                  >
                    🔥 הכי פופולרי
                  </motion.div>
                )}
                
                {/* Enhanced spots left indicator */}
                <motion.div 
                  className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 text-sm font-bold rounded-full shadow-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  נותרו {course.spotsLeft} מקומות!
                </motion.div>

                <h2 className="text-h2 font-bold mb-2 mt-8 group-hover:text-gold transition-colors">
                  {course.name_he}
                </h2>
                <p className="text-lightgrey text-lg mb-6 leading-relaxed">
                  {course.description_he}
                </p>

                {/* Enhanced price and payment section */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="text-4xl font-bold bg-gradient-to-r from-gold to-gold/80 bg-clip-text text-transparent">
                    ₪{course.price.toLocaleString()}
                  </div>
                  <div className="text-lightgrey">
                    <div className="text-sm flex items-center gap-2">
                      <span className="text-gold">⏱️</span> משך: {course.duration_he}
                    </div>
                    <div className="text-sm flex items-center gap-2">
                      <span className="text-gold">💳</span> {course.paymentPlan}
                    </div>
                  </div>
                </div>

                {/* Enhanced next start date section */}
                <div className="bg-charcoal/50 p-4 border border-gold/20 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-gold font-bold">מחזור הבא:</span>
                      <span className="text-offwhite mr-2"> {course.nextStartDate}</span>
                    </div>
                    <motion.div 
                      className="text-sm text-lightgrey flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="animate-pulse">📅</span> יש למהר!
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Enhanced course details section */}
              <div className="p-8">
                <h3 className="font-bold mb-4 text-offwhite flex items-center gap-2">
                  <span className="text-gold">✨</span> מה כלול בקורס:
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                  {course.features.map((feature, idx) => (
                    <motion.li 
                      key={idx} 
                      className="flex items-start text-lightgrey group"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-gold ml-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform">✓</span>
                      <span className="text-sm">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Enhanced instructor info */}
                <div className="bg-gradient-to-r from-brown/10 to-gold/5 p-4 mb-6 border border-gold/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold/80 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-charcoal font-bold">
                        {course.instructorName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="text-gold font-bold">מדריך הקורס:</div>
                      <div className="text-offwhite">{course.instructorName}</div>
                    </div>
                  </div>
                </div>

                {/* Enhanced action buttons */}
                <div className="space-y-4">
                  <motion.a
                    href={`/contact?course=${encodeURIComponent(course.name_he)}`}
                    className="block w-full bg-gradient-to-r from-gold to-gold/80 text-charcoal py-4 px-6 font-bold text-lg text-center hover:from-gold/90 hover:to-gold/70 transition-all shadow-lg hover:shadow-xl rounded-lg"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    🚀 הרשם עכשיו
                  </motion.a>
                  
                  <motion.a
                    href={course.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 font-bold text-center hover:from-green-600 hover:to-green-700 transition-all rounded-lg"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    💬 WhatsApp לפרטים
                  </motion.a>
                </div>

                {/* Enhanced trust indicators */}
                <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-lightgrey/80">
                  {[
                    { icon: '✓', text: 'ללא התחייבות' },
                    { icon: '✓', text: 'תשובה תוך 24 שעות' },
                    { icon: '✓', text: 'ליווי אישי' }
                  ].map((indicator, idx) => (
                    <motion.div 
                      key={idx}
                      className="flex items-center gap-1"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-green-400">{indicator.icon}</span>
                      <span>{indicator.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No results state */}
        {enhancedCourses.length === 0 && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl mb-4"></div>
            <h3 className="text-h3 mb-4">אין קורסים זמינים כרגע</h3>
            <p className="text-lightgrey mb-6">נסה לבחור קטגוריה אחרת או צור איתנו קשר לפרטים נוספים</p>
            <motion.a
              href="/contact"
              className="inline-block bg-gold text-charcoal py-3 px-6 font-bold hover:bg-gold/90 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              צור קשר
            </motion.a>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CourseCards;