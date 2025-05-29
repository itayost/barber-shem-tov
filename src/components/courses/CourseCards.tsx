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
              {/* Course header */}
              <div className="relative p-8 bg-gradient-to-br from-gold/10 to-brown/10">
                {/* Popular badge */}
                {course.featured && (
                  <div className="absolute top-4 left-4 bg-gold text-charcoal px-4 py-2 text-sm font-bold">
                    🔥 הכי פופולרי
                  </div>
                )}
                
                {/* Spots left indicator */}
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 text-sm font-bold rounded-full">
                  נותרו {course.spotsLeft} מקומות!
                </div>

                <h2 className="text-h2 font-bold mb-2 mt-8 group-hover:text-gold transition-colors">
                  {course.name_he}
                </h2>
                <p className="text-lightgrey text-lg mb-6 leading-relaxed">
                  {course.description_he}
                </p>

                {/* Price and payment */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="text-4xl font-bold text-gold">
                    ₪{course.price.toLocaleString()}
                  </div>
                  <div className="text-lightgrey">
                    <div className="text-sm">משך: {course.duration_he}</div>
                    <div className="text-sm">{course.paymentPlan}</div>
                  </div>
                </div>

                {/* Next start date */}
                <div className="bg-charcoal/50 p-4 border border-gold/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-gold font-bold">מחזור הבא:</span>
                      <span className="text-offwhite mr-2">{course.nextStartDate}</span>
                    </div>
                    <div className="text-sm text-lightgrey">
                      📅 יש למהר!
                    </div>
                  </div>
                </div>
              </div>

              {/* Course details */}
              <div className="p-8">
                <h3 className="font-bold mb-4 text-offwhite">מה כלול בקורס:</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                  {course.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-lightgrey">
                      <span className="text-gold ml-3 mt-1 flex-shrink-0">✓</span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Instructor info */}
                <div className="bg-brown/10 p-4 mb-6 border border-brown/20">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                      <span className="text-gold font-bold">
                        {course.instructorName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="text-gold font-bold">מדריך הקורס:</div>
                      <div className="text-offwhite">{course.instructorName}</div>
                    </div>
                  </div>
                </div>

                {/* Prerequisites */}
                {course.prerequisites && (
                  <div className="mb-6">
                    <h4 className="font-bold mb-2 text-gold">דרישות קדם:</h4>
                    <p className="text-lightgrey text-sm">{course.prerequisites}</p>
                  </div>
                )}

                {/* Action buttons */}
                <div className="space-y-4">
                  <motion.a
                    href={`/contact?course=${encodeURIComponent(course.name_he)}`}
                    className="block w-full bg-gold text-charcoal py-4 px-6 font-bold text-lg text-center hover:bg-gold/90 transition-all shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    🚀 הרשם עכשיו
                  </motion.a>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <motion.a
                      href={course.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 text-white py-3 px-4 font-bold text-center hover:bg-green-600 transition-all"
                      whileHover={{ scale: 1.02 }}
                    >
                      💬 WhatsApp לפרטים
                    </motion.a>
                    
                    <motion.a
                      href="/contact?consultation=true"
                      className="border border-gold text-gold py-3 px-4 font-bold text-center hover:bg-gold/10 transition-all"
                      whileHover={{ scale: 1.02 }}
                    >
                      📞 שיחת ייעוץ
                    </motion.a>
                  </div>
                </div>

                {/* Trust indicators */}
                <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-lightgrey/80">
                  <div className="flex items-center gap-1">
                    <span className="text-green-400">✓</span>
                    <span>ללא התחייבות</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-green-400">✓</span>
                    <span>תשובה תוך 24 שעות</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-green-400">✓</span>
                    <span>ליווי אישי</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No results state */}
        {enhancedCourses.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl mb-4">🤔</div>
            <h3 className="text-h3 mb-4">אין קורסים זמינים בקטגוריה זו</h3>
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