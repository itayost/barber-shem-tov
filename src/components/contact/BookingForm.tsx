import React, { useState, useEffect, useRef } from 'react';
import Button from '@/components/common/Button';
import { Service } from '@/types';
import { formatHebrewDate } from '@/utils/dateFormatters';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface BookingFormProps {
  services: Service[];
  businessInfo: {
    phone: string;
    hours: Array<{ days: string, hours: string }>;
    isClosedDay: (dayNumber: number) => boolean;
    getHoursForDay: (dayNumber: number) => { isOpen: boolean, open: string, close: string };
  };
  initialService?: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ 
  services, 
  businessInfo,
  initialService = '' 
}) => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    service: initialService,
    date: '',
    time: '',
    contact: '',
    message: '',
  });
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [availableTimes, setAvailableTimes] = useState<Date[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [businessHours, setBusinessHours] = useState({ open: '09:00', close: '19:00' });
  const contactInputRef = useRef<HTMLInputElement>(null);

  // Error messages in Hebrew
  const errorMessages = {
    required: 'שדה חובה',
    invalidPhone: 'מספר טלפון לא תקין',
    invalidEmail: 'כתובת אימייל לא תקינה',
    invalidDate: 'תאריך לא תקין',
    pastDate: 'אנא בחר תאריך עתידי',
    closedDay: 'המספרה סגורה ביום זה, אנא בחר יום שאיננו יום שני',
    invalidTime: 'שעה מחוץ לשעות הפעילות',
  };

  // Update service if initialService changes
  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({
        ...prev,
        service: initialService,
      }));
    }
  }, [initialService]);

  // Filter function for date picker - exclude closed days and past dates
  const filterDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Check if date is today or later
    if (date < today) {
      return false;
    }
    
    // Check if the day is a business day
    const dayOfWeek = date.getDay();
    return !businessInfo.isClosedDay(dayOfWeek);
  };

  // Update available time slots when date changes
  useEffect(() => {
    if (selectedDate) {
      const dayOfWeek = selectedDate.getDay();
      const dayHours = businessInfo.getHoursForDay(dayOfWeek);
      
      if (dayHours.isOpen) {
        // Parse business hours
        const parseTime = (timeStr: string) => {
          const [hours, minutes] = timeStr.split(':').map(Number);
          return { hours, minutes };
        };
        
        const openTime = parseTime(dayHours.open);
        const closeTime = parseTime(dayHours.close);
        
        // Generate time slots at 30-minute intervals
        const timeSlots: Date[] = [];
        const slotDate = new Date(selectedDate);
        
        // Set starting time
        slotDate.setHours(openTime.hours, openTime.minutes, 0, 0);
        
        // Set ending time (last slot starts 30 min before closing)
        const endTime = new Date(selectedDate);
        endTime.setHours(closeTime.hours, closeTime.minutes - 30, 0, 0);
        
        // Generate slots
        while (slotDate <= endTime) {
          timeSlots.push(new Date(slotDate));
          slotDate.setMinutes(slotDate.getMinutes() + 30);
        }
        
        setAvailableTimes(timeSlots);
        
        // Update business hours display
        setBusinessHours({
          open: dayHours.open,
          close: dayHours.close
        });
        
        // Clear selected time if outside business hours
        if (selectedTime) {
          const timeHours = selectedTime.getHours();
          const timeMinutes = selectedTime.getMinutes();
          
          if (
            timeHours < openTime.hours || 
            (timeHours === openTime.hours && timeMinutes < openTime.minutes) ||
            timeHours > closeTime.hours ||
            (timeHours === closeTime.hours && timeMinutes > closeTime.minutes)
          ) {
            setSelectedTime(null);
            setFormData(prev => ({ ...prev, time: '' }));
          }
        }
      }
    } else {
      setAvailableTimes([]);
      setSelectedTime(null);
      setFormData(prev => ({ ...prev, time: '' }));
    }
  }, [selectedDate, businessInfo]);

  // Handle date change
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    
    if (date) {
      // Format date as YYYY-MM-DD for form data
      const formattedDate = date.toISOString().split('T')[0];
      setFormData(prev => ({ ...prev, date: formattedDate }));
    } else {
      setFormData(prev => ({ ...prev, date: '' }));
    }
  };

  // Handle time change
  const handleTimeChange = (time: Date | null) => {
    setSelectedTime(time);
    
    if (time) {
      // Format time as HH:MM for form data
      const hours = time.getHours().toString().padStart(2, '0');
      const minutes = time.getMinutes().toString().padStart(2, '0');
      const formattedTime = `${hours}:${minutes}`;
      
      setFormData(prev => ({ ...prev, time: formattedTime }));
    } else {
      setFormData(prev => ({ ...prev, time: '' }));
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

  // Handle contact input - automatic RTL/LTR detection
  const handleContactInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const inputField = e.target;
    
    // Check if the input looks like an email or phone number
    const isEmail = value.includes('@');
    const isPhone = /^[+\d\s()-]+$/.test(value);
    
    if (isEmail || isPhone) {
      // For email and phone, use LTR
      inputField.dir = "ltr";
      inputField.style.textAlign = "left";
    } else {
      // For Hebrew text, use RTL
      inputField.dir = "rtl";
      inputField.style.textAlign = "right";
    }
    
    handleChange(e);
  };

  // Form validation
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = errorMessages.required;
    }
    
    if (!formData.service) {
      errors.service = 'אנא בחר שירות';
    }
    
    if (!formData.date) {
      errors.date = 'אנא בחר תאריך מועדף';
    }
    
    if (!formData.time) {
      errors.time = 'אנא בחר שעה מועדפת';
    }
    
    if (!formData.contact.trim()) {
      errors.contact = 'נדרש טלפון או אימייל';
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact) && // Email validation
      !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.contact) // Phone validation
    ) {
      errors.contact = 'אנא הזן אימייל או מספר טלפון תקין';
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
        // Reset form
        setFormData({
          name: '',
          service: '',
          date: '',
          time: '',
          contact: '',
          message: '',
        });
        setSelectedDate(null);
        setSelectedTime(null);
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
        className={`date-picker-button ${formErrors.date ? 'error' : ''}`}
      >
        {value || 'בחר תאריך'}
      </button>
    )
  );

  // Custom time picker input component for styling
  const CustomTimeInput = React.forwardRef<HTMLInputElement, { value?: string; onClick?: () => void }>(
    ({ value, onClick }, ref) => (
      <button
        type="button"
        onClick={onClick}
        ref={ref as React.RefObject<HTMLButtonElement>}
        className={`time-picker-button ${formErrors.time ? 'error' : ''}`}
        disabled={!selectedDate}
      >
        {value || 'בחר שעה'}
      </button>
    )
  );

  if (isSubmitted) {
    return (
      <div className="p-8 border border-gold border-opacity-30 text-center">
        <h3 className="font-heebo text-h4 mb-4">תודה רבה!</h3>
        <p className="mb-6 text-lightgrey">
          קיבלנו את בקשת ההזמנה שלך וניצור איתך קשר בהקדם כדי לאשר את פרטי התור שלך.
        </p>
        {formData.date && formData.time && (
          <p className="mb-6 text-gold">
            התור המבוקש: {formatHebrewDate(formData.date)}, בשעה {formData.time}
          </p>
        )}
        <p className="text-lightgrey mb-4">
          אם אתה זקוק לסיוע מיידי, אנא התקשר אלינו ישירות למספר{' '}
          <a href={`tel:${businessInfo.phone}`} className="text-gold hover:underline">
            {businessInfo.phone}
          </a>
        </p>
        <Button 
          onClick={() => setIsSubmitted(false)} 
          variant="secondary"
        >
          צור בקשה נוספת
        </Button>
      </div>
    );
  }

  return (
    <div className="text-right">
      <h2 className="font-heebo text-h3 text-gold mb-8">בקשת תור</h2>
      <p className="mb-6 text-lightgrey">
        בזמן שמערכת ההזמנות המקוונת שלנו נמצאת בפיתוח, נשמח לארגן את התור שלך
        באמצעות הטלפון או טופס בקשה זה. ניצור איתך קשר בהקדם לאישור ההזמנה שלך.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <FormField
          id="name"
          label="שם"
          required
          error={formErrors.name}
        >
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
            className={`w-full px-4 py-3 bg-transparent border text-right ${
              formErrors.name ? 'border-burgundy' : 'border-lightgrey border-opacity-30'
            } focus:border-gold focus:outline-none transition-colors duration-200`}
          />
        </FormField>
        
        {/* Service */}
        <FormField
          id="service"
          label="שירות"
          required
          error={formErrors.service}
        >
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-charcoal border text-right ${
              formErrors.service ? 'border-burgundy' : 'border-lightgrey border-opacity-30'
            } focus:border-gold focus:outline-none transition-colors duration-200`}
          >
            <option value="">בחר שירות</option>
            {services.map((service) => (
              <option key={service.id} value={service.name_he}>
                {service.name_he} - {service.price}₪
              </option>
            ))}
          </select>
        </FormField>
        
        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date Field */}
          <FormField
            id="date"
            label="תאריך מועדף"
            required
            error={formErrors.date}
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
              popperClassName="datepicker-popper"
              popperPlacement="bottom-end"
            />
          </FormField>

          {/* Time Field */}
          <FormField
            id="time"
            label="שעה מועדפת"
            required
            error={formErrors.time}
          >
            <DatePicker
              selected={selectedTime}
              onChange={handleTimeChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="שעה"
              dateFormat="HH:mm"
              includeTimes={availableTimes}
              customInput={<CustomTimeInput />}
              disabled={!selectedDate}
              calendarClassName="rtl-datepicker time-only"
              showPopperArrow={false}
              popperClassName="datepicker-popper"
              popperPlacement="bottom-end"
            />
            {selectedDate && (
              <small className="text-lightgrey block mt-1">
                שעות פעילות ביום זה: {businessHours.open} - {businessHours.close}
              </small>
            )}
          </FormField>
        </div>
        
        {/* Contact */}
        <FormField
          id="contact"
          label="טלפון או אימייל"
          required
          error={formErrors.contact}
        >
          <div className="relative">
            <input
              ref={contactInputRef}
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleContactInput}
              autoComplete="email tel"
              className={`w-full px-4 py-3 bg-transparent border ${
                formErrors.contact ? 'border-burgundy' : 'border-lightgrey border-opacity-30'
              } focus:border-gold focus:outline-none transition-colors duration-200`}
              placeholder="הזן מספר טלפון או אימייל"
            />
          </div>
        </FormField>
        
        {/* Message */}
        <FormField
          id="message"
          label="הערות נוספות (אופציונלי)"
          error=""
        >
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            placeholder="הוסף הערות או בקשות מיוחדות"
            className="w-full px-4 py-3 bg-transparent border text-right border-lightgrey border-opacity-30 focus:border-gold focus:outline-none transition-colors duration-200 resize-none"
            style={{ textAlign: 'right', direction: 'rtl' }}
          />
        </FormField>
        
        {/* Privacy Note */}
        <div className="text-small text-lightgrey text-right">
          <p>
            על ידי שליחת טופס זה, אתה מסכים למדיניות הפרטיות שלנו. נשתמש במידע שלך
            אך ורק לצורך עיבוד בקשת ההזמנה שלך.
          </p>
        </div>
        
        {/* Submit Button */}
        <div className="text-left">
          <Button 
            type="submit" 
            variant="primary"
            className="w-full md:w-auto"
          >
            {isSubmitting ? 'שולח...' : 'בקש תור'}
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

export default BookingForm;