// src/app/contact/page.tsx - Final Information-Only Version
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Hero from '@/components/common/Hero';
import ContactQuickCTA from '@/components/contact/ContactQuickCTA';
import ContactMethods from '@/components/contact/ContactMethods';
import ContactLocation from '@/components/contact/ContactLocation';
import ContactHours from '@/components/contact/ContactHours';
import { academyInfo } from '@/lib/data';

export default function ContactPage() {
  // Get today's status
  const today = new Date().getDay();
  const todayHours = academyInfo.getHoursForDay(today);
  const todayStatus = {
    isOpen: todayHours.isOpen,
    hours: todayHours.isOpen ? `${todayHours.open} - ${todayHours.close}` : 'סגור'
  };

  return (
    <>
      {/* Hero Section */}
      <Hero
        title={<>דברו <span className="text-gold">איתנו</span></>}
        subtitle="כל הדרכים ליצור קשר"
        backgroundImage="/images/hero/contact-hero.jpg"
      />
      
      {/* Main Content */}
      <section className="py-20 bg-charcoal" dir="rtl">
        <div className="container mx-auto px-4 sm:px-6">
          
          {/* Quick CTA for Enrollment - Directs to /apply */}
          <ContactQuickCTA />
          
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              בחרו את הדרך <span className="text-gold">הנוחה לכם</span>
            </h2>
            <p className="text-lightgrey max-w-2xl mx-auto">
              אנחנו זמינים בכל דרך - טלפון, WhatsApp או אימייל. 
              תוכלו גם להגיע אלינו ישירות לאקדמיה.
            </p>
          </motion.div>
          
          {/* Contact Methods Grid */}
          <div className="mb-20">
            <ContactMethods 
              phone={academyInfo.phone}
              email={academyInfo.email}
              whatsappMessage="היי! אשמח לקבל מידע נוסף על האקדמיה"
            />
          </div>
          
          {/* Location Section */}
          <div className="mb-20">
            <ContactLocation
              address={academyInfo.address}
              embedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3355.1856685128682!2d34.96868578136843!3d32.76080761694386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151da59cc8ba1d41%3A0xbd3b8b642c1ba90f!2zQmFyYmVyIFNoZW0gdG92IC0g15HXqCDXqdedINeY15XXkSDXnteh16TXqNeqINeS15HXqNeZ150!5e0!3m2!1sen!2sus!4v1748572247850!5m2!1sen!2sus"
            />
          </div>
          
          {/* Business Hours */}
          <div className="mb-20">
            <ContactHours 
              hours={academyInfo.hours}
              todayStatus={todayStatus}
            />
          </div>
          
          {/* Social Media Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold mb-6">
              עקבו אחרינו <span className="text-gold">ברשתות</span>
            </h3>
            <div className="flex justify-center gap-6">
              {academyInfo.social.instagram && (
                <motion.a
                  href={academyInfo.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-purple-600 to-pink-500 p-4 rounded-full text-white hover:scale-110 transition-transform"
                  whileHover={{ rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                  </svg>
                </motion.a>
              )}
              
              {academyInfo.social.facebook && (
                <motion.a
                  href={academyInfo.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 p-4 rounded-full text-white hover:scale-110 transition-transform"
                  whileHover={{ rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </motion.a>
              )}
              
              {academyInfo.social.tiktok && (
                <motion.a
                  href={academyInfo.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black p-4 rounded-full text-white hover:scale-110 transition-transform border border-white/20"
                  whileHover={{ rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}