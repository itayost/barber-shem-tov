'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { academyInfo, courses } from '@/lib/data';

// Import components
import AcademyContactInfo from '@/components/contact/AcademyContactInfo';
import AcademyEnrollmentForm from '@/components/contact/AcademyEnrollmentForm';
import WhatsAppFloat from '@/components/common/WhatsAppFloat';
import Hero from '@/components/common/Hero';

// Client component that uses useSearchParams
function ContactContent() {
  const searchParams = useSearchParams();
  const [initialCourse, setInitialCourse] = useState<string>('');
  const [inquiryType, setInquiryType] = useState<'course' | 'info'>('info');
  
  // Update initial course and inquiry type if provided in URL params
  useEffect(() => {
    if (searchParams) {
      // Check for course parameter
      if (searchParams.get('course')) {
        setInitialCourse(searchParams.get('course') || '');
        setInquiryType('course');
      }
      
      // Check for subject parameter (general info vs course enrollment)
      if (searchParams.get('subject') === 'enrollment') {
        setInquiryType('course');
      }
    }
  }, [searchParams]);

  return (
    <>
      <Hero
        title={<>צרו <span className="text-gold">קשר</span></>}
        subtitle="כתבו לנו"
        backgroundImage="/images/hero/contact-hero.jpg"
      />
      
      {/* Main Content Section */}
      <section className="py-20 bg-charcoal">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <AcademyContactInfo 
              academyInfo={academyInfo} 
            />

            {/* Contact Form */}
            <AcademyEnrollmentForm 
              courses={courses} 
              academyInfo={academyInfo} 
              initialCourse={initialCourse}
              inquiryType={inquiryType}
              setInquiryType={setInquiryType}
            />
          </div>
        </div>
      </section>

      {/* WhatsApp Float */}
      <WhatsAppFloat />
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
      <ContactContent />
    </Suspense>
  );
}