// src/components/common/TabNavigation.tsx - Fixed version
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface Tab {
  id: string;
  label: string;
  icon?: string | React.ReactNode;
  count?: number;
  badge?: string;
  badgeColor?: 'gold' | 'red' | 'green';
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  sticky?: boolean;
  stickyOffset?: number;
  showCounts?: boolean;
  variant?: 'default' | 'compact' | 'pills' | 'underline';
  className?: string;
  animated?: boolean;
  fullWidth?: boolean;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
  sticky = false,
  stickyOffset = 16,
  showCounts = false,
  variant = 'default',
  className = '',
  animated = true,
  fullWidth = false
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);
  const [selectedRect, setSelectedRect] = useState<DOMRect | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  // Check scroll visibility
  useEffect(() => {
    const checkScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 1);
    };

    checkScroll();
    const container = scrollContainerRef.current;
    container?.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    return () => {
      container?.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [tabs]);

  // Update selected indicator position
  useEffect(() => {
    const activeElement = document.querySelector(`[data-tab-id="${activeTab}"]`);
    if (activeElement) {
      setSelectedRect(activeElement.getBoundingClientRect());
    }
  }, [activeTab]);

  // Scroll handlers
  const scrollTabs = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    const newScrollLeft = direction === 'left' 
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;

    setIsScrolling(true);
    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });

    setTimeout(() => setIsScrolling(false), 300);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % tabs.length;
      onTabChange(tabs[nextIndex].id);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      onTabChange(tabs[prevIndex].id);
    }
  };

  // Variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'pills':
        return {
          container: 'bg-charcoal-light/50 backdrop-blur-sm p-1.5 rounded-full',
          tab: 'rounded-full',
          activeTab: 'bg-gold text-charcoal shadow-lg',
          inactiveTab: 'text-lightgrey hover:text-offwhite hover:bg-white/5'
        };
      case 'underline':
        return {
          container: 'border-b border-lightgrey/20',
          tab: 'pb-3 border-b-2 border-transparent -mb-[2px]',
          activeTab: 'text-gold border-gold',
          inactiveTab: 'text-lightgrey hover:text-offwhite hover:border-lightgrey/50'
        };
      case 'compact':
        return {
          container: 'bg-charcoal-light/30 p-1 rounded-lg',
          tab: 'rounded-md',
          activeTab: 'bg-gold text-charcoal shadow-md',
          inactiveTab: 'text-lightgrey hover:text-offwhite hover:bg-white/5'
        };
      default:
        return {
          container: 'bg-charcoal-light/30 p-1.5 rounded-xl',
          tab: 'rounded-lg',
          activeTab: 'bg-gold text-charcoal shadow-lg',
          inactiveTab: 'text-lightgrey hover:text-offwhite hover:bg-white/10'
        };
    }
  };

  const styles = getVariantStyles();
  const buttonPadding = variant === 'compact' ? 'px-3 py-1.5' : 'px-4 py-2.5';
  const fontSize = variant === 'compact' ? 'text-xs sm:text-sm' : 'text-sm sm:text-base';

  return (
    <div 
      className={`
        ${sticky ? `sticky top-${stickyOffset} z-20` : ''} 
        ${className}
      `}
      role="tablist"
      aria-label="Navigation tabs"
    >
      <div className="relative">
        {/* Scroll buttons - always rendered but visibility controlled */}
        <motion.button
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-charcoal/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-charcoal transition-all duration-200 ${
            showLeftScroll && !isScrolling 
              ? 'opacity-100 pointer-events-auto' 
              : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => scrollTabs('left')}
          aria-label="Scroll tabs left"
          tabIndex={showLeftScroll && !isScrolling ? 0 : -1}
          animate={{ x: showLeftScroll && !isScrolling ? 0 : -10 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronLeft className="w-4 h-4 text-gold" />
        </motion.button>
        
        <motion.button
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-charcoal/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-charcoal transition-all duration-200 ${
            showRightScroll && !isScrolling 
              ? 'opacity-100 pointer-events-auto' 
              : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => scrollTabs('right')}
          aria-label="Scroll tabs right"
          tabIndex={showRightScroll && !isScrolling ? 0 : -1}
          animate={{ x: showRightScroll && !isScrolling ? 0 : 10 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight className="w-4 h-4 text-gold" />
        </motion.button>

        {/* Gradient fades - always rendered but visibility controlled */}
        <div 
          className={`absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-charcoal to-transparent z-5 pointer-events-none transition-opacity duration-200 ${
            showLeftScroll ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div 
          className={`absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-charcoal to-transparent z-5 pointer-events-none transition-opacity duration-200 ${
            showRightScroll ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Tab container */}
        <div className={`${styles.container} ${fullWidth ? 'w-full' : 'max-w-fit mx-auto'} relative`}>
          {/* Background indicator for default variant */}
          {variant === 'default' && animated && selectedRect && (
            <motion.div
              className="absolute bg-gold rounded-lg pointer-events-none"
              initial={false}
              animate={{
                x: selectedRect.left - (scrollContainerRef.current?.parentElement?.getBoundingClientRect().left || 0) + (scrollContainerRef.current?.scrollLeft || 0),
                width: selectedRect.width,
                height: selectedRect.height
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 35
              }}
              style={{
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 0
              }}
            />
          )}
          
          <div 
            ref={scrollContainerRef}
            className={`
              flex gap-1 overflow-x-auto no-scrollbar scroll-smooth relative
              ${fullWidth ? 'justify-between' : ''}
            `}
          >
            {tabs.map((tab, index) => {
              const isActive = activeTab === tab.id;
              
              return (
                <motion.button
                  key={tab.id}
                  data-tab-id={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`
                    flex-shrink-0 ${buttonPadding} ${fontSize} ${styles.tab}
                    font-medium transition-all relative group
                    ${isActive ? styles.activeTab : styles.inactiveTab}
                    ${fullWidth ? 'flex-1' : ''}
                    focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 focus:ring-offset-charcoal
                  `}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`tabpanel-${tab.id}`}
                  whileHover={!isActive ? { scale: 1.02 } : {}}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Tab content */}
                  <span className="flex items-center justify-center gap-2 relative z-10">
                    {tab.icon && (
                      <motion.span
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: isActive ? 1 : 0.7 }}
                        className="text-lg"
                      >
                        {tab.icon}
                      </motion.span>
                    )}
                    
                    <span className="whitespace-nowrap">{tab.label}</span>
                    
                    {/* Count badge */}
                    {showCounts && tab.count !== undefined && (
                      <motion.span 
                        className={`
                          text-xs px-1.5 py-0.5 rounded-full
                          ${isActive 
                            ? 'bg-charcoal/20 text-charcoal/70' 
                            : 'bg-lightgrey/10 text-lightgrey/70'
                          }
                        `}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        {tab.count}
                      </motion.span>
                    )}
                    
                    {/* Custom badge */}
                    {tab.badge && (
                      <motion.span 
                        className={`
                          text-xs px-2 py-0.5 rounded-full font-bold
                          ${tab.badgeColor === 'red' 
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : tab.badgeColor === 'green'
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-gold/20 text-gold border border-gold/30'
                          }
                        `}
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        {tab.badge}
                      </motion.span>
                    )}
                  </span>

                  {/* Hover effect */}
                  {!isActive && animated && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/10 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                  )}

                  {/* Active tab glow effect */}
                  {isActive && animated && variant !== 'underline' && (
                    <motion.div
                      className="absolute inset-0 bg-gold/20 rounded-lg blur-xl -z-10 pointer-events-none"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: [0.8, 1.2, 0.8] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Bottom decorative line for some variants */}
        {variant === 'default' && (
          <div className="mt-2 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        )}
      </div>
    </div>
  );
};

export default TabNavigation;