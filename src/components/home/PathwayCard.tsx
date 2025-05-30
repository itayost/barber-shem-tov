import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/common/Button';

interface Pathway {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  price: number;
  description: string;
  features: string[];
  icon: string;
  popular?: boolean;
  nextStep: string;
  instructor?: string;
  nextSession?: string;
  prerequisites?: string;
  certification?: string;
}

interface PathwayCardProps {
  pathway: Pathway;
}

const PathwayCard: React.FC<PathwayCardProps> = ({ pathway }) => {
  const {
    title,
    subtitle,
    duration,
    price,
    description,
    features,
    icon,
    popular,
    nextStep,
    nextSession,
    prerequisites,
    certification
  } = pathway;

  return (
    <motion.div 
      className="relative bg-charcoal border border-lightgrey/10 p-4 sm:p-6 h-full flex flex-col group hover:border-gold/30 transition-all duration-300"
      whileHover={{ 
        y: -5,
        boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)"
      }}
    >
      {/* Popular badge - Now properly inside the card */}
      {popular && (
        <div className="absolute top-2 right-2 bg-gold text-charcoal px-3 py-1 text-xs font-bold z-10 shadow-md">
          פופולרי
        </div>
      )}

      {/* Icon and title - Compact header */}
      <div className="text-center mb-4">
        <div className="text-4xl sm:text-5xl mb-2">
          {icon}
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-offwhite mb-1 group-hover:text-gold transition-colors">
          {title}
        </h3>
        <p className="text-gold text-sm font-medium">
          {subtitle}
        </p>
      </div>

      {/* Price box - Mobile optimized */}
      <div className="bg-gold/10 border border-gold/20 p-3 sm:p-4 mb-4 text-center">
        <div className="text-2xl sm:text-3xl font-bold text-gold">
          ₪{price.toLocaleString()}
        </div>
        <div className="text-lightgrey text-xs sm:text-sm">
          {duration} | תשלומים
        </div>
        {nextSession && (
          <div className="text-orange-400 text-xs mt-1">
            מתחיל {nextSession}
          </div>
        )}
      </div>

      {/* Description - Shorter on mobile */}
      <p className="text-lightgrey text-sm sm:text-base mb-4 leading-relaxed line-clamp-3 flex-1">
        {description}
      </p>

      {/* Key info - Compact display */}
      <div className="bg-charcoal-light/50 p-3 mb-4 text-xs sm:text-sm space-y-1">
        {prerequisites && (
          <div className="flex items-center gap-2">
            <span className="text-gold"></span>
            <span className="text-lightgrey">{prerequisites}</span>
          </div>
        )}
        {certification && (
          <div className="flex items-center gap-2">
            <span className="text-gold"></span>
            <span className="text-lightgrey truncate">{certification}</span>
          </div>
        )}
      </div>

      {/* Top 3 features only */}
      <div className="space-y-1 mb-4">
        {features.filter(Boolean).slice(0, 3).map((feature, idx) => (
          <div key={idx} className="flex items-start gap-2 text-xs">
            <span className="text-gold mt-0.5">✓</span>
            <span className="text-lightgrey line-clamp-1">{feature}</span>
          </div>
        ))}
      </div>

      {/* CTA section - Mobile optimized */}
      <div className="space-y-3 mt-auto">
        <Button 
          href={`/contact?course=${encodeURIComponent(title)}`}
          variant="primary"
          fullWidth
          size="medium"
          className="font-bold"
        >
          {nextStep} ←
        </Button>
        
        <div className="flex gap-2">
          <Button
            href={`https://wa.me/972528691415?text=היי! אשמח לקבל פרטים על ${title}`}
            variant="tertiary"
            className="flex-1 text-xs sm:text-sm text-center"
          >
            WhatsApp
          </Button>
          
          <Button
            href="/courses"
            variant="tertiary"
            className="flex-1 text-xs sm:text-sm text-center"
          >
            פרטים נוספים
          </Button>
        </div>
      </div>

      {/* Urgency indicator - Small and subtle */}
      <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
        נותרו מקומות!
      </div>
    </motion.div>
  );
};

export default PathwayCard;