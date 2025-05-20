// src/components/home/AcademyFeatures/FeatureItem.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface FeatureItemProps {
  iconPath: string;
  title: string;
  description: string;
  number: string;
  id: string;
  active: boolean;
  setActive: (id: string | null) => void;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ 
  iconPath, 
  title, 
  description, 
  number,
  id,
  active,
  setActive
}) => {
  return (
    <motion.div 
      className={`bg-charcoal border ${active ? 'border-gold' : 'border-lightgrey border-opacity-10'} p-6 relative overflow-hidden group`}
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      onHoverStart={() => setActive(id)}
      onHoverEnd={() => setActive(null)}
    >
      {/* Background number with enhanced animation */}
      <motion.div 
        className="absolute -top-6 -right-6 text-[120px] font-bold text-gold opacity-5 z-0 leading-none"
        animate={{ opacity: active ? 0.15 : 0.05 }}
        transition={{ duration: 0.3 }}
      >
        {number}
      </motion.div>
      
      <div className="relative z-10">
        <motion.div 
          className="w-12 h-12 rounded-full bg-gold flex items-center justify-center mb-6"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <svg className="w-6 h-6 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
          </svg>
        </motion.div>
        
        <h3 className={`text-h4 mb-3 transition-colors duration-200 ${active ? 'text-gold' : ''}`}>
          {title}
        </h3>
        
        <p className="text-lightgrey">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default FeatureItem;