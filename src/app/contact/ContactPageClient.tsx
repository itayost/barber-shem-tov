// src/app/contact/ContactPageClient.tsx - Without Open/Close Status
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Hero from '@/components/common/Hero';
import ContactQuickCTA from '@/components/contact/ContactQuickCTA';
import ContactMethods from '@/components/contact/ContactMethods';
import ContactLocation from '@/components/contact/ContactLocation';
import ContactHours from '@/components/contact/ContactHours';
import { academyInfo } from '@/lib/data';

export default function ContactPageClient() {
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
          
          {/* Quick CTA for Enrollment */}
          <ContactQuickCTA />
          
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              בחרו את הדרך <span className="text-gold">הנוחה לכם</span>
            </h2>
            <p className="text-lightgrey text-lg max-w-2xl mx-auto">
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
              googleMapsUrl="https://www.google.com/maps/search/?api=1&query=העצמאות+4+טירת+הכרמל"
              embedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3356.123456789!2d34.987654321!3d32.765432198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151db123456789ab%3A0x123456789abcdef!2z15DXotec16bXnteV16gg15TXqdeg15XXmNeBINelINei15TXodeS157XliDXl9eZ16jXqiDXldeV16jXnNeQ!5e0!3m2!1siw!2sil!4v1234567890123!5m2!1siw!2sil"
            />
          </div>
          
          {/* Business Hours - Without Status */}
          <div>
            <ContactHours 
              hours={academyInfo.hours}
            />
          </div>
        </div>
      </section>
    </>
  );
}