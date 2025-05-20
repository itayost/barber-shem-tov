'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Button from '../common/Button';
import { academyInfo, courses, instructors } from '@/lib/data';

const AcademyFeaturesSection = () => {
  // Find the featured professional course from actual data
  const featuredProfessionalCourse = useMemo(() => {
    // First try to find a featured professional course
    const featured = courses.find(course => 
      course.category === 'professional' && course.featured
    );
    
    // If none is marked as featured, use any professional course
    if (!featured) {
      return courses.find(course => course.category === 'professional');
    }
    
    return featured;
  }, []);
  
  // Get instructor name
  const getInstructorName = (instructorId: string): string => {
    const instructor = instructors.find(i => i.id === instructorId);
    return instructor ? instructor.name : instructorId;
  };

  // State for active feature (hover effect)
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

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

  return (
    <section className="py-section-mobile md:py-section bg-charcoal relative overflow-hidden" dir="rtl">
      {/* Enhanced background with subtle animation */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
        <motion.div
          initial={{ opacity: 0.05 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
          className="w-full h-full bg-gradient-to-l from-gold to-transparent"
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-start gap-12">
          {/* Left column - Main content with animation */}
          <motion.div 
            className="md:w-1/2 lg:w-3/5"
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
              {/* Use actual established date from academyInfo */}
              האקדמיה שלנו, שנוסדה ב-{academyInfo.established}, לא רק מלמדת אותך טכניקות ספרות - אנחנו בונים את העתיד המקצועי שלך. 
              המתודולוגיה שלנו משלבת לימוד מעשי, תיאוריה, ומיומנויות עסקיות חיוניות כדי להבטיח 
              שתהיה לך את כל הכלים הדרושים להצלחה בתעשייה התחרותית של היום.
            </motion.p>
            
            <motion.div 
              variants={containerVariants}
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
            
            <motion.div variants={containerVariants} className="flex flex-wrap gap-6 mt-8">
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
          </motion.div>
          
          {/* Right column - Featured course */}
          <motion.div 
            className="md:w-1/2 lg:w-2/5"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {/* Featured course card with hover effect */}
            <motion.div 
              className="bg-gold/10 p-8 border border-gold border-opacity-30 mb-8"
              whileHover={{ 
                scale: 1.02, 
                boxShadow: "0 10px 25px -5px rgba(201, 166, 107, 0.1), 0 8px 10px -6px rgba(201, 166, 107, 0.1)",
                borderColor: "rgba(201, 166, 107, 0.5)"
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {featuredProfessionalCourse ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
                      <h3 className="font-heebo text-h4 text-gold">קורס מוביל</h3>
                    </div>
                    <div className="bg-gold text-charcoal text-sm font-medium px-3 py-1">
                      החל מ-{featuredProfessionalCourse.price.toLocaleString()}₪
                    </div>
                  </div>
                  
                  <h4 className="font-heebo text-h3 mb-4">{featuredProfessionalCourse.name_he}</h4>
                  <p className="text-lightgrey mb-4">
                    {featuredProfessionalCourse.description_he}
                  </p>
                  
                  <ul className="space-y-3 mb-6 text-lightgrey">
                    <FeatureListItem text={`משך: ${featuredProfessionalCourse.duration_he}`} />
                    {featuredProfessionalCourse.certification && (
                      <FeatureListItem text={`תעודה: ${featuredProfessionalCourse.certification}`} />
                    )}
                    {featuredProfessionalCourse.prerequisites && (
                      <FeatureListItem text={`דרישות קדם: ${featuredProfessionalCourse.prerequisites}`} />
                    )}
                    {featuredProfessionalCourse.instructor && (
                      <FeatureListItem text={`מדריך: ${getInstructorName(featuredProfessionalCourse.instructor)}`} />
                    )}
                    {featuredProfessionalCourse.maxStudents && (
                      <FeatureListItem text={`מספר מקומות: ${featuredProfessionalCourse.maxStudents} סטודנטים`} />
                    )}
                    <FeatureListItem text="התמחות מעשית מובטחת" />
                  </ul>
                </>
              ) : (
                <div className="py-6 text-center">
                  <h3 className="font-heebo text-h4 text-gold mb-4">גלה את הקורסים שלנו</h3>
                  <p className="text-lightgrey mb-6">
                    האקדמיה שלנו מציעה מגוון קורסים מקצועיים למתחילים ולמתקדמים בתחום הספרות.
                  </p>
                </div>
              )}
              
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  href={`/academy/courses/${featuredProfessionalCourse?.id || ''}`} 
                  variant="primary" 
                  className="w-full"
                >
                  פרטים והרשמה
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Statistics with counter animation */}
            <div className="grid grid-cols-2 gap-4">
              <AnimatedStatisticBox 
                value={academyInfo.stats.placementRate}
                unit="%"
                label="מהבוגרים שלנו מוצאים עבודה תוך 3 חודשים"
              />
              
              <StatisticBox 
                value="1:8"
                unit=""
                label="יחס מדריכים לסטודנטים בכל כיתת לימוד"
              />
              
              <StatisticBox 
                value={academyInfo.stats.industryAwards || "12+"}
                unit=""
                label="פרסי תעשייה ותעודות הוקרה"
              />
              
              <AnimatedStatisticBox 
                value={academyInfo.stats.programCount}
                unit=""
                label="מסלולי לימוד בהתאמה אישית"
              />
            </div>
            
            {/* Accreditations */}
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
                {academyInfo.accreditations?.map((accreditation, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <motion.span className="text-gold text-xs mr-2">✓</motion.span>
                    {accreditation}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Enhanced feature item with interactive elements
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

// Enhanced feature list item with animation
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

// Basic statistic box with hover effect
interface StatisticBoxProps {
  value: string | number;
  unit: string;
  label: string;
}

const StatisticBox: React.FC<StatisticBoxProps> = ({ value, unit, label }) => {
  return (
    <motion.div 
      className="bg-charcoal border border-lightgrey border-opacity-20 p-6 text-center"
      whileHover={{ 
        borderColor: "rgba(201, 166, 107, 0.3)",
        y: -5,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" 
      }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
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

// Animated counter statistic box
interface AnimatedStatisticBoxProps {
  value: number;
  unit: string;
  label: string;
}

const AnimatedStatisticBox: React.FC<AnimatedStatisticBoxProps> = ({ value, unit, label }) => {
  const [count, setCount] = useState(0);
  
  return (
    <motion.div 
      className="bg-charcoal border border-lightgrey border-opacity-20 p-6 text-center"
      whileHover={{ 
        borderColor: "rgba(201, 166, 107, 0.3)",
        y: -5,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" 
      }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      whileInView={() => {
        // Animate counter when in view
        let interval = 0;
        const timer = setInterval(() => {
          interval += 1;
          setCount(Math.ceil((interval / 30) * value));
          if (interval >= 30) clearInterval(timer);
        }, 25);
        return () => clearInterval(timer);
      }}
      viewport={{ once: true }}
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

export default AcademyFeaturesSection;