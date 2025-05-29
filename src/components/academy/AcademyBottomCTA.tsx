// src/components/academy/AcademyBottomCTA.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { academyInfo } from '@/lib/data';

const AcademyBottomCTA: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-brown/10 to-charcoal relative overflow-hidden" dir="rtl">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main CTA */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-h1 md:text-5xl font-bold mb-6 leading-tight">
              מוכן להתחיל את<br/>
              <span className="text-gold">המסע שלך איתנו</span>?
            </h2>
            <p className="text-lightgrey text-xl md:text-2xl max-w-3xl mx-auto mb-8 leading-relaxed">
              3 דרכים קלות ליצור קשר ולקבל את כל המידע שאתה צריך
            </p>
          </motion.div>

          {/* Contact options grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Academy tour */}
            <motion.div 
              className="bg-charcoal border border-purple-500/20 p-8 text-center hover:border-purple-500/40 transition-all duration-300 group"
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)" }}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🏛️</div>
              <h3 className="text-h4 font-bold mb-3 text-purple-400">סיור באקדמיה</h3>
              <p className="text-lightgrey mb-6 leading-relaxed">
                בוא לראות את הכיתות, להכיר את הצוות ולהרגיש את האווירה
              </p>
              <ul className="text-sm text-lightgrey/80 mb-6 space-y-2">
                <li>✓ סיור מודרך אישי</li>
                <li>✓ הכרות עם המדריכים</li>
                <li>✓ צפייה בשיעור חי</li>
                <li>✓ שיחה עם תלמידים</li>
              </ul>
              <motion.a
                href="/contact?tour=true"
                className="block w-full bg-purple-500 text-white py-4 px-6 font-bold hover:bg-purple-600 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                קבע סיור
              </motion.a>
            </motion.div>

            {/* WhatsApp - Bar */}
            <motion.div 
              className="bg-charcoal border border-green-500/20 p-8 text-center hover:border-green-500/40 transition-all duration-300 group"
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)" }}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">💬</div>
              <h3 className="text-h4 font-bold mb-3 text-green-400">דבר עם בר</h3>
              <p className="text-lightgrey mb-6 leading-relaxed">
                שיחה ישירה עם מייסד האקדמיה לכל שאלה
              </p>
              <ul className="text-sm text-lightgrey/80 mb-6 space-y-2">
                <li>✓ תשובה אישית ומהירה</li>
                <li>✓ ייעוץ מקצועי</li>
                <li>✓ בחירת מסלול מתאים</li>
                <li>✓ זמין עד השעות המאוחרות</li>
              </ul>
              <motion.a
                href="https://wa.me/972528691415?text=היי בר! אשמח לשמוע עוד על האקדמיה 🎓"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-green-500 text-white py-4 px-6 font-bold hover:bg-green-600 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                WhatsApp לבר
              </motion.a>
            </motion.div>

            {/* Info session */}
            <motion.div 
              className="bg-charcoal border border-gold/20 p-8 text-center hover:border-gold/40 transition-all duration-300 group"
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)" }}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🎯</div>
              <h3 className="text-h4 font-bold mb-3 text-gold">מפגש היכרות</h3>
              <p className="text-lightgrey mb-6 leading-relaxed">
                מפגש קבוצתי חינם כל יום חמישי ב-18:00
              </p>
              <ul className="text-sm text-lightgrey/80 mb-6 space-y-2">
                <li>✓ הצגת תוכניות הלימוד</li>
                <li>✓ סיור במתקנים</li>
                <li>✓ שאלות ותשובות</li>
                <li>✓ הטבות להרשמה במקום</li>
              </ul>
              <motion.a
                href="/contact?info-session=true"
                className="block w-full bg-gold text-charcoal py-4 px-6 font-bold hover:bg-gold/90 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                הרשם למפגש
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Direct contact info */}
          <motion.div 
            className="text-center bg-charcoal/50 backdrop-blur-sm border border-lightgrey/10 p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-h4 font-bold mb-6">או פשוט התקשר</h3>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-8">
              <div>
                <p className="text-lightgrey mb-2">טלפון ישיר:</p>
                <a href={`tel:${academyInfo.phone}`} className="text-gold text-2xl font-bold hover:underline">
                  052-869-1415
                </a>
              </div>
              
              <div className="hidden md:block w-px h-12 bg-lightgrey/20"></div>
              
              <div>
                <p className="text-lightgrey mb-2">שעות קבלה:</p>
                <p className="text-offwhite">
                  ראשון-חמישי: 9:00-19:00<br/>
                  שישי: 9:00-14:00
                </p>
              </div>
              
              <div className="hidden md:block w-px h-12 bg-lightgrey/20"></div>
              
              <div>
                <p className="text-lightgrey mb-2">כתובת:</p>
                <p className="text-offwhite">{academyInfo.address}</p>
              </div>
            </div>

            {/* Final urgency */}
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-orange-400">
                <span>🔥</span>
                <span>המחזור הבא מתחיל בעוד חודש</span>
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <span>✓</span>
                <span>נותרו 8 מקומות בלבד</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AcademyBottomCTA;