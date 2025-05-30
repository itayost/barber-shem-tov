// src/components/academy/AcademyTabsSection.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TabNavigation from '@/components/common/TabNavigation';
import AcademyStoryTab from './tabs/AcademyStoryTab';
import AcademyResultsTab from './tabs/AcademyResultsTab';
import AcademyTeamTab from './tabs/AcademyTeamTab';

const AcademyTabsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('story');

  const tabs = [
    { id: 'story', label: 'הסיפור שלנו', icon: '📖' },
    { id: 'results', label: 'תוצאות', icon: '🏆' },
    { id: 'team', label: 'הצוות', icon: '👥' }
  ];

  return (
    <section className="py-16 sm:py-20 bg-charcoal" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Tab Navigation using reusable component */}
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          sticky={true}
          stickyOffset={16}
          className="mb-8"
        />

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