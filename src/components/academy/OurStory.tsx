'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LuxurySection, EditorialGrid, LuxuryParagraph } from '@/components/luxury';
import { CheckCircle } from 'lucide-react';

const milestones = [
  { year: '2018', title: 'הקמת האקדמיה', description: 'נולד החזון להקים מוסד מוביל להכשרת ספרים' },
  { year: '2019', title: 'הרחבה ראשונה', description: 'פתיחת קורסים מתקדמים והגדלת הצוות' },
  { year: '2021', title: 'הכרה ארצית', description: 'קבלת הסמכה ממשרד העבודה והרווחה' },
  { year: '2023', title: '300 בוגרים', description: 'חגיגת 300 בוגרים מצליחים בתעשייה' },
];

const values = [
  { title: 'מצוינות', description: 'שאיפה תמידית לשלמות בכל תחום' },
  { title: 'חדשנות', description: 'אימוץ הטכנולוגיות והטכניקות החדשות ביותר' },
  { title: 'מקצועיות', description: 'סטנדרטים גבוהים ללא פשרות' },
  { title: 'תשוקה', description: 'אהבה אמיתית למקצוע ולאמנות' },
];

const OurStory: React.FC = () => {
  return (
    <>
      {/* Story Section */}
      <LuxurySection
        label="הסיפור שלנו"
        title="מסע של"
        accent="תשוקה ומצוינות"
        size="large"
        bgColor="black"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-16">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <LuxuryParagraph size="lg" color="offwhite">
              The Fader Academy נוסדה מתוך חזון ברור - ליצור מוסד לימודי שיהווה סטנדרט חדש בהכשרת
              ספרים מקצועיים בישראל.
            </LuxuryParagraph>

            <LuxuryParagraph>
              מאז היווסדנו ב-2018, הכשרנו מאות תלמידים שהפכו לאמני ספרות מובילים. אנו גאים בגישה
              הייחודית שלנו המשלבת טכניקות מסורתיות עם חדשנות עכשווית.
            </LuxuryParagraph>

            <LuxuryParagraph>
              האקדמיה שלנו היא יותר ממוסד לימודי - היא קהילה של אמנים, יוצרים ואנשי מקצוע השואפים
              למצוינות ומחויבים להעלאת הסטנדרטים בתעשייה.
            </LuxuryParagraph>

            {/* Values */}
            <div className="grid grid-cols-2 gap-4 pt-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-offwhite font-light mb-1">{value.title}</h4>
                    <p className="text-sm text-lightgrey">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] overflow-hidden"
          >
            <img
              src="/images/academy/our-story.jpg"
              alt="The Fader Academy Story"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 border border-gold/20" />
          </motion.div>
        </div>
      </LuxurySection>

      {/* Timeline Section */}
      <LuxurySection title="ציוני" accent="דרך" size="default" bgColor="charcoal">
        <div className="relative mt-16">
          {/* Timeline Line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gold/20 -translate-x-1/2 hidden md:block" />

          {/* Milestones */}
          <div className="space-y-12 md:space-y-16">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`
                  flex flex-col md:flex-row items-center gap-8
                  ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}
                `}
              >
                {/* Content */}
                <div
                  className={`
                  flex-1 text-center md:text-right
                  ${index % 2 === 0 ? 'md:text-left' : ''}
                `}
                >
                  <h3 className="text-5xl font-thin text-gold mb-3">{milestone.year}</h3>
                  <h4 className="text-2xl font-light text-offwhite mb-2">{milestone.title}</h4>
                  <p className="text-lightgrey">{milestone.description}</p>
                </div>

                {/* Center Dot */}
                <div className="relative">
                  <div className="w-4 h-4 bg-gold rounded-full" />
                  <div className="absolute inset-0 w-4 h-4 bg-gold rounded-full animate-ping" />
                </div>

                {/* Spacer */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </LuxurySection>
    </>
  );
};

export default OurStory;
