// src/components/common/SimpleCTA.tsx - With Icon System
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { WhatsAppIcon, PhoneIcon, ArrowRightIcon } from '@/components/icons';

interface SimpleCTAProps {
  courseName: string;
  courseDuration: string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  showPhone?: boolean;
}

const SimpleCTA: React.FC<SimpleCTAProps> = ({
  courseName,
  courseDuration,
  className = '',
  size = 'large',
  showPhone = true
}) => {
  const router = useRouter();

  // Navigate to apply page with course parameter
  const handleApply = () => {
    const encodedCourseName = encodeURIComponent(courseName);
    router.push(`/apply?course=${encodedCourseName}`);
  };

  // WhatsApp message
  const handleWhatsApp = () => {
    const message = `היי! מעוניין ב${courseName} (${courseDuration}). אשמח לפרטים נוספים 🎯`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/972528691415?text=${encodedMessage}`, '_blank');
  };

  // Phone call
  const handlePhone = () => {
    window.location.href = 'tel:+972528691415';
  };

  // Size classes - mobile first
  const sizeClasses = {
    small: 'py-3 px-4 text-sm gap-2',
    medium: 'py-3.5 px-5 text-base gap-2.5',
    large: 'py-4 px-6 text-base sm:text-lg gap-3'
  };

  const iconSizes = {
    small: 16,
    medium: 18,
    large: 20
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Main Apply Button */}
      <motion.button
        onClick={handleApply}
        className={`
          w-full bg-gold hover:bg-gold/90 active:bg-gold/80
          text-charcoal font-bold rounded-lg
          flex items-center justify-center
          transition-colors duration-200
          shadow-lg hover:shadow-xl
          relative overflow-hidden group
          ${sizeClasses[size]}
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />
        
        <span className="relative z-10">הרשמה מהירה</span>
        <motion.span 
          className="relative z-10 mr-2 inline-block"
          animate={{ x: [0, 5, 0] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ArrowRightIcon size={iconSizes[size]} className="inline-block rotate-180" />
        </motion.span>
      </motion.button>

      {/* Secondary Options */}
      <motion.div 
        className="flex items-center justify-center gap-4 mt-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* WhatsApp Option */}
        <motion.button
          onClick={handleWhatsApp}
          className="text-green-500 hover:text-green-400 transition-colors flex items-center gap-1.5 text-sm group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <WhatsAppIcon size={16} className="group-hover:rotate-12 transition-transform" />
          <span>WhatsApp</span>
        </motion.button>

        <span className="text-lightgrey/30">|</span>

        {/* Phone Option */}
        {showPhone && (
          <motion.button
            onClick={handlePhone}
            className="text-gold hover:text-gold/80 transition-colors flex items-center gap-1.5 text-sm group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <PhoneIcon size={16} className="group-hover:rotate-12 transition-transform" />
            <span className="hebrew-nums">052-869-1415</span>
          </motion.button>
        )}
      </motion.div>

      {/* Optional: Trust indicators */}
      <motion.div 
        className="flex items-center justify-center gap-2 mt-2 text-xs text-lightgrey/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <span>🔒</span>
        <span>הרשמה מאובטחת</span>
        <span>•</span>
        <span>ללא התחייבות</span>
      </motion.div>
    </div>
  );
};

// Alternative compact version
export const SimpleCTACompact: React.FC<SimpleCTAProps> = (props) => {
  return <SimpleCTA {...props} size="small" showPhone={false} />;
};

// Alternative with custom text
export const SimpleCTACustom: React.FC<SimpleCTAProps & { buttonText?: string }> = ({
  buttonText = "הרשמה מהירה",
  ...props
}) => {
  const router = useRouter();
  
  const handleApply = () => {
    const encodedCourseName = encodeURIComponent(props.courseName);
    router.push(`/apply?course=${encodedCourseName}`);
  };

  return (
    <motion.button
      onClick={handleApply}
      className="w-full bg-gold hover:bg-gold/90 text-charcoal font-bold rounded-lg py-4 px-6 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span>{buttonText}</span>
      <ArrowRightIcon size={20} className="rotate-180" />
    </motion.button>
  );
};

export default SimpleCTA;