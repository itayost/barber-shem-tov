import Link from 'next/link';
import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
};

const Button = ({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  ariaLabel,
}: ButtonProps) => {
  // Enhanced style variants with luxury aesthetics
  const variantStyles = {
    primary: `bg-gold text-charcoal shadow-md hover:shadow-lg hover:bg-opacity-95 
              active:bg-opacity-100 active:shadow-inner border border-transparent`,
    
    secondary: `bg-transparent text-gold border border-gold/80 hover:border-gold 
               hover:bg-gold hover:bg-opacity-5 active:bg-opacity-10 shadow-sm 
               hover:shadow-md backdrop-blur-sm`,
    
    tertiary: `bg-transparent text-gold hover:text-gold/90 active:text-gold 
              relative overflow-hidden after:absolute after:bottom-0 after:right-0 
              after:w-0 after:h-0.5 after:bg-gold/70 after:transition-all after:duration-300 
              hover:after:w-full`
  };
  
  // Base styles for all button variants with enhanced transitions
  const baseStyles = `inline-block font-medium transition-all duration-300 text-center
                     focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-opacity-50`;
  
  // Enhanced sizing options
  const sizeStyles = {
    small: variant === 'tertiary' ? 'py-1 px-0 text-sm' : 'py-2 px-4 text-sm',
    medium: variant === 'tertiary' ? 'py-2 px-0' : 'py-3 px-6',
    large: variant === 'tertiary' ? 'py-3 px-0 text-lg' : 'py-4 px-8 text-lg'
  };
  
  // Width styling
  const widthStyle = fullWidth ? 'w-full' : '';
  
  // Disabled styling
  const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';
  
  // Combined styles with proper ordering for CSS specificity
  const styles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${disabledStyle} ${className}`;
  
  // Render as link if href is provided
  if (href && !disabled) {
    return (
      <Link href={href} className={styles} aria-label={ariaLabel}>
        <span className="relative z-10 flex items-center justify-center">
          {children}
        </span>
      </Link>
    );
  }
  
  // Otherwise render as button
  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={styles}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
    </button>
  );
};

export default Button;