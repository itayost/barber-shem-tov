import React from 'react';
import { motion } from 'framer-motion';

// Luxury Heading Component
interface LuxuryHeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
  accent?: string | React.ReactNode;
  className?: string;
  animate?: boolean;
  animationDelay?: number;
  align?: 'start' | 'center' | 'end';
}

export const LuxuryHeading: React.FC<LuxuryHeadingProps> = ({
  as: Tag = 'h2',
  size = 'h2',
  children,
  accent,
  className = '',
  animate = true,
  animationDelay = 0,
  align = 'start',
}) => {
  const sizeClasses = {
    display: 'text-5xl md:text-7xl lg:text-8xl xl:text-[10rem]',
    h1: 'text-4xl md:text-6xl lg:text-7xl xl:text-8xl',
    h2: 'text-3xl md:text-5xl lg:text-6xl',
    h3: 'text-2xl md:text-4xl lg:text-5xl',
    h4: 'text-xl md:text-3xl lg:text-4xl',
    h5: 'text-lg md:text-2xl lg:text-3xl',
    h6: 'text-base md:text-xl lg:text-2xl',
  };

  const alignClasses = {
    start: 'text-start',
    center: 'text-center',
    end: 'text-end',
  };

  const headingClasses = `
    font-thin
    tracking-luxury-tight
    text-offwhite
    leading-[1.1]
    ${sizeClasses[size]}
    ${alignClasses[align]}
    ${className}
  `;

  const content = (
    <>
      {children}
      {accent && <span className="text-gold"> {accent}</span>}
    </>
  );

  if (!animate) {
    return <Tag className={headingClasses}>{content}</Tag>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay: animationDelay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <Tag className={headingClasses}>{content}</Tag>
    </motion.div>
  );
};

// Luxury Label Component
interface LuxuryLabelProps {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md';
  color?: 'gold' | 'offwhite' | 'lightgrey';
  className?: string;
  animate?: boolean;
}

export const LuxuryLabel: React.FC<LuxuryLabelProps> = ({
  children,
  size = 'xs',
  color = 'gold',
  className = '',
  animate = true,
}) => {
  const sizeClasses = {
    xs: 'text-xs tracking-[0.3em] md:tracking-[0.5em]',
    sm: 'text-sm tracking-[0.3em] md:tracking-[0.4em]',
    md: 'text-base tracking-[0.2em] md:tracking-[0.3em]',
  };

  const colorClasses = {
    gold: 'text-gold',
    offwhite: 'text-offwhite',
    lightgrey: 'text-lightgrey',
  };

  const labelClasses = `
    uppercase
    font-light
    ${sizeClasses[size]}
    ${colorClasses[color]}
    ${className}
  `;

  if (!animate) {
    return <span className={labelClasses}>{children}</span>;
  }

  return (
    <motion.span
      className={labelClasses}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.span>
  );
};

// Luxury Paragraph Component
interface LuxuryParagraphProps {
  children: React.ReactNode;
  size?: 'sm' | 'base' | 'lg' | 'xl';
  color?: 'offwhite' | 'lightgrey' | 'darkgrey';
  className?: string;
  animate?: boolean;
  maxWidth?: 'none' | 'prose' | 'narrow' | 'wide';
}

export const LuxuryParagraph: React.FC<LuxuryParagraphProps> = ({
  children,
  size = 'base',
  color = 'lightgrey',
  className = '',
  animate = true,
  maxWidth = 'none',
}) => {
  const sizeClasses = {
    sm: 'text-sm md:text-base',
    base: 'text-base md:text-lg',
    lg: 'text-lg md:text-xl',
    xl: 'text-xl md:text-2xl',
  };

  const colorClasses = {
    offwhite: 'text-offwhite',
    lightgrey: 'text-lightgrey',
    darkgrey: 'text-darkgrey',
  };

  const maxWidthClasses = {
    none: '',
    narrow: 'max-w-2xl',
    prose: 'max-w-3xl',
    wide: 'max-w-4xl',
  };

  const paragraphClasses = `
    font-light
    leading-relaxed
    ${sizeClasses[size]}
    ${colorClasses[color]}
    ${maxWidthClasses[maxWidth]}
    ${className}
  `;

  if (!animate) {
    return <p className={paragraphClasses}>{children}</p>;
  }

  return (
    <motion.p
      className={paragraphClasses}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.p>
  );
};

// Vertical Text Component (for editorial effect)
interface VerticalTextProps {
  children: React.ReactNode;
  position?: 'left' | 'right';
  className?: string;
}

export const VerticalText: React.FC<VerticalTextProps> = ({
  children,
  position = 'left',
  className = '',
}) => {
  const positionClasses =
    position === 'left' ? 'start-0 origin-bottom-left' : 'end-0 origin-bottom-right';

  return (
    <div
      className={`
        absolute top-1/2 ${positionClasses}
        -translate-y-1/2 rotate-[-90deg]
        text-xs uppercase tracking-[0.5em]
        text-gold/50 whitespace-nowrap
        ${className}
      `}
    >
      {children}
    </div>
  );
};

// Typography Demo Component
const TypographyDemo = () => {
  return (
    <div className="bg-black py-16 space-y-16" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Headings */}
        <div className="mb-16">
          <LuxuryLabel>כותרות</LuxuryLabel>
          <div className="mt-8 space-y-6">
            <LuxuryHeading as="h1" size="display" accent="דיספליי">
              כותרת
            </LuxuryHeading>
            <LuxuryHeading as="h1" size="h1" accent="ראשית">
              כותרת
            </LuxuryHeading>
            <LuxuryHeading as="h2" size="h2" accent="משנית">
              כותרת
            </LuxuryHeading>
            <LuxuryHeading as="h3" size="h3">
              כותרת שלישית
            </LuxuryHeading>
          </div>
        </div>

        {/* Labels */}
        <div className="mb-16">
          <LuxuryHeading as="h3" size="h4">
            תוויות
          </LuxuryHeading>
          <div className="mt-8 space-y-4">
            <div>
              <LuxuryLabel size="xs">תווית קטנה מאוד</LuxuryLabel>
            </div>
            <div>
              <LuxuryLabel size="sm" color="offwhite">
                תווית קטנה
              </LuxuryLabel>
            </div>
            <div>
              <LuxuryLabel size="md" color="lightgrey">
                תווית בינונית
              </LuxuryLabel>
            </div>
          </div>
        </div>

        {/* Paragraphs */}
        <div className="mb-16">
          <LuxuryHeading as="h3" size="h4">
            פסקאות
          </LuxuryHeading>
          <div className="mt-8 space-y-6">
            <LuxuryParagraph size="sm">
              טקסט קטן: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </LuxuryParagraph>
            <LuxuryParagraph size="base">
              טקסט רגיל: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </LuxuryParagraph>
            <LuxuryParagraph size="lg" color="offwhite">
              טקסט גדול: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </LuxuryParagraph>
            <LuxuryParagraph size="xl" maxWidth="prose">
              טקסט גדול מאוד עם הגבלת רוחב: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </LuxuryParagraph>
          </div>
        </div>

        {/* Vertical Text Example */}
        <div className="relative h-64 border border-gold/20">
          <VerticalText position="left">LUXURY EDITION</VerticalText>
          <VerticalText position="right">EST. 2024</VerticalText>
          <div className="flex items-center justify-center h-full">
            <LuxuryHeading as="h3" size="h3" align="center">
              טקסט אנכי לאפקט עריכה
            </LuxuryHeading>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypographyDemo;
