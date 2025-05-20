// src/components/home/AcademyFeatures/FeatureListItem.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface FeatureListItemProps {
  text: string;
}

const FeatureListItem: React.FC<FeatureListItemProps> = ({ text }) => {
  return (
    <motion.li 
      className="flex items-start"
      initial={{ opacity: 0, x: -5 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <motion.span 
        className="text-gold ml-2 mt-1 flex-shrink-0"
        whileHover={{ scale: 1.5 }}
        transition={{ type: "spring", stiffness: 500 }}
      >
        •
      </motion.span>
      <span>{text}</span>
    </motion.li>
  );
};

export default FeatureListItem;