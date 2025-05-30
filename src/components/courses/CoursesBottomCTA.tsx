// src/components/courses/CoursesBottomCTA.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

const CoursesBottomCTA: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-charcoal to-brown/10 relative overflow-hidden" dir="rtl">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-h2 md:text-4xl font-bold mb-4">
              נשמח לענות על כל <span className="text-gold">שאלה</span>
            </h2>
            <p className="text-lightgrey text-xl max-w-2xl mx-auto">
              צור איתנו קשר בכל דרך שנוחה לך
            </p>
          </motion.div>

          {/* Contact methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Phone consultation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-charcoal border border-lightgrey/10 p-6 rounded-lg"
            >
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-xl font-bold text-gold mb-2">שיחת ייעוץ</h3>
              <p className="text-lightgrey mb-4">
                דבר איתנו בטלפון לקבלת ייעוץ אישי
              </p>
              <motion.a
                href="tel:+972528691415"
                className="inline-block bg-gold text-charcoal py-2 px-4 font-bold hover:bg-gold/90 transition-all"
                whileHover={{ scale: 1.05 }}
              >
                052-869-1415
              </motion.a>
            </motion.div>

            {/* WhatsApp */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-charcoal border border-lightgrey/10 p-6 rounded-lg"
            >
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-gold mb-2">WhatsApp</h3>
              <p className="text-lightgrey mb-4">
                שלח הודעה ונחזור אליך בהקדם
              </p>
              <motion.a
                href="https://wa.me/972528691415"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 text-white py-2 px-4 font-bold hover:bg-green-600 transition-all"
                whileHover={{ scale: 1.05 }}
              >
                שלח הודעה
              </motion.a>
            </motion.div>

            {/* Direct call */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-charcoal border border-lightgrey/10 p-6 rounded-lg"
            >
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-bold text-gold mb-2">ביקור באקדמיה</h3>
              <p className="text-lightgrey mb-4">
                בוא להכיר אותנו מקרוב
              </p>
              <motion.a
                href="/contact"
                className="inline-block border border-gold text-gold py-2 px-4 font-bold hover:bg-gold/10 transition-all"
                whileHover={{ scale: 1.05 }}
              >
                קבע פגישה
              </motion.a>
            </motion.div>
          </div>

          {/* Business hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-charcoal/50 border border-gold/20 p-6 rounded-lg max-w-md mx-auto"
          >
            <h3 className="text-xl font-bold text-gold mb-4">שעות פעילות</h3>
            <div className="grid grid-cols-2 gap-4 text-lightgrey">
              <div>
                <div className="font-bold">ימים א&apos;-ה&apos;:</div>
                <div>09:00 - 22:00</div>
              </div>
              <div>
                <div className="font-bold">יום ו&apos;:</div>
                <div>09:00 - 14:00</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CoursesBottomCTA;