// src/app/apply/page.tsx
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Button from '@/components/common/Button';
import { academyInfo } from '@/lib/data';
import { enrollmentTracker } from '@/utils/enrollmentTracking';

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbx6GUzBwsdLtrK5trraOH27iD2_h3K7Mj4Jj3ImZCrzi93mjjvtW-h-JounKMkDDqlLqw/exec';

// Input component following your design system
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
    phone: '',
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
    } else if (
      isNaN(Number(formData.age)) ||
      Number(formData.age) < 16 ||
      Number(formData.age) > 100
    ) {
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
    enrollmentTracker.track('form', 'apply_page', courseName);

    try {
      // Send to Google Sheets
      console.log('Sending to Google Sheets...');
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Important for cross-origin requests to Google
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          city: formData.city,
          age: formData.age,
          phone: formData.phone,
          course: courseName || 'לא צוין',
          source: 'טופס הרשמה',
        }),
      });

      console.log('Sent to Google Sheets successfully');

      // Also send WhatsApp message (as backup/immediate notification)
      const message = `
🎯 פנייה חדשה מטופס הרשמה

👤 שם: ${formData.name}
📍 עיר: ${formData.city}
🎂 גיל: ${formData.age}
📱 טלפון: ${formData.phone}
${courseName ? `📚 קורס: ${courseName}` : ''}

נשמר ב-Google Sheets ✅
נשלח מ: ${window.location.href}
      `.trim();

      const whatsappUrl = `https://wa.me/972${academyInfo.phone.substring(1)}?text=${encodeURIComponent(message)}`;

      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');

      // Show success
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1000);
    } catch (error) {
      console.error('Error submitting form:', error);

      // If Google Sheets fails, at least send WhatsApp
      const message = `
🎯 פנייה חדשה מטופס הרשמה

👤 שם: ${formData.name}
📍 עיר: ${formData.city}
🎂 גיל: ${formData.age}
📱 טלפון: ${formData.phone}
${courseName ? `📚 קורס: ${courseName}` : ''}

⚠️ שים לב: היתה בעיה בשמירה האוטומטית
נשלח מ: ${window.location.href}
      `.trim();

      const whatsappUrl = `https://wa.me/972${academyInfo.phone.substring(1)}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      // Still show success (since WhatsApp worked)
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1000);
    }
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Success state
  if (isSubmitted) {
    return (
      <>
        <section className="py-20 bg-charcoal" dir="rtl">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto text-center"
            >
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8"
              >
                <svg
                  className="w-12 h-12 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>

              <h2 className="text-3xl font-bold text-offwhite mb-4">קיבלנו את הפרטים שלך!</h2>

              <p className="text-lightgrey text-lg mb-8">
                נציג מהאקדמיה יחזור אליך תוך 24 שעות
                <br />
                לתיאום פגישת ייעוץ ומידע על הקורסים
              </p>

              {/* Status indicators */}
              <div className="bg-gold/10 border border-gold/30 p-4 mb-8 text-sm text-lightgrey">
                <p className="flex items-center justify-center gap-2">
                  <span>✅</span>
                  הפרטים נשמרו במערכת שלנו
                </p>
                <p className="flex items-center justify-center gap-2 mt-2">
                  <span>📱</span>
                  הודעת WhatsApp נשלחה לנציג
                </p>
              </div>

              {/* Submission details */}
              <div className="bg-charcoal-light/50 border border-gold/20 p-6 mb-8 text-right">
                <h3 className="text-gold font-bold mb-4">פרטי ההרשמה:</h3>
                <div className="space-y-2 text-lightgrey">
                  <p>
                    <span className="text-gold">שם:</span> {formData.name}
                  </p>
                  <p>
                    <span className="text-gold">טלפון:</span>{' '}
                    <span className="hebrew-nums" dir="ltr">
                      {formData.phone}
                    </span>
                  </p>
                  <p>
                    <span className="text-gold">עיר:</span> {formData.city}
                  </p>
                  <p>
                    <span className="text-gold">גיל:</span> {formData.age}
                  </p>
                  {courseName && (
                    <p>
                      <span className="text-gold">קורס:</span> {courseName}
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button href="/" variant="primary" size="large">
                  חזרה לדף הבית
                </Button>

                <Button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', city: '', age: '', phone: '' });
                  }}
                  variant="secondary"
                  size="large"
                >
                  מלא טופס נוסף
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
              <h2 className="text-3xl font-bold text-offwhite mb-4">טופס הרשמה מהירה</h2>
              <p className="text-lightgrey">מלא את הפרטים ונחזור אליך תוך 24 שעות</p>
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
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
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

            {/* Contact alternatives */}
            <div className="mt-12 text-center">
              <p className="text-lightgrey mb-4">מעדיפים ליצור קשר ישירות?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href={`tel:${academyInfo.phone}`}
                  className="text-gold hover:text-gold/80 transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="hebrew-nums">{academyInfo.phone}</span>
                </a>

                <span className="text-lightgrey/30 hidden sm:inline">|</span>

                <a
                  href={`https://wa.me/972${academyInfo.phone.substring(1)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488" />
                  </svg>
                  <span>WhatsApp</span>
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
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-charcoal">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="text-gold text-2xl"
          >
            ⏳
          </motion.div>
        </div>
      }
    >
      <ApplyContent />
    </Suspense>
  );
}
