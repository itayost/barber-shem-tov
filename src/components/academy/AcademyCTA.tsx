import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { academyInfo } from '@/lib/data';

const AcademyCTA = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gold to-gold-dark text-charcoal">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Heading */}
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light mb-6 leading-tight">
            מוכן להתחיל את המסע שלך?
          </h2>

          {/* Subheading */}
          <p className="text-lg md:text-xl mb-8 text-charcoal/80">
            הצטרף ל-{academyInfo.stats.graduates}+ הבוגרים שלנו שהפכו את התשוקה שלהם למקצוע
          </p>

          {/* Stats Row */}
          <motion.div
            className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-light mb-1">
                {academyInfo.stats.placementRate}%
              </div>
              <div className="text-sm opacity-80">שיעור השמה</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-light mb-1">
                {academyInfo.stats.programCount}+
              </div>
              <div className="text-sm opacity-80">תוכניות לימוד</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-light mb-1">
                {academyInfo.stats.graduates}+
              </div>
              <div className="text-sm opacity-80">בוגרים</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/courses"
              className="btn bg-charcoal text-offwhite hover:bg-charcoal-dark px-8 py-4 text-lg rounded-lg transition-all duration-300 hover:scale-105"
            >
              צפה בקורסים שלנו
            </Link>
            <Link
              href="/contact"
              className="btn bg-transparent border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-offwhite px-8 py-4 text-lg rounded-lg transition-all duration-300"
            >
              צור קשר לייעוץ
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="mt-12 pt-12 border-t border-charcoal/20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-sm mb-4 opacity-80">בשיתוף פעולה עם:</p>
            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              {academyInfo.partners.slice(0, 3).map((partner, index) => (
                <span key={index} className="text-sm font-medium opacity-60">
                  {partner}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="mt-12 text-sm opacity-80"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <p>לשאלות ופרטים נוספים:</p>
            <a
              href={`tel:${academyInfo.phone}`}
              className="text-lg font-medium hover:underline mt-2 block"
            >
              {academyInfo.phone}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AcademyCTA;
