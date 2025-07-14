// src/components/common/Footer.tsx - Updated with Icon System
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { academyInfo } from '@/lib/data';
import SocialLinks from '@/components/navigation/SocialLinks';
import { LocationIcon, PhoneIcon, EmailIcon } from '@/components/icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-charcoal border-t border-lightgrey border-opacity-20 pt-16 pb-8 z-50"
      dir="rtl"
    >
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
              האקדמיה המובילה לאמנות הספרות בישראל. מאז {academyInfo.established} אנו מכשירים את דור
              העתיד של הספרים המקצועיים.
            </p>
            {/* Social Links using the component */}
            <SocialLinks social={academyInfo.social} variant="minimal" size="medium" color="gold" />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heebo text-h4 mb-4 text-gold">ניווט מהיר</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-lightgrey hover:text-gold transition-colors duration-200 block py-1"
                >
                  דף הבית
                </Link>
              </li>
              <li>
                <Link
                  href="/academy"
                  className="text-lightgrey hover:text-gold transition-colors duration-200 block py-1"
                >
                  האקדמיה
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-lightgrey hover:text-gold transition-colors duration-200 block py-1"
                >
                  גלריה
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="text-lightgrey hover:text-gold transition-colors duration-200 block py-1"
                >
                  קורסים
                </Link>
              </li>
              <li>
                <Link
                  href="/apply"
                  className="text-lightgrey hover:text-gold transition-colors duration-200 block py-1 font-medium"
                >
                  הרשמה מהירה
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-heebo text-h4 mb-4 text-gold">צור קשר</h3>
            <ul className="space-y-3">
              <li className="flex items-start group">
                <span className="text-gold ml-2 flex-shrink-0">
                  <LocationIcon size={20} className="mt-0.5" />
                </span>
                <span className="text-lightgrey group-hover:text-gold transition-colors">
                  {academyInfo.address}
                </span>
              </li>
              <li className="flex items-start group">
                <span className="text-gold ml-2 flex-shrink-0">
                  <PhoneIcon size={20} className="mt-0.5" />
                </span>
                <a
                  href={`tel:${academyInfo.phone}`}
                  className="text-lightgrey hover:text-gold transition-colors duration-200 hebrew-nums"
                >
                  {academyInfo.phone}
                </a>
              </li>
              <li className="flex items-start group">
                <span className="text-gold ml-2 flex-shrink-0">
                  <EmailIcon size={20} className="mt-0.5" />
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
              <p className="text-lightgrey">
                הכשרה מקצועית, אפשרויות קריירה מגוונות, והזדמנות ייחודית לעסוק באמנות הספרות
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/apply" className="btn-primary text-center px-6 py-3 inline-block">
                הרשמה לקורסים
              </Link>
              <Link href="/courses" className="btn-secondary text-center px-6 py-3 inline-block">
                הקורסים שלנו
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom section with accreditations and copyright */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center">
          {/* Copyright */}
          <div className="text-small text-lightgrey text-opacity-70 mt-8 md:mt-0">
            <p>
              &copy; {currentYear} {academyInfo.name}. כל הזכויות שמורות.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
