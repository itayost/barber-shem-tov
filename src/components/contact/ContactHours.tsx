// src/components/contact/ContactHours.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BusinessHours {
  days: string;
  hours: string;
}

interface ContactHoursProps {
  hours: BusinessHours[];
  todayStatus: {
    isOpen: boolean;
    hours: string;
  };
}

const ContactHours: React.FC<ContactHoursProps> = ({ hours, todayStatus }) => {
  const today = new Date().getDay();
  const dayNames = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
  
  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8" dir="rtl">
      {/* Hours Table */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-charcoal-light/30 border border-lightgrey/10 rounded-xl p-6"
      >
        <h3 className="text-2xl font-bold text-gold mb-6 text-center">שעות פעילות</h3>
        
        <div className="space-y-3">
          {hours.map((schedule, index) => {
            const isToday = (index === 0 && today >= 0 && today <= 4) || 
                           (index === 1 && today === 5) || 
                           (index === 2 && today === 6);
            
            return (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                  isToday ? 'bg-gold/10 border border-gold/30' : ''
                }`}
              >
                <span className={`font-medium ${isToday ? 'text-gold' : 'text-lightgrey'}`}>
                  {schedule.days}
                </span>
                <span className={`hebrew-nums ${isToday ? 'text-offwhite font-bold' : 'text-lightgrey'}`}>
                  {schedule.hours}
                </span>
              </div>
            );
          })}
        </div>

        {/* Current Status */}
        <div className="mt-6 pt-6 border-t border-lightgrey/10">
          <div className="flex items-center justify-center gap-3">
            <div className={`w-3 h-3 rounded-full ${todayStatus.isOpen ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
            <span className={`text-lg font-medium ${todayStatus.isOpen ? 'text-green-400' : 'text-red-400'}`}>
              {todayStatus.isOpen ? 'פתוח עכשיו' : 'סגור עכשיו'}
            </span>
          </div>
          {todayStatus.isOpen && (
            <p className="text-center text-lightgrey text-sm mt-2">
              נסגר ב-{todayStatus.hours.split(' - ')[1]}
            </p>
          )}
        </div>
      </motion.div>

      {/* Quick Info */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4"
      >
        {/* Best Times to Visit */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
          <h4 className="text-lg font-bold text-green-400 mb-3 flex items-center gap-2">
            <span className="text-2xl">⏰</span>
            השעות הטובות ביותר לביקור
          </h4>
          <ul className="space-y-2 text-lightgrey">
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">•</span>
              <span>בוקר מוקדם (9:00-11:00) - פחות עומס</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">•</span>
              <span>אחר הצהריים (14:00-16:00) - זמן אידיאלי לייעוץ</span>
            </li>
          </ul>
        </div>

        {/* Special Notes */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
          <h4 className="text-lg font-bold text-blue-400 mb-3 flex items-center gap-2">
            <span className="text-2xl">📌</span>
            שימו לב
          </h4>
          <ul className="space-y-2 text-lightgrey">
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>
              <span>בימי שישי מומלץ לתאם מראש</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>
              <span>שעות הקורסים עשויות להשתנות</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>
              <span>ניתן לקבוע פגישות מחוץ לשעות הפעילות</span>
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactHours;