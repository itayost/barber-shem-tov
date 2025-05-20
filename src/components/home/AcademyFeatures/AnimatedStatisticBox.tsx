// src/components/home/AcademyFeatures/AnimatedStatisticBox.tsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedStatisticBoxProps {
  value: number;
  unit: string;
  label: string;
}

const AnimatedStatisticBox: React.FC<AnimatedStatisticBoxProps> = ({ value, unit, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    let interval = 0;
    let timeoutId: NodeJS.Timeout;
    
    if (isInView) {
      const updateCount = () => {
        interval += 1;
        setCount(Math.ceil((interval / 30) * value));
        
        if (interval < 30) {
          timeoutId = setTimeout(updateCount, 25);
        }
      };
      
      timeoutId = setTimeout(updateCount, 400); // Delay start slightly
    }
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isInView, value]);
  
  return (
    <motion.div 
      ref={ref}
      className="bg-charcoal border border-lightgrey border-opacity-20 p-6 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        borderColor: "rgba(201, 166, 107, 0.3)",
        y: -5,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" 
      }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <div className="text-gold text-h2 font-bold mb-2 flex items-center justify-center">
        {count}{unit && <span className="text-lg mr-1">{unit}</span>}
      </div>
      <p className="text-lightgrey text-sm">
        {label}
      </p>
    </motion.div>
  );
};

export default AnimatedStatisticBox;