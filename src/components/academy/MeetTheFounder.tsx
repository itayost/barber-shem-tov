// src/components/academy/MeetTheFounder.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/common/Button';

const MeetTheFounder: React.FC = () => {
  const achievements = [
    '15+ שנות ניסיון בתעשייה',
    'השתלמויות בלונדון וניו יורק',
    'הדריך 500+ ספרים מצליחים',
    'בעל רשת מספרות מובילה'
  ];

  return (
    <section className="py-20 md:py-32 bg-brown/5 relative overflow-hidden" dir="rtl">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Founder image */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative w-full max-w-md mx-auto">
                {/* Main image */}
                <div className="relative h-[500px] overflow-hidden border-4 border-gold/30">
                  <Image
                    src="/images/team/bar.jpg"
                    alt="בר שם טוב - מייסד האקדמיה"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      if (target.parentElement) {
                        target.parentElement.innerHTML = `
                          <div class="w-full h-full bg-gold/20 flex items-center justify-center">
                            <div class="text-center">
                              <div class="text-6xl text-gold mb-4">👨‍🏫</div>
                              <div class="text-gold font-bold text-xl">בר שם טוב</div>
                            </div>
                          </div>
                        `;
                      }
                    }}
                  />
                </div>

                {/* Decorative elements */}
                <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full border-2 border-gold/20"></div>
                <div className="absolute top-4 right-4 bg-gold text-charcoal px-4 py-2 font-bold">
                  מייסד ומנכ"ל
                </div>
              </div>

              {/* Achievements badges */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {achievements.map((achievement, idx) => (
                  <motion.div 
                    key={idx}
                    className="bg-charcoal/50 backdrop-blur-sm border border-gold/20 p-3 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * idx }}
                  >
                    <p className="text-sm text-gold font-medium">{achievement}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Founder message */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-h2 md:text-4xl font-bold mb-6">
                מכתב מ<span className="text-gold">המייסד</span>
              </h2>

              <div className="space-y-4 text-lightgrey text-lg leading-relaxed">
                <p className="relative">
                  <span className="absolute -right-6 -top-2 text-gold text-4xl opacity-30">"</span>
                  כשהקמתי את האקדמיה ב-2018, היה לי חלום אחד פשוט - 
                  ליצור מקום שבו אנשים יוכלו ללמוד את המקצוע שאני אוהב, 
                  בצורה הנכונה ביותר.
                </p>

                <p>
                  אחרי 15 שנה בתעשייה, ראיתי איך ספרים מוכשרים נכשלים 
                  בגלל חוסר הכשרה נכונה. החלטתי לשנות את זה.
                </p>

                <p>
                  <strong className="text-gold">היום, אחרי 500+ בוגרים מצליחים,</strong> אני 
                  גאה לומר שהצלחנו. הבוגרים שלנו עובדים במספרות המובילות, 
                  פותחים עסקים משלהם, ומרוויחים מעל הממוצע בתעשייה.
                </p>

                <p className="font-bold text-offwhite">
                  אבל הכי חשוב - הם אוהבים את מה שהם עושים.
                  <span className="absolute -bottom-6 left-0 text-gold text-4xl opacity-30">"</span>
                </p>
              </div>

              <div className="mt-8">
                <div className="text-gold font-bold text-xl mb-2">בר שם טוב</div>
                <div className="text-lightgrey mb-6">מייסד ומנכ"ל האקדמיה</div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    href="https://wa.me/972528691415?text=היי בר! אשמח לשמוע עוד על האקדמיה"
                    variant="primary"
                    className="py-3 px-6"
                  >
                    💬 דבר איתי ישירות
                  </Button>
                  
                  <Button
                    href="/contact?consultation=true"
                    variant="secondary"
                    className="py-3 px-6"
                  >
                    📞 קבע שיחת ייעוץ
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MeetTheFounder;