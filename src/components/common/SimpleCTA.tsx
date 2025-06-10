// src/components/common/SimpleCTA.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

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

  const iconSize = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
    large: 'w-5 h-5 sm:w-6 sm:h-6'
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Main WhatsApp Button */}
      <motion.button
        onClick={handleWhatsApp}
        className={`
          w-full bg-green-500 hover:bg-green-600 active:bg-green-700
          text-white font-bold rounded-lg
          flex items-center justify-center
          transition-colors duration-200
          shadow-lg hover:shadow-xl
          ${sizeClasses[size]}
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* WhatsApp Icon */}
        <svg 
          className={iconSize[size]}
          fill="currentColor" 
          viewBox="0 0 24 24"
          aria-label="WhatsApp"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
        </svg>
        
        <span>הרשמה מהירה ב-WhatsApp</span>
      </motion.button>

      {/* Phone Option - Mobile First Design */}
      {showPhone && (
        <motion.div 
          className="text-center mt-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-lightgrey text-sm">
            או{' '}
            <button
              onClick={handlePhone}
              className="text-gold hover:text-gold/80 underline underline-offset-2 transition-colors hebrew-nums"
            >
              התקשר: 052-869-1415
            </button>
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default SimpleCTA;