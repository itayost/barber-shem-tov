// src/components/home/AcademyIntro/IntroImage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/common/Button';

interface IntroImageProps {
  stats: {
    graduates: number;
    placementRate: number;
    programCount: number;
    industryAwards?: number;
  };
  foundingYear: number;
}

const IntroImage: React.FC<IntroImageProps> = ({ stats, foundingYear }) => {
  const currentYear = new Date().getFullYear();
  const yearsOfOperation = currentYear - foundingYear;
  
  // Featured course - using simple approach to avoid errors
  const featuredCourse = {
    id: 'basic-barbering-course',
    name_he: 'קורס ספרות בסיסי',
    duration_he: '4 שבועות',
    price: 3200
  };

  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.1 }}
    >
      {/* Gold decorative border */}
      <motion.div 
        className="absolute -top-3 -right-3 w-full h-full border-2 border-gold opacity-40"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 0.4, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        whileHover={{ borderWidth: '3px' }}
      ></motion.div>
      
      {/* Main image with enhanced hover effects */}
      <div className="relative aspect-[4/3] overflow-hidden group">
        <Image 
          src="/images/academy-classroom.jpg" 
          alt={`אקדמיית הספרות - כיתת לימוד`}
          fill
          className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
          priority
        />
        
        {/* Enhanced overlay with smoother gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-700"></div>
        
        {/* Golden accent line with animation */}
        <motion.div 
          className="absolute top-0 bottom-0 left-0 w-1 bg-gold"
          whileHover={{ width: '6px' }}
          transition={{ duration: 0.3 }}
        ></motion.div>
        
        {/* Year established badge with enhanced styling */}
        <motion.div 
          className="absolute top-6 right-6 bg-charcoal/80 backdrop-blur-sm py-2.5 px-5 border-r-2 border-gold"
          initial={{ y: -10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ y: -3, borderRightWidth: '4px' }}
        >
          <p className="text-gold font-medium text-small hebrew-nums">{yearsOfOperation} שנות ניסיון</p>
        </motion.div>
        
        {/* Stats box with enhanced data display */}
        <div className="absolute bottom-0 right-0 left-0 p-8">
          <motion.div 
            className="bg-charcoal/80 backdrop-blur p-6 border-r-4 border-gold"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ borderRightWidth: '6px' }}
          >
            <div className="grid grid-cols-3 gap-6 mb-5">
              <StatItem value={stats.graduates} suffix="+" label="בוגרים" delay={0.6} />
              <StatItem value={stats.placementRate} suffix="%" label="השמה" delay={0.7} />
              <StatItem value={stats.programCount} label="קורסים" delay={0.8} />
            </div>
            
            {/* Featured course teaser */}
            <motion.div 
              className="flex items-center justify-between pt-4 border-t border-lightgrey/10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <div>
                <p className="text-gold font-medium">{featuredCourse.name_he}</p>
                <p className="text-lightgrey text-small">{featuredCourse.duration_he} • {featuredCourse.price}₪</p>
              </div>
              <Button 
                href={`/academy/courses/${featuredCourse.id}`} 
                variant="tertiary"
                className="flex-shrink-0"
              >
                <span className="inline-flex items-center">
                  פרטים נוספים
                  <svg 
                    className="w-4 h-4 mr-1 transform rotate-180" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Enhanced award seal */}
      {stats.industryAwards && stats.industryAwards > 0 && (
        <motion.div 
          className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-gold flex items-center justify-center text-charcoal transform rotate-12 border-2 border-charcoal shadow-lg"
          initial={{ scale: 0, opacity: 0, rotate: 30 }}
          whileInView={{ scale: 1, opacity: 1, rotate: 12 }}
          viewport={{ once: true }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 1.2
          }}
          whileHover={{ 
            rotate: 0,
            scale: 1.1,
            transition: { duration: 0.3 }
          }}
        >
          <div className="text-center">
            <p className="font-bold text-small leading-tight">אקדמיה מובילה</p>
            <p className="text-small leading-tight hebrew-nums">{currentYear}</p>
            <p className="text-mini leading-tight opacity-80 mt-1">{stats.industryAwards} פרסים</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

// Stat Item Component
const StatItem: React.FC<{ 
  value: number; 
  suffix?: string; 
  label: string;
  delay: number;
}> = ({ value, suffix = '', label, delay }) => {
  return (
    <motion.div 
      className="text-center group"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <motion.p 
        className="text-gold text-h3 font-bold hebrew-nums"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        {value}{suffix}
      </motion.p>
      <p className="text-lightgrey text-small">{label}</p>
    </motion.div>
  );
};

export default IntroImage;