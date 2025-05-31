import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/common/Button';

interface Pathway {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  price: number;
  features: string[];
  icon: string;
  popular?: boolean;
  nextStep: string;
  instructor?: string;
}

interface PathwayCardProps {
  pathway: Pathway;
  index?: number; // For staggered animations
}

const PathwayCard: React.FC<PathwayCardProps> = ({ pathway, index = 0 }) => {
  const {
    title,
    subtitle,
    duration,
    price,
    features,
    icon,
    popular,
    nextStep
  } = pathway;

  return (
    <motion.div 
      className="relative bg-charcoal border border-gold/10 flex flex-col h-full group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 }
      }}
      style={{
        minHeight: '540px',
        background: `linear-gradient(135deg, 
          rgba(26, 26, 26, 1) 0%, 
          rgba(26, 26, 26, 0.95) 50%,
          rgba(18, 18, 18, 1) 100%)`
      }}
    >
      {/* Glow effect on hover */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(201, 166, 107, 0.1) 0%, transparent 70%)'
        }}
      />

      {/* Popular ribbon - Enhanced */}
      {popular && (
        <motion.div 
          className="absolute -top-1 -right-1 bg-gradient-to-br from-gold via-yellow-500 to-gold text-charcoal px-6 py-2 text-xs font-black tracking-wider z-20"
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        >
          הכי נבחר
        </motion.div>
      )}

      {/* Content wrapper */}
      <div className="relative z-10 p-6 flex flex-col h-full">
        
        {/* Header - Compact */}
        <div className="text-center mb-4">
          <motion.div 
            className="text-5xl mb-2"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {icon}
          </motion.div>
          <h3 className="text-2xl font-bold text-offwhite mb-1">
            {title}
          </h3>
          <p className="text-gold/80 text-sm uppercase tracking-wider">
            {subtitle}
          </p>
        </div>

        {/* Price block - Prominent */}
        <motion.div 
          className="bg-black/40 backdrop-blur-sm border border-gold/30 p-4 mb-4 text-center relative overflow-hidden"
          whileHover={{ borderColor: 'rgba(201, 166, 107, 0.5)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent" />
          <div className="relative">
            <div className="text-4xl font-bold text-offwhite mb-1">
              ₪{price.toLocaleString()}
            </div>
            <p className="text-lightgrey/80 text-sm">
              {duration}
            </p>
            <p className="text-gold text-xs mt-1">
              אפשרות לתשלומים נוחים
            </p>
          </div>
        </motion.div>

        {/* Primary CTA - Prominent */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            href={`/contact?course=${encodeURIComponent(title)}`}
            variant="primary"
            fullWidth
            size="large"
            className="font-bold mb-3 shadow-lg hover:shadow-xl"
          >
            {nextStep} →
          </Button>
        </motion.div>

        {/* Quick contact */}
        <a 
          href={`https://wa.me/972528691415?text=היי! מעניין אותי ${title}`}
          className="flex items-center justify-center gap-2 text-green-400 hover:text-green-300 
                   text-sm py-2 mb-4 transition-colors"
        >
          <span className="text-lg">💬</span>
          <span>שאל אותנו בWhatsApp</span>
        </a>

        {/* Features - Compact */}
        <div className="flex-1">
          <div className="space-y-1.5">
            {features.slice(0, 3).map((feature, idx) => (
              <motion.div 
                key={idx} 
                className="flex items-start gap-2 text-xs"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * idx }}
              >
                <span className="text-green-400 mt-0.5">✓</span>
                <span className="text-lightgrey/80">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust & Urgency */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-gold/70">
              <span>⭐</span>
              <span>500+ בוגרים</span>
            </div>
            <div className="text-orange-400 font-medium animate-pulse">
              נותרו 7 מקומות
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.div>
  );
};

export default PathwayCard;