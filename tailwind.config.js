/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Your existing colors
        charcoal: {
          DEFAULT: '#1A1A1A',
          light: '#2A2A2A',
          dark: '#111111',
        },
        brown: '#704214',
        gold: {
          DEFAULT: '#C9A66B',
          light: '#D9BC8C',
          dark: '#A6845C',
        },
        offwhite: '#F5F5F5',
        lightgrey: '#E0E0E0',
        burgundy: '#5C0511',
      },
      fontFamily: {
        heebo: ['var(--font-heebo)', 'sans-serif'],
      },
      // Mobile-first spacing scale
      spacing: {
        safe: 'env(safe-area-inset-bottom)',
        'safe-top': 'env(safe-area-inset-top)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      // Touch target sizes
      minHeight: {
        touch: '44px',
        'touch-comfortable': '48px',
        'touch-large': '56px',
      },
      minWidth: {
        touch: '44px',
        'touch-comfortable': '48px',
        'touch-large': '56px',
      },
      // Luxury border radius
      borderRadius: {
        luxury: '0px', // No radius for luxury
        subtle: '2px',
        soft: '4px',
      },
      // Z-index scale
      zIndex: {
        dropdown: '10',
        sticky: '20',
        overlay: '30',
        modal: '40',
        popover: '50',
        tooltip: '60',
        navigation: '100',
        menu: '101',
      },
      // Animation durations
      transitionDuration: {
        fast: '200ms',
        normal: '300ms',
        slow: '500ms',
        luxury: '700ms',
      },
      // Luxury shadows
      boxShadow: {
        gold: '0 5px 15px rgba(201, 166, 107, 0.2)',
        'gold-lg': '0 10px 30px rgba(201, 166, 107, 0.3)',
        luxury: '0 20px 40px rgba(0, 0, 0, 0.5)',
      },
      // Typography
      letterSpacing: {
        luxury: '0.3em',
        'luxury-wide': '0.5em',
      },
      // Animations
      animation: {
        glow: 'glow 3s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.6' },
        },
        pulseGold: {
          '0%, 100%': {
            opacity: '0.6',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0',
            transform: 'scale(1.2)',
          },
        },
      },
    },
  },
  plugins: [
    // Custom plugin for mobile-first utilities
    function ({ addUtilities, theme }) {
      const newUtilities = {
        // Safe area utilities
        '.p-safe': {
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)',
          paddingLeft: 'env(safe-area-inset-left)',
          paddingRight: 'env(safe-area-inset-right)',
        },
        '.pb-safe': {
          paddingBottom: 'env(safe-area-inset-bottom)',
        },
        '.pt-safe': {
          paddingTop: 'env(safe-area-inset-top)',
        },
        // Touch manipulation
        '.touch-manipulation': {
          touchAction: 'manipulation',
          WebkitTapHighlightColor: 'transparent',
        },
        // GPU acceleration
        '.gpu-accelerated': {
          transform: 'translateZ(0)',
          willChange: 'transform',
        },
        // No scrollbar
        '.no-scrollbar': {
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        // Luxury text shadow
        '.text-shadow-luxury': {
          textShadow: '0 2px 10px rgba(201, 166, 107, 0.2)',
        },
        // Hebrew specific
        '.hebrew-nums': {
          fontFeatureSettings: '"numr"',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
