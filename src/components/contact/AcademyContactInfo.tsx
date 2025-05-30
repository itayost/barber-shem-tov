// File: src/components/contact/AcademyContactInfo.tsx
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '@/components/common/Button';

interface AcademyContactInfoProps {
  academyInfo: {
    name: string;
    shortName: string;
    address: string;
    phone: string;
    email: string;
    established: number;
    hours: Array<{ days: string, hours: string }>;
    social: {
      instagram?: string;
      facebook?: string;
      youtube?: string;
    };
    accreditations?: string[];
  };
}

const AcademyContactInfo: React.FC<AcademyContactInfoProps> = ({ academyInfo }) => {
  return (
    <div dir="rtl" className="text-right">
      <h2 className="font-heebo text-h3 text-gold mb-8">פרטי התקשרות</h2>
      
      {/* Academy Name and Logo */}
      <motion.div 
        className="mb-12 bg-gradient-to-br from-charcoal to-charcoal/80 border border-lightgrey/10 p-6 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-start">
          <div className="ml-4 flex-shrink-0 relative h-16 w-20 overflow-hidden">
            <Image 
              src="/images/logos/logo.png"
              alt={academyInfo.name}
              width={80}
              height={64}
              className="object-contain"
              priority
            />
          </div>
          <div>
            <h3 className="font-heebo text-h4 mb-1">{academyInfo.name}</h3>
            <p className="text-lightgrey text-sm mb-2">האקדמיה המובילה לאמנות הספרות - מאז {academyInfo.established}</p>
            <div className="flex gap-3 mt-2">
              {academyInfo.social.instagram && (
                <Button
                  variant="tertiary"
                  size="small"
                  href={academyInfo.social.instagram}
                  className="text-lightgrey hover:text-gold"
                  ariaLabel="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </Button>
              )}
              {academyInfo.social.facebook && (
                <Button
                  variant="tertiary"
                  size="small"
                  href={academyInfo.social.facebook}
                  className="text-lightgrey hover:text-gold"
                  ariaLabel="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </Button>
              )}
              {academyInfo.social.youtube && (
                <Button
                  variant="tertiary"
                  size="small"
                  href={academyInfo.social.youtube}
                  className="text-lightgrey hover:text-gold"
                  ariaLabel="YouTube"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Address with Map */}
      <motion.div 
        className="mb-12 bg-gradient-to-br from-charcoal to-charcoal/80 border border-lightgrey/10 p-6 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h3 className="font-heebo text-h4 mb-4 text-gold">כתובת האקדמיה</h3>
        <div className="mb-4">
          <p className="text-lightgrey">{academyInfo.address}</p>
        </div>
        <div className="relative h-48 rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3355.1856685128682!2d34.96868578136843!3d32.76080761694386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151da59cc8ba1d41%3A0xbd3b8b642c1ba90f!2zQmFyYmVyIFNoZW0gdG92IC0g15HXqCDXqdedINeY15XXkSDXnteh16TXqNeqINeS15HXqNeZ150!5e0!3m2!1sen!2sus!4v1748572247850!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="מיקום הספרייה - בר שים טוב"
          ></iframe>
        </div>
      </motion.div>
      
      {/* Business Hours */}
      <motion.div 
        className="mb-12 bg-gradient-to-br from-charcoal to-charcoal/80 border border-lightgrey/10 p-6 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="font-heebo text-h4 mb-4 text-gold">שעות פעילות</h3>
        <ul className="space-y-3">
          {academyInfo.hours.map((schedule, index) => (
            <li key={index} className="flex items-center justify-between">
              <span className="text-lightgrey">{schedule.hours}</span>
              <span className="text-offwhite font-medium">{schedule.days}</span>
            </li>
          ))}
        </ul>
      </motion.div>
      
      {/* Contact Methods */}
      <motion.div 
        className="mb-12 bg-gradient-to-br from-charcoal to-charcoal/80 border border-lightgrey/10 p-6 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h3 className="font-heebo text-h4 mb-4 text-gold">צור קשר</h3>
        <ul className="space-y-4">
          <li className="flex items-center">
            <Button
              variant="secondary"
              size="small"
              href={`tel:${academyInfo.phone}`}
              className="w-10 h-10 ml-3 p-0 flex items-center justify-center"
              ariaLabel="טלפון"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </Button>
            <a 
              href={`tel:${academyInfo.phone}`} 
              className="text-gold hover:text-gold/80 transition-colors duration-200 text-lg"
              dir="ltr"
            >
              {academyInfo.phone}
            </a>
          </li>
          <li className="flex items-center">
            <Button
              variant="secondary"
              size="small"
              href={`mailto:${academyInfo.email}`}
              className="w-10 h-10 ml-3 p-0 flex items-center justify-center"
              ariaLabel="אימייל"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </Button>
            <a 
              href={`mailto:${academyInfo.email}`} 
              className="text-gold hover:text-gold/80 transition-colors duration-200 text-lg"
              dir="ltr"
            >
              {academyInfo.email}
            </a>
          </li>
        </ul>
      </motion.div>
      
      {/* Accreditations */}
      {academyInfo.accreditations && academyInfo.accreditations.length > 0 && (
        <motion.div 
          className="bg-gradient-to-br from-charcoal to-charcoal/80 border border-lightgrey/10 p-6 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="font-heebo text-h4 mb-4 text-gold">הסמכות ואקרדיטציות</h3>
          <ul className="space-y-3">
            {academyInfo.accreditations.map((accreditation, index) => (
              <li key={index} className="flex items-center">
                <span className="text-gold ml-2">✓</span>
                <span className="text-lightgrey">{accreditation}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default AcademyContactInfo;