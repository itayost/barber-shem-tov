// src/components/home/AcademyFeatures/FeaturesList.tsx
import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/common/Button';
import FeatureItem from './FeatureItem';

// Features data
const features = [
  {
    id: "industry-leaders",
    number: "01",
    iconPath: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    title: "מדריכים מובילים בתעשייה",
    description: "המדריכים שלנו הם אנשי מקצוע פעילים עם ניסיון עשיר שמביאים ידע מעשי ועדכני לכיתת הלימוד."
  },
  {
    id: "practical-learning",
    number: "02",
    iconPath: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    title: "גישה מעשית ללמידה",
    description: "לפחות 70% מזמן הקורס מוקדש לעבודה מעשית עם לקוחות אמיתיים ומודלים."
  },
  {
    id: "recognized-certification",
    number: "03",
    iconPath: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
    title: "תעודות מוכרות בתעשייה",
    description: "כל הקורסים שלנו מעניקים תעודות מוכרות בתעשייה שפותחות דלתות למשרות מבוקשות."
  },
  {
    id: "career-development",
    number: "04",
    iconPath: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    title: "תמיכה בפיתוח קריירה",
    description: "תמיכה אישית בבניית תיק עבודות, הכנה לראיונות עבודה, וגישה למשרות בלעדיות דרך הרשת שלנו."
  }
];

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

interface FeaturesListProps {
  activeFeature: string | null;
  setActiveFeature: (id: string | null) => void;
}

const FeaturesList: React.FC<FeaturesListProps> = ({ activeFeature, setActiveFeature }) => {
  return (
    <>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8"
      >
        {features.map(feature => (
          <FeatureItem 
            key={feature.id}
            iconPath={feature.iconPath}
            title={feature.title}
            description={feature.description}
            number={feature.number}
            id={feature.id}
            active={activeFeature === feature.id}
            setActive={setActiveFeature}
          />
        ))}
      </motion.div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-wrap gap-6 mt-8"
      >
        <Button 
          href="/academy" 
          variant="secondary"
        >
          גלה עוד על שיטת הלימוד שלנו
        </Button>
        
        <Button 
          href="/courses" 
          variant="tertiary"
        >
          הכר את הקורסים שלנו
        </Button>
      </motion.div>
    </>
  );
};

export default FeaturesList;