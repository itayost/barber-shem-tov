// src/components/home/AcademyFeatures/StatisticsGrid.tsx
import React from 'react';
import { motion } from 'framer-motion';
import StatisticBox from './StatisticBox';
import AnimatedStatisticBox from './AnimatedStatisticBox';

interface StatisticsGridProps {
  stats: {
    placementRate: number;
    programCount: number;
    industryAwards?: number | string;
    graduates?: number;
  }
}

const StatisticsGrid: React.FC<StatisticsGridProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <AnimatedStatisticBox 
        value={stats.placementRate}
        unit="%"
        label="מהבוגרים שלנו מוצאים עבודה תוך 3 חודשים"
      />
      
      <StatisticBox 
        value="1:8"
        unit=""
        label="יחס מדריכים לסטודנטים בכל כיתת לימוד"
      />
      
      <StatisticBox 
        value={stats.industryAwards || "12+"}
        unit=""
        label="פרסי תעשייה ותעודות הוקרה"
      />
      
      <AnimatedStatisticBox 
        value={stats.programCount}
        unit=""
        label="מסלולי לימוד בהתאמה אישית"
      />
    </div>
  );
};

export default StatisticsGrid;