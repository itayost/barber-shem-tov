// File: src/components/contact/AcademyEnrollmentForm.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/common/Button';

interface AcademyEnrollmentFormProps {
  courses: Array<{
    id: string;
    name_he: string;
    price: number;
    category: string;
    duration_he: string;
    prerequisites?: string;
    certification?: string;
  }>;
  academyInfo: {
    isOpenDay: (dayNumber: number) => boolean;
    getHoursForDay: (dayNumber: number) => { isOpen: boolean, open: string, close: string };
  };
  initialCourse?: string;
  inquiryType: 'course' | 'info';
  setInquiryType: (type: 'course' | 'info') => void;
}

const AcademyEnrollmentForm: React.FC<AcademyEnrollmentFormProps> = ({
}) => {
  // Simplified form state - only 4 fields
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    city: '',
    phone: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  // Error messages in Hebrew
  const errorMessages = {
    required: 'שדה חובה',
    invalidPhone: 'מספר טלפון לא תקין',
    invalidAge: 'גיל לא תקין',
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when field is being edited
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = errorMessages.required;
    }
    
    if (!formData.age.trim()) {
      errors.age = errorMessages.required;
    } else if (isNaN(Number(formData.age)) || Number(formData.age) < 16 || Number(formData.age) > 100) {
      errors.age = errorMessages.invalidAge;
    }
    
    if (!formData.city.trim()) {
      errors.city = errorMessages.required;
    }
    
    if (!formData.phone.trim()) {
      errors.phone = errorMessages.required;
    } else if (!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.phone)) {
      errors.phone = errorMessages.invalidPhone;
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Create WhatsApp message
      const message = `היי! התקבלה פנייה חדשה מהאתר:
      
שם: ${formData.name}
גיל: ${formData.age}
עיר: ${formData.city}
טלפון: ${formData.phone}`;
      
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/972528691415?text=${encodedMessage}`;
      
      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');
      
      // Show success message
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1000);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 border border-gold/30 text-center bg-gradient-to-br from-charcoal to-charcoal/80 rounded-lg"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <svg className="w-16 h-16 text-gold mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </motion.div>
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-heebo text-h4 mb-4 text-gold"
        >
          תודה רבה!
        </motion.h3>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="mb-6 text-lightgrey">
            הפרטים שלך נשלחו בהצלחה!
            <br />
            נציג מהאקדמיה יצור איתך קשר בהקדם.
          </p>
          <p className="text-lightgrey mb-6">
            שם: <span className="text-gold">{formData.name}</span><br />
            טלפון: <span className="text-gold" dir="ltr">{formData.phone}</span>
          </p>
          <Button 
            onClick={() => {
              setIsSubmitted(false);
              setFormData({ name: '', age: '', city: '', phone: '' });
            }} 
            variant="secondary"
          >
            שלח טופס נוסף
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-right"
    >
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-heebo text-h3 text-gold mb-8"
      >
        השאר פרטים ונחזור אליך
      </motion.h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <FormField id="name" label="שם מלא" required error={formErrors.name}>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-charcoal border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all duration-200 ${
              formErrors.name 
                ? 'border-red-500' 
                : 'border-lightgrey/20 hover:border-gold/50'
            }`}
            placeholder="הכנס את שמך המלא"
          />
        </FormField>
        
        {/* Age Field */}
        <FormField id="age" label="גיל" required error={formErrors.age}>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="16"
            max="100"
            className={`w-full px-4 py-3 bg-charcoal border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all duration-200 ${
              formErrors.age 
                ? 'border-red-500' 
                : 'border-lightgrey/20 hover:border-gold/50'
            }`}
            placeholder="הכנס את גילך"
          />
        </FormField>
        
        {/* City Field */}
        <FormField id="city" label="עיר מגורים" required error={formErrors.city}>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-charcoal border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all duration-200 ${
              formErrors.city 
                ? 'border-red-500' 
                : 'border-lightgrey/20 hover:border-gold/50'
            }`}
            placeholder="הכנס את עיר המגורים שלך"
          />
        </FormField>
        
        {/* Phone Field */}
        <FormField id="phone" label="טלפון" required error={formErrors.phone}>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-charcoal border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all duration-200 ${
              formErrors.phone 
                ? 'border-red-500' 
                : 'border-lightgrey/20 hover:border-gold/50'
            }`}
            placeholder="הכנס מספר טלפון"
            dir="ltr"
          />
        </FormField>
        
        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="pt-4"
        >
          <Button
            type="submit"
            variant="primary"
            className="w-full py-4 text-lg font-bold"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'שולח...' : 'שלח פרטים'}
          </Button>
        </motion.div>
        
        {/* Privacy Note */}
        <p className="text-xs text-lightgrey/60 text-center mt-4">
          *הפרטים שלך ישמרו בסודיות ולא יועברו לגורמים חיצוניים
        </p>
      </form>
    </motion.div>
  );
};

// Form Field Component
interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  error: string;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ id, label, required = false, error, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <label htmlFor={id} className="block text-lightgrey font-medium">
        {label}
        {required && <span className="text-gold mr-1">*</span>}
      </label>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-sm mt-1"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};

export default AcademyEnrollmentForm;