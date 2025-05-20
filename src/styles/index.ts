// File: src/styles/index.ts

// Import all style files including the new menu.css
import './variables.css';
import './animations.css';
import './components.css';
import './utilities.css';
import './menu.css'; // Add this new import

// Export constants for theme values if needed in JS/TS
export const themeColors = {
  charcoal: '#1A1A1A',
  brown: '#704214',
  gold: '#C9A66B',
  offwhite: '#F5F5F5',
  lightgrey: '#E0E0E0',
  burgundy: '#5C0511',
};

export const fontFamilies = {
  serif: 'var(--font-playfair)',
  sans: 'var(--font-heebo)', // Update to match the Hebrew font
};

export const breakpoints = {
  mobile: '768px',
  tablet: '1024px',
  desktop: '1280px',
};

// Animation duration constants
export const transitions = {
  fast: '0.2s',
  normal: '0.3s',
  slow: '0.5s',
};

// Animation presets for the menu components
export const menuAnimationPresets = {
  // Container animation (parent element)
  containerVariants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    }
  },
  
  // Item animation (child elements)
  itemVariants: {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  },
  
  // Fade in animation
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  },
  
  // Slide up animation
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  },
  
  // Scale animation for logo
  scaleLogo: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { delay: 0.1 }
  },
  
  // Rotate animation for close button
  rotateButton: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    whileHover: { rotate: 90, scale: 1.1 },
    whileTap: { scale: 0.95 },
    transition: { duration: 0.2 }
  }
};

// Helper function to get CSS variables in JS if needed
export const getCssVariable = (name: string): string => {
  if (typeof window !== 'undefined') {
    return getComputedStyle(document.documentElement).getPropertyValue(name);
  }
  return '';
};