'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { academyInfo, courses } from '@/lib/data';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Import components
import AcademyContactInfo from '@/components/contact/AcademyContactInfo';
import AcademyEnrollmentForm from '@/components/contact/AcademyEnrollmentForm';
import WhatsAppFloat from '@/components/common/WhatsAppFloat';

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
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden" dir="rtl">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/contact-hero.jpg"
            alt="צור קשר"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/90 via-charcoal/80 to-charcoal/90"></div>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-brown/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          
          {/* Animated lines */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent animate-[shimmer_3s_infinite]"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent animate-[shimmer_3s_infinite]" style={{ animationDelay: '1.5s' }}></div>
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h1 className="text-h1 md:text-7xl font-bold mb-6 leading-tight">
                צור <span className="text-gold">קשר</span>
              </h1>
              <p className="text-lightgrey text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
                {inquiryType === 'course' 
                  ? 'מלא את הטופס כדי להתחיל את המסע המקצועי שלך בעולם הספרות'
                  : 'מעוניין במידע נוסף על האקדמיה שלנו? נשמח לענות על כל שאלה'}
              </p>
            </motion.div>

            {/* Quick contact options */}
            <motion.div 
              className="flex flex-wrap justify-center gap-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.a
                href={`tel:${academyInfo.phone}`}
                className="flex items-center gap-3 bg-charcoal/50 px-6 py-3 rounded-full border border-gold/20 hover:border-gold/40 transition-all"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
              >
                <Image src="/icons/Phone.svg" alt="Phone icon" width={20} height={20} className="text-lightgrey"/>
                <span className="text-lightgrey">{academyInfo.phone}</span>
              </motion.a>
              <motion.a
                href="https://wa.me/972528691415"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-charcoal/50 px-6 py-3 rounded-full border border-gold/20 hover:border-gold/40 transition-all"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
              >
                <Image src="/icons/Whatsapp.svg" alt="WhatsApp icon" width={20} height={20} className="text-lightgrey"/>
                <span className="text-lightgrey">WhatsApp</span>
              </motion.a>
              <motion.a
                href={`mailto:${academyInfo.email}`}
                className="flex items-center gap-3 bg-charcoal/50 px-6 py-3 rounded-full border border-gold/20 hover:border-gold/40 transition-all"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
              >
                <span className="text-lightgrey">{academyInfo.email}</span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>
      
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