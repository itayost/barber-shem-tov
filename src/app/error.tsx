// src/app/error.tsx
'use client';

import { useEffect } from 'react';
import Button from '@/components/common/Button';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <section className="min-h-screen flex items-center justify-center py-20" dir="rtl">
      <div className="max-w-2xl mx-auto px-4 text-center">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-burgundy/20 rounded-full blur-3xl animate-pulse"></div>
            <ExclamationTriangleIcon className="w-32 h-32 text-burgundy relative" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl font-bold text-charcoal mb-4">
          משהו השתבש!
        </h1>
        
        <p className="text-lg text-charcoal/70 mb-8 max-w-md mx-auto">
          מצטערים, נתקלנו בבעיה טכנית. הצוות שלנו כבר עובד על פתרון.
          בינתיים, אתם מוזמנים לנסות שוב או לחזור לדף הבית.
        </p>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-right">
            <p className="font-mono text-sm text-red-800">
              {error.message}
            </p>
            {error.digest && (
              <p className="font-mono text-xs text-red-600 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={reset}
            variant="primary" 
            size="large"
          >
            נסה שוב
          </Button>
          
          <Button href="/" variant="secondary" size="large">
            חזרה לדף הבית
          </Button>
        </div>

        {/* Contact Support */}
        <div className="mt-12 pt-8 border-t border-lightgrey">
          <p className="text-sm text-charcoal/60 mb-4">
            הבעיה נמשכת? צרו איתנו קשר
          </p>
          <div className="flex flex-col items-center gap-2">
            <a 
              href="tel:+972528691415" 
              className="text-brown hover:text-gold transition-colors"
            >
              052-869-1415
            </a>
            <a 
              href="mailto:info@thefader.co.il" 
              className="text-brown hover:text-gold transition-colors"
            >
              info@thefader.co.il
            </a>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-20 h-20 bg-burgundy/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-10 w-32 h-32 bg-brown/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>
  );
}