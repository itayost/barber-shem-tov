'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LuxurySection, LuxuryHeading, LuxuryParagraph, LuxuryLabel } from '@/components/luxury';
import { Quote } from 'lucide-react';

const Founder: React.FC = () => {
  return (
    <LuxurySection size="large" bgColor="black" containerWidth="wide">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative"
        >
          {/* Main Image */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src="/images/academy/founder-portrait.jpg"
              alt="שם טוב - מייסד האקדמיה"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />

            {/* Border Frame */}
            <div className="absolute inset-4 border border-gold/20 pointer-events-none" />

            {/* Quote Icon */}
            <div className="absolute top-8 right-8 w-16 h-16 bg-black/80 backdrop-blur-sm flex items-center justify-center">
              <Quote className="w-8 h-8 text-gold" />
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute -bottom-6 -right-6 bg-gold px-8 py-4">
            <p className="text-black text-sm font-light uppercase tracking-wider">מייסד ומנכ"ל</p>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div>
            <LuxuryLabel size="sm" className="mb-4">
              המייסד
            </LuxuryLabel>

            <LuxuryHeading as="h2" size="h2" className="mb-4">
              שם טוב
            </LuxuryHeading>

            <p className="text-xl text-gold font-light">מייסד ומנכ"ל The Fader Academy</p>
          </div>

          <blockquote className="border-r-2 border-gold pr-6 py-4">
            <p className="text-2xl font-light text-offwhite leading-relaxed italic">
              "החזון שלי היה פשוט - ליצור מקום שבו תשוקה לספרות פוגשת מצוינות מקצועית. מקום שבו כל
              תלמיד מקבל את הכלים, הידע והביטחון להפוך את החלום שלו למציאות."
            </p>
          </blockquote>

          <div className="space-y-4">
            <LuxuryParagraph>
              עם ניסיון של למעלה מ-15 שנה בתעשייה, שם טוב הוא דמות מובילה בעולם הספרות הישראלי. המסע
              שלו החל כשוליה צעיר ברחובות תל אביב, והוביל אותו להפוך לאחד הספרים המבוקשים בארץ.
            </LuxuryParagraph>

            <LuxuryParagraph>
              ב-2018, מתוך רצון להעביר את הידע והניסיון שצבר לדור הבא, הקים את The Fader Academy.
              מאז, האקדמיה הכשירה מאות ספרים מקצועיים והפכה למוסד המוביל בצפון.
            </LuxuryParagraph>
          </div>

          {/* Achievements */}
          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gold/10">
            <div>
              <p className="text-3xl font-thin text-gold mb-2">15+</p>
              <p className="text-sm uppercase tracking-wider text-lightgrey">שנות ניסיון</p>
            </div>
            <div>
              <p className="text-3xl font-thin text-gold mb-2">300+</p>
              <p className="text-sm uppercase tracking-wider text-lightgrey">תלמידים הוכשרו</p>
            </div>
            <div>
              <p className="text-3xl font-thin text-gold mb-2">50+</p>
              <p className="text-sm uppercase tracking-wider text-lightgrey">פרסים והוקרות</p>
            </div>
            <div>
              <p className="text-3xl font-thin text-gold mb-2">#1</p>
              <p className="text-sm uppercase tracking-wider text-lightgrey">אקדמיה בצפון</p>
            </div>
          </div>
        </motion.div>
      </div>
    </LuxurySection>
  );
};

export default Founder;
