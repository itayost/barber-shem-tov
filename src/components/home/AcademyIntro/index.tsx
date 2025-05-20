// src/components/home/AcademyIntro/index.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { academyInfo } from '@/lib/data';
import IntroHeader from './IntroHeader';
import IntroContent from './IntroContent';
import IntroImage from './IntroImage';

interface AcademyIntroProps {
  id?: string;
}

const AcademyIntro: React.FC<AcademyIntroProps> = ({ 
  id = "introduction" 
}) => {
  return (
    <section 
      id={id}
      className="py-section-mobile md:py-section bg-charcoal relative overflow-hidden"
      dir="rtl"
    >
      {/* Animated decorative elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="w-1/3 h-full bg-gradient-to-r from-gold to-transparent opacity-10 absolute left-0"></div>
        <motion.div 
          className="absolute -top-96 -right-96 w-[800px] h-[800px] rounded-full bg-gold opacity-[0.03] blur-3xl"
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.03, 0.04, 0.03] 
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        ></motion.div>
        <motion.div 
          className="absolute left-1/4 -bottom-64 w-[400px] h-[400px] rounded-full bg-gold opacity-[0.02] blur-2xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.02, 0.04, 0.02] 
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2
          }}
        ></motion.div>
        
        {/* SVG diagonal lines */}
        <svg className="absolute top-0 right-0 w-full h-full opacity-[0.07]" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.line 
            x1="70" y1="0" x2="100" y2="30" 
            stroke="#C9A66B" 
            strokeWidth="0.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />
          <motion.line 
            x1="80" y1="0" x2="100" y2="20" 
            stroke="#C9A66B" 
            strokeWidth="0.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
          />
          <motion.line 
            x1="90" y1="0" x2="100" y2="10" 
            stroke="#C9A66B" 
            strokeWidth="0.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.9 }}
          />
        </svg>
      </motion.div>
      
      <div className="container-custom relative z-10">
        {/* Header Section */}
        <IntroHeader 
          title={academyInfo.name}
          foundingYear={academyInfo.established}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content Section */}
          <IntroContent />
          
          {/* Image Section */}
          <IntroImage 
            stats={academyInfo.stats}
            foundingYear={academyInfo.established}
          />
        </div>
      </div>
    </section>
  );
};

export default AcademyIntro;