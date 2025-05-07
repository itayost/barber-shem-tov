// File: src/components/contact/ContactInfo.tsx
import React from 'react';
import { BusinessInfo } from '@/types';

interface ContactInfoProps {
  businessInfo: BusinessInfo;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ businessInfo }) => {
  return (
    <div dir="rtl" className="text-right">
      <h2 className="font-heebo text-h3 text-gold mb-8">פרטי התקשרות</h2>
      
      <div className="mb-8">
        <h3 className="font-heebo text-h4 mb-3">כתובת</h3>
        <p className="mb-2">{businessInfo.address}</p>
        <div className="aspect-video w-full mt-4 bg-lightgrey bg-opacity-20 flex items-center justify-center">
          {/* Placeholder for map - would be replaced with actual map */}
          <p className="text-lightgrey">מפה</p>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="font-heebo text-h4 mb-3">שעות פעילות</h3>
        <ul className="space-y-2">
          {businessInfo.hours.map((schedule, index) => (
            <li key={index}>
              <span className="font-medium ml-2">{schedule.days}:</span>
              <span>{schedule.hours}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mb-8">
        <h3 className="font-heebo text-h4 mb-3">טלפון</h3>
        <p>
          <a 
            href={`tel:${businessInfo.phone}`} 
            className="text-gold hover:underline transition-colors duration-200"
            dir="ltr"
          >
            {businessInfo.phone}
          </a>
        </p>
      </div>
      
      <div>
        <h3 className="font-heebo text-h4 mb-3">התחברו איתנו</h3>
        <div className="flex gap-4">
          <a 
            href={businessInfo.social?.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-offwhite hover:text-gold transition-colors duration-200"
          >
            אינסטגרם
          </a>
          <a 
            href={businessInfo.social?.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="text-offwhite hover:text-gold transition-colors duration-200"
          >
            טיקטוק
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;