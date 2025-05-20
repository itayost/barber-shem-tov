// src/components/academy/CTASection/ConsultationBooking.tsx
'use client';

import React, { useState } from 'react';
import { CalendarIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const ConsultationBooking: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [preferredInstructor, setPreferredInstructor] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Available time slots
  const timeSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
  
  // Sample instructor data
  const instructors = [
    { id: 'bar', name: 'בר שם טוב' },
    { id: 'yarin', name: 'ירין מזרחי' },
    { id: 'itzik', name: 'איציק כהן' },
  ];

  // Filter dates - no weekends, past dates, etc.
  const filterDate = (date: Date) => {
    const day = date.getDay();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Allow only future dates (today + 2 days min for scheduling)
    const minDate = new Date();
    minDate.setDate(today.getDate() + 2);
    
    // Only weekdays (no Friday/Saturday in Israel)
    return date >= minDate && day !== 5 && day !== 6;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log({
      name,
      phone,
      date: selectedDate?.toISOString().split('T')[0],
      time: selectedTime,
      instructor: preferredInstructor,
      notes
    });
    
    // Show confirmation
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center p-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/20 rounded-full mb-6">
          <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-h3 mb-4">בקשתך התקבלה</h3>
        <p className="text-lightgrey mb-6">
          תודה שיצרת איתנו קשר. נשוב אליך בהקדם לאישור הפגישה.
        </p>
        <button 
          onClick={() => setSubmitted(false)} 
          className="text-gold hover:underline"
        >
          חזרה לטופס
        </button>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-h3 mb-6">הזמן פגישת ייעוץ אישית</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name field */}
          <div>
            <label htmlFor="name" className="block mb-2 text-lightgrey">
              שם מלא <span className="text-gold">*</span>
            </label>
            <div className="relative">
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-transparent border border-lightgrey/30 focus:border-gold focus:outline-none transition-colors"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <UserIcon className="w-5 h-5 text-lightgrey" />
              </div>
            </div>
          </div>
          
          {/* Phone field */}
          <div>
            <label htmlFor="phone" className="block mb-2 text-lightgrey">
              טלפון <span className="text-gold">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-4 py-3 bg-transparent border border-lightgrey/30 focus:border-gold focus:outline-none transition-colors"
              dir="ltr"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date picker */}
          <div>
            <label htmlFor="date" className="block mb-2 text-lightgrey">
              תאריך מועדף <span className="text-gold">*</span>
            </label>
            <div className="relative">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                filterDate={filterDate}
                dateFormat="dd/MM/yyyy"
                placeholderText="בחר תאריך"
                className="w-full px-4 py-3 bg-transparent border border-lightgrey/30 focus:border-gold focus:outline-none transition-colors"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <CalendarIcon className="w-5 h-5 text-lightgrey" />
              </div>
            </div>
          </div>
          
          {/* Time picker */}
          <div>
            <label htmlFor="time" className="block mb-2 text-lightgrey">
              שעה מועדפת <span className="text-gold">*</span>
            </label>
            <div className="relative">
              <select
                id="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                required
                className="w-full px-4 py-3 bg-transparent border border-lightgrey/30 focus:border-gold focus:outline-none transition-colors appearance-none"
              >
                <option value="">בחר שעה</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ClockIcon className="w-5 h-5 text-lightgrey" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Preferred instructor */}
        <div>
          <label htmlFor="instructor" className="block mb-2 text-lightgrey">
            מדריך מועדף (אופציונלי)
          </label>
          <select
            id="instructor"
            value={preferredInstructor}
            onChange={(e) => setPreferredInstructor(e.target.value)}
            className="w-full px-4 py-3 bg-transparent border border-lightgrey/30 focus:border-gold focus:outline-none transition-colors appearance-none"
          >
            <option value="">בחר מדריך</option>
            {instructors.map((instructor) => (
              <option key={instructor.id} value={instructor.id}>{instructor.name}</option>
            ))}
          </select>
        </div>
        
        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block mb-2 text-lightgrey">
            הערות נוספות
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 bg-transparent border border-lightgrey/30 focus:border-gold focus:outline-none transition-colors"
          ></textarea>
        </div>
        
        {/* Submit button */}
        <div className="text-left">
          <button
            type="submit"
            className="bg-gold text-charcoal py-3 px-8 font-medium hover:bg-opacity-90 transition-colors"
          >
            שלח בקשת ייעוץ
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConsultationBooking;