// src/components/contact/ContactLocation.tsx - With Working Map
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/common/Button';

interface ContactLocationProps {
  address: string;
  googleMapsUrl?: string;
  embedUrl?: string;
}

const ContactLocation: React.FC<ContactLocationProps> = ({ 
  address, 
  googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=העצמאות+4+טירת+הכרמל",
  embedUrl
}) => {
  // Generate working embed URL if not provided
  const workingEmbedUrl = embedUrl || `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(address)}&zoom=16&maptype=roadmap&language=he`;
  
  // Fallback: Simple iframe with search query (works without API key)
  const fallbackEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto"
      dir="rtl"
    >
      <div className="bg-charcoal-light/50 border border-gold/10 overflow-hidden">
        {/* Address Header */}
        <div className="p-6 border-b border-gold/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-right">
              <h3 className="text-2xl font-bold text-gold mb-2">המיקום שלנו</h3>
              <p className="text-lightgrey text-lg">{address}</p>
            </div>
            <Button
              href={googleMapsUrl}
              variant="secondary"
              className="flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span>פתח במפות</span>
            </Button>
          </div>
        </div>

        {/* Map */}
        <div className="relative h-[400px] bg-charcoal">
          {/* Try the fallback URL first - this usually works without API key */}
          <iframe
            src={fallbackEmbedUrl}
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
        <div className="p-6 bg-charcoal/50 border-t border-gold/10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <h4 className="font-bold text-offwhite mb-1">חניה נוחה</h4>
              <p className="text-sm text-lightgrey">חניה חינם באזור</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <h4 className="font-bold text-offwhite mb-1">תחבורה ציבורית</h4>
              <p className="text-sm text-lightgrey">נגיש בתחבורה ציבורית</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <h4 className="font-bold text-offwhite mb-1">נגישות מלאה</h4>
              <p className="text-sm text-lightgrey">נגיש לבעלי מוגבלויות</p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactLocation;