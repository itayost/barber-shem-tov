'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { courses } from '@/lib/data';
import LuxurySection from '@/components/luxury/LuxurySection';
import LuxuryCarousel from '@/components/common/LuxuryCarousel';
import { CourseCardClean } from '@/components/common/CourseCard';

const LuxuryThreePathways: React.FC = () => {
  // Get featured courses for the carousel
  const featuredCourses = courses.filter(course => course.featured);

  // Create slides from course cards
  const courseSlides = featuredCourses.map((course, index) => (
    <CourseCardClean key={course.id} course={course} index={index} />
  ));

  // Timeline labels for the courses
  const timelineLabels = featuredCourses.map(course => course.name_he);

  return (
    <LuxurySection
      label="התוכניות שלנו"
      title="מסלולי"
      accent="הלימוד"
      subtitle="בחרו את המסלול המתאים לכם ופתחו דלת לעולם הספרות המקצועית"
      size="large"
      bgColor="black"
    >
      {/* Course Carousel */}
      <div className="mt-16 md:mt-20 -mx-6 md:mx-0">
        <LuxuryCarousel
          slides={courseSlides}
          autoPlay={true}
          autoPlayInterval={8000}
          showDots={true}
          showTimeline={true}
          timelineLabels={timelineLabels}
          variant="minimal"
          height="auto"
          className="max-w-5xl mx-auto"
        />
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center mt-16 md:mt-20"
      >
        <p className="text-lightgrey text-lg mb-8 max-w-2xl mx-auto">
          לא בטוחים איזה קורס מתאים לכם? צוות המומחים שלנו כאן כדי לעזור לכם לבחור את המסלול המושלם
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-3 text-gold hover:gap-6 transition-all duration-500 text-sm uppercase tracking-wider"
        >
          <span>קבעו פגישת ייעוץ</span>
          <span>←</span>
        </a>
      </motion.div>
    </LuxurySection>
  );
};

export default LuxuryThreePathways;
