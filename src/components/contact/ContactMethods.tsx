// src/components/contact/ContactMethods.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ContactMethodsProps {
  phone: string;
  email: string;
  whatsappMessage?: string;
}

const ContactMethods: React.FC<ContactMethodsProps> = ({ 
  phone, 
  email,
  whatsappMessage = 'היי! אשמח לקבל מידע נוסף על האקדמיה'
}) => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const contactMethods = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'טלפון',
      value: phone,
      action: () => window.location.href = `tel:${phone}`,
      secondaryAction: handleCopyPhone,
      secondaryText: copiedPhone ? 'הועתק!' : 'העתק',
      color: 'blue'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
        </svg>
      ),
      title: 'WhatsApp',
      value: 'שלח הודעה',
      action: () => window.open(`https://wa.me/972${phone.substring(1)}?text=${encodeURIComponent(whatsappMessage)}`, '_blank'),
      color: 'green'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'אימייל',
      value: email,
      action: () => window.location.href = `mailto:${email}`,
      secondaryAction: handleCopyEmail,
      secondaryText: copiedEmail ? 'הועתק!' : 'העתק',
      color: 'gold'
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-500/20 border-blue-500/30 hover:border-blue-500/50 text-blue-400',
    green: 'bg-green-500/20 border-green-500/30 hover:border-green-500/50 text-green-400',
    gold: 'bg-gold/20 border-gold/30 hover:border-gold/50 text-gold'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto" dir="rtl">
      {contactMethods.map((method, index) => (
        <motion.div
          key={method.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`border rounded-xl p-6 text-center transition-all cursor-pointer group ${colorClasses[method.color as keyof typeof colorClasses]}`}
          onClick={method.action}
        >
          <div className="inline-flex p-4 rounded-full bg-current/10 mb-4 group-hover:scale-110 transition-transform">
            {method.icon}
          </div>
          
          <h3 className="text-xl font-bold text-offwhite mb-2">{method.title}</h3>
          
          <p className="text-lightgrey mb-4 font-medium" dir="ltr">
            {method.value}
          </p>
          
          {method.secondaryAction && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                method.secondaryAction!();
              }}
              className="text-sm text-lightgrey hover:text-offwhite transition-colors"
            >
              {method.secondaryText}
            </button>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default ContactMethods;