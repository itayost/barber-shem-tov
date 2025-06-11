// src/components/academy/AcademyInfoTabs.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TabNavigation from '@/components/common/TabNavigation';
import AcademyStoryTab from './tabs/AcademyStoryTab';
import AcademyTeamTab from './tabs/AcademyTeamTab';

const AcademyInfoTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('story');

  const tabs = [
    { 
      id: 'story', 
      label: 'הסיפור שלנו',
    },
    { 
      id: 'team', 
      label: 'הצוות',
    }
  ];

  return (
    <section className="relative py-20 md:py-32 bg-black overflow-hidden" dir="rtl">
      {/* Subtle luxury background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(45deg, transparent 48%, #C9A66B 49%, #C9A66B 51%, transparent 52%),
            linear-gradient(-45deg, transparent 48%, #C9A66B 49%, #C9A66B 51%, transparent 52%)
          `,
          backgroundSize: '30px 30px'
        }} />
      </div>

      {/* Ambient lighting */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brown/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">

        {/* Tab Navigation */}
        <div className="mb-12 md:mb-16">
          <TabNavigation
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            variant="pills"
            sticky={false}
            animated={true}
            className="max-w-sm mx-auto"
          />
        </div>

        {/* Tab Content with Luxury Animation */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.25, 0.1, 0.25, 1] 
          }}
          className="max-w-6xl mx-auto"
        >
          <div className="bg-charcoal-light/10 backdrop-blur-sm border border-gold/10 rounded-none p-8 md:p-12">
            {activeTab === 'story' && <AcademyStoryTab />}
            {activeTab === 'team' && <AcademyTeamTab />}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AcademyInfoTabs;