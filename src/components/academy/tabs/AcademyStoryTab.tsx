// src/components/academy/tabs/AcademyStoryTab.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/common/Button';

const AcademyStoryTab: React.FC = () => {
  const [expandedValue, setExpandedValue] = useState<number | null>(null);

  // Our core values
  const values = [
    {
      id: 1,
      icon: '🤝',
      title: 'מחויבות אישית',
      description: 'כל תלמיד אצלנו הוא עולם ומלואו. אנחנו לא עוזבים עד שהוא מצליח.'
    },
    {
      id: 2,
      icon: '✨',
      title: 'מצוינות מקצועית',
      description: 'אנחנו לא מתפשרים על איכות. רק המדריכים הטובים ביותר, רק הציוד המתקדם ביותר.'
    },
    {
      id: 3,
      icon: '🎯',
      title: 'תוצאות אמיתיות',
      description: 'הצלחה בשבילנו זה כשבוגר שלנו פותח עסק משלו או מקבל עבודה במספרה מובילה.'
    },
    {
      id: 4,
      icon: '❤️',
      title: 'אהבת המקצוע',
      description: 'ספרות זה לא רק מקצוע, זו אמנות. אנחנו מלמדים את התשוקה, לא רק את הטכניקה.'
    }
  ];

  // Simplified milestones with stories
  const milestones = [
    {
      year: 2018,
      title: 'החלום נולד',
      story: 'עם מספריים ביד אחת וחזון בלב, פתחתי דלת לכיתה קטנה עם 12 תלמידים. לא ידעתי אז שזה תחילתו של משהו גדול.',
      quote: 'האמנתי שאפשר ללמד ספרות אחרת - עם לב, עם נשמה, עם תשוקה אמיתית למקצוע',
      highlight: 'הקורס הראשון: 12 תלמידים, 12 סיפורי הצלחה'
    },
    {
      year: 2020,
      title: 'למרות הכל, צמחנו',
      story: 'כשהעולם נעצר, אנחנו המשכנו. הפכנו אתגרים להזדמנויות וגילינו שהתשוקה שלנו חזקה מכל מגפה.',
      quote: 'דווקא בתקופה הכי קשה, ראינו את הכוח של קהילה אמיתית',
      highlight: 'פתחנו מסלולים חדשים והגענו ל-200 בוגרים'
    },
    {
      year: 2023,
      title: 'הפכנו למשפחה',
      story: 'כבר לא רק אקדמיה - אנחנו קהילה של 500+ בוגרים שתומכים אחד בשני, חולמים ביחד ומצליחים ביחד.',
      quote: 'כשאני רואה בוגר פותח מספרה משלו, אני יודע שעשינו משהו נכון',
      highlight: '92% השמה, 50+ מספרות שותפות, אינספור חלומות שהתגשמו'
    }
  ];

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      {/* Founder's Personal Message */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative inline-block mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gold/30 mx-auto">
            <Image
              src="/images/team/bar.jpg"
              alt="בר שם טוב"
              width={128}
              height={128}
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                if (target.parentElement) {
                  target.parentElement.innerHTML = `
                    <div class="w-full h-full bg-gold/20 flex items-center justify-center">
                      <span class="text-4xl text-gold">ב</span>
                    </div>
                  `;
                }
              }}
            />
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          הסיפור שלנו <span className="text-gold">התחיל מחלום</span>
        </h2>
        
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-lightgrey leading-relaxed mb-4 text-lg">
            "כשהייתי ספר צעיר, תמיד חלמתי על מקום שבו אפשר ללמוד את המקצוע הזה אחרת. 
            לא רק טכניקות וכלים, אלא את הקסם שבמגע האנושי, את היכולת לגרום לאדם 
            להרגיש טוב עם עצמו, את האמנות שבפרטים הקטנים."
          </p>
          <p className="text-lightgrey leading-relaxed mb-6">
            "היום, אחרי 7 שנים ו-500 בוגרים, אני יכול להגיד בגאווה - 
            הצלחנו ליצור לא רק אקדמיה, אלא בית. מקום שבו חלומות הופכים למקצוע, 
            ומקצוע הופך לדרך חיים."
          </p>
          <p className="text-gold font-bold text-lg">
            - בר שם טוב, מייסד האקדמיה
          </p>
        </motion.div>
      </motion.div>

      {/* Journey Milestones - Simplified */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h3 className="text-2xl font-bold text-center mb-8">
          תחנות <span className="text-gold">בדרך</span>
        </h3>
        
        <div className="space-y-8">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              className="bg-charcoal-light/30 border border-lightgrey/10 p-6 sm:p-8"
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="text-center md:text-right flex-shrink-0">
                  <div className="text-5xl font-bold text-gold/20 mb-2">
                    {milestone.year}
                  </div>
                  <h4 className="text-xl font-bold text-gold">
                    {milestone.title}
                  </h4>
                </div>
                
                <div className="flex-1">
                  <p className="text-lightgrey leading-relaxed mb-4">
                    {milestone.story}
                  </p>
                  <blockquote className="border-r-4 border-gold pr-4 mb-4">
                    <p className="text-offwhite italic">
                      "{milestone.quote}"
                    </p>
                  </blockquote>
                  <p className="text-gold text-sm font-medium">
                    ← {milestone.highlight}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>


      {/* Future Vision */}
      <motion.div
        className="text-center bg-gradient-to-r from-gold/10 to-brown/10 border border-gold/20 p-8 sm:p-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl font-bold mb-6">
          והמסע <span className="text-gold">רק מתחיל</span>...
        </h3>
        <p className="text-lightgrey text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
          החזון שלנו פשוט: להמשיך לגדול, להמשיך להשפיע, להמשיך לשנות חיים. 
          כל בוגר שלנו הוא שגריר של המקצועיות והתשוקה שאנחנו מלמדים.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl font-bold text-gold mb-1">1000+</div>
            <div className="text-sm text-lightgrey">החזון שלנו ל-2026</div>
          </motion.div>
          <div className="hidden sm:block text-2xl text-gold/30">•</div>
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl font-bold text-gold mb-1">2</div>
            <div className="text-sm text-lightgrey">סניפים חדשים</div>
          </motion.div>
          <div className="hidden sm:block text-2xl text-gold/30">•</div>
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl font-bold text-gold mb-1">∞</div>
            <div className="text-sm text-lightgrey">הזדמנויות</div>
          </motion.div>
        </div>
        
        <motion.div
          className="mt-8"
          whileHover={{ scale: 1.02 }}
        >
          <h4 className="text-xl font-bold mb-4">
            רוצה להיות <span className="text-gold">חלק מהסיפור</span>?
          </h4>
          <p className="text-lightgrey mb-6">
            כל מסע של אלף מייל מתחיל בצעד אחד. הצעד הראשון שלך מתחיל כאן.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/courses" variant="primary" size="large">
              התחל את המסע שלך
            </Button>
            <Button href="/contact?consultation=true" variant="secondary" size="large">
              שוחח איתנו
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AcademyStoryTab;