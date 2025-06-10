// src/app/apply/page.tsx
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { academyInfo } from '@/lib/data';

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
    
    // Create message for company
    const message = `
🎯 פנייה חדשה מטופס הרשמה מהירה

👤 שם: ${formData.name}
📍 עיר: ${formData.city}
🎂 גיל: ${formData.age}
📱 טלפון: ${formData.phone}
${courseName ? `📚 קורס: ${courseName}` : ''}

נשלח מ: ${window.location.href}
    `.trim();
    
    // Here you would normally send to your backend
    // For now, open WhatsApp
    const whatsappUrl = `https://wa.me/972544994417?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Show success after delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Success state
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-charcoal to-black flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-charcoal-light/50 border border-gold/30 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-md w-full text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          
          <h2 className="text-2xl font-bold text-offwhite mb-4">
            נרשמת בהצלחה! 🎉
          </h2>
          
          <p className="text-lightgrey mb-6">
            קיבלנו את הפרטים שלך ונחזור אליך בהקדם.
            <br />
            <span className="text-gold font-medium">בדרך כלל תוך 24 שעות</span>
          </p>
          
          <div className="bg-charcoal/50 p-4 rounded-lg mb-6 text-sm">
            <p className="text-lightgrey mb-2">פרטי ההרשמה:</p>
            <p className="text-offwhite">{formData.name}</p>
            <p className="text-offwhite hebrew-nums" dir="ltr">{formData.phone}</p>
          </div>
          
          <div className="flex flex-col gap-3">
            <Link 
              href="/"
              className="bg-gold text-charcoal py-3 px-6 rounded-full font-bold hover:bg-gold/90 transition-all"
            >
              חזרה לדף הבית
            </Link>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({ name: '', city: '', age: '', phone: '' });
              }}
              className="text-gold hover:underline"
            >
              מלא טופס נוסף
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Main form view
  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal to-black flex items-center justify-center p-4" dir="rtl">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-charcoal-light/50 border border-gold/30 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-2xl max-w-md w-full relative z-10"
      >
        {/* Logo */}
        <Link href="/" className="block mb-8">
          <Image
            src="/images/logos/logo.png"
            alt={academyInfo.shortName}
            width={150}
            height={40}
            className="h-10 w-auto mx-auto"
          />
        </Link>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-2">
          הרשמה מהירה
        </h1>
        {courseName && (
          <p className="text-gold text-center mb-6">
            {courseName}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="שם מלא *"
              className={`w-full px-4 py-3 bg-charcoal/50 border rounded-lg placeholder-lightgrey/50 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all ${
                errors.name ? 'border-red-500' : 'border-lightgrey/20'
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* City Field */}
          <div>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="עיר מגורים *"
              className={`w-full px-4 py-3 bg-charcoal/50 border rounded-lg placeholder-lightgrey/50 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all ${
                errors.city ? 'border-red-500' : 'border-lightgrey/20'
              }`}
            />
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city}</p>
            )}
          </div>

          {/* Age Field */}
          <div>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="גיל *"
              min="16"
              max="100"
              className={`w-full px-4 py-3 bg-charcoal/50 border rounded-lg placeholder-lightgrey/50 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all ${
                errors.age ? 'border-red-500' : 'border-lightgrey/20'
              }`}
            />
            {errors.age && (
              <p className="text-red-500 text-xs mt-1">{errors.age}</p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="מספר טלפון *"
              dir="ltr"
              className={`w-full px-4 py-3 bg-charcoal/50 border rounded-lg placeholder-lightgrey/50 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all ${
                errors.phone ? 'border-red-500' : 'border-lightgrey/20'
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gold text-charcoal py-4 rounded-full font-bold text-lg hover:bg-gold/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
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
          </motion.button>
        </form>

        {/* Trust text */}
        <p className="text-xs text-lightgrey/50 text-center mt-4">
          🔒 הפרטים שלך בטוחים ולא יועברו לצד שלישי
        </p>
      </motion.div>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-charcoal">
        <div className="animate-pulse text-gold">טוען...</div>
      </div>
    }>
      <ApplyContent />
    </Suspense>
  );
}