import React from 'react';
import { motion } from 'framer-motion';

interface LuxurySectionProps {
  label?: string;
  title: string | React.ReactNode;
  accent?: string;
  subtitle?: string;
  size?: 'small' | 'default' | 'large' | 'hero';
  bgColor?: 'black' | 'charcoal' | 'charcoal-dark' | 'charcoal-light';
  textAlign?: 'center' | 'start' | 'end';
  children?: React.ReactNode;
  className?: string;
  containerWidth?: 'default' | 'narrow' | 'wide' | 'full';
  animate?: boolean;
}

const LuxurySection: React.FC<LuxurySectionProps> = ({
  label,
  title,
  accent,
  subtitle,
  size = 'default',
  bgColor = 'black',
  textAlign = 'center',
  children,
  className = '',
  containerWidth = 'default',
  animate = true,
}) => {
  const paddingSizes = {
    small: 'py-16 md:py-20',
    default: 'py-20 md:py-24',
    large: 'py-24 md:py-32',
    hero: 'py-32 md:py-40',
  };

  const bgColors = {
    black: 'bg-black',
    charcoal: 'bg-charcoal',
    'charcoal-dark': 'bg-charcoal-dark',
    'charcoal-light': 'bg-charcoal-light',
  };

  const containerWidths = {
    narrow: 'max-w-4xl',
    default: 'max-w-7xl',
    wide: 'max-w-[1400px]',
    full: 'max-w-full',
  };

  const textAlignments = {
    center: 'text-center',
    start: 'text-start',
    end: 'text-end',
  };

  return (
    <section className={`${paddingSizes[size]} ${bgColors[bgColor]} ${className}`} dir="rtl">
      <div className={`${containerWidths[containerWidth]} mx-auto px-6 md:px-12`}>
        <motion.div
          className={textAlignments[textAlign]}
          initial={animate ? { opacity: 0, y: 20 } : undefined}
          whileInView={animate ? { opacity: 1, y: 0 } : undefined}
          viewport={animate ? { once: true } : undefined}
          transition={animate ? { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } : undefined}
        >
          {label && (
            <p className="text-xs tracking-[0.3em] md:tracking-[0.5em] text-gold mb-4 md:mb-6 uppercase">
              {label}
            </p>
          )}

          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-thin text-offwhite leading-tight">
            {typeof title === 'string' ? (
              <>
                {title}
                {accent && <span className="text-gold"> {accent}</span>}
              </>
            ) : (
              title
            )}
          </h2>

          {subtitle && (
            <p className="text-lg md:text-xl lg:text-2xl text-lightgrey mt-4 md:mt-6 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}

          {children && (
            <motion.div
              className="mt-8 md:mt-12"
              initial={animate ? { opacity: 0, y: 20 } : undefined}
              whileInView={animate ? { opacity: 1, y: 0 } : undefined}
              viewport={animate ? { once: true } : undefined}
              transition={
                animate ? { duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] } : undefined
              }
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default LuxurySection;
