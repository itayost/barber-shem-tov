// src/app/apply/page.tsx - Without WhatsApp Link
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/common/Button';
import { academyInfo } from '@/lib/data';
import { enrollmentTracker } from '@/utils/enrollmentTracking';

// Form Input Component
const FormInput: React.FC<{
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
  dir?: 'rtl' | 'ltr';
}> = ({ type, name, value, onChange, placeholder, error, dir = 'rtl' }) => (
  <div>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      dir={dir}
      className={`
        w-full px-4 py-3 
        bg-charcoal-light/50 
        border ${error ? 'border-red-500' : 'border-lightgrey/20'}
        text-offwhite placeholder-lightgrey/50
        focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-transparent
        transition-all duration-200
      `}
    />
    {error && (
      <motion.p 
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-red-500 text-xs mt-1"
      >
        {error}
      </motion.p>
    )}
  </div>
);

function ApplyContent() {
  const searchParams = useSearchParams();
  const [courseName, setCourseName] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    age: '',
    phone: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Get course from URL params
  useEffect(() => {
    if (searchParams) {
      const courseParam = searchParams.get('course');
      if (courseParam) {
        setCourseName(decodeURIComponent(courseParam));
      }
    }
  }, [searchParams]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'שם מלא הוא שדה חובה';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'עיר מגורים היא שדה חובה';
    }
    
    if (!formData.age.trim()) {
      newErrors.age = 'גיל הוא שדה חובה';
    } else if (isNaN(Number(formData.age)) || Number(formData.age) < 16 || Number(formData.age) > 100) {
      newErrors.age = 'נא להזין גיל תקין';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'טלפון הוא שדה חובה';
    } else if (!/^[0-9]{9,10}$/.test(formData.phone.replace(/[-\s]/g, ''))) {
      newErrors.phone = 'נא להזין מספר טלפון תקין';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Track enrollment
    enrollmentTracker.track('form', 'contact_page', courseName);
    
    // Create message for backend or email service
    const message = `
🎯 פנייה חדשה מטופס הרשמה

👤 שם: ${formData.name}
📍 עיר: ${formData.city}
🎂 גיל: ${formData.age}
📱 טלפון: ${formData.phone}
${courseName ? `📚 קורס: ${courseName}` : '📚 קורס: לא צוין'}

📅 תאריך: ${new Date().toLocaleDateString('he-IL')}
⏰ שעה: ${new Date().toLocaleTimeString('he-IL')}
    `.trim();

    try {
      // Here you would typically send to your backend
      // For now, simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form submitted:', { formData, courseName, message });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success view
  if (isSubmitted) {
    return (
      <>
        <section className="py-20 bg-charcoal" dir="rtl">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="bg-charcoal-light/50 border border-gold/20 p-12">
                {/* Success Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>

                <h2 className="text-3xl font-bold text-gold mb-4">
                  ההרשמה נשלחה בהצלחה! 🎉
                </h2>
                
                <p className="text-lightgrey text-lg mb-6">
                  תודה {formData.name}! קיבלנו את פנייתך ונחזור אליך תוך 24 שעות.
                </p>

                {courseName && (
                  <div className="bg-gold/10 border border-gold/20 p-4 mb-6">
                    <p className="text-sm text-lightgrey">
                      נרשמת לקורס: <span className="text-gold font-bold">{courseName}</span>
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  <p className="text-sm text-lightgrey">
                    💬 במקרה של שאלות דחופות:
                  </p>
                  
                  {/* Contact Options - Phone and Email Only */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a 
                      href={`tel:${academyInfo.phone}`}
                      className="text-gold hover:text-gold/80 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="hebrew-nums">{academyInfo.phone}</span>
                    </a>
                    
                    <span className="text-lightgrey/30 hidden sm:inline">|</span>
                    
                    <a 
                      href={`mailto:${academyInfo.email}`}
                      className="text-gold hover:text-gold/80 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>{academyInfo.email}</span>
                    </a>
                  </div>
                </div>

                <Button
                  href="/"
                  variant="secondary"
                  className="mt-8"
                >
                  חזור לדף הבית
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </>
    );
  }

  // Main form view
  return (
    <>
      <section className="py-20 bg-charcoal" dir="rtl">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            {/* Form Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-offwhite mb-4">
                טופס הרשמה מהירה
              </h2>
              <p className="text-lightgrey">
                מלא את הפרטים ונחזור אליך תוך 24 שעות
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-charcoal-light/50 border border-gold/10 p-8">
                <div className="space-y-6">
                  {/* Name Field */}
                  <FormInput
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="שם מלא *"
                    error={errors.name}
                  />

                  {/* City Field */}
                  <FormInput
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="עיר מגורים *"
                    error={errors.city}
                  />

                  {/* Age Field */}
                  <FormInput
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="גיל *"
                    error={errors.age}
                  />

                  {/* Phone Field */}
                  <FormInput
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="מספר טלפון *"
                    error={errors.phone}
                    dir="ltr"
                  />
                </div>

                {/* Course info if selected */}
                {courseName && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 pt-6 border-t border-gold/10"
                  >
                    <p className="text-sm text-lightgrey">
                      נרשם לקורס: <span className="text-gold font-bold">{courseName}</span>
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex flex-col items-center gap-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="large"
                  disabled={isSubmitting}
                  className="min-w-[200px]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        ⏳
                      </motion.span>
                      שולח...
                    </span>
                  ) : (
                    'שלח הרשמה'
                  )}
                </Button>

                {/* Privacy note */}
                <p className="text-xs text-lightgrey/50 text-center">
                  🔒 הפרטים שלך בטוחים ולא יועברו לצד שלישי
                </p>
              </div>
            </form>

            {/* Contact alternatives - Phone and Email Only */}
            <div className="mt-12 text-center">
              <p className="text-lightgrey mb-4">מעדיפים ליצור קשר ישירות?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href={`tel:${academyInfo.phone}`}
                  className="text-gold hover:text-gold/80 transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="hebrew-nums">{academyInfo.phone}</span>
                </a>
                
                <span className="text-lightgrey/30 hidden sm:inline">|</span>
                
                <a 
                  href={`mailto:${academyInfo.email}`}
                  className="text-gold hover:text-gold/80 transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{academyInfo.email}</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-charcoal">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="text-gold text-2xl"
        >
          ⏳
        </motion.div>
      </div>
    }>
      <ApplyContent />
    </Suspense>
  );
}