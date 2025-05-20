// src/components/home/AcademyFeatures/Accreditations.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface AccreditationsProps {
  accreditations: string[];
}

const Accreditations: React.FC<AccreditationsProps> = ({ accreditations }) => {
  if (!accreditations || accreditations.length === 0) {
    return null;
  }
  
  return (
    <motion.div 
      className="mt-8 p-6 border border-gold border-opacity-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.6 }}
      whileHover={{ borderColor: "rgba(201, 166, 107, 0.3)" }}
    >
      <h3 className="font-heebo text-h5 text-gold mb-4">הסמכות והכרה מקצועית</h3>
      <ul className="space-y-1 text-lightgrey text-sm">
        {accreditations.map((accreditation, index) => (
          <motion.li 
            key={index}
            className="flex items-center"
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <motion.span 
              className="text-gold text-xs mr-2"
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              ✓
            </motion.span>
            {accreditation}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Accreditations;