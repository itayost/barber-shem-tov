// File: src/components/contact/AcademyEnrollmentForm.tsx
import React, { useState, useEffect } from 'react';
import Button from '@/components/common/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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

  // Get selected course details
  const selectedCourse = formData.course 
    ? courses.find(course => course.name_he === formData.course) 
    : null;

  if (isSubmitted) {
    return (
      <div className="p-8 border border-gold border-opacity-30 text-center bg-gold bg-opacity-5">
        <svg className="w-16 h-16 text-gold mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="font-heebo text-h4 mb-4">תודה רבה!</h3>
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
      </div>
    );
  }

  return (
    <div className="text-right">
      <h2 className="font-heebo text-h3 text-gold mb-8">
        {inquiryType === 'course' ? 'טופס הרשמה לקורס' : 'טופס בקשת מידע'}
      </h2>
      
      {/* Form Type Selector */}
      <div className="mb-6">
        <p className="mb-4 font-medium">אני מעוניין ב:</p>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="inquiryType"
              value="info"
              checked={inquiryType === 'info'}
              onChange={() => setInquiryType('info')}
              className="sr-only"
            />
            <span className={`inline-block px-4 py-2 border ${
              inquiryType === 'info' 
                ? 'border-gold bg-gold bg-opacity-10 text-gold' 
                : 'border-lightgrey border-opacity-30 text-lightgrey'
            } transition-colors duration-200`}>
              מידע כללי
            </span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="inquiryType"
              value="course"
              checked={inquiryType === 'course'}
              onChange={() => setInquiryType('course')}
              className="sr-only"
            />
            <span className={`inline-block px-4 py-2 border ${
              inquiryType === 'course' 
                ? 'border-gold bg-gold bg-opacity-10 text-gold' 
                : 'border-lightgrey border-opacity-30 text-lightgrey'
            } transition-colors duration-200`}>
              הרשמה לקורס
            </span>
          </label>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <FormField
            id="name"
            label="שם מלא"
            required
            error={formErrors.name}
          >
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${formErrors.name ? 'border-burgundy' : ''}`}
            />
          </FormField>
          
          {/* Email */}
          <FormField
            id="email"
            label="אימייל"
            required
            error={formErrors.email}
          >
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              dir="ltr"
              className={`form-input ${formErrors.email ? 'border-burgundy' : ''}`}
              style={{ textAlign: 'left' }}
            />
          </FormField>
        </div>
        
        {/* Phone */}
        <FormField
          id="phone"
          label="טלפון"
          required
          error={formErrors.phone}
        >
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            dir="ltr"
            className={`form-input ${formErrors.phone ? 'border-burgundy' : ''}`}
            style={{ textAlign: 'left' }}
          />
        </FormField>
        
        {/* Course Selection - shown only when inquiryType is 'course' */}
        {inquiryType === 'course' && (
          <>
            <FormField
              id="course"
              label="קורס מבוקש"
              required
              error={formErrors.course}
            >
              <select
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                className={`form-input ${formErrors.course ? 'border-burgundy' : ''}`}
              >
                <option value="">בחר קורס</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.name_he}>
                    {course.name_he} - {course.price}₪ | {course.duration_he}
                  </option>
                ))}
              </select>
            </FormField>
            
            {/* Start Date */}
            <FormField
              id="startDate"
              label="תאריך התחלה מועדף"
              required={false}
              error={formErrors.startDate}
            >
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                filterDate={filterDate}
                dateFormat="dd/MM/yyyy"
                customInput={<CustomDateInput />}
                calendarClassName="rtl-datepicker"
                showPopperArrow={false}
                inline={false}
                minDate={new Date(new Date().setDate(new Date().getDate() + 3))}
                popperClassName="datepicker-popper"
                popperPlacement="bottom-end"
              />
              <small className="text-lightgrey block mt-2">
                * מועדי הקורסים עשויים להשתנות. נציג האקדמיה יעדכן אותך לגבי המועד הקרוב ביותר.
              </small>
            </FormField>
            
            {/* Selected Course Details */}
            {selectedCourse && (
              <div className="p-4 border border-gold border-opacity-10 bg-gold bg-opacity-5 my-4">
                <h4 className="font-medium text-gold mb-2">{selectedCourse.name_he}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-lightgrey">קטגוריה: </span>
                    <span>{selectedCourse.category === 'beginner' ? 'למתחילים' : 'מתקדם'}</span>
                  </div>
                  <div>
                    <span className="text-lightgrey">משך: </span>
                    <span>{selectedCourse.duration_he}</span>
                  </div>
                  <div>
                    <span className="text-lightgrey">מחיר: </span>
                    <span>{selectedCourse.price}₪</span>
                  </div>
                  {selectedCourse.prerequisites && (
                    <div>
                      <span className="text-lightgrey">דרישות קדם: </span>
                      <span>{selectedCourse.prerequisites}</span>
                    </div>
                  )}
                  {selectedCourse.certification && (
                    <div className="md:col-span-2">
                      <span className="text-lightgrey">תעודה: </span>
                      <span>{selectedCourse.certification}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Previous Experience */}
            <FormField
              id="experience"
              label="ניסיון קודם (אם יש)"
              required={false}
              error={""}
            >
              <textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                rows={3}
                className="form-input"
              />
            </FormField>
            
            {/* Education Background */}
            <FormField
              id="education"
              label="רקע השכלתי"
              required={false}
              error={""}
            >
              <textarea
                id="education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                rows={3}
                className="form-input"
              />
            </FormField>
          </>
        )}
        
        {/* Questions/Comments */}
        <FormField
          id="questions"
          label={inquiryType === 'course' ? "שאלות לגבי הקורס" : "תחומי התעניינות או שאלות"}
          required={false}
          error={""}
        >
          <textarea
            id="questions"
            name="questions"
            value={formData.questions}
            onChange={handleChange}
            rows={4}
            className="form-input"
          />
        </FormField>
        
        {/* How did you hear about us */}
        <FormField
          id="heardFrom"
          label="איך שמעת עלינו?"
          required={false}
          error={""}
        >
          <select
            id="heardFrom"
            name="heardFrom"
            value={formData.heardFrom}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">בחר אפשרות</option>
            <option value="social">מדיה חברתית</option>
            <option value="friend">המלצה מחבר</option>
            <option value="search">חיפוש באינטרנט</option>
            <option value="alumni">בוגר של האקדמיה</option>
            <option value="other">אחר</option>
          </select>
        </FormField>
        
        {/* Privacy Note */}
        <div className="text-small text-lightgrey text-right">
          <p>
            על ידי שליחת טופס זה, אתה מסכים למדיניות הפרטיות שלנו. המידע שלך
            ישמש רק לצורך בקשת המידע/ההרשמה הנוכחית ולא יועבר לצד שלישי.
          </p>
        </div>
        
        {/* Submit Button */}
        <div className="text-left">
          <Button 
            type="submit" 
            variant="primary"
            className="w-full md:w-auto"
          >
            {isSubmitting 
              ? 'שולח...' 
              : inquiryType === 'course' 
                ? 'שלח בקשת הרשמה' 
                : 'שלח בקשת מידע'
            }
          </Button>
        </div>
      </form>
    </div>
  );
};

// FormField component for reusable form inputs
interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  error: string;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ id, label, required = false, error, children }) => {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-lightgrey text-right">
        {label} {required && <span className="text-burgundy">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-burgundy text-small text-right">{error}</p>
      )}
    </div>
  );
};

export default AcademyEnrollmentForm;