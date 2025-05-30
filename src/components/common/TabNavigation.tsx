// src/components/common/TabNavigation.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface Tab {
  id: string;
  label: string;
  icon?: string;
  count?: number;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  sticky?: boolean;
  stickyOffset?: number;
  showCounts?: boolean;
  variant?: 'default' | 'compact';
  className?: string;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
  sticky = false,
  stickyOffset = 16,
  showCounts = false,
  variant = 'default',
  className = ''
}) => {
  const buttonWidth = variant === 'compact' ? 'min-w-[120px]' : 'min-w-[160px]';
  const buttonPadding = variant === 'compact' ? 'px-4 py-2' : 'px-6 py-3';
  const fontSize = variant === 'compact' ? 'text-xs sm:text-sm' : 'text-sm sm:text-base';

  return (
    <div 
      className={`
        ${sticky ? `sticky top-${stickyOffset} z-20` : ''} 
        bg-charcoal/95 backdrop-blur-sm py-2
        ${className}
      `}
    >
      {/* Tab container with subtle background */}
      <div className="bg-charcoal-light/30 p-1.5 mx-4 sm:mx-auto sm:max-w-fit rounded-lg">
        <div className="flex gap-1 overflow-x-auto no-scrollbar">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex-shrink-0 ${buttonWidth} ${buttonPadding} ${fontSize} 
                font-medium transition-all relative group
                ${activeTab === tab.id
                  ? 'bg-gold text-charcoal shadow-lg rounded-md'
                  : 'bg-transparent text-lightgrey hover:text-offwhite hover:bg-white/5 rounded-md'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Tab content */}
              <span className="flex items-center justify-center gap-2 relative z-10">
                {tab.icon && <span className="text-lg">{tab.icon}</span>}
                <span>{tab.label}</span>
                {showCounts && tab.count !== undefined && (
                  <span className={`text-xs ${
                    activeTab === tab.id ? 'text-charcoal/70' : 'text-lightgrey/70'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </span>

              {/* Hover effect for inactive tabs */}
              {activeTab !== tab.id && (
                <div className="absolute inset-0 rounded-md overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/10 to-gold/0"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              )}

              {/* Active tab glow effect */}
              {activeTab === tab.id && (
                <>
                  <motion.div
                    className="absolute inset-0 bg-gold rounded-md"
                    layoutId="activeTab"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gold/20 rounded-md blur-xl"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </>
              )}

              {/* Divider between tabs (except last) */}
              {index < tabs.length - 1 && activeTab !== tab.id && activeTab !== tabs[index + 1]?.id && (
                <div className="absolute right-[-2px] top-1/4 bottom-1/4 w-[1px] bg-lightgrey/20" />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="mt-2 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </div>
  );
};

export default TabNavigation;