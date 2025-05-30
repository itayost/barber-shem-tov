// File: src/components/common/Footer.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { academyInfo } from '@/lib/data';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-charcoal border-t border-lightgrey border-opacity-20 pt-16 pb-8" dir="rtl">
      <div className="container-custom">
        {/* Top section with logo and content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo and about */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <div className="relative h-16 w-40">
                <Image
                  src="/images/logos/logo.png"
                  alt={academyInfo.name}
                  fill
                  className="object-contain object-right"
                />
              </div>
            </Link>
            <p className="text-lightgrey mb-4" style={{ lineHeight: 'var(--hebrew-line-height)' }}>
              האקדמיה המובילה לאמנות הספרות בישראל. מאז {academyInfo.established} אנו מכשירים את דור העתיד של הספרים המקצועיים.
            </p>
            <div className="flex space-x-reverse space-x-4">
              {academyInfo.social.instagram && (
                <a 
                  href={academyInfo.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lightgrey hover:text-gold transition-colors duration-200"
                  aria-label="אינסטגרם"
                >
                  <Image src="/icons/Instagram.svg" alt="Instagram" width={20} height={20} className="w-5 h-5" />
                </a>
              )}
              
              {academyInfo.social.facebook && (
                <a 
                  href={academyInfo.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lightgrey hover:text-gold transition-colors duration-200"
                  aria-label="פייסבוק"
                >
                  <Image src="/icons/Facebook.svg" alt="Facebook" width={20} height={20} className="w-5 h-5" />
                </a>
              )}
              
              {academyInfo.social.tiktok && (
                <a 
                  href={academyInfo.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lightgrey hover:text-gold transition-colors duration-200"
                  aria-label="טיקטוק"
                >
                  <Image src="/icons/Tiktok.svg" alt="Tiktok" width={20} height={20} className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-heebo text-h4 mb-4 text-gold">ניווט מהיר</h3>
            <ul className="space-y-2">
              <li>
                <Link href="./" className="text-lightgrey hover:text-gold transition-colors duration-200 block py-1">
                  דף הבית
                </Link>
              </li>
              <li>
                <Link href="/academy" className="text-lightgrey hover:text-gold transition-colors duration-200 block py-1">
                  האקדמיה
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-lightgrey hover:text-gold transition-colors duration-200 block py-1">
                  גלריה
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-lightgrey hover:text-gold transition-colors duration-200 block py-1">
                  קורסים
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="font-heebo text-h4 mb-4 text-gold">צור קשר</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-gold ml-2 flex-shrink-0">
                  <svg className="w-5 h-5 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </span>
                <span className="text-lightgrey">{academyInfo.address}</span>
              </li>
              <li className="flex items-start">
                <span className="text-gold ml-2 flex-shrink-0">
                  <svg className="w-5 h-5 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </span>
                <a 
                  href={`tel:${academyInfo.phone}`}
                  className="text-lightgrey hover:text-gold transition-colors duration-200"
                >
                  {academyInfo.phone}
                </a>
              </li>
              <li className="flex items-start">
                <span className="text-gold ml-2 flex-shrink-0">
                  <svg className="w-5 h-5 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </span>
                <a 
                  href={`mailto:${academyInfo.email}`}
                  className="text-lightgrey hover:text-gold transition-colors duration-200 break-words"
                >
                  {academyInfo.email}
                </a>
              </li>
            </ul>
          </div>
          
          {/* Hours of Operation */}
          <div>
            <h3 className="font-heebo text-h4 mb-4 text-gold">שעות פעילות</h3>
            <ul className="space-y-2">
              {academyInfo.hours.map((schedule, index) => (
                <li key={index} className="flex items-baseline">
                  <span className="text-gold ml-2 text-small">•</span>
                  <div>
                    <span className="inline-block ml-2 font-medium">{schedule.days}:</span>
                    <span className="text-lightgrey hebrew-nums">{schedule.hours}</span>
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-small text-lightgrey mt-4">
              שעות הלימוד משתנות בהתאם לקורסים. פרטים מלאים בעמוד התוכנית הספציפית.
            </p>
          </div>
        </div>
        
        {/* Middle section with CTA */}
        <div className="border-t border-b border-lightgrey border-opacity-10 py-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-right">
              <h3 className="font-heebo text-h4 text-gold mb-2">מוכן להתחיל את המסע שלך?</h3>
              <p className="text-lightgrey">הכשרה מקצועית, אפשרויות קריירה מגוונות, והזדמנות ייחודית לעסוק באמנות הספרות</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/academy"
                className="btn-primary text-center px-6 py-3 inline-block"
              >
                הרשמה לקורסים
              </Link>
              <Link
                href="/contact"
                className="btn-secondary text-center px-6 py-3 inline-block"
              >
                ייעוץ אישי
              </Link>
            </div>
          </div>
        </div>
        
        {/* Bottom section with accreditations and copyright */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center">
          {/* Copyright */}
          <div className="text-small text-lightgrey text-opacity-70 mt-8 md:mt-0">
            <p>&copy; {currentYear} {academyInfo.name}. כל הזכויות שמורות.</p>
          </div>
          
          {/* Accreditations */}
          <div className="flex items-center flex-wrap justify-center md:justify-end gap-6">
            {academyInfo.accreditations?.slice(0, 3).map((accreditation, index) => (
              <div key={index} className="text-small text-lightgrey">
                {accreditation}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;