// src/components/home/AcademyIntro/IntroHeader.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface IntroHeaderProps {
  title: string;
  foundingYear: number;
}

const IntroHeader: React.FC<IntroHeaderProps> = ({ title, foundingYear }) => {
  // Split title into main part and colored part (after third word)
  const titleWords = title.split(' ');
  const mainTitle = titleWords.slice(0, 3).join(' ');
  const coloredTitle = titleWords.slice(3).join(' ');

  return (
    <div className="text-center mb-16">
      <motion.div 
        className="inline-block text-gold text-small font-medium px-5 py-1.5 border border-gold border-opacity-30 mb-5 backdrop-blur-sm bg-charcoal/30 shadow-sm"
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 5px 15px rgba(201, 166, 107, 0.15)"
        }}
      >
        הכשרות מקצועיות מובילות מאז {foundingYear}
      </motion.div>
      
      <motion.h2 
        className="font-heebo text-h3 md:text-h2 mb-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {mainTitle}<br/>
        <span className="text-gold">{coloredTitle}</span>
      </motion.h2>
      
      <motion.div 
        className="w-24 h-0.5 bg-gold mx-auto mb-6"
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 96, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      ></motion.div>
      
      <motion.p 
        className="max-w-2xl mx-auto text-lightgrey text-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        אנו מכשירים את הדור הבא של ספרים מקצועיים עם הכלים, הידע והביטחון להצליח בתעשייה
      </motion.p>
    </div>
  );
};

export default IntroHeader;