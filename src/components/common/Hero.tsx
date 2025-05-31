// components/common/Hero.tsx
'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/common/Button';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface CTAButton {
  text: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
}

interface HeroProps {
  // Content
  title: string;
  subtitle?: string;
  description?: string;
  
  // Styling
  variant?: 'default' | 'tall' | 'medium' | 'compact';
  backgroundImage?: string;
  backgroundColor?: string;
  overlay?: 'light' | 'medium' | 'dark' | 'none';
  textAlign?: 'center' | 'right' | 'left';
  
  // Navigation
  breadcrumbs?: Breadcrumb[];
  
  // Actions
  primaryCTA?: CTAButton;
  secondaryCTA?: CTAButton;
  
  // Custom content
  children?: ReactNode;
  
  // Animation
  animated?: boolean;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  variant = 'default',
  backgroundImage,
  backgroundColor = 'bg-charcoal',
  overlay = 'medium',
  textAlign = 'center',
  breadcrumbs,
  primaryCTA,
  secondaryCTA,
  children,
  animated = true
}) => {
  // Height variants
  const heightClasses = {
    compact: 'min-h-[40vh] py-16',
    medium: 'min-h-[50vh] py-20',
    default: 'min-h-[60vh] py-24',
    tall: 'min-h-[80vh] py-32'
  };

  // Overlay variants
  const overlayClasses = {
    none: '',
    light: 'bg-black/30',
    medium: 'bg-black/50',
    dark: 'bg-black/70'
  };

  // Text alignment
  const alignmentClasses = {
    center: 'text-center items-center',
    right: 'text-right items-end',
    left: 'text-left items-start'
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section 
      className={`relative ${heightClasses[variant]} ${backgroundColor} flex items-center justify-center overflow-hidden`}
      dir="rtl"
    >
      {/* Background Image */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      
      {/* Overlay */}
      {overlay !== 'none' && (
        <div className={`absolute inset-0 ${overlayClasses[overlay]}`} />
      )}

      {/* Content Container */}
      <div className="container mx-auto px-6 relative z-10 w-full">
        <motion.div 
          className={`flex flex-col ${alignmentClasses[textAlign]} max-w-4xl mx-auto`}
          variants={animated ? containerVariants : undefined}
          initial={animated ? "hidden" : undefined}
          animate={animated ? "visible" : undefined}
        >
          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <motion.nav 
              variants={animated ? itemVariants : undefined}
              className="mb-6"
            >
              <ol className="flex items-center gap-2 text-sm text-lightgrey">
                {breadcrumbs.map((crumb, index) => (
                  <li key={index} className="flex items-center">
                    {crumb.href ? (
                      <a 
                        href={crumb.href}
                        className="hover:text-gold transition-colors"
                      >
                        {crumb.label}
                      </a>
                    ) : (
                      <span className="text-gold">{crumb.label}</span>
                    )}
                    {index < breadcrumbs.length - 1 && (
                      <span className="mx-2 text-lightgrey/60">/</span>
                    )}
                  </li>
                ))}
              </ol>
            </motion.nav>
          )}

          {/* Subtitle */}
          {subtitle && (
            <motion.div 
              variants={animated ? itemVariants : undefined}
              className="mb-4"
            >
              <span className="inline-block bg-gold/10 text-gold px-4 py-2 text-sm font-medium border border-gold/30">
                {subtitle}
              </span>
            </motion.div>
          )}

          {/* Main Title */}
          <motion.h1 
            variants={animated ? itemVariants : undefined}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-offwhite mb-6 leading-tight"
          >
            {title}
          </motion.h1>

          {/* Description */}
          {description && (
            <motion.p 
              variants={animated ? itemVariants : undefined}
              className="text-lightgrey text-lg md:text-xl mb-8 max-w-2xl leading-relaxed"
            >
              {description}
            </motion.p>
          )}

          {/* CTA Buttons */}
          {(primaryCTA || secondaryCTA) && (
            <motion.div 
              variants={animated ? itemVariants : undefined}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              {primaryCTA && (
                <Button
                  href={primaryCTA.href}
                  variant={primaryCTA.variant || 'primary'}
                  size="large"
                  className="font-bold"
                >
                  {primaryCTA.text}
                </Button>
              )}
              
              {secondaryCTA && (
                <Button
                  href={secondaryCTA.href}
                  variant={secondaryCTA.variant || 'tertiary'}
                  size="large"
                  className="font-bold"
                >
                  {secondaryCTA.text}
                </Button>
              )}
            </motion.div>
          )}

          {/* Custom Children Content */}
          {children && (
            <motion.div 
              variants={animated ? itemVariants : undefined}
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;