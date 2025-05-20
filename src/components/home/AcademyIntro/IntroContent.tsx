import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/common/Button';
import Image from 'next/image';
import { academyInfo, instructors } from '@/lib/data';

const IntroContent: React.FC = () => {
  // Find the director from instructors
  const director = instructors.find(instructor => instructor.id === 'bar');
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="space-y-7">
        <motion.p 
          className="text-lightgrey text-lg" 
          style={{ lineHeight: 'var(--hebrew-line-height)', letterSpacing: 'var(--hebrew-letter-spacing)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          ברוכים הבאים לאקדמיה המובילה לאמנות הספרות בישראל, המקום שבו תשוקה למצוינות פוגשת הכשרה מקצועית ברמה הגבוהה ביותר. מאז היווסדנו בשנת {academyInfo.established}, הכשרנו <span className="text-gold font-medium">{academyInfo.stats.graduates}+ ספרים מקצועיים</span> שמובילים את התעשייה בסטנדרטים הגבוהים ביותר.
        </motion.p>
        
        <motion.div 
          className="border-r-4 border-gold pr-6 py-4 bg-gold/5"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ x: 5, borderRightWidth: '6px' }}
        >
          <p className="text-gold italic font-medium text-lg mb-2">
            &ldquo;אנו לא רק מלמדים טכניקות - אנו מעצבים את העתיד של תעשיית הספרות בישראל.&rdquo;
          </p>
          <div className="flex items-center">
            {director?.image && (
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                <Image 
                  src={director.image} 
                  alt={director.name} 
                  width={40} 
                  height={40}
                  className="object-cover"
                />
              </div>
            )}
            <p className="text-lightgrey">— {director?.name || academyInfo.director}, {director?.title || 'מייסד ומנהל האקדמיה'}</p>
          </div>
        </motion.div>
        
        <motion.p 
          className="text-lightgrey text-lg" 
          style={{ lineHeight: 'var(--hebrew-line-height)', letterSpacing: 'var(--hebrew-letter-spacing)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          האקדמיה שלנו משלבת טכניקות מסורתיות עם חדשנות עכשווית, ומעניקה לסטודנטים שלנו את הכלים, הידע והביטחון להצליח בעולם הספרות המתפתח תמיד. הצוות שלנו מורכב ממומחים מובילים בתעשייה, עם שיעור השמה מרשים של <span className="text-gold font-medium">{academyInfo.stats.placementRate}%</span> המוכיח את האיכות של ההכשרה שלנו.
        </motion.p>
      </div>
      
      <motion.div 
        className="flex flex-wrap gap-5 mt-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Button 
          href="/courses" 
          variant="primary"
          className="px-8 py-4 text-base"
        >
          גלה את התוכניות שלנו
        </Button>
        <Button 
          href="/academy" 
          variant="secondary"
          className="px-8 py-4 text-base"
        >
          עוד על האקדמיה
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default IntroContent;