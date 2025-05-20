'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/common/Button';

interface HeaderContentProps {
  academyInfo: {
    established: number;
    stats: {
      graduates: number;
      placementRate: number;
      programCount: number;
      averageSalaryIncrease: number;
    };
    accreditations?: string[];
  };
  description: string;
}

const HeaderContent: React.FC<HeaderContentProps> = ({ academyInfo, description }) => {
  return (
    <motion.div 
      className="lg:col-span-6 xl:col-span-5 flex flex-col space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1 }}
    >
      {/* Established badge */}
      <div className="inline-block">
        <motion.div 
          className="inline-flex items-center px-3 py-1 bg-gold/10 border border-gold/20 text-gold text-sm"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <span className="ml-2 h-2 w-2 rounded-full bg-gold" aria-hidden="true"></span>
          מאז {academyInfo.established}
        </motion.div>
      </div>
      
      {/* Main headline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <h1 className="text-h1 font-bold leading-tight">
          <motion.span 
            className="block text-offwhite"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            האקדמיה המובילה
          </motion.span>
          <motion.span 
            className="block text-gold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            לאמנות הספרות
          </motion.span>
        </h1>
        
        {/* Animated underline */}
        <motion.div 
          className="h-1 bg-gold mt-4 mb-8 max-w-[100px]"
          initial={{ width: 0 }}
          animate={{ width: 100 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          aria-hidden="true"
        ></motion.div>
      </motion.div>
      
      {/* Description */}
      <motion.p 
        className="text-lg text-lightgrey max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        {description}
      </motion.p>
      
      {/* Key statistics */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
      >
        <KeyStat value={academyInfo.stats.graduates} label="בוגרים" suffix="+" />
        <KeyStat value={academyInfo.stats.placementRate} label="שיעור השמה" suffix="%" />
        <KeyStat value={academyInfo.stats.programCount} label="תוכניות לימוד" />
        <KeyStat value={academyInfo.stats.averageSalaryIncrease} label="עלייה בהכנסה" suffix="%" />
      </motion.div>
      
      {/* CTA buttons */}
      <motion.div 
        className="flex flex-wrap gap-4 pt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
      >
        <Button href="/courses" variant="primary" className="min-w-[150px]">
          הקורסים שלנו
        </Button>
        <Button href="/contact?subject=academy" variant="secondary" className="min-w-[150px]">
          דבר איתנו
        </Button>
      </motion.div>
      
      {/* Accreditations */}
      <motion.div 
        className="pt-8 flex items-center flex-wrap gap-6 text-sm text-lightgrey"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <span>בפיקוח:</span>
        <div className="flex flex-wrap gap-4">
          {academyInfo.accreditations?.slice(0, 2).map((accreditation: string, index: number) => (
            <div key={index} className="opacity-70 hover:opacity-100 transition-opacity">
              <div className="flex items-center">
                <div 
                  className="w-5 h-5 rounded-full flex items-center justify-center border border-gold/30 ml-2"
                  aria-hidden="true"
                >
                  <span className="text-gold text-[10px]">✓</span>
                </div>
                <span className="text-xs whitespace-nowrap">{accreditation}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Fixed KeyStat component extracted outside the main component for better performance
interface KeyStatProps {
  value: number;
  label: string;
  suffix?: string;
}

const KeyStat: React.FC<KeyStatProps> = ({ value, label, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<number>(0);
  const requestRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | undefined>(undefined);
  
  useEffect(() => {
    // Animation duration in ms
    const duration = 2000;
    
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      
      const elapsedTime = timestamp - startTimeRef.current;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Easing function for smoother animation
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      // Calculate the current count based on progress
      countRef.current = Math.floor(easedProgress * value);
      
      // Update state only when the count changes to avoid unnecessary re-renders
      if (countRef.current !== count) {
        setCount(countRef.current);
      }
      
      // Continue animation if not complete
      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };
    
    // Start the animation
    requestRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [value, count]);

  return (
    <div className="text-center">
      <div className="text-gold text-h3 font-bold flex items-center justify-center">
        {count}{suffix && <span className="mr-1 text-base">{suffix}</span>}
      </div>
      <div className="text-xs text-lightgrey mt-1">{label}</div>
    </div>
  );
};

export default HeaderContent;