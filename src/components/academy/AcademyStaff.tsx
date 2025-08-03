'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { instructors } from '@/lib/data';

const AcademyOurStaff = () => {
  const [selectedStaff, setSelectedStaff] = useState(0);
  const currentStaff = instructors[selectedStaff];
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Auto-scroll active tab into view
  useEffect(() => {
    const activeTab = tabRefs.current[selectedStaff];
    const container = tabsContainerRef.current;

    if (activeTab && container) {
      const tabLeft = activeTab.offsetLeft;
      const tabWidth = activeTab.offsetWidth;
      const containerWidth = container.offsetWidth;
      const scrollLeft = container.scrollLeft;

      // Calculate if tab is out of view
      if (tabLeft < scrollLeft || tabLeft + tabWidth > scrollLeft + containerWidth) {
        // Center the tab in the container
        const scrollTo = tabLeft - containerWidth / 2 + tabWidth / 2;
        container.scrollTo({
          left: scrollTo,
          behavior: 'smooth',
        });
      }
    }
  }, [selectedStaff]);

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-charcoal text-offwhite" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Luxury Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 md:mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <p className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.5em] text-gold mb-4 sm:mb-6 uppercase">
            THE MASTERS
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-thin">
            אמני
            <span className="text-gold"> המחר</span>
          </h2>
        </motion.div>

        {/* Mobile-First Tab Navigation */}
        <motion.div
          className="mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Tabs Container - Horizontal scroll on mobile */}
          <div className="bg-charcoal-light/30 backdrop-blur-sm p-1.5 rounded-full">
            <div ref={tabsContainerRef} className="flex gap-1 overflow-x-auto scrollbar-hide">
              {instructors.map((staff, index) => (
                <button
                  key={staff.id}
                  ref={el => {
                    if (el) tabRefs.current[index] = el;
                  }}
                  onClick={() => setSelectedStaff(index)}
                  className={`
                    relative flex-shrink-0 px-6 sm:px-8 py-3 sm:py-4
                    text-xs sm:text-sm font-light uppercase tracking-wider
                    rounded-full transition-all duration-500 touch-manipulation
                    min-w-[120px] sm:min-w-[150px]
                    ${
                      selectedStaff === index
                        ? 'bg-gold text-black shadow-lg'
                        : 'text-lightgrey hover:text-offwhite hover:bg-white/5'
                    }
                  `}
                >
                  <span className="relative z-10">
                    {staff.name.split(' ')[0]} {/* First name only on mobile */}
                    <span className="hidden sm:inline">
                      {' '}
                      {staff.name.split(' ').slice(1).join(' ')}
                    </span>
                  </span>

                  {/* Number indicator - mobile friendly */}
                  <span
                    className={`
                    absolute top-1 right-2 text-[8px] sm:text-[10px]
                    ${selectedStaff === index ? 'text-black/60' : 'text-gold/60'}
                  `}
                  >
                    0{index + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Staff Content - Mobile First */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStaff.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16"
          >
            {/* Portrait - Mobile First */}
            <motion.div
              className="relative order-2 lg:order-1"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="relative aspect-[4/5] sm:aspect-[3/4] max-w-md mx-auto lg:mx-0">
                <Image
                  src={currentStaff.image || `/images/team/${currentStaff.id}.jpg`}
                  alt={currentStaff.name}
                  fill
                  className="object-cover"
                  quality={90}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  onError={e => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.innerHTML = `
                        <div class="w-full h-full bg-gradient-to-b from-charcoal to-black flex items-center justify-center">
                          <div class="text-6xl sm:text-8xl md:text-9xl text-gold/10 font-serif">
                            ${currentStaff.name.charAt(0)}
                          </div>
                        </div>
                      `;
                    }
                  }}
                />

                {/* Elegant overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                {/* Mobile-first stats overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <div className="flex gap-6 sm:gap-8">
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-thin text-gold">
                        {currentStaff.id === 'bar' ? '10+' : '8+'}
                      </div>
                      <div className="text-[10px] sm:text-xs tracking-[0.2em] opacity-80 uppercase">
                        שנות ניסיון
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-thin text-gold">100+</div>
                      <div className="text-[10px] sm:text-xs tracking-[0.2em] opacity-80 uppercase">
                        בוגרים
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content - Mobile First */}
            <motion.div
              className="space-y-6 sm:space-y-8 order-1 lg:order-2"
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Name & Title - Mobile optimized */}
              <div className="lg:hidden">
                <h3 className="text-2xl sm:text-3xl font-thin text-offwhite mb-2">
                  {currentStaff.name}
                </h3>
                <p className="text-xs sm:text-sm tracking-[0.2em] text-gold uppercase">
                  {currentStaff.title}
                </p>
              </div>

              {/* Bio - Mobile friendly typography */}
              <div>
                <p className="text-base sm:text-lg md:text-xl font-light leading-relaxed text-lightgrey/90">
                  {currentStaff.bio}
                </p>
              </div>

              {/* Expertise - Mobile optimized grid */}
              <div>
                <p className="text-[10px] sm:text-xs tracking-[0.3em] text-gold mb-4 uppercase">
                  תחומי התמחות
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {currentStaff.expertise.map((skill, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-gold/60 text-xs">◆</span>
                      <span className="text-sm sm:text-base font-light">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications - if available */}
              {currentStaff.certifications && currentStaff.certifications.length > 0 && (
                <div className="pt-4 sm:pt-6 border-t border-gold/10">
                  <p className="text-[10px] sm:text-xs tracking-[0.3em] text-gold mb-3 uppercase">
                    הסמכות
                  </p>
                  <div className="space-y-2">
                    {currentStaff.certifications.map((cert, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-gold/40 text-xs mt-0.5">✓</span>
                        <span className="text-xs sm:text-sm font-light text-lightgrey">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Custom scrollbar hide styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default AcademyOurStaff;
