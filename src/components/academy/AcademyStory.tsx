// src/components/academy/AcademyStory.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AcademyStory: React.FC = () => {
  const [currentCard, setCurrentCard] = useState(0);

  const storyCards = [
    {
      id: 1,
      year: '2018',
      title: 'ההתחלה',
      content: 'התחלנו עם חלום פשוט - ללמד ספרות ברמה הגבוהה ביותר. 12 תלמידים, כיתה אחת, והרבה תשוקה.',
      icon: '🌱'
    },
    {
      id: 2,
      year: '2020',
      title: 'הצמיחה',
      content: 'למרות האתגרים, המשכנו לצמוח. פתחנו מסלולים חדשים והגענו ל-200 בוגרים גאים.',
      icon: '🚀'
    },
    {
      id: 3,
      year: '2025',
      title: 'היום',
      content: '500+ בוגרים, 92% השמה בעבודה, והאקדמיה המובילה בצפון. אבל זה רק ההתחלה.',
      icon: '👑'
    }
  ];

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % storyCards.length);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + storyCards.length) % storyCards.length);
  };

  return (
    <section className="py-16 bg-charcoal overflow-hidden" dir="rtl">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            הסיפור <span className="text-gold">שלנו</span>
          </h2>
          <p className="text-lightgrey max-w-2xl mx-auto">
            מסע של 7 שנים, מחלום למציאות
          </p>
        </motion.div>

        {/* Card Container */}
        <div className="relative max-w-lg mx-auto">
          {/* Cards */}
          <div className="relative h-[400px] md:h-[350px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCard}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div className="bg-charcoal-light/50 border border-gold/20 rounded-2xl p-8 h-full flex flex-col justify-between">
                  {/* Year Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-gold text-sm font-bold bg-gold/10 px-3 py-1 rounded-full">
                      {storyCards[currentCard].year}
                    </span>
                    <span className="text-5xl">
                      {storyCards[currentCard].icon}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-offwhite mb-4">
                      {storyCards[currentCard].title}
                    </h3>
                    <p className="text-lightgrey text-lg leading-relaxed">
                      {storyCards[currentCard].content}
                    </p>
                  </div>

                  {/* Progress Dots */}
                  <div className="flex justify-center gap-2 mt-6">
                    {storyCards.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentCard(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentCard 
                            ? 'bg-gold w-8' 
                            : 'bg-gold/30 hover:bg-gold/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevCard}
            className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-4 md:translate-x-0 md:-right-16 p-3 bg-charcoal/80 backdrop-blur-sm border border-gold/20 rounded-full text-gold hover:bg-gold/10 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={nextCard}
            className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-0 md:-left-16 p-3 bg-charcoal/80 backdrop-blur-sm border border-gold/20 rounded-full text-gold hover:bg-gold/10 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Swipe Hint for Mobile */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-lightgrey/50 text-sm mt-6 md:hidden"
        >
          החלק לצדדים לעוד →
        </motion.p>
      </div>
    </section>
  );
};

export default AcademyStory;