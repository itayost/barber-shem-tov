// src/components/home/AcademyFeatures/FeatureIntro.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { academyInfo } from '@/lib/data';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 100
    }
  }
};

const FeatureIntro = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="inline-block text-gold text-sm font-medium px-4 py-1 border border-gold border-opacity-30 mb-4">
        למה ללמוד אצלנו
      </motion.div>
      
      <motion.h2 variants={itemVariants} className="font-heebo text-h3 md:text-h2 text-gold mb-6">
        יתרונות הלימוד באקדמיה
      </motion.h2>
      
      <motion.p variants={itemVariants} className="text-lightgrey mb-8">
        האקדמיה שלנו, שנוסדה ב-{academyInfo.established}, לא רק מלמדת אותך טכניקות ספרות - אנחנו בונים את העתיד המקצועי שלך. 
        המתודולוגיה שלנו משלבת לימוד מעשי, תיאוריה, ומיומנויות עסקיות חיוניות כדי להבטיח 
        שתהיה לך את כל הכלים הדרושים להצלחה בתעשייה התחרותית של היום.
      </motion.p>
    </motion.div>
  );
};

export default FeatureIntro;