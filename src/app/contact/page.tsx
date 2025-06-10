// src/app/contact/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { academyInfo, courses } from '@/lib/data';

// Import components
import AcademyContactInfo from '@/components/contact/AcademyContactInfo';
import AcademyEnrollmentForm from '@/components/contact/AcademyEnrollmentForm';
import Hero from '@/components/common/Hero';

// Client component that uses useSearchParams
function ContactContent() {
  const searchParams = useSearchParams();
  const [initialCourse, setInitialCourse] = useState<string>('');
  const [inquiryType, setInquiryType] = useState<'course' | 'info'>('info');
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  
  // Update initial course and inquiry type if provided in URL params
  useEffect(() => {
    if (searchParams) {
      // Check for course parameter
      const courseParam = searchParams.get('course');
      if (courseParam) {
        setInitialCourse(courseParam);
        setInquiryType('course');
        
        // Find the course details
        const foundCourse = courses.find(c => c.name_he === decodeURIComponent(courseParam));
        if (foundCourse) {
          setSelectedCourse(foundCourse);
        }
      }
      
      // Check for subject parameter
      if (searchParams.get('subject') === 'enrollment') {
        setInquiryType('course');
      }
      
      // Check for consultation parameter
      if (searchParams.get('consultation') === 'true') {
        setInquiryType('info');
      }
    }
  }, [searchParams]);

  return (
    <>
      <Hero
        title={<>צרו <span className="text-gold">קשר</span></>}
        subtitle={selectedCourse ? `הרשמה ל${selectedCourse.name_he}` : "כתבו לנו"}
        backgroundImage="/images/hero/contact-hero.jpg"
      />
      
      {/* Quick Enrollment Banner - Show when course is selected */}
      {selectedCourse && (
        <motion.section 
          className="py-8 bg-gradient-to-r from-gold/10 to-brown/10 border-y border-gold/20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          dir="rtl"
        >
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-right">
                <h2 className="text-2xl font-bold text-gold mb-2">
                  הרשמה ל{selectedCourse.name_he}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-sm text-lightgrey">
                  <span className="flex items-center gap-1">
                    <span className="text-gold">💰</span>
                    ₪{selectedCourse.price.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-gold">⏱️</span>
                    {selectedCourse.duration_he}
                  </span>
                  {selectedCourse.nextSession && (
                    <span className="flex items-center gap-1">
                      <span className="text-gold">📅</span>
                      מחזור הבא: {selectedCourse.nextSession}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Quick WhatsApp Action */}
              <motion.button
                onClick={() => {
                  const message = `היי! אני מעוניין להירשם ל${selectedCourse.name_he} (${selectedCourse.duration_he}, ₪${selectedCourse.price})`;
                  window.open(`https://wa.me/972528691415?text=${encodeURIComponent(message)}`, '_blank');
                }}
                className="bg-green-500 text-white px-6 py-3 rounded-full font-bold hover:bg-green-600 transition-all flex items-center gap-2 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
                </svg>
                <span>הרשמה מהירה ב-WhatsApp</span>
              </motion.button>
            </div>
          </div>
        </motion.section>
      )}
      
      {/* Main Content Section */}
      <section className="py-20 bg-charcoal">
        <div className="container mx-auto px-6">
          {/* Tab Navigation for Inquiry Type */}
          <motion.div 
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-charcoal-light/30 p-1.5 rounded-xl inline-flex" dir="rtl">
              <button
                onClick={() => setInquiryType('course')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  inquiryType === 'course'
                    ? 'bg-gold text-charcoal shadow-lg'
                    : 'text-lightgrey hover:text-offwhite'
                }`}
              >
                הרשמה לקורס
              </button>
              <button
                onClick={() => setInquiryType('info')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  inquiryType === 'info'
                    ? 'bg-gold text-charcoal shadow-lg'
                    : 'text-lightgrey hover:text-offwhite'
                }`}
              >
                פרטים כלליים
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <AcademyContactInfo 
                academyInfo={academyInfo} 
              />
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <AcademyEnrollmentForm 
                courses={courses} 
                academyInfo={academyInfo} 
                initialCourse={initialCourse}
                inquiryType={inquiryType}
                setInquiryType={setInquiryType}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="py-16 bg-gradient-to-b from-charcoal to-black" dir="rtl">
        <div className="container mx-auto px-6">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            <div className="bg-charcoal-light/30 p-6 rounded-lg border border-lightgrey/10">
              <div className="text-3xl font-bold text-gold mb-2">{academyInfo.stats.graduates}+</div>
              <div className="text-lightgrey text-sm">בוגרים מצליחים</div>
            </div>
            <div className="bg-charcoal-light/30 p-6 rounded-lg border border-lightgrey/10">
              <div className="text-3xl font-bold text-gold mb-2">{academyInfo.stats.placementRate}%</div>
              <div className="text-lightgrey text-sm">שיעור השמה</div>
            </div>
            <div className="bg-charcoal-light/30 p-6 rounded-lg border border-lightgrey/10">
              <div className="text-3xl font-bold text-gold mb-2">24/7</div>
              <div className="text-lightgrey text-sm">תמיכה מלאה</div>
            </div>
            <div className="bg-charcoal-light/30 p-6 rounded-lg border border-lightgrey/10">
              <div className="text-3xl font-bold text-gold mb-2">100%</div>
              <div className="text-lightgrey text-sm">שביעות רצון</div>
            </div>
          </motion.div>
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
      <ContactContent />
    </Suspense>
  );
}