'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { businessInfo, services } from '@/lib/data';

// Import components
import ContactPageHeader from '@/components/contact/ContactPageHeader';
import ContactInfo from '@/components/contact/ContactInfo';
import BookingForm from '@/components/contact/BookingForm';


// Client component that uses useSearchParams
function ContactPageContent() {
  const searchParams = useSearchParams();
  const [initialService, setInitialService] = useState<string>('');

  // Update initial service if provided in URL params
  useEffect(() => {
    if (searchParams && searchParams.get('service')) {
      setInitialService(searchParams.get('service') || '');
    }
  }, [searchParams]);

  return (
    <>
      <ContactPageHeader />
      
      <section className="py-section-mobile md:py-section bg-charcoal">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <ContactInfo businessInfo={businessInfo} />

            {/* Booking Form */}
            <BookingForm 
              services={services} 
              businessInfo={businessInfo} 
              initialService={initialService}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gold">טוען...</div>
      </div>
    }>
      <ContactPageContent />
    </Suspense>
  );
}