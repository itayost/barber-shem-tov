// src/components/home/NextSteps.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Simple 3-step process
const steps = [
  {
    id: 'consultation',
    number: '01',
    title: 'ייעוץ',
    subtitle: 'שיחה אישית חינם',
    description: 'נכיר אותך, נבין את המטרות שלך ונמליץ על המסלול המתאים ביותר',
    icon: '/icons/Consultation.svg',
    duration: '15 דקות',
    action: 'קביעת פגישה',
    details: [
      'בדיקת התאמה אישית',
      'הצגת אפשרויות תעסוקה',
      'הסבר על תוכנית הלימודים',
      'תשובות לכל השאלות'
    ]
  },
  {
    id: 'enrollment',
    number: '02', 
    title: 'הרשמה',
    subtitle: 'השלמת הפרטים',
    description: 'נסכם את הפרטים, נקבע תאריכים ונכין אותך לתחילת המסע המקצועי',
    icon: '/icons/Enrollment.svg',
    duration: '10 דקות',
    action: 'השלמת טפסים',
    details: [
      'בחירת מועדי הקורס',
      'הסדרת תשלומים',
      'קבלת חומרי הכנה',
      'הוספה לקבוצת הווצאפ'
    ]
  },
  {
    id: 'start-learning',
    number: '03',
    title: 'התחל ללמוד',
    subtitle: 'קפוץ ראש למים',
    description: 'מהיום הראשון תעבוד עם לקוחות אמיתיים ותרכוש ניסיון מעשי בהדרכה צמודה',
    icon: '/icons/StartLearning.svg',
    duration: 'מהיום הראשון',
    action: 'בואו נתחיל!',
    details: [
      'עבודה עם לקוחות אמיתיים',
      'הדרכה אישית צמודה',
      'בניית תיק עבודות',
      'הכנה לתעסוקה'
    ]
  }
];

const NextSteps: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.7,
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-brown/5 to-charcoal relative overflow-hidden" dir="rtl">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gold to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-brown to-transparent"></div>
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
            איך זה <span className="text-gold">עובד</span>?
          </h2>
          <p className="text-lightgrey text-xl max-w-2xl mx-auto">
            3 צעדים פשוטים להתחיל את הקריירה החדשה שלך
          </p>
        </motion.div>

        {/* Steps process */}
        <motion.div 
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              variants={stepVariants}
              className="relative mb-16 last:mb-0"
            >
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Step number and icon */}
                <div className="flex-shrink-0 relative">
                  <div className="w-32 h-32 bg-charcoal border-4 border-gold rounded-full flex flex-col items-center justify-center relative z-10">
                    <div className="text-4xl mb-2">
                      <img src={step.icon} alt={`${step.title} icon`} width={40} height={40} className="text-gold"/>
                    </div>
                    <div className="text-gold font-bold text-sm">{step.number}</div>
                  </div>
                  
                  {/* Connecting line (except for last step) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-32 right-1/2 w-0.5 h-16 bg-gold/30 transform translate-x-1/2"></div>
                  )}
                </div>

                {/* Step content */}
                <div className="flex-1 bg-charcoal border border-lightgrey/10 p-8 hover:border-gold/30 transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left side - main info */}
                    <div>
                      <h3 className="text-h3 font-bold mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gold text-lg font-medium mb-4">
                        {step.subtitle}
                      </p>
                      <p className="text-lightgrey leading-relaxed mb-6">
                        {step.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <div className="bg-gold/10 px-3 py-1 text-gold flex items-center gap-2">
                          <img src="/icons/Timer.svg" alt="Timer icon" width={24} height={24} className="text-gold"/> {step.duration}
                        </div>
                        <div className="text-lightgrey flex items-center gap-2">
                          <img src="/icons/PointerUp.svg" alt="Pointer up icon" width={24} height={24} className="text-lightgrey"/> {step.action}
                        </div>
                      </div>
                    </div>

                    {/* Right side - details */}
                    <div>
                      <h4 className="font-bold mb-4 text-offwhite">מה קורה בשלב הזה:</h4>
                      <ul className="space-y-3">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start text-lightgrey">
                            <span className="text-gold ml-3 mt-1 flex-shrink-0">✓</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Large CTA */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="bg-gradient-to-r from-gold to-yellow-500 p-1 rounded-lg max-w-md mx-auto">
            <div className="bg-charcoal rounded-lg p-8">
              <h3 className="text-h3 font-bold mb-4">
                מוכן <span className="text-gold">להתחיל</span>?
              </h3>
              <p className="text-lightgrey mb-8 text-lg">
                הצעד הראשון הוא שיחת ייעוץ חינם של 15 דקות
              </p>
              
              <motion.a
                href="/contact?consultation=true"
                className="inline-block bg-gold text-charcoal py-6 px-12 font-bold text-2xl hover:bg-gold/90 transition-all shadow-2xl group"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(201, 166, 107, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-3">
                  <img src="/icons/StartLearning.svg" alt="Rocket icon" width={40} height={40} className="text-charcoal"/> התחל עכשיו
                  <motion.span
                    className="text-xl"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ←
                  </motion.span>
                </span>
              </motion.a>
              
              <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-lightgrey/80">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>שיחה חינם</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>ללא התחייבות</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>15 דקות בלבד</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Alternative contact methods */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-lightgrey mb-4">או צור קשר ישירות:</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="tel:+972528691415"
              className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-6 hover:bg-green-700 transition-colors"
            >
              <img src="/icons/Phone.svg" alt="Phone icon" width={24} height={24} className="text-white"/> 052-869-1415
            </a>
            <a 
              href="https://wa.me/972528691415?text=היי, אשמח לקבל מידע על הקורסים"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 text-white py-3 px-6 hover:bg-green-600 transition-colors"
            >
              <img src="/icons/Whatsapp.svg" alt="WhatsApp icon" width={24} height={24} className="text-white"/> WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NextSteps;