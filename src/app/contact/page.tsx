'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { academyInfo, courses } from '@/lib/data';

// Import components
import AcademyContactPageHeader from '@/components/contact/AcademyContactPageHeader';
import AcademyContactInfo from '@/components/contact/AcademyContactInfo';
import AcademyEnrollmentForm from '@/components/contact/AcademyEnrollmentForm';

// Client component that uses useSearchParams
function AcademyContactContent() {
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
      <AcademyContactPageHeader 
        inquiryType={inquiryType}
      />
      
      <section className="py-section-mobile md:py-section bg-charcoal">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Academy Contact Information */}
            <AcademyContactInfo 
              academyInfo={academyInfo} 
            />

            {/* Academy Enrollment Form */}
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
    </>
  );
}

export default function AcademyContactPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gold">טוען...</div>
      </div>
    }>
      <AcademyContactContent />
    </Suspense>
  );
}