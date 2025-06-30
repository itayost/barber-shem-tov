import React from 'react';
import { motion } from 'framer-motion';

interface LuxuryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'small' | 'default' | 'large';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
  href?: string;
  target?: string;
  rel?: string;
}

const LuxuryButton: React.FC<LuxuryButtonProps> = ({
  variant = 'primary',
  size = 'default',
  fullWidth = false,
  loading = false,
  icon,
  iconPosition = 'end',
  children,
  className = '',
  disabled,
  href,
  target,
  rel,
  ...props
}) => {
  const baseClasses =
    'group relative overflow-hidden font-light uppercase tracking-[0.2em] transition-all duration-500 inline-flex items-center justify-center gap-3';

  const variants = {
    primary: 'bg-gold text-black hover:bg-gold-light',
    secondary: 'bg-charcoal border border-gold/30 text-offwhite hover:border-gold',
    ghost: 'bg-transparent text-offwhite hover:text-gold',
    outline: 'bg-transparent border border-gold/50 text-gold hover:bg-gold hover:text-black',
  };

  const sizes = {
    small: 'px-6 md:px-8 py-3 text-xs',
    default: 'px-8 md:px-12 py-4 md:py-5 text-xs md:text-sm',
    large: 'px-12 md:px-16 py-5 md:py-6 text-sm md:text-base',
  };

  const disabledClasses = disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  const widthClasses = fullWidth ? 'w-full' : '';

  const buttonContent = (
    <>
      {/* Background animation for primary variant */}
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-offwhite transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
      )}

      {/* Loading spinner */}
      {loading && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-inherit"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </motion.div>
      )}

      {/* Button content */}
      <span className={`relative z-10 flex items-center gap-3 ${loading ? 'invisible' : ''}`}>
        {icon && iconPosition === 'start' && (
          <span className="transition-transform duration-300 group-hover:-translate-x-1">
            {icon}
          </span>
        )}
        {children}
        {icon && iconPosition === 'end' && (
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            {icon}
          </span>
        )}
      </span>
    </>
  );

  const combinedClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${widthClasses} ${className}`;

  // If href is provided, render as a link
  if (href && !disabled && !loading) {
    return (
      <a href={href} target={target} rel={rel} className={combinedClasses}>
        {buttonContent}
      </a>
    );
  }

  // Otherwise, render as a button
  return (
    <button className={combinedClasses} disabled={disabled || loading} {...props}>
      {buttonContent}
    </button>
  );
};

// Example usage component to demonstrate the button
const LuxuryButtonDemo = () => {
  return (
    <div className="bg-black p-12 space-y-8" dir="rtl">
      <div className="space-y-4">
        <h3 className="text-2xl text-offwhite font-thin mb-6">כפתורי יוקרה</h3>

        {/* Primary Variants */}
        <div className="flex flex-wrap gap-4">
          <LuxuryButton variant="primary" size="small">
            כפתור קטן
          </LuxuryButton>
          <LuxuryButton variant="primary">כפתור רגיל</LuxuryButton>
          <LuxuryButton variant="primary" size="large">
            כפתור גדול
          </LuxuryButton>
        </div>

        {/* Secondary Variants */}
        <div className="flex flex-wrap gap-4">
          <LuxuryButton variant="secondary">משני</LuxuryButton>
          <LuxuryButton variant="ghost">רוח</LuxuryButton>
          <LuxuryButton variant="outline">מתאר</LuxuryButton>
        </div>

        {/* With Icons */}
        <div className="flex flex-wrap gap-4">
          <LuxuryButton variant="primary" icon={<span>←</span>}>
            עם אייקון
          </LuxuryButton>
          <LuxuryButton variant="secondary" icon={<span>→</span>} iconPosition="start">
            אייקון בהתחלה
          </LuxuryButton>
        </div>

        {/* States */}
        <div className="flex flex-wrap gap-4">
          <LuxuryButton loading>טוען...</LuxuryButton>
          <LuxuryButton disabled>לא פעיל</LuxuryButton>
        </div>

        {/* Full Width */}
        <LuxuryButton variant="primary" fullWidth>
          כפתור ברוחב מלא
        </LuxuryButton>
      </div>
    </div>
  );
};

export default LuxuryButton;
