// File: src/components/contact/AcademyEnrollmentForm.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/common/Button';
import DatePicker from 'react-datepicker';
import { formatHebrewDate } from '@/utils/dateFormatters';

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
  courses, 
  academyInfo, 
  initialCourse = '',
  inquiryType,
  setInquiryType
}) => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: initialCourse,
    startDate: '',
    education: '',
    experience: '',
    questions: '',
    heardFrom: '',
  });
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  // Error messages in Hebrew
  const errorMessages = {
    required: 'שדה חובה',
    invalidPhone: 'מספר טלפון לא תקין',
    invalidEmail: 'כתובת אימייל לא תקינה',
  };

  // Update course if initialCourse changes
  useEffect(() => {
    if (initialCourse) {
      setFormData(prev => ({
        ...prev,
        course: initialCourse,
      }));
      setInquiryType('course');
    }
  }, [initialCourse, setInquiryType]);

  // Filter function for date picker - exclude closed days and past dates
  const filterDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Check if date is at least 3 days in the future
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 3);
    minDate.setHours(0, 0, 0, 0);
    
    if (date < minDate) {
      return false;
    }
    
    // Check if the day is a business day
    const dayOfWeek = date.getDay();
    return academyInfo.isOpenDay(dayOfWeek);
  };

  // Handle date change
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    
    if (date) {
      // Format date as YYYY-MM-DD for form data
      const formattedDate = date.toISOString().split('T')[0];
      setFormData(prev => ({ ...prev, startDate: formattedDate }));
    } else {
      setFormData(prev => ({ ...prev, startDate: '' }));
    }
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
    
    if (inquiryType === 'course' && !formData.course) {
      errors.course = 'אנא בחר קורס';
    }
    
    if (!formData.email.trim()) {
      errors.email = errorMessages.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = errorMessages.invalidEmail;
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
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        console.log('Form data submitted:', formData);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          course: '',
          startDate: '',
          education: '',
          experience: '',
          questions: '',
          heardFrom: '',
        });
        setSelectedDate(null);
      }, 1500);
    }
  };

  // Custom date picker input component for styling
  const CustomDateInput = React.forwardRef<HTMLInputElement, { value?: string; onClick?: () => void }>(
    ({ value, onClick }, ref) => (
      <button
        type="button"
        onClick={onClick}
        ref={ref as React.RefObject<HTMLButtonElement>}
        className={`date-picker-button ${formErrors.startDate ? 'error' : ''}`}
      >
        {value || 'בחר תאריך אפשרי להתחלה'}
      </button>
    )
  );
  CustomDateInput.displayName = 'CustomDateInput';

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
          {inquiryType === 'course' ? (
            <>
              <p className="mb-6 text-lightgrey">
                קיבלנו את בקשת ההרשמה שלך לקורס
                {formData.course && <span className="text-gold"> {formData.course}</span>}.
                נציג מהאקדמיה יצור איתך קשר בהקדם לתיאום פגישת ייעוץ אישית ולהשלמת תהליך ההרשמה.
              </p>
              {formData.startDate && (
                <p className="mb-6 text-gold">
                  התאריך המבוקש להתחלה: {formatHebrewDate(formData.startDate)}
                </p>
              )}
            </>
          ) : (
            <p className="mb-6 text-lightgrey">
              קיבלנו את פנייתך למידע על האקדמיה שלנו. נציג יצור איתך קשר בהקדם
              כדי לספק לך את כל המידע שאתה מחפש ולענות על שאלותיך.
            </p>
          )}
          <p className="text-lightgrey mb-6">
            מספר הטלפון שלך: <span className="text-gold" dir="ltr">{formData.phone}</span><br />
            המייל שלך: <span className="text-gold" dir="ltr">{formData.email}</span>
          </p>
          <Button 
            onClick={() => setIsSubmitted(false)} 
            variant="secondary"
          >
            חזרה לטופס
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
        {inquiryType === 'course' ? 'טופס הרשמה לקורס' : 'טופס בקשת מידע'}
      </motion.h2>
      
      {/* Form Type Selector */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <p className="mb-4 font-medium text-lightgrey">אני מעוניין ב:</p>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="inquiryType"
              checked={inquiryType === 'course'}
              onChange={() => setInquiryType('course')}
              className="hidden"
            />
            <div className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
              inquiryType === 'course' 
                ? 'bg-gold/10 border-gold text-gold' 
                : 'border-lightgrey/20 text-lightgrey hover:border-gold/50'
            }`}>
              הרשמה לקורס
            </div>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="inquiryType"
              checked={inquiryType === 'info'}
              onChange={() => setInquiryType('info')}
              className="hidden"
            />
            <div className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
              inquiryType === 'info' 
                ? 'bg-gold/10 border-gold text-gold' 
                : 'border-lightgrey/20 text-lightgrey hover:border-gold/50'
            }`}>
              מידע כללי
            </div>
          </label>
        </div>
      </motion.div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <FormField id="name" label="שם מלא" required error={formErrors.name}>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 bg-charcoal border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all duration-200 ${
              formErrors.name 
                ? 'border-red-500' 
                : 'border-lightgrey/20 hover:border-gold/50'
            }`}
            placeholder="הכנס את שמך המלא"
          />
        </FormField>
        
        {/* Email Field */}
        <FormField id="email" label="אימייל" required error={formErrors.email}>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 bg-charcoal border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all duration-200 ${
              formErrors.email 
                ? 'border-red-500' 
                : 'border-lightgrey/20 hover:border-gold/50'
            }`}
            placeholder="הכנס כתובת אימייל תקינה"
            dir="ltr"
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
            className={`w-full px-4 py-2 bg-charcoal border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all duration-200 ${
              formErrors.phone 
                ? 'border-red-500' 
                : 'border-lightgrey/20 hover:border-gold/50'
            }`}
            placeholder="הכנס מספר טלפון"
            dir="ltr"
          />
        </FormField>
        
        {/* Course Selection - Only for course inquiries */}
        {inquiryType === 'course' && (
          <FormField id="course" label="קורס" required error={formErrors.course}>
            <select
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-charcoal border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all duration-200 ${
                formErrors.course 
                  ? 'border-red-500' 
                  : 'border-lightgrey/20 hover:border-gold/50'
              }`}
            >
              <option value="">בחר קורס</option>
              {courses.map((course) => (
                <option key={course.id} value={course.name_he}>
                  {course.name_he} - {course.duration_he} ({course.price} ₪)
                </option>
              ))}
            </select>
          </FormField>
        )}
        
        {/* Start Date - Only for course inquiries */}
        {inquiryType === 'course' && (
          <FormField id="startDate" label="תאריך התחלה מועדף" error={formErrors.startDate}>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              filterDate={filterDate}
              dateFormat="dd/MM/yyyy"
              placeholderText="בחר תאריך אפשרי להתחלה"
              customInput={<CustomDateInput />}
              className="w-full"
            />
          </FormField>
        )}
        
        {/* Additional Fields - Only for course inquiries */}
        {inquiryType === 'course' && (
          <>
            <FormField id="education" label="רקע לימודי" error={formErrors.education}>
              <textarea
                id="education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-charcoal border border-lightgrey/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all duration-200 hover:border-gold/50"
                rows={3}
                placeholder="ספר לנו על הרקע הלימודי שלך"
              />
            </FormField>
            
            <FormField id="experience" label="ניסיון מקצועי" error={formErrors.experience}>
              <textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-charcoal border border-lightgrey/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all duration-200 hover:border-gold/50"
                rows={3}
                placeholder="ספר לנו על הניסיון המקצועי שלך"
              />
            </FormField>
          </>
        )}
        
        {/* Questions Field */}
        <FormField id="questions" label="שאלות נוספות" error={formErrors.questions}>
          <textarea
            id="questions"
            name="questions"
            value={formData.questions}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-charcoal border border-lightgrey/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all duration-200 hover:border-gold/50"
            rows={3}
            placeholder="יש לך שאלות נוספות? נשמח לענות"
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
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'שולח...' : 'שלח פנייה'}
          </Button>
        </motion.div>
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
      <label htmlFor={id} className="block text-lightgrey">
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