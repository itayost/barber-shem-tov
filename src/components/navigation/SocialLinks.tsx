// src/components/navigation/SocialLinks.tsx - Using Icon System
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { InstagramIcon, FacebookIcon, TikTokIcon } from '@/components/icons';
// Or: import { Icons } from '@/components/icons';

interface SocialLinksProps {
  social: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
  variant?: 'default' | 'circle' | 'minimal';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  showLabels?: boolean;
  color?: 'gold' | 'white' | 'branded';
}

const SocialLinks: React.FC<SocialLinksProps> = ({ 
  social, 
  variant = 'default',
  size = 'medium',
  className = '',
  showLabels = false,
  color = 'gold'
}) => {
  // Size configurations
  const sizeConfig = {
    small: { iconSize: 16, padding: 'p-2', gap: 'gap-3', labelSize: 'text-xs' },
    medium: { iconSize: 20, padding: 'p-2.5', gap: 'gap-4', labelSize: 'text-sm' },
    large: { iconSize: 24, padding: 'p-3', gap: 'gap-5', labelSize: 'text-base' }
  };

  // Color configurations
  const colorConfig = {
    gold: {
      base: 'text-gold',
      hover: 'hover:text-gold/80',
      bgHover: 'hover:bg-gold/10',
      border: 'border-gold/20 hover:border-gold/40'
    },
    white: {
      base: 'text-offwhite',
      hover: 'hover:text-gold',
      bgHover: 'hover:bg-offwhite/10',
      border: 'border-offwhite/20 hover:border-offwhite/40'
    },
    branded: {
      base: 'text-lightgrey',
      hover: 'platform-specific', // Will be handled per platform
      bgHover: 'platform-specific',
      border: 'border-lightgrey/20'
    }
  };

  // Social platforms configuration with icon components
  const platforms = [
    {
      name: 'Instagram',
      key: 'instagram',
      href: social.instagram,
      Icon: InstagramIcon,
      ariaLabel: 'אינסטגרם',
      brandColors: {
        hover: 'hover:text-pink-500',
        bgHover: 'hover:bg-gradient-to-br hover:from-purple-600/10 hover:to-pink-500/10',
        borderHover: 'hover:border-pink-500/40'
      }
    },
    {
      name: 'Facebook',
      key: 'facebook', 
      href: social.facebook,
      Icon: FacebookIcon,
      ariaLabel: 'פייסבוק',
      brandColors: {
        hover: 'hover:text-blue-600',
        bgHover: 'hover:bg-blue-600/10',
        borderHover: 'hover:border-blue-600/40'
      }
    },
    {
      name: 'TikTok',
      key: 'tiktok',
      href: social.tiktok,
      Icon: TikTokIcon,
      ariaLabel: 'טיקטוק',
      brandColors: {
        hover: 'hover:text-purple-500',
        bgHover: 'hover:bg-purple-500/10',
        borderHover: 'hover:border-purple-500/40'
      }
    }
  ];

  const { iconSize, padding, gap, labelSize } = sizeConfig[size];
  const colors = colorConfig[color];

  // Get appropriate styles based on variant and color
  const getVariantStyles = (platform: typeof platforms[0]) => {
    const baseStyles = `${padding} transition-all duration-200 ease-out`;
    
    if (color === 'branded') {
      // Use platform-specific colors
      switch (variant) {
        case 'circle':
          return `${baseStyles} rounded-full border ${platform.brandColors.bgHover} ${platform.brandColors.borderHover}`;
        case 'minimal':
          return `${baseStyles} ${platform.brandColors.hover}`;
        default:
          return `${baseStyles} rounded-lg ${platform.brandColors.bgHover}`;
      }
    } else {
      // Use unified color scheme
      switch (variant) {
        case 'circle':
          return `${baseStyles} rounded-full border ${colors.border} ${colors.bgHover}`;
        case 'minimal':
          return `${baseStyles}`;
        default:
          return `${baseStyles} rounded-lg ${colors.bgHover}`;
      }
    }
  };

  // Get text color classes
  const getColorClasses = (platform: typeof platforms[0]) => {
    if (color === 'branded') {
      return `text-lightgrey ${platform.brandColors.hover}`;
    }
    return `${colors.base} ${colors.hover}`;
  };

  return (
    <div className={`flex items-center ${gap} ${className}`}>
      {platforms.map((platform) => {
        if (!platform.href) return null;

        const { Icon } = platform;

        return (
          <motion.a
            key={platform.key}
            href={platform.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              social-link 
              ${getColorClasses(platform)}
              ${getVariantStyles(platform)}
              ${showLabels ? 'flex items-center gap-2' : 'block'}
              focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 focus:ring-offset-charcoal
            `}
            aria-label={platform.ariaLabel}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon size={iconSize} />
            {showLabels && (
              <span className={`font-medium ${labelSize}`}>
                {platform.name}
              </span>
            )}
          </motion.a>
        );
      })}
    </div>
  );
};

// Pre-configured variants for common use cases
export const SocialLinksCircle: React.FC<Omit<SocialLinksProps, 'variant'>> = (props) => (
  <SocialLinks {...props} variant="circle" />
);

export const SocialLinksMinimal: React.FC<Omit<SocialLinksProps, 'variant'>> = (props) => (
  <SocialLinks {...props} variant="minimal" />
);

export const SocialLinksBranded: React.FC<Omit<SocialLinksProps, 'color'>> = (props) => (
  <SocialLinks {...props} color="branded" />
);

export default SocialLinks;