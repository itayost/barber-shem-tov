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
  // Use predefined button classes from components.css
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = size !== 'medium' ? `btn-${size === 'small' ? 'sm' : 'lg'}` : '';
  const fullWidthClass = fullWidth ? 'btn-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';
  
  // Combine all classes
  const buttonClasses = `${baseClass} ${variantClass} ${sizeClass} ${fullWidthClass} ${disabledClass} ${className}`.trim();
  
  // Content wrapper for proper z-index layering
  const content = (
    <span className="relative z-20 flex items-center justify-center">
      {children}
    </span>
  );
  
  // Render as link if href is provided
  if (href && !disabled) {
    return (
      <Link href={href} className={buttonClasses} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }
  
  // Otherwise render as button
  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={buttonClasses}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
};

export default Button;