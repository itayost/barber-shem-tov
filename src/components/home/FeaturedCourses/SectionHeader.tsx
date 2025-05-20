// src/components/home/FeaturedCourses/SectionHeader.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  description: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description }) => {
  return (
    <div className="text-center mb-8">
      <motion.h2 
        className="font-heebo text-h3 md:text-h2 mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>
      
      <motion.div 
        className="w-16 h-0.5 bg-gold mx-auto mb-4"
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 64, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      />
      
      <motion.p 
        className="text-lightgrey max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {description}
      </motion.p>
    </div>
  );
};

export default SectionHeader;