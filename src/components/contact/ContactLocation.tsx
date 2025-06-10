// src/components/contact/ContactLocation.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ContactLocationProps {
  address: string;
  googleMapsUrl?: string;
  embedUrl: string;
}

const ContactLocation: React.FC<ContactLocationProps> = ({ 
  address, 
  googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=העצמאות+4+טירת+הכרמל",
  embedUrl
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto"
      dir="rtl"
    >
      <div className="bg-charcoal-light/30 border border-lightgrey/10 rounded-xl overflow-hidden">
        {/* Address Header */}
        <div className="p-6 border-b border-lightgrey/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-right">
              <h3 className="text-2xl font-bold text-gold mb-2">המיקום שלנו</h3>
              <p className="text-lightgrey text-lg">{address}</p>
            </div>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold/20 hover:bg-gold/30 text-gold px-4 py-2 rounded-lg transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span>פתח ב-Google Maps</span>
            </a>
          </div>
        </div>

        {/* Map */}
        <div className="relative h-[400px] bg-charcoal">
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="מיקום האקדמיה"
            className="absolute inset-0"
          />
        </div>

        {/* Parking & Access Info */}
        <div className="p-6 bg-gold/5 border-t border-gold/10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-gold text-2xl mb-2">🚗</div>
              <p className="text-sm text-lightgrey">חניה חינם באזור</p>
            </div>
            <div>
              <div className="text-gold text-2xl mb-2">🚌</div>
              <p className="text-sm text-lightgrey">נגיש בתחבורה ציבורית</p>
            </div>
            <div>
              <div className="text-gold text-2xl mb-2">♿</div>
              <p className="text-sm text-lightgrey">נגיש לבעלי מוגבלויות</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactLocation;