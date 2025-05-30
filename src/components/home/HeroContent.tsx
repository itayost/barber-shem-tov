// src/components/home/HeroContent.tsx
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { academyInfo } from '@/lib/data';
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
        {/* Logo - Smaller on mobile */}
        <motion.div 
          variants={item}
          className="mb-4 sm:mb-6"
        >
          <div className="relative w-36 h-18 sm:w-48 sm:h-24">
            <Image
              src="/images/logos/logo.png"
              alt={academyInfo.name}
              fill
              priority
              sizes="(max-width: 640px) 144px, 192px"
              className="object-contain"
            />
          </div>
        </motion.div>
        
        {/* Main headline - Mobile optimized */}
        <motion.h1 
          variants={item}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-offwhite mb-3 sm:mb-4 leading-tight"
        >
          התחל קריירה מצליחה<br />
          <span className="text-gold">כספר מקצועי</span>
        </motion.h1>
        
        {/* Trust badge - Compact on mobile */}
        <motion.div 
          variants={item}
          className="bg-gold/10 border border-gold/30 px-3 py-2 sm:px-4 sm:py-3 mb-4 sm:mb-6 backdrop-blur-sm"
        >
          <p className="text-gold text-sm sm:text-base font-medium">
            🎯 <span className="font-bold">{academyInfo.stats.placementRate}%</span> מהבוגרים מוצאים עבודה
          </p>
        </motion.div>
        
        {/* Value proposition - Shorter on mobile */}
        <motion.p 
          variants={item}
          className="text-lightgrey text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl leading-relaxed"
        >
          הכשרה מעשית עם לקוחות אמיתיים
          <span className="hidden sm:inline"> והכן עצמך לקריירה רווחית</span>
        </motion.p>
        
        {/* CTAs - Stack on mobile */}
        <motion.div 
          variants={item}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md"
        >
          <Button 
            href="/courses" 
            variant="primary"
            className="w-full sm:flex-1 py-3 px-5 text-sm sm:text-base font-bold"
            size="medium"
          >
            🚀 הרשמה לקורס
          </Button>
          
          <Button 
            href="/contact?consultation=true" 
            variant="secondary"
            className="w-full sm:flex-1 py-2.5 px-5 text-sm sm:text-base"
            size="small"
          >
            💬 ייעוץ חינם
          </Button>
        </motion.div>

        {/* Trust indicators - Mobile optimized */}
        <motion.div 
          variants={item}
          className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-3 sm:gap-4 text-[10px] sm:text-xs text-lightgrey/70"
        >
          <div className="flex items-center gap-1">
            <span className="w-1 h-1 bg-gold rounded-full"></span>
            <span>מאז {academyInfo.established}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1 h-1 bg-gold rounded-full"></span>
            <span>{academyInfo.stats.graduates}+ בוגרים</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1 h-1 bg-gold rounded-full"></span>
            <span>הסמכה מוכרת</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroContent;