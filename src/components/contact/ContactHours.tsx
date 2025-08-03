// src/components/contact/ContactHours.tsx - Without Open/Close Status
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ClockIcon } from '@/components/icons';

interface ContactHoursProps {
  hours: Array<{
    days: string;
    hours: string;
  }>;
  showStatus?: boolean;
}

const ContactHours: React.FC<ContactHoursProps> = ({ 
  hours,
  showStatus = false // Default to false now
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto text-center"
    >
      {/* Header */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <ClockIcon size={32} className="text-gold" />
        <h3 className="text-2xl font-bold text-offwhite">שעות פעילות</h3>
      </div>
      
      {/* Hours List */}
      <div className="bg-charcoal-light/50 border border-gold/10 p-6 space-y-4">
        {hours.map((schedule, index) => (
          <motion.div
            key={schedule.days}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex justify-between items-center py-2 border-b border-lightgrey/10 last:border-b-0"
          >
            <span className="text-lightgrey font-medium">{schedule.days}</span>
            <span className="text-offwhite font-bold hebrew-nums" dir="ltr">
              {schedule.hours}
            </span>
          </motion.div>
        ))}
      </div>
      
      {/* Contact Note - Without Status */}
      <p className="text-sm text-lightgrey/70 mt-4">
        לתיאום מפגש או שאלות - צרו איתנו קשר בכל עת
        <br />
        📧 academy@modernbarber.com | 📱 052-8691415
      </p>
    </motion.div>
  );
};

export default ContactHours;