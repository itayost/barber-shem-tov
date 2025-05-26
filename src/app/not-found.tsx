// src/app/not-found.tsx
import Link from 'next/link';
import Button from '@/components/common/Button';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { academyInfo } from '@/lib/data';

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center py-20" dir="rtl">
      <div className="max-w-2xl mx-auto px-4 text-center">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gold/20 rounded-full blur-3xl animate-pulse"></div>
            <FaceFrownIcon className="w-32 h-32 text-gold relative" />
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="text-9xl font-bold text-gold mb-4">404</h1>
        
        {/* Error Message */}
        <h2 className="text-3xl font-bold text-offwhite mb-4">
          אופס! הדף לא נמצא
        </h2>
        
        <p className="text-lg text-lightgrey mb-8 max-w-md mx-auto">
          מצטערים, הדף שחיפשת לא קיים או שהועבר למקום אחר. 
          אולי כדאי לחזור לדף הבית של {academyInfo.shortName} ולנסות שוב?
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button href="/" variant="primary" size="large">
            חזרה לדף הבית
          </Button>
          
          <Button href="/courses" variant="secondary" size="large">
            לקורסים שלנו
          </Button>
        </div>

        {/* Additional Links */}
        <div className="mt-12 pt-8 border-t border-lightgrey/20">
          <p className="text-sm text-lightgrey mb-4">
            או אולי חיפשת אחד מאלה?
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/academy" 
              className="text-gold hover:text-gold/80 transition-colors underline-offset-4 hover:underline"
            >
              האקדמיה
            </Link>
            <Link 
              href="/gallery" 
              className="text-gold hover:text-gold/80 transition-colors underline-offset-4 hover:underline"
            >
              גלריה
            </Link>
            <Link 
              href="/contact" 
              className="text-gold hover:text-gold/80 transition-colors underline-offset-4 hover:underline"
            >
              צור קשר
            </Link>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-sm text-lightgrey">
          <p className="mb-2">זקוקים לעזרה? צרו קשר:</p>
          <a 
            href={`tel:${academyInfo.phone}`} 
            className="text-gold hover:underline block hebrew-nums"
            dir="ltr"
          >
            {academyInfo.phone}
          </a>
          <a 
            href={`mailto:${academyInfo.email}`} 
            className="text-gold hover:underline block"
            dir="ltr"
          >
            {academyInfo.email}
          </a>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-20 h-20 bg-gold/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-10 w-32 h-32 bg-brown/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>
  );
}