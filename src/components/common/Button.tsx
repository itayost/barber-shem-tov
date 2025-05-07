import Link from 'next/link';
import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
};

const Button = ({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
}: ButtonProps) => {
  // Style variants based on the design system
  const variantStyles = {
    primary: 'bg-gold text-charcoal hover:bg-opacity-90',
    secondary: 'bg-transparent text-gold border border-gold hover:bg-gold hover:bg-opacity-10',
    tertiary: 'bg-transparent text-gold hover:underline',
  };

  // Base styles for all button variants
  const baseStyles = 'inline-block font-medium transition-all duration-200 text-center';
  
  // Size/padding styles
  const paddingStyles = variant === 'tertiary' ? 'py-2 px-0' : 'py-3 px-6';

  // Combined styles
  const styles = `${baseStyles} ${paddingStyles} ${variantStyles[variant]} ${className}`;

  // Render as link if href is provided
  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={styles}
    >
      {children}
    </button>
  );
};

export default Button;