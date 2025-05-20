// src/components/academy/OurStory/index.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { academyInfo } from '@/lib/data';
import AcademyTimeline from './AcademyTimeline';
import CoreValues from './CoreValues';

interface OurStoryProps {
  founderMessage?: string;
  founderName?: string;
  founderTitle?: string;
  founderImage?: string;
}

const OurStory: React.FC<OurStoryProps> = ({
  founderMessage = "באקדמיה שלנו, אנו לא רק מלמדים טכניקות ספרות - אנו בונים את העתיד המקצועי שלך. אני מאמין שהאיזון המושלם בין מסורת לחדשנות הוא המפתח להכשרת הדור הבא של ספרים מקצועיים. הייעוד שלנו הוא להעניק לתלמידים את הכלים, הידע והביטחון הדרושים כדי להצליח בתעשייה התחרותית והמתחדשת תמיד.",
  founderName = "בר שם טוב",
  founderTitle = "מייסד ומנהל האקדמיה",
  founderImage = "/images/team/bar.jpg"
}) => {
  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 }
    }
  };

  return (
    <section className="py-20 bg-charcoal relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 h-full w-1/4 bg-gradient-to-l from-gold/5 to-transparent"></div>
      
      <div className="container mx-auto px-6">
        {/* Section heading */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <motion.span 
            className="text-gold text-sm inline-block mb-3 border border-gold/30 px-3 py-1"
            variants={itemVariants}
          >
            הסיפור שלנו
          </motion.span>
          <motion.h2 
            className="text-h2 font-heebo mb-4"
            variants={itemVariants}
          >
            האקדמיה לאמנות הספרות
          </motion.h2>
          <motion.div 
            className="h-1 w-24 bg-gold/50 mx-auto mb-6"
            variants={itemVariants}
          ></motion.div>
          <motion.p 
            className="max-w-2xl mx-auto text-lightgrey"
            variants={itemVariants}
          >
            מאז {academyInfo.established}, האקדמיה שלנו מכשירה את הדור הבא של ספרים מקצועיים והפכה למוסד המוביל בישראל ללימודי ספרות גברים.
          </motion.p>
        </motion.div>
        
        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <AcademyTimeline />
        </motion.div>
        
        {/* Founder's message */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          {/* Founder image */}
          <motion.div 
            className="lg:col-span-4 text-center"
            variants={itemVariants}
          >
            <div className="relative inline-block">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden relative mx-auto border-4 border-gold/20">
                <Image
                  src={founderImage}
                  alt={founderName}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -z-10 bottom-0 left-0 w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-gold/10 translate-x-4 translate-y-4"></div>
            </div>
          </motion.div>
          
          {/* Founder message */}
          <motion.div 
            className="lg:col-span-8"
            variants={itemVariants}
          >
            <h3 className="text-h3 text-gold mb-4 font-heebo">המילה של המייסד</h3>
            <div className="mb-6 text-xl font-light text-lightgrey leading-relaxed">
              <p className="mb-4 relative">
                <span className="absolute -right-6 top-0 text-gold text-4xl opacity-30">"</span>
                {founderMessage}
                <span className="absolute -bottom-6 left-0 text-gold text-4xl opacity-30">"</span>
              </p>
            </div>
            <div className="text-gold font-medium">{founderName}</div>
            <div className="text-lightgrey text-sm">{founderTitle}</div>
          </motion.div>
        </motion.div>
        
        {/* Vision and values */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-h3 mb-6 font-heebo">החזון והמשימה שלנו</h3>
            <div className="bg-charcoal border border-lightgrey/10 p-8 hover:border-gold/30 transition-all duration-300">
              <h4 className="text-gold font-heebo text-h4 mb-4">החזון שלנו</h4>
              <p className="text-lightgrey mb-6">
                להיות המוסד המוביל בישראל להכשרת ספרים מקצועיים, המפורסם באיכות ההוראה, בחדשנות ובהשפעה על תעשיית הספרות.
              </p>
              
              <h4 className="text-gold font-heebo text-h4 mb-4">המשימה שלנו</h4>
              <p className="text-lightgrey mb-6">
                להכשיר ספרים ברמה הגבוהה ביותר, המצוידים בידע טכני מקיף, בחשיבה יצירתית ובמיומנויות עסקיות שיאפשרו להם להצליח באופן יוצא דופן בקריירה שלהם.
              </p>
              
              <h4 className="text-gold font-heebo text-h4 mb-4">היעדים שלנו</h4>
              <ul className="text-lightgrey space-y-2">
                <li className="flex items-start">
                  <span className="text-gold ml-2 mt-1 flex-shrink-0">•</span>
                  <span>להפוך את תלמידינו למובילים בתעשייה</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold ml-2 mt-1 flex-shrink-0">•</span>
                  <span>לקדם חדשנות באמנות הספרות</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold ml-2 mt-1 flex-shrink-0">•</span>
                  <span>להעלות את הסטנדרט המקצועי בישראל</span>
                </li>
              </ul>
            </div>
          </motion.div>
          
          {/* Core values */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-h3 mb-6 font-heebo">הערכים המובילים אותנו</h3>
            <CoreValues />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;