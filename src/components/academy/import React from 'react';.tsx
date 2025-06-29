import React from 'react';
import { motion } from 'framer-motion';
import { academyInfo, academyStory } from '@/lib/data';

const OurStory = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 },
  };

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-charcoal text-offwhite">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div className="text-center mb-12 md:mb-20" {...fadeInUp}>
          <span className="text-gold text-sm uppercase tracking-[0.2em] block mb-4">
            הסיפור שלנו
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light">
            מסע של
            <span className="text-gold"> מצוינות</span>
          </h2>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Large Number - Mobile: Hidden, Desktop: Visible */}
          <motion.div
            className="hidden lg:block lg:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-[10rem] font-light text-gold/10 leading-none">01</span>
          </motion.div>

          {/* Story Content */}
          <motion.div className="lg:col-span-7 space-y-6" {...fadeInUp}>
            <p className="text-xl md:text-2xl font-light leading-relaxed">
              <span className="text-gold text-4xl float-right mr-2">ה</span>אקדמיה שלנו נולדה מתוך
              חזון פשוט אך עוצמתי - להעלות את סטנדרט הספרות בישראל לרמה בינלאומית.
            </p>

            <p className="text-base md:text-lg text-lightgrey leading-relaxed">
              מה שהתחיל כמספרה בוטיק קטנה בטירת הכרמל ב-{academyInfo.established}, הפך במהרה למרכז
              הכשרה מוביל. בר שם טוב, המייסד שלנו, זיהה את הצורך בחינוך מקצועי איכותי שמשלב טכניקות
              מסורתיות עם חדשנות עכשווית.
            </p>

            <p className="text-base md:text-lg text-lightgrey leading-relaxed">
              כיום, עם מעל {academyInfo.stats.graduates} בוגרים ו-{academyInfo.stats.placementRate}%
              שיעור השמה, אנחנו גאים להיות האקדמיה המובילה בצפון.
            </p>

            {/* Mission Quote */}
            <motion.div
              className="border-r-4 border-gold pr-6 py-4 my-8"
              {...fadeInUp}
              transition={{ delay: 0.2 }}
            >
              <p className="text-xl md:text-2xl font-light italic text-gold">
                "אנחנו לא מכשירים ספרים,
                <br />
                אנחנו מפסלים אמנים"
              </p>
            </motion.div>
          </motion.div>

          {/* Stats - Mobile: Grid, Desktop: Sidebar */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-6">
              {[
                { number: academyInfo.stats.graduates + '+', label: 'בוגרים' },
                { number: academyInfo.stats.placementRate + '%', label: 'השמה' },
                { number: academyInfo.stats.programCount, label: 'תוכניות' },
                { number: academyInfo.stats.industryAwards, label: 'פרסים' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center lg:text-right"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-3xl md:text-4xl font-light text-gold">{stat.number}</div>
                  <div className="text-sm uppercase tracking-wider text-lightgrey mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Timeline - Mobile: Vertical, Desktop: Horizontal */}
        <motion.div
          className="mt-16 md:mt-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-2xl md:text-3xl font-light text-center mb-12 text-gold">ציוני דרך</h3>

          <div className="relative">
            {/* Desktop Timeline Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gold/30 -translate-y-1/2"></div>

            {/* Mobile Timeline Line */}
            <div className="md:hidden absolute right-8 top-0 bottom-0 w-px bg-gold/30"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
              {academyStory.timeline.slice(0, 4).map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Mobile Layout */}
                  <div className="md:hidden flex items-start gap-4">
                    <div className="w-4 h-4 bg-gold rounded-full mt-1 z-10 relative"></div>
                    <div className="flex-1">
                      <div className="text-2xl font-light text-gold mb-2">{milestone.year}</div>
                      <h4 className="text-lg font-medium mb-1">{milestone.title}</h4>
                      <p className="text-sm text-lightgrey">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:block text-center">
                    <div className="w-4 h-4 bg-gold rounded-full mx-auto mb-4 relative z-10"></div>
                    <div className="text-xl font-light text-gold mb-2">{milestone.year}</div>
                    <h4 className="text-base font-medium mb-1">{milestone.title}</h4>
                    <p className="text-sm text-lightgrey">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurStory;
