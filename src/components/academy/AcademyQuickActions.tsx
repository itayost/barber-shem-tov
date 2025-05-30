// src/components/academy/AcademyQuickActions.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

const AcademyQuickActions: React.FC = () => {
  const actions = [
    {
      icon: '',
      title: 'שיחת ייעוץ',
      description: '15 דקות עם יועץ מקצועי',
      href: '/contact?consultation=true',
      color: 'bg-blue-500'
    },
    {
      icon: '',
      title: 'סיור באקדמיה',
      description: 'ראה את המתקנים שלנו',
      href: '/contact?tour=true',
      color: 'bg-purple-500'
    },
    {
      icon: '',
      title: 'WhatsApp',
      description: 'תשובה מהירה לכל שאלה',
      href: 'https://wa.me/972528691415?text=היי! אשמח למידע על האקדמיה',
      color: 'bg-green-500',
      external: true
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-brown/10 to-charcoal" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            איך תרצה <span className="text-gold">להתחיל</span>?
          </h2>
          <p className="text-lightgrey max-w-2xl mx-auto">
            בחר את הדרך הנוחה לך ליצור קשר
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {actions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <a
                href={action.href}
                target={action.external ? '_blank' : undefined}
                rel={action.external ? 'noopener noreferrer' : undefined}
                className="block h-full bg-charcoal border border-lightgrey/10 p-6 text-center hover:border-gold/30 transition-all group"
              >
                <div className={`${action.color} w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}>
                  {action.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-gold transition-colors">
                  {action.title}
                </h3>
                <p className="text-lightgrey text-sm">
                  {action.description}
                </p>
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-lightgrey mb-4">או פשוט התקשר</p>
          <a href="tel:+972528691415" className="text-2xl font-bold text-gold hover:underline">
            052-869-1415
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default AcademyQuickActions;