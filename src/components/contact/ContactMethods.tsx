'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PhoneIcon, WhatsAppIcon, EmailIcon } from '@/components/icons';
// Or import all: import { Icons } from '@/components/icons';

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
      icon: <PhoneIcon size={32} />,
      title: 'טלפון',
      value: phone,
      action: () => window.location.href = `tel:${phone}`,
      secondaryAction: handleCopyPhone,
      secondaryText: copiedPhone ? 'הועתק!' : 'העתק',
      colorClass: 'text-gold'
    },
    {
      icon: <WhatsAppIcon size={32} />,
      title: 'WhatsApp',
      value: 'שלח הודעה',
      action: () => {
        // Remove all non-digit characters (hyphens, spaces, etc.)
        const cleanPhone = phone.replace(/\D/g, '');
        
        // Remove leading 0 if present and add 972
        const whatsappNumber = cleanPhone.startsWith('0') 
          ? '972' + cleanPhone.substring(1) 
          : '972' + cleanPhone;
        
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
      },
  colorClass: 'text-green-400'
    },
    {
      icon: <EmailIcon size={32} />,
      title: 'אימייל',
      value: email,
      action: () => window.location.href = `mailto:${email}`,
      secondaryAction: handleCopyEmail,
      secondaryText: copiedEmail ? 'הועתק!' : 'העתק',
      colorClass: 'text-gold'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto" dir="rtl">
      {contactMethods.map((method, index) => (
        <motion.div
          key={method.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-charcoal-light/50 border border-gold/10 p-6 text-center hover:border-gold/30 transition-all cursor-pointer group"
          onClick={method.action}
          whileHover={{ y: -5 }}
        >
          <motion.div 
            className={`inline-flex p-4 rounded-full bg-gold/10 mb-4 ${method.colorClass}`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            {method.icon}
          </motion.div>
          
          <h3 className="text-xl font-bold text-offwhite mb-2">{method.title}</h3>
          
          <p className="text-lightgrey mb-4 font-medium hebrew-nums" dir="ltr">
            {method.value}
          </p>
          
          {method.secondaryAction && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                method.secondaryAction!();
              }}
              className="text-sm text-lightgrey/60 hover:text-gold transition-colors"
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