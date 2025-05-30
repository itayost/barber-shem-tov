// src/components/academy/AcademyTabsSection.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { academyInfo, instructors } from '@/lib/data';
import Button from '@/components/common/Button';

const AcademyTabsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'story' | 'results' | 'team'>('story');
  const [activeYear, setActiveYear] = useState(2023);

  const tabs = [
    { id: 'story', label: 'הסיפור שלנו', icon: '📖' },
    { id: 'results', label: 'תוצאות', icon: '🏆' },
    { id: 'team', label: 'הצוות', icon: '👥' }
  ];

  const milestones = [
    { 
      year: 2018, 
      title: 'הקמת האקדמיה',
      description: 'החלום התחיל - פתחנו את דלתות האקדמיה הראשונה',
      icon: '🎯',
      stats: '12 תלמידים ראשונים'
    },
    { 
      year: 2019, 
      title: 'ציון דרך ראשון',
      description: 'עברנו את רף ה-100 בוגרים והרחבנו את צוות המדריכים',
      icon: '🎓',
      stats: '100+ בוגרים'
    },
    { 
      year: 2021, 
      title: 'שותפויות אסטרטגיות',
      description: 'יצרנו שותפויות עם רשתות המספרות המובילות בארץ',
      icon: '🤝',
      stats: '20+ מספרות שותפות'
    },
    { 
      year: 2023, 
      title: 'מובילים בתעשייה',
      description: 'הפכנו לאקדמיה המובילה בצפון עם אחוזי השמה מרשימים',
      icon: '🏆',
      stats: '500+ בוגרים, 92% השמה'
    }
  ];

  const currentMilestone = milestones.find(m => m.year === activeYear) || milestones[0];

  return (
    <section className="py-16 sm:py-20 bg-charcoal" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-charcoal-light/50 p-1 rounded-full inline-flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gold text-charcoal'
                    : 'text-lightgrey hover:text-gold'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Story Tab - Interactive Timeline */}
          {activeTab === 'story' && (
            <div className="space-y-8">
              {/* Timeline Navigation */}
              <div className="relative">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-lightgrey/20 -translate-y-1/2" />
                <div className="relative flex justify-between">
                  {milestones.map((milestone, index) => (
                    <button
                      key={milestone.year}
                      onClick={() => setActiveYear(milestone.year)}
                      className="relative group"
                    >
                      <motion.div
                        className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-xl sm:text-2xl transition-all ${
                          activeYear === milestone.year
                            ? 'bg-gold scale-110'
                            : 'bg-charcoal-light hover:bg-gold/20'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {milestone.icon}
                      </motion.div>
                      <span className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap ${
                        activeYear === milestone.year ? 'text-gold font-bold' : 'text-lightgrey'
                      }`}>
                        {milestone.year}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Milestone Content */}
              <motion.div
                key={activeYear}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-16 grid md:grid-cols-2 gap-8 items-center"
              >
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                    {currentMilestone.title}
                  </h3>
                  <p className="text-lightgrey mb-4 leading-relaxed">
                    {currentMilestone.description}
                  </p>
                  <div className="bg-gold/10 border border-gold/20 p-4 mb-6 inline-block">
                    <p className="text-gold font-bold">{currentMilestone.stats}</p>
                  </div>
                  <div>
                    <Button href="/contact" variant="primary">
                      הצטרף לסיפור ההצלחה
                    </Button>
                  </div>
                </div>
                
                {/* Visual representation */}
                <div className="relative h-64 sm:h-96">
                  <motion.div
                    className="absolute inset-0 bg-gold/10 rounded-lg overflow-hidden"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-8xl opacity-20">{currentMilestone.icon}</div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal to-transparent p-6">
                      <p className="text-gold font-bold text-xl">{currentMilestone.year}</p>
                      <p className="text-offwhite">{currentMilestone.title}</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Results Tab */}
          {activeTab === 'results' && (
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-8">
                המספרים <span className="text-gold">מדברים</span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {[
                  { value: '₪7,500', label: 'שכר התחלתי ממוצע' },
                  { value: '50+', label: 'מספרות שותפות' },
                  { value: '3 חודשים', label: 'זמן ממוצע למציאת עבודה' },
                  { value: '100%', label: 'הסמכה מוכרת' }
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    className="bg-gold/10 p-6 border border-gold/20"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-2xl sm:text-3xl font-bold text-gold mb-2">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-lightgrey">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
              <Button href="/courses" variant="primary" size="large">
                התחל את המסע שלך
              </Button>
            </div>
          )}

          {/* Team Tab */}
          {activeTab === 'team' && (
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-8">
                הכירו את <span className="text-gold">המומחים</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {instructors.slice(0, 2).map((instructor) => (
                  <motion.div
                    key={instructor.id}
                    className="bg-charcoal-light p-6 rounded-lg"
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gold/20 flex items-center justify-center">
                      <span className="text-4xl">👨‍🏫</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{instructor.name}</h3>
                    <p className="text-gold mb-4">{instructor.title}</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {instructor.expertise.slice(0, 3).map((skill) => (
                        <span key={skill} className="text-xs bg-gold/10 text-gold px-3 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default AcademyTabsSection;