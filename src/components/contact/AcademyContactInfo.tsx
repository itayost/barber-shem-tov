// File: src/components/contact/AcademyContactInfo.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface AcademyContactInfoProps {
  academyInfo: {
    name: string;
    shortName: string;
    address: string;
    phone: string;
    email: string;
    established: number;
    hours: Array<{ days: string, hours: string }>;
    social: {
      instagram?: string;
      facebook?: string;
      youtube?: string;
    };
    accreditations?: string[];
  };
}

const AcademyContactInfo: React.FC<AcademyContactInfoProps> = ({ academyInfo }) => {
  return (
    <div dir="rtl" className="text-right">
      <h2 className="font-heebo text-h3 text-gold mb-8">פרטי התקשרות</h2>
      
      {/* Academy Name and Logo */}
      <div className="mb-8 flex items-start">
        <div className="ml-4 flex-shrink-0 relative h-16 w-20 overflow-hidden">
          <Image 
            src="/images/logos/logo.png"
            alt={academyInfo.name}
            width={80}
            height={64}
            className="object-contain"
            priority
          />
        </div>
        <div>
          <h3 className="font-heebo text-h4 mb-1">{academyInfo.name}</h3>
          <p className="text-lightgrey text-sm mb-2">האקדמיה המובילה לאמנות הספרות - מאז {academyInfo.established}</p>
          <div className="flex gap-3 mt-2">
            {academyInfo.social.instagram && (
              <Link 
                href={academyInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lightgrey hover:text-gold transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Link>
            )}
            {academyInfo.social.facebook && (
              <Link 
                href={academyInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lightgrey hover:text-gold transition-colors duration-200"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </Link>
            )}
            {academyInfo.social.youtube && (
              <Link 
                href={academyInfo.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lightgrey hover:text-gold transition-colors duration-200"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {/* Address with Map */}
      <div className="mb-8">
        <h3 className="font-heebo text-h4 mb-3">כתובת האקדמיה</h3>
        <p className="mb-2">{academyInfo.address}</p>
        <div className="aspect-video w-full mt-4 bg-brown bg-opacity-10 overflow-hidden relative rounded-sm">
          {/* Map placeholder with improved styling */}
          <div className="absolute inset-0 flex items-center justify-center border border-lightgrey border-opacity-20">
            <div className="absolute inset-0 bg-charcoal bg-opacity-50 flex items-center justify-center">
              <svg className="w-12 h-12 text-gold opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="absolute bottom-0 right-0 m-4">
              <Link 
                href={`https://maps.google.com/?q=${encodeURIComponent(academyInfo.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-offwhite transition-colors duration-200 text-sm bg-charcoal/80 hover:bg-gold/90 hover:text-charcoal py-2 px-4 inline-flex items-center"
              >
                <span className="ml-2">הוראות הגעה</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Academy Hours */}
      <div className="mb-8">
        <h3 className="font-heebo text-h4 mb-3">שעות פעילות האקדמיה</h3>
        <ul className="space-y-2">
          {academyInfo.hours.map((schedule, index) => (
            <li key={index} className="flex items-start">
              <span className="text-gold ml-2">•</span>
              <div>
                <span className="inline-block ml-2 font-medium">{schedule.days}:</span>
                <span className="text-lightgrey">{schedule.hours}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Contact Methods */}
      <div className="mb-8">
        <h3 className="font-heebo text-h4 mb-3">צור קשר</h3>
        <ul className="space-y-4">
          <li className="flex items-center">
            <div className="w-8 h-8 ml-3 bg-gold bg-opacity-10 flex items-center justify-center rounded-sm">
              <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <a 
              href={`tel:${academyInfo.phone}`} 
              className="text-gold hover:underline transition-colors duration-200"
              dir="ltr"
            >
              {academyInfo.phone}
            </a>
          </li>
          <li className="flex items-center">
            <div className="w-8 h-8 ml-3 bg-gold bg-opacity-10 flex items-center justify-center rounded-sm">
              <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <a 
              href={`mailto:${academyInfo.email}`} 
              className="text-gold hover:underline transition-colors duration-200"
              dir="ltr"
            >
              {academyInfo.email}
            </a>
          </li>
        </ul>
      </div>
      
      {/* Accreditations */}
      <div>
        <h3 className="font-heebo text-h4 mb-3">הסמכות ואקרדיטציות</h3>
        <ul className="space-y-2">
          {academyInfo.accreditations?.map((accreditation, index) => (
            <li key={index} className="flex items-start">
              <span className="text-gold ml-2">•</span>
              <span className="text-lightgrey">{accreditation}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AcademyContactInfo;