// This file serves as a central export point for all styles
// It makes it easier to import multiple style files at once

// Import all style files
import './variables.css';
import './animations.css';
import './components.css';
import './utilities.css';

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
  sans: 'var(--font-montserrat)',
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

// Helper function to get CSS variables in JS if needed
export const getCssVariable = (name: string): string => {
  if (typeof window !== 'undefined') {
    return getComputedStyle(document.documentElement).getPropertyValue(name);
  }
  return '';
};