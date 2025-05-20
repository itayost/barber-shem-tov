// src/components/academy/CTASection/VisitAcademyCTA.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPinIcon as LocationMarkerIcon, ClockIcon, PhoneIcon } from '@heroicons/react/24/outline';

const VisitAcademyCTA: React.FC = () => {
  // Tour schedule - in a real app, this would come from props or a data source
  const tourSchedule = [
    { day: 'ראשון', times: ['10:00', '14:00', '17:00'] },
    { day: 'שלישי', times: ['10:00', '14:00'] },
    { day: 'חמישי', times: ['14:00', '17:00'] }
  ];

  return (
    <div>
      <h3 className="text-h3 mb-6">בקר באקדמיה שלנו</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Academy image */}
        <div className="relative h-64 md:h-auto bg-brown/20 overflow-hidden">
          <Image 
            src="/images/academy-interior.jpg" // Replace with your actual image path
            alt="פנים האקדמיה"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4 text-right">
            <p className="text-gold font-medium">אקדמיית ברבר שם טוב</p>
            <p className="text-lightgrey text-sm">המרחב המושלם ללמוד ולגדול</p>
          </div>
        </div>
        
        {/* Visit information */}
        <div className="space-y-6">
          {/* Address */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
              <LocationMarkerIcon className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h4 className="font-medium mb-1">כתובת</h4>
              <p className="text-lightgrey">רחוב העצמאות 4, טירת הכרמל</p>
              <a 
                href="https://goo.gl/maps/yourMapLink" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gold hover:underline text-sm"
              >
                הוראות הגעה
              </a>
            </div>
          </div>
          
          {/* Tour schedule */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
              <ClockIcon className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h4 className="font-medium mb-1">סיורים מודרכים</h4>
              <div className="text-lightgrey space-y-2">
                {tourSchedule.map((item, index) => (
                  <p key={index}>
                    <span className="inline-block min-w-[70px]">{item.day}:</span>
                    {item.times.join(', ')}
                  </p>
                ))}
              </div>
            </div>
          </div>
          
          {/* Contact */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
              <PhoneIcon className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h4 className="font-medium mb-1">הזמן סיור מודרך</h4>
              <p className="text-lightgrey">התקשר כדי לתאם סיור מודרך באקדמיה</p>
              <a 
                href="tel:+972528691415" 
                className="text-gold text-lg font-medium hover:underline"
              >
                052-869-1415
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-lightgrey/10 mt-8 pt-8 text-center">
        <p className="text-lightgrey mb-6">
          בואו לבקר באקדמיה שלנו כדי לחוות בעצמכם את האווירה, לפגוש את צוות המדריכים ולקבל מושג על תהליך הלימוד.
        </p>
        <Link 
          href="/contact?subject=academy-visit"
          className="inline-block bg-gold text-charcoal py-3 px-8 font-medium hover:bg-opacity-90 transition-colors"
        >
          תאם סיור מודרך
        </Link>
      </div>
    </div>
  );
};

export default VisitAcademyCTA;