// src/components/contact/ContactHours.tsx - Luxury Fashion Version
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/common/Button';

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

  return (
    <section className="py-20 md:py-24 bg-charcoal" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-xs tracking-[0.5em] text-gold mb-6 uppercase">זמני פעילות</p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-thin text-offwhite">
            אנחנו כאן <span className="text-gold">בשבילך</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Hours Display */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="border border-gold/20 p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-thin text-offwhite mb-8 md:mb-12 text-center">
                שעות <span className="text-gold">פעילות</span>
              </h3>

              <div className="space-y-px">
                {hours.map((schedule, index) => {
                  const isToday =
                    (index === 0 && today >= 0 && today <= 4) ||
                    (index === 1 && today === 5) ||
                    (index === 2 && today === 6);

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`
                        flex items-center justify-between
                        py-5 px-6 md:py-6 md:px-8
                        transition-all duration-500
                        ${
                          isToday
                            ? 'bg-gold/10 border-y border-gold/30'
                            : 'bg-charcoal/30 hover:bg-charcoal/50'
                        }
                      `}
                    >
                      <span
                        className={`
                          text-sm md:text-base tracking-wider uppercase font-light
                          ${isToday ? 'text-gold' : 'text-lightgrey'}
                        `}
                      >
                        {schedule.days}
                      </span>
                      <span
                        className={`
                          text-sm md:text-base font-light hebrew-nums
                          ${isToday ? 'text-offwhite' : 'text-lightgrey'}
                        `}
                      >
                        {schedule.hours}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Current Status - Luxury Style */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-12 pt-12 border-t border-gold/10"
              >
                <div className="text-center">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <motion.div
                      className={`
                        w-2 h-2 rounded-full
                        ${todayStatus.isOpen ? 'bg-gold' : 'bg-lightgrey/50'}
                      `}
                      animate={
                        todayStatus.isOpen
                          ? {
                              scale: [1, 1.5, 1],
                              opacity: [0.8, 0.4, 0.8],
                            }
                          : {}
                      }
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                    <span
                      className={`
                        text-xs tracking-[0.3em] uppercase font-light
                        ${todayStatus.isOpen ? 'text-gold' : 'text-lightgrey'}
                      `}
                    >
                      {todayStatus.isOpen ? 'פתוח עכשיו' : 'סגור עכשיו'}
                    </span>
                  </div>
                  {todayStatus.isOpen && (
                    <p className="text-lightgrey text-sm font-light">
                      נסגר ב-{todayStatus.hours.split(' - ')[1]}
                    </p>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Luxury Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
            className="space-y-8"
          >
            {/* Best Times - Editorial Style */}
            <div className="border border-gold/20 p-8 md:p-10">
              <h4 className="text-xs tracking-[0.3em] text-gold mb-6 uppercase">הזמנים המומלצים</h4>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="text-gold font-thin mt-1">—</span>
                  <div>
                    <p className="text-offwhite font-light mb-1">בוקר מוקדם</p>
                    <p className="text-lightgrey text-sm font-light">
                      09:00-11:00 • חוויה אינטימית יותר
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-gold font-thin mt-1">—</span>
                  <div>
                    <p className="text-offwhite font-light mb-1">אחר הצהריים</p>
                    <p className="text-lightgrey text-sm font-light">
                      14:00-16:00 • זמן אידיאלי לייעוץ אישי
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Notes - Minimal Luxury */}
            <div className="border border-gold/20 p-8 md:p-10">
              <h4 className="text-xs tracking-[0.3em] text-gold mb-6 uppercase">חשוב לדעת</h4>
              <div className="space-y-4">
                <p className="text-lightgrey font-light text-sm leading-relaxed">
                  • תיאום מראש בימי שישי מומלץ במיוחד
                </p>
                <p className="text-lightgrey font-light text-sm leading-relaxed">
                  • שעות הקורסים והסדנאות עשויות להשתנות
                </p>
                <p className="text-lightgrey font-light text-sm leading-relaxed">
                  • ניתן לתאם פגישות פרטיות מחוץ לשעות הרגילות
                </p>
              </div>
            </div>

            {/* CTA - Using Button Component */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="pt-4"
            >
              <Button
                href="/contact"
                variant="secondary"
                size="large"
                fullWidth={true}
                className="uppercase tracking-[0.2em] font-light"
              >
                קבע פגישה
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactHours;
