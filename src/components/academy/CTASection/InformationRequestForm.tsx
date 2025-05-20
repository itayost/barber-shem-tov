// src/components/academy/CTASection/InformationRequestForm.tsx
'use client';

import React, { useState } from 'react';
import { EnvelopeIcon as MailIcon, PhoneIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const InformationRequestForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    contactMethod: 'phone',
    interestedIn: [] as string[],
    hearAbout: '',
  });
  const [submitted, setSubmitted] = useState(false);

  // Course interests options
  const courseOptions = [
    { id: 'beginner', label: 'קורסים למתחילים' },
    { id: 'advanced', label: 'קורסים מתקדמים' },
    { id: 'specialized', label: 'קורסים מתמחים' },
    { id: 'workshops', label: 'סדנאות' },
    { id: 'private', label: 'שיעורים פרטיים' }
  ];
  
  // How did you hear about us options
  const hearAboutOptions = [
    'חיפוש באינטרנט',
    'מדיה חברתית',
    'המלצה מחבר',
    'בוגר של האקדמיה',
    'פרסום',
    'אחר'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    
    setFormData(prev => {
      if (checked) {
        return {
          ...prev,
          interestedIn: [...prev.interestedIn, value]
        };
      } else {
        return {
          ...prev,
          interestedIn: prev.interestedIn.filter(item => item !== value)
        };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log(formData);
    
    // Show confirmation
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center p-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/20 rounded-full mb-6">
          <CheckCircleIcon className="w-8 h-8 text-gold" />
        </div>
        <h3 className="text-h3 mb-4">תודה על פנייתך</h3>
        <p className="text-lightgrey mb-6">
          קיבלנו את בקשתך למידע נוסף. צוות האקדמיה שלנו יצור איתך קשר בהקדם.
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
      <h3 className="text-h3 mb-6">בקש מידע נוסף</h3>
      <p className="text-lightgrey mb-6">
        השאר את פרטיך ואנו נשלח לך מידע מפורט על הקורסים ומסלולי הלימוד שלנו.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name field */}
          <div>
            <label htmlFor="name" className="block mb-2 text-lightgrey">
              שם מלא <span className="text-gold">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-transparent border border-lightgrey/30 focus:border-gold focus:outline-none transition-colors"
            />
          </div>
          
          {/* Contact field with tabs for phone/email */}
          <div>
            <label className="block mb-2 text-lightgrey">
              פרטי התקשרות <span className="text-gold">*</span>
            </label>
            <div className="flex mb-2">
              <button
                type="button"
                className={`py-2 px-4 text-sm ${formData.contactMethod === 'phone' ? 'bg-gold text-charcoal' : 'bg-transparent text-lightgrey border-t border-r border-l border-lightgrey/30'}`}
                onClick={() => setFormData({...formData, contactMethod: 'phone'})}
              >
                <PhoneIcon className="w-4 h-4 inline-block ml-1" />
                טלפון
              </button>
              <button
                type="button"
                className={`py-2 px-4 text-sm ${formData.contactMethod === 'email' ? 'bg-gold text-charcoal' : 'bg-transparent text-lightgrey border-t border-r border-l border-lightgrey/30'}`}
                onClick={() => setFormData({...formData, contactMethod: 'email'})}
              >
                <MailIcon className="w-4 h-4 inline-block ml-1" />
                אימייל
              </button>
            </div>
            <input
              type={formData.contactMethod === 'email' ? 'email' : 'tel'}
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              required
              placeholder={formData.contactMethod === 'email' ? 'your@email.com' : '05X-XXX-XXXX'}
              className="w-full px-4 py-3 bg-transparent border border-lightgrey/30 focus:border-gold focus:outline-none transition-colors"
              dir={formData.contactMethod === 'email' ? 'ltr' : 'rtl'}
            />
          </div>
        </div>
        
        {/* Course interests */}
        <div>
          <label className="block mb-4 text-lightgrey">
            מה מעניין אותך? <span className="text-gold">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {courseOptions.map(option => (
              <div key={option.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`interest-${option.id}`}
                  name="interestedIn"
                  value={option.id}
                  checked={formData.interestedIn.includes(option.id)}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 text-gold bg-transparent border-lightgrey/30 focus:ring-gold"
                />
                <label 
                  htmlFor={`interest-${option.id}`} 
                  className="mr-2 text-lightgrey"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* How did you hear about us */}
        <div>
          <label htmlFor="hearAbout" className="block mb-2 text-lightgrey">
            איך שמעת עלינו?
          </label>
          <select
            id="hearAbout"
            name="hearAbout"
            value={formData.hearAbout}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-transparent border border-lightgrey/30 focus:border-gold focus:outline-none transition-colors appearance-none"
          >
            <option value="">בחר אפשרות</option>
            {hearAboutOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        
        {/* Privacy note */}
        <div className="text-sm text-lightgrey">
          <p>שליחת הטופס מהווה הסכמה לקבלת מידע אודות האקדמיה שלנו. אנו מתחייבים לכבד את פרטיותך ולא להעביר את פרטיך לצד שלישי.</p>
        </div>
        
        {/* Submit button */}
        <div className="text-left">
          <button
            type="submit"
            disabled={formData.interestedIn.length === 0}
            className={`py-3 px-8 font-medium transition-colors ${
              formData.interestedIn.length > 0
                ? 'bg-gold text-charcoal hover:bg-opacity-90'
                : 'bg-lightgrey/20 text-lightgrey cursor-not-allowed'
            }`}
          >
            שלח בקשה
          </button>
        </div>
      </form>
    </div>
  );
};

export default InformationRequestForm;