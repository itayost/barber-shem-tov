// src/components/common/SimpleCTA.tsx - With Icon System
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRightIcon } from '@/components/icons';

interface SimpleCTAProps {
  courseName: string;
  courseDuration: string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  showPhone?: boolean;
}

const SimpleCTA: React.FC<SimpleCTAProps> = ({
  courseName,
  className = '',
  size = 'large'}) => {
  const router = useRouter();

  // Navigate to apply page with course parameter
  const handleApply = () => {
    const encodedCourseName = encodeURIComponent(courseName);
    router.push(`/apply?course=${encodedCourseName}`);
  };

  // Size classes - mobile first
  const sizeClasses = {
    small: 'py-3 px-4 text-sm gap-2',
    medium: 'py-3.5 px-5 text-base gap-2.5',
    large: 'py-4 px-6 text-base sm:text-lg gap-3'
  };


  return (
    <div className={`w-full ${className}`}>
      {/* Main Apply Button */}
      <motion.button
        onClick={handleApply}
        className={`
          w-full bg-gold hover:bg-gold/90 active:bg-gold/80
          text-charcoal font-bold
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
        
        <span className="relative z-10">להרשמה</span>
      </motion.button>
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