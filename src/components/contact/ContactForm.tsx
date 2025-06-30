'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LuxuryButton, LuxuryLabel } from '@/components/luxury';
import { Send, Loader2 } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  courseInterest: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  courseInterest: '',
};

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData(initialFormData);

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = (fieldName: string) => `
    w-full bg-transparent border-b border-gold/20
    px-0 py-4 text-offwhite placeholder-darkgrey
    focus:border-gold focus:outline-none
    transition-all duration-500
    ${focusedField === fieldName ? 'border-gold' : ''}
  `;

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="space-y-8"
    >
      {/* Name & Email Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
            required
            className={inputClasses('name')}
            placeholder=" "
          />
          <label
            htmlFor="name"
            className={`
              absolute top-4 right-0 text-sm transition-all duration-300 pointer-events-none
              ${
                formData.name || focusedField === 'name'
                  ? '-top-2 text-xs text-gold'
                  : 'text-lightgrey'
              }
            `}
          >
            שם מלא *
          </label>
        </div>

        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            required
            className={inputClasses('email')}
            placeholder=" "
          />
          <label
            htmlFor="email"
            className={`
              absolute top-4 right-0 text-sm transition-all duration-300 pointer-events-none
              ${
                formData.email || focusedField === 'email'
                  ? '-top-2 text-xs text-gold'
                  : 'text-lightgrey'
              }
            `}
          >
            אימייל *
          </label>
        </div>
      </div>

      {/* Phone & Course Interest Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onFocus={() => setFocusedField('phone')}
            onBlur={() => setFocusedField(null)}
            required
            className={inputClasses('phone')}
            placeholder=" "
          />
          <label
            htmlFor="phone"
            className={`
              absolute top-4 right-0 text-sm transition-all duration-300 pointer-events-none
              ${
                formData.phone || focusedField === 'phone'
                  ? '-top-2 text-xs text-gold'
                  : 'text-lightgrey'
              }
            `}
          >
            טלפון *
          </label>
        </div>

        <div className="relative">
          <select
            id="courseInterest"
            name="courseInterest"
            value={formData.courseInterest}
            onChange={handleChange}
            onFocus={() => setFocusedField('courseInterest')}
            onBlur={() => setFocusedField(null)}
            className={`${inputClasses('courseInterest')} appearance-none cursor-pointer`}
          >
            <option value="">בחר קורס</option>
            <option value="basic">קורס בסיסי</option>
            <option value="advanced">קורס מתקדם</option>
            <option value="workshop">סדנאות והשתלמויות</option>
            <option value="consultation">ייעוץ אישי</option>
          </select>
          <label
            htmlFor="courseInterest"
            className={`
              absolute top-4 right-0 text-sm transition-all duration-300 pointer-events-none
              ${
                formData.courseInterest || focusedField === 'courseInterest'
                  ? '-top-2 text-xs text-gold'
                  : 'text-lightgrey'
              }
            `}
          >
            מעוניין ב
          </label>
          {/* Custom select arrow */}
          <div className="absolute top-4 left-0 pointer-events-none">
            <svg
              className="w-5 h-5 text-gold"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Subject */}
      <div className="relative">
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          onFocus={() => setFocusedField('subject')}
          onBlur={() => setFocusedField(null)}
          required
          className={inputClasses('subject')}
          placeholder=" "
        />
        <label
          htmlFor="subject"
          className={`
            absolute top-4 right-0 text-sm transition-all duration-300 pointer-events-none
            ${
              formData.subject || focusedField === 'subject'
                ? '-top-2 text-xs text-gold'
                : 'text-lightgrey'
            }
          `}
        >
          נושא הפנייה *
        </label>
      </div>

      {/* Message */}
      <div className="relative">
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onFocus={() => setFocusedField('message')}
          onBlur={() => setFocusedField(null)}
          required
          rows={5}
          className={`${inputClasses('message')} resize-none`}
          placeholder=" "
        />
        <label
          htmlFor="message"
          className={`
            absolute top-4 right-0 text-sm transition-all duration-300 pointer-events-none
            ${
              formData.message || focusedField === 'message'
                ? '-top-2 text-xs text-gold'
                : 'text-lightgrey'
            }
          `}
        >
          הודעה *
        </label>
      </div>

      {/* Submit Button & Status */}
      <div className="pt-8">
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 border border-gold/30 bg-gold/10 text-offwhite text-center"
          >
            תודה על פנייתך! נחזור אליך בהקדם.
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 border border-red-500/30 bg-red-500/10 text-red-400 text-center"
          >
            אירעה שגיאה בשליחת הטופס. אנא נסה שוב.
          </motion.div>
        )}

        <LuxuryButton
          type="submit"
          variant="primary"
          size="large"
          fullWidth
          disabled={isSubmitting}
          icon={isSubmitting ? <Loader2 className="animate-spin" /> : <Send />}
          iconPosition="end"
        >
          {isSubmitting ? 'שולח...' : 'שלח הודעה'}
        </LuxuryButton>
      </div>

      {/* Privacy Note */}
      <p className="text-xs text-darkgrey text-center">
        בשליחת הטופס אני מאשר/ת קבלת מידע שיווקי ומסכים/ה ל
        <a href="/privacy" className="text-gold hover:text-gold-light transition-colors">
          {' '}
          תנאי השימוש
        </a>
      </p>
    </motion.form>
  );
};

export default ContactForm;
