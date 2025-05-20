// src/components/home/AcademyFeatures/index.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { academyInfo } from '@/lib/data';
import FeatureIntro from './FeatureIntro';
import FeaturesList from './FeaturesList';
import FeaturedCourse from './FeaturedCourse';
import StatisticsGrid from './StatisticsGrid';
import Accreditations from './Accreditations';

const AcademyFeaturesSection = () => {
  // State for active feature (used by FeaturesList)
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  return (
    <section className="py-section-mobile md:py-section bg-charcoal relative overflow-hidden" dir="rtl">
      {/* Enhanced background with subtle animation */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
        <motion.div
          initial={{ opacity: 0.05 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
          className="w-full h-full bg-gradient-to-l from-gold to-transparent"
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-start gap-12">
          {/* Left column - Main content */}
          <div className="md:w-1/2 lg:w-3/5">
            <FeatureIntro />
            
            <FeaturesList 
              activeFeature={activeFeature}
              setActiveFeature={setActiveFeature}
            />
          </div>
          
          {/* Right column - Featured course */}
          <div className="md:w-1/2 lg:w-2/5">
            <FeaturedCourse />
            
            <StatisticsGrid stats={academyInfo.stats} />
            
            <Accreditations accreditations={academyInfo.accreditations || []} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademyFeaturesSection;