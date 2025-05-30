// src/components/academy/AcademyTabsSection.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AcademyStoryTab from './tabs/AcademyStoryTab';
import AcademyResultsTab from './tabs/AcademyResultsTab';
import AcademyTeamTab from './tabs/AcademyTeamTab';

const AcademyTabsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'story' | 'results' | 'team'>('story');

  const tabs = [
    { id: 'story', label: 'הסיפור שלנו', icon: '📖' },
    { id: 'results', label: 'תוצאות', icon: '🏆' },
    { id: 'team', label: 'הצוות', icon: '👥' }
  ];

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
          className="max-w-6xl mx-auto"
        >
          {activeTab === 'story' && <AcademyStoryTab />}
          {activeTab === 'results' && <AcademyResultsTab />}
          {activeTab === 'team' && <AcademyTeamTab />}
        </motion.div>
      </div>
    </section>
  );
};

export default AcademyTabsSection;