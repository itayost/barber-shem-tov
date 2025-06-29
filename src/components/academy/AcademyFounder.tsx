import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { instructors } from '@/lib/data';

const FounderSection = () => {
  const founder = instructors[0]; // Bar Shem-Tov

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 },
  };

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-offwhite text-charcoal">
      <div className="container mx-auto px-6 md:px-12">
        {/* Mobile Layout */}
        <div className="lg:hidden">
          {/* Mobile Header */}
          <motion.div className="text-center mb-8" {...fadeInUp}>
            <span className="text-gold text-sm uppercase tracking-[0.2em] block mb-4">המייסד</span>
            <h2 className="text-3xl md:text-4xl font-light">החזון מאחורי המותג</h2>
          </motion.div>

          {/* Mobile Portrait */}
          <motion.div className="relative h-[400px] mb-8 rounded-lg overflow-hidden" {...fadeInUp}>
            <Image
              src={founder.image || '/images/team/bar.jpg'}
              alt={founder.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
            <div className="absolute bottom-6 right-6 text-white">
              <h3 className="text-2xl font-light mb-1">{founder.name}</h3>
              <p className="text-gold">{founder.title}</p>
            </div>
          </motion.div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
          {/* Portrait */}
          <motion.div
            className="lg:col-span-5 relative h-[600px] rounded-lg overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Image
              src={founder.image || '/images/team/bar.jpg'}
              alt={founder.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />

            {/* Experience Badge */}
            <div className="absolute bottom-8 right-8 bg-charcoal text-white p-6 rounded-lg">
              <div className="text-3xl font-light text-gold">15+</div>
              <div className="text-sm">שנות ניסיון</div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="lg:col-span-7 space-y-8">
            {/* Header */}
            <motion.div {...fadeInUp}>
              <span className="text-gold text-sm uppercase tracking-[0.2em] block mb-4">
                המייסד
              </span>
              <h2 className="text-4xl lg:text-5xl font-light mb-2">{founder.name}</h2>
              <p className="text-xl text-gold">{founder.title}</p>
            </motion.div>

            {/* Bio */}
            <motion.div
              className="space-y-4 text-charcoal/80 leading-relaxed"
              {...fadeInUp}
              transition={{ delay: 0.2 }}
            >
              <p className="text-lg">{founder.bio}</p>
            </motion.div>

            {/* Philosophy Quote */}
            <motion.div
              className="bg-gold text-charcoal p-8 rounded-lg"
              {...fadeInUp}
              transition={{ delay: 0.3 }}
            >
              <p className="text-xl md:text-2xl font-light italic leading-relaxed">
                "ספרות היא לא רק מקצוע, היא אומנות שדורשת תשוקה, דיוק ומסירות"
              </p>
            </motion.div>

            {/* Achievements */}
            <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
              <h4 className="text-xl font-medium mb-4">הישגים מרכזיים</h4>
              <ul className="space-y-2">
                {[
                  'מייסד האקדמיה המובילה לספרות בצפון',
                  'השתלמות בלונדון ובניו יורק',
                  'מנטור ליותר מ-500 ספרים מקצועיים',
                  'יועץ לרשתות מספרות מובילות',
                ].map((achievement, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <span className="text-gold mr-2 mt-1">•</span>
                    <span className="text-charcoal/80">{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Specialties */}
            <motion.div {...fadeInUp} transition={{ delay: 0.6 }}>
              <h4 className="text-xl font-medium mb-4">תחומי התמחות</h4>
              <div className="flex flex-wrap gap-3">
                {founder.expertise.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-charcoal/10 text-charcoal rounded-full text-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mobile Content (continues from portrait) */}
        <div className="lg:hidden space-y-8">
          {/* Philosophy */}
          <motion.div className="bg-gold text-charcoal p-6 rounded-lg" {...fadeInUp}>
            <p className="text-lg italic leading-relaxed">
              "ספרות היא לא רק מקצוע, היא אומנות שדורשת תשוקה, דיוק ומסירות"
            </p>
          </motion.div>

          {/* Bio */}
          <motion.div className="space-y-4 text-charcoal/80" {...fadeInUp}>
            <p>{founder.bio}</p>
          </motion.div>

          {/* Achievements */}
          <motion.div {...fadeInUp}>
            <h4 className="text-lg font-medium mb-3">הישגים מרכזיים</h4>
            <ul className="space-y-2">
              {[
                'מייסד האקדמיה המובילה לספרות בצפון',
                'השתלמות בלונדון ובניו יורק',
                'מנטור ליותר מ-500 ספרים מקצועיים',
              ].map((achievement, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  <span className="text-sm text-charcoal/80">{achievement}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Milestones */}
          <motion.div className="border-r-2 border-gold pr-4 space-y-4" {...fadeInUp}>
            <div>
              <div className="text-lg font-medium">2018</div>
              <div className="text-sm text-charcoal/60">ייסוד האקדמיה</div>
            </div>
            <div>
              <div className="text-lg font-medium">2020</div>
              <div className="text-sm text-charcoal/60">הסמכה בינלאומית</div>
            </div>
            <div>
              <div className="text-lg font-medium">2023</div>
              <div className="text-sm text-charcoal/60">500 בוגרים</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
