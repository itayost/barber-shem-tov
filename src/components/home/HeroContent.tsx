// File: src/components/home/HeroContent.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface HeroContentProps {
  isLoaded: boolean;
}

const HeroContent: React.FC<HeroContentProps> = ({ isLoaded }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={isLoaded ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="relative z-10 container mx-auto px-6 text-center"
    >
      {/* Decorative line */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-px bg-gold"></div>
      </div>
      
      {/* Main heading */}
      <h1 className="font-heebo text-4xl md:text-5xl lg:text-6xl mb-4 leading-tight text-offwhite">
        עיצוב שיער מדויק <br className="hidden md:block" />
        <span className="text-gold">לג'נטלמן המודרני</span>
      </h1>
      
      {/* Subheading */}
      <p className="font-heebo text-lg md:text-xl max-w-2xl mx-auto mb-10 text-lightgrey font-light tracking-wide">
        היכן שאומנות מסורתית פוגשת סגנון עכשווי
      </p>
      
      {/* Book button */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <a 
          href="/contact" 
          className="inline-block bg-gold text-charcoal font-heebo font-medium px-8 py-4 text-base tracking-wider transition-all hover:bg-gold/90 active:bg-gold/80"
        >
          הזמן את החוויה שלך
        </a>
      </motion.div>
      
      {/* Secondary link */}
      <p className="mt-6 text-offwhite/90 font-heebo text-sm">
        <a href="tel:+972528691415" className="text-gold hover:underline transition-all hebrew-number">
          או התקשר להזמנה: 052-869-1415
        </a>
      </p>
    </motion.div>
  );
};

export default HeroContent;