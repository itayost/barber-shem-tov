// src/components/home/HeroContent.tsx
import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/common/Button';

interface HeroContentProps {
  isLoaded: boolean;
}

const HeroContent: React.FC<HeroContentProps> = ({ isLoaded }) => {
  // Simple staggered animation
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="container mx-auto px-4 sm:px-6"
      variants={container}
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
    >
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
        {/* Main headline - Mobile optimized */}
        <motion.h1 
          variants={item}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-offwhite mb-3 sm:mb-4 leading-tight"
        >
          התחל קריירה מצליחה<br />
          <span className="text-gold">כספר מקצועי</span>
        </motion.h1>
        
        {/* Value proposition - Shorter on mobile */}
        <motion.p 
          variants={item}
          className="text-lightgrey text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl leading-relaxed"
        >
          הכשרה מעשית עם לקוחות אמיתיים
          <span className="hidden sm:inline"> והכן עצמך לקריירה רווחית</span>
        </motion.p>
        
        {/* Single CTA Button */}
        <motion.div 
          variants={item}
          className="w-full max-w-sm"
        >
          <Button 
            href="/courses" 
            variant="primary"
            className="w-full py-3 px-5 text-base font-bold"
            size="large"
          >
            הרשמה לקורס
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroContent;