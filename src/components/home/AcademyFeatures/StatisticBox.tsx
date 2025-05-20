// src/components/home/AcademyFeatures/StatisticBox.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface StatisticBoxProps {
  value: string | number;
  unit: string;
  label: string;
}

const StatisticBox: React.FC<StatisticBoxProps> = ({ value, unit, label }) => {
  return (
    <motion.div 
      className="bg-charcoal border border-lightgrey border-opacity-20 p-6 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 15 }}
      whileHover={{ 
        borderColor: "rgba(201, 166, 107, 0.3)",
        y: -5,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" 
      }}
    >
      <div className="text-gold text-h2 font-bold mb-2 flex items-center justify-center">
        {value}{unit && <span className="text-lg mr-1">{unit}</span>}
      </div>
      <p className="text-lightgrey text-sm">
        {label}
      </p>
    </motion.div>
  );
};

export default StatisticBox;