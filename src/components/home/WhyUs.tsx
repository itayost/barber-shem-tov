// src/components/home/WhyUs.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { academyInfo } from '@/lib/data';

// Compelling reasons data - outcome focused
const reasons = [
  {
    id: 'job-placement',
    icon: '💼',
    title: 'השמה מובטחת',
    stat: `${academyInfo.stats.placementRate}%`,
    description: 'מהבוגרים מוצאים עבודה תוך 3 חודשים',
    detail: 'רשת קשרים עם +50 מספרות מובילות',
    color: 'text-green-400'
  },
  {
    id: 'salary-increase',
    icon: '💰',
    title: 'שכר גבוה יותר',
    stat: `+${academyInfo.stats.averageSalaryIncrease}%`,
    description: 'עלייה ממוצעת בהכנסה לבוגרים',
    detail: 'ממוצע ₪8,000-12,000 לחודש לבוגרים',
    color: 'text-gold'
  },
  {
    id: 'certification',
    icon: '🏆',
    title: 'הסמכה מוכרת',
    stat: '100%',
    description: 'תעודה מוכרת במשרד העבודה',
    detail: 'פותחת דלתות בכל מספרה בארץ',
    color: 'text-blue-400'
  },
  {
    id: 'hands-on',
    icon: '✂️',
    title: 'התמחות מעשית',
    stat: '70%',
    description: 'מזמן הקורס - עבודה עם לקוחות אמיתיים',
    detail: 'לא רק תיאוריה - ניסיון אמיתי',
    color: 'text-purple-400'
  }
];

const WhyUs: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section className="py-20 md:py-32 bg-brown/5 relative overflow-hidden" dir="rtl">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A66B' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-h2 md:text-5xl font-bold mb-4">
            למה <span className="text-gold">אצלנו</span>?
          </h2>
          <p className="text-lightgrey text-xl max-w-2xl mx-auto">
            תוצאות מוכחות שמדברות בעד עצמן
          </p>
        </motion.div>

        {/* Reasons grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.id}
              variants={itemVariants}
              className="bg-charcoal border border-lightgrey/10 p-8 text-center group hover:border-gold/30 transition-all duration-300 hover:-translate-y-2"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)"
              }}
            >
              {/* Icon */}
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {reason.icon}
              </div>

              {/* Stat */}
              <div className={`text-5xl font-bold mb-4 ${reason.color} group-hover:scale-110 transition-all duration-300`}>
                {reason.stat}
              </div>

              {/* Title */}
              <h3 className="text-h4 font-bold mb-3 text-offwhite group-hover:text-gold transition-colors duration-300">
                {reason.title}
              </h3>

              {/* Description */}
              <p className="text-lightgrey mb-4 leading-relaxed">
                {reason.description}
              </p>

              {/* Detail */}
              <div className="pt-4 border-t border-lightgrey/10">
                <p className="text-sm text-gold font-medium">
                  {reason.detail}
                </p>
              </div>

              {/* Hover effect background */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom emphasis */}
        <motion.div 
          className="text-center mt-16 bg-charcoal/50 backdrop-blur-sm border border-gold/20 p-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-h3 font-bold mb-4">
            <span className="text-gold">{academyInfo.stats.graduates}+</span> בוגרים מצליחים לא טועים
          </h3>
          <p className="text-lightgrey text-lg mb-6">
            הצטרף לקהילה של ספרים מקצועיים שמרוויחים יותר ועובדים במקומות הכי טובים
          </p>
          
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-lightgrey/80">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gold rounded-full"></span>
              <span>מוכר במשרד העבודה</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gold rounded-full"></span>
              <span>חבר באיגוד הספרים הבינלאומי</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gold rounded-full"></span>
              <span>המלצות מעולות בגוגל</span>
            </div>
          </div>
        </motion.div>

        {/* Social proof numbers */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-gold mb-2">
              {academyInfo.established}
            </div>
            <div className="text-lightgrey text-sm">שנת ייסוד</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gold mb-2">
              {academyInfo.stats.graduates}+
            </div>
            <div className="text-lightgrey text-sm">בוגרים</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gold mb-2">
              50+
            </div>
            <div className="text-lightgrey text-sm">מספרות שותפות</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gold mb-2">
              4.9★
            </div>
            <div className="text-lightgrey text-sm">דירוג ממוצע</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUs;