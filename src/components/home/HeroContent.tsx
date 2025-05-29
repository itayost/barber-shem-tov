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
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="container-custom"
      variants={container}
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
    >
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Logo */}
        <motion.div 
          variants={item}
          className="mb-8"
        >
          <div className="relative w-56 h-28">
            <Image
              src="/images/logos/logo.png"
              alt={academyInfo.name}
              fill
              priority
              sizes="(max-width: 640px) 100vw, 14rem"
              className="object-contain"
            />
          </div>
        </motion.div>
        
        {/* Main headline - conversion focused */}
        <motion.h1 
          variants={item}
          className="text-h1 md:text-5xl lg:text-6xl font-bold text-offwhite mb-6 leading-tight"
        >
          התחל קריירה מצליחה<br />
          <span className="text-gold">כספר מקצועי</span>
        </motion.h1>
        
        {/* Subheader with key benefit */}
        <motion.div 
          variants={item}
          className="bg-gold/10 border border-gold/30 px-6 py-4 mb-8 backdrop-blur-sm"
        >
          <p className="text-gold text-xl font-medium">
            🎯 <span className="font-bold">{academyInfo.stats.placementRate}%</span> מהבוגרים שלנו מוצאים עבודה תוך 3 חודשים
          </p>
        </motion.div>
        
        {/* Value proposition */}
        <motion.p 
          variants={item}
          className="text-lightgrey text-xl md:text-2xl mb-12 max-w-3xl leading-relaxed"
        >
          למד מהמומחים, קבל הכשרה מעשית עם לקוחות אמיתיים, 
          והכן עצמך לקריירה רווחית ומספקת בתעשייה המתפתחת
        </motion.p>
        
        {/* Two clear CTAs */}
        <motion.div 
          variants={item}
          className="flex flex-col sm:flex-row gap-6 w-full max-w-lg"
        >
          <Button 
            href="/courses" 
            variant="primary"
            className="flex-1 py-4 px-8 text-lg font-bold shadow-lg hover:shadow-xl"
          >
            🚀 הרשמה לקורס
          </Button>
          
          <Button 
            href="/contact?consultation=true" 
            variant="secondary"
            className="flex-1 py-4 px-8 text-lg font-medium"
          >
            💬 קבל ייעוץ חינם
          </Button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div 
          variants={item}
          className="mt-12 flex flex-wrap justify-center gap-8 text-lightgrey/80 text-sm"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-gold rounded-full"></span>
            <span>מאז {academyInfo.established}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-gold rounded-full"></span>
            <span>{academyInfo.stats.graduates}+ בוגרים מצליחים</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-gold rounded-full"></span>
            <span>הסמכה מקצועית מוכרת</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroContent;