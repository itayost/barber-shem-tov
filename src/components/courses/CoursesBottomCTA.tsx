// src/components/courses/CoursesBottomCTA.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { academyInfo } from '@/lib/data';

const CoursesBottomCTA: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-brown/10 to-charcoal relative overflow-hidden" dir="rtl">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-brown to-transparent"></div>
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
              נשמח לענות על כל שאלה<br/>
              <span className="text-gold">ולעזור לך להתחיל</span>
            </h2>
            <p className="text-lightgrey text-xl md:text-2xl max-w-3xl mx-auto mb-8 leading-relaxed">
              הצוות המקצועי שלנו כאן כדי לוודא שתבחר את המסלול הנכון ותרגיש בטוח לקראת ההרשמה
            </p>

            {/* Quick stats reminder */}
            <div className="flex flex-wrap justify-center gap-8 mb-12 text-lightgrey/80">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                <span className="font-medium">{academyInfo.stats.placementRate}% שיעור השמה</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">👥</span>
                <span className="font-medium">{academyInfo.stats.graduates}+ בוגרים מצליחים</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                <span className="font-medium">4.9 דירוג ממוצע</span>
              </div>
            </div>
          </motion.div>

          {/* Contact options grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Phone consultation */}
            <motion.div 
              className="bg-charcoal border border-gold/20 p-8 text-center hover:border-gold/40 transition-all duration-300 group"
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)" }}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">📞</div>
              <h3 className="text-h4 font-bold mb-3 text-gold">שיחת ייעוץ אישית</h3>
              <p className="text-lightgrey mb-6 leading-relaxed">
                שיחה של 15 דקות עם יועץ מקצועי שיעזור לך לבחור את המסלול המתאים
              </p>
              <ul className="text-sm text-lightgrey/80 mb-6 space-y-2">
                <li>✓ בדיקת התאמה אישית</li>
                <li>✓ הסבר על תוכנית הלימודים</li>
                <li>✓ אפשרויות תשלום</li>
                <li>✓ תשובות לכל השאלות</li>
              </ul>
              <motion.a
                href="/contact?consultation=true"
                className="block w-full bg-gold text-charcoal py-4 px-6 font-bold hover:bg-gold/90 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                קבע שיחת ייעוץ חינם
              </motion.a>
            </motion.div>

            {/* WhatsApp */}
            <motion.div 
              className="bg-charcoal border border-green-500/20 p-8 text-center hover:border-green-500/40 transition-all duration-300 group"
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)" }}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">💬</div>
              <h3 className="text-h4 font-bold mb-3 text-green-400">WhatsApp</h3>
              <p className="text-lightgrey mb-6 leading-relaxed">
                שלח הודעה ותקבל תשובה מהירה עם כל המידע שאתה צריך
              </p>
              <ul className="text-sm text-lightgrey/80 mb-6 space-y-2">
                <li>✓ תשובה תוך דקות</li>
                <li>✓ שליחת מסמכים ותמונות</li>
                <li>✓ תיאום מועדים</li>
                <li>✓ זמין עד שעות הערב</li>
              </ul>
              <motion.a
                href="https://wa.me/972528691415?text=היי! אשמח לקבל מידע על הקורסים לספרות 🎯"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-green-500 text-white py-4 px-6 font-bold hover:bg-green-600 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                שלח הודעה ב-WhatsApp
              </motion.a>
            </motion.div>

            {/* Direct call */}
            <motion.div 
              className="bg-charcoal border border-blue-500/20 p-8 text-center hover:border-blue-500/40 transition-all duration-300 group"
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)" }}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">📱</div>
              <h3 className="text-h4 font-bold mb-3 text-blue-400">התקשר ישירות</h3>
              <p className="text-lightgrey mb-6 leading-relaxed">
                מעדיף לדבר ישירות? התקשר עכשיו ונענה על כל השאלות שלך
              </p>
              <ul className="text-sm text-lightgrey/80 mb-6 space-y-2">
                <li>✓ שיחה ישירה עם הצוות</li>
                <li>✓ זמין בשעות העבודה</li>
                <li>✓ תשובות מיידיות</li>
                <li>✓ אפשרות להרשמה בטלפון</li>
              </ul>
              <motion.a
                href="tel:+972528691415"
                className="block w-full bg-blue-500 text-white py-4 px-6 font-bold hover:bg-blue-600 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                052-869-1415
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Final encouragement */}
          <motion.div 
            className="text-center bg-gradient-to-r from-gold/5 to-brown/5 border border-gold/10 p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-h3 font-bold mb-4">
              <span className="text-gold">כל מסע של אלף מיילים</span> מתחיל בצעד אחד
            </h3>
            <p className="text-lightgrey text-lg mb-6 max-w-2xl mx-auto">
              אל תחכה יותר מדי. הקורסים שלנו מתמלאים מהר והמחזור הבא כבר בעוד חודש. 
              <br/>קבל את המידע היום והתחל לבנות את העתיד המקצועי שלך.
            </p>
            
            {/* Urgency indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-red-400">
                <span>🔥</span>
                <span>נותרו מקומות מעטים</span>
              </div>
              <div className="flex items-center gap-2 text-orange-400">
                <span>⏰</span>
                <span>המחזור הבא בעוד חודש</span>
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <span>✓</span>
                <span>תשובה תוך 24 שעות</span>
              </div>
            </div>
          </motion.div>

          {/* Business hours */}
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h4 className="font-bold mb-4 text-gold">שעות פעילות:</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto text-lightgrey">
              <div>
                <div className="font-medium">ראשון-חמישי</div>
                <div className="text-sm">9:00-19:00</div>
              </div>
              <div>
                <div className="font-medium">שישי</div>
                <div className="text-sm">9:00-14:00</div>
              </div>
              <div>
                <div className="font-medium">שבת</div>
                <div className="text-sm">סגור</div>
              </div>
            </div>
            <p className="text-sm text-lightgrey/60 mt-4">
              WhatsApp זמין גם מחוץ לשעות העבודה - נחזור אליך בהקדם!
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CoursesBottomCTA;