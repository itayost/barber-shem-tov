import React from 'react';
import { motion } from 'framer-motion';

interface EditorialCardProps {
  image: string;
  title: string;
  subtitle?: string;
  description?: string;
  label?: string;
  isPortrait?: boolean;
  aspectRatio?: '1/1' | '3/4' | '4/5' | '16/9' | '4/3';
  className?: string;
  onClick?: () => void;
  href?: string;
  animate?: boolean;
  index?: number;
  showBorder?: boolean;
  hoverEffect?: 'zoom' | 'lift' | 'reveal' | 'none';
}

const EditorialCard: React.FC<EditorialCardProps> = ({
  image,
  title,
  subtitle,
  description,
  label,
  isPortrait = false,
  aspectRatio = '3/4',
  className = '',
  onClick,
  href,
  animate = true,
  index = 0,
  showBorder = true,
  hoverEffect = 'zoom',
}) => {
  const aspectRatioClasses = {
    '1/1': 'aspect-square',
    '3/4': 'aspect-[3/4]',
    '4/5': 'aspect-[4/5]',
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
  };

  const hoverEffects = {
    zoom: 'group-hover:scale-105',
    lift: 'group-hover:-translate-y-2',
    reveal: 'group-hover:scale-95',
    none: '',
  };

  const animationProps = animate
    ? {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-100px' },
        transition: {
          duration: 0.8,
          delay: index * 0.1,
          ease: [0.25, 0.1, 0.25, 1],
        },
      }
    : {};

  const cardContent = (
    <>
      {/* Image Container */}
      <div className={`relative ${aspectRatioClasses[aspectRatio]} overflow-hidden mb-6`}>
        <img
          src={image}
          alt={title}
          className={`
            object-cover w-full h-full transition-all duration-700
            ${isPortrait ? 'grayscale hover:grayscale-0' : ''}
            ${hoverEffects[hoverEffect]}
          `}
          loading="lazy"
        />

        {/* Border Overlay */}
        {showBorder && (
          <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/20 transition-all duration-500 pointer-events-none" />
        )}

        {/* Gradient Overlay (optional) */}
        {hoverEffect === 'reveal' && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        )}

        {/* Label Badge */}
        {label && (
          <div className="absolute top-4 start-4 bg-black/80 backdrop-blur-sm px-4 py-2">
            <span className="text-xs uppercase tracking-[0.3em] text-gold">{label}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-3">
        {subtitle && <p className="text-xs uppercase tracking-[0.3em] text-gold">{subtitle}</p>}

        <h3 className="text-2xl md:text-3xl font-light text-offwhite leading-tight">{title}</h3>

        {description && (
          <p className="text-lightgrey font-light text-base md:text-lg leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </>
  );

  const cardClasses = `group cursor-pointer ${className}`;

  // If onClick or href is provided, make it interactive
  if (onClick) {
    return (
      <motion.div className={cardClasses} onClick={onClick} {...animationProps}>
        {cardContent}
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.a href={href} className={`${cardClasses} block`} {...animationProps}>
        {cardContent}
      </motion.a>
    );
  }

  // Otherwise, just render the card
  return (
    <motion.div className={className} {...animationProps}>
      {cardContent}
    </motion.div>
  );
};

// Demo component to showcase the card variations
const EditorialCardDemo = () => {
  const demoCards = [
    {
      image: '/images/service1.jpg',
      title: 'תספורת יוקרה',
      subtitle: 'שירות מובחר',
      description: 'חוויה מותאמת אישית עם תשומת לב לכל פרט',
      label: 'חדש',
    },
    {
      image: '/images/founder.jpg',
      title: 'שם טוב',
      subtitle: 'מייסד ומנכ"ל',
      description: 'אמן ספרות עם ניסיון של 15 שנה',
      isPortrait: true,
    },
    {
      image: '/images/gallery1.jpg',
      title: 'סגנון עכשווי',
      aspectRatio: '4/5' as const,
    },
  ];

  return (
    <div className="bg-black py-16" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h3 className="text-3xl text-offwhite font-thin mb-12 text-center">כרטיסי עריכה</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {demoCards.map((card, index) => (
            <EditorialCard key={index} {...card} index={index} href="#" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditorialCard;
