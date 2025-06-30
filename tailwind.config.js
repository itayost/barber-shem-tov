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
        // Luxury Color Palette - Enhanced with 2025 trends
        black: '#000000',
        charcoal: {
          DEFAULT: '#1A1A1A',
          light: '#2A2A2A',
          dark: '#111111',
        },
        gold: {
          DEFAULT: '#C9A66B',
          light: '#D9BC8C',
          dark: '#A6845C',
          shimmer: '#E5D4A1', // Added for hover effects
          muted: '#B8956A', // Added for subtle accents
        },
        offwhite: '#F5F5F5',
        lightgrey: '#E0E0E0',
        darkgrey: '#A0A0A0',
        // Additional luxury neutrals for 2025
        pearl: '#FAF7F5',
        ash: '#4A4A4A',
        smoke: '#757575',
        // Accent colors for special elements
        emerald: {
          dark: '#1B5E3F',
          DEFAULT: '#50C878',
          light: '#7DD8A3',
        },
        mocha: {
          DEFAULT: '#6F4E37', // Pantone 2025 inspired
          light: '#8B6B47',
          dark: '#5A3E2B',
        },
      },
      fontFamily: {
        heebo: ['var(--font-heebo)', 'sans-serif'],
        // Add variable font support for 2025
        display: ['var(--font-display)', 'var(--font-heebo)', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      fontSize: {
        // Enhanced Typography Scale with fluid sizing
        micro: ['0.625rem', { lineHeight: '1.4', letterSpacing: '0.1em' }], // 10px
        caption: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.08em' }], // 12px
        // Display sizes with variable line heights
        'display-sm': ['clamp(2rem, 5vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        display: ['clamp(2.5rem, 6vw, 3rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(3rem, 7vw, 3.5rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(3.5rem, 8vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-xl': ['clamp(4rem, 10vw, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'display-2xl': ['clamp(5rem, 12vw, 6rem)', { lineHeight: '1', letterSpacing: '-0.03em' }],
        'display-3xl': ['clamp(6rem, 15vw, 8rem)', { lineHeight: '0.9', letterSpacing: '-0.04em' }],
        'display-massive': [
          'clamp(8rem, 20vw, 12rem)',
          { lineHeight: '0.85', letterSpacing: '-0.05em' },
        ],
      },
      spacing: {
        // Enhanced spacing scale
        18: '4.5rem',
        22: '5.5rem',
        26: '6.5rem',
        30: '7.5rem',
        34: '8.5rem',
        38: '9.5rem',
        42: '10.5rem',
        // Fractional spacing for precision
        4.5: '1.125rem',
        5.5: '1.375rem',
        6.5: '1.625rem',
        7.5: '1.875rem',
        // Viewport-based spacing
        'screen-10': '10vh',
        'screen-20': '20vh',
        'screen-30': '30vh',
      },
      letterSpacing: {
        // Refined letter spacing for luxury
        'luxury-tightest': '-0.05em',
        'luxury-tight': '-0.02em',
        luxury: '0.02em',
        'luxury-wide': '0.1em',
        'luxury-wider': '0.2em',
        'luxury-widest': '0.3em',
        'luxury-extreme': '0.5em',
        'luxury-ultra': '0.8em',
      },
      lineHeight: {
        'luxury-tight': '0.9',
        luxury: '1.2',
        'luxury-relaxed': '1.6',
        'luxury-loose': '1.8',
      },
      animation: {
        // Enhanced animations for 2025
        'fade-in': 'fadeIn 1s cubic-bezier(0.25, 0.1, 0.25, 1)',
        'fade-in-slow': 'fadeIn 1.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
        'slide-up-slow': 'slideUp 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
        'slide-in': 'slideIn 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
        'slide-in-right': 'slideInRight 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
        'scale-in-center': 'scaleInCenter 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
        'luxury-hover': 'luxuryHover 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
        shimmer: 'shimmer 2s cubic-bezier(0.25, 0.1, 0.25, 1) infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
        float: 'float 3s ease-in-out infinite',
        parallax: 'parallax 10s linear infinite',
        'reveal-up': 'revealUp 1s cubic-bezier(0.25, 0.1, 0.25, 1)',
        'reveal-down': 'revealDown 1s cubic-bezier(0.25, 0.1, 0.25, 1)',
        typewriter: 'typewriter 2s steps(40, end)',
        liquid: 'liquid 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scaleInCenter: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        luxuryHover: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0.98)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(201, 166, 107, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(201, 166, 107, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        parallax: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        revealUp: {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        revealDown: {
          '0%': { opacity: '0', transform: 'translateY(-100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        liquid: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
          '33%': { transform: 'scale(1.05) rotate(1deg)' },
          '66%': { transform: 'scale(0.95) rotate(-1deg)' },
        },
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'luxury-out': 'cubic-bezier(0.33, 1, 0.68, 1)',
        'luxury-in': 'cubic-bezier(0.32, 0, 0.67, 0)',
        'bounce-luxury': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      transitionDuration: {
        400: '400ms',
        600: '600ms',
        800: '800ms',
        900: '900ms',
        1200: '1200ms',
        1500: '1500ms',
        2000: '2000ms',
      },
      transitionDelay: {
        400: '400ms',
        600: '600ms',
        800: '800ms',
        1000: '1000ms',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        '3xl': '40px',
      },
      backdropSaturate: {
        25: '.25',
        75: '.75',
      },
      borderWidth: {
        px: '1px',
        0.5: '0.5px',
        1.5: '1.5px',
      },
      boxShadow: {
        'luxury-sm': '0 2px 8px rgba(0, 0, 0, 0.1)',
        luxury: '0 4px 16px rgba(0, 0, 0, 0.15)',
        'luxury-lg': '0 8px 32px rgba(0, 0, 0, 0.2)',
        'luxury-xl': '0 12px 48px rgba(0, 0, 0, 0.3)',
        'gold-glow': '0 0 30px rgba(201, 166, 107, 0.3)',
        'gold-glow-lg': '0 0 60px rgba(201, 166, 107, 0.4)',
        'inner-luxury': 'inset 0 2px 8px rgba(0, 0, 0, 0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-radial-dark': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'gradient-luxury': 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
        'gradient-gold': 'linear-gradient(135deg, #C9A66B 0%, #A6845C 100%)',
        'gradient-shimmer':
          'linear-gradient(90deg, transparent 0%, rgba(201, 166, 107, 0.08) 50%, transparent 100%)',
        noise:
          "url('data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E')",
      },
      screens: {
        xs: '475px',
        '3xl': '1920px',
        '4xl': '2560px',
        // Height-based media queries
        tall: { raw: '(min-height: 800px)' },
        xtall: { raw: '(min-height: 1000px)' },
        // Orientation queries
        landscape: { raw: '(orientation: landscape)' },
        portrait: { raw: '(orientation: portrait)' },
      },
      aspectRatio: {
        luxury: '3 / 4',
        wide: '16 / 9',
        ultrawide: '21 / 9',
        square: '1 / 1',
        golden: '1.618 / 1',
      },
      blur: {
        xs: '2px',
      },
      contrast: {
        25: '.25',
        75: '.75',
      },
      grayscale: {
        25: '25%',
        50: '50%',
        75: '75%',
      },
      opacity: {
        2: '0.02',
        3: '0.03',
        7: '0.07',
        15: '0.15',
      },
      scale: {
        102: '1.02',
        103: '1.03',
        98: '0.98',
        97: '0.97',
      },
      zIndex: {
        60: '60',
        70: '70',
        80: '80',
        90: '90',
        100: '100',
      },
    },
  },
  plugins: [
    // Enhanced RTL support plugin
    function ({ addUtilities, addComponents, theme }) {
      const newUtilities = {
        // RTL-safe directional utilities
        '.text-start': { textAlign: 'start' },
        '.text-end': { textAlign: 'end' },
        // Logical properties for margins
        '.ms-auto': { marginInlineStart: 'auto' },
        '.me-auto': { marginInlineEnd: 'auto' },
        '.ms-0': { marginInlineStart: '0' },
        '.me-0': { marginInlineEnd: '0' },
        // Logical properties for padding
        '.ps-0': { paddingInlineStart: '0' },
        '.pe-0': { paddingInlineEnd: '0' },
        '.ps-4': { paddingInlineStart: '1rem' },
        '.pe-4': { paddingInlineEnd: '1rem' },
        '.ps-6': { paddingInlineStart: '1.5rem' },
        '.pe-6': { paddingInlineEnd: '1.5rem' },
        '.ps-8': { paddingInlineStart: '2rem' },
        '.pe-8': { paddingInlineEnd: '2rem' },
        // Logical properties for positioning
        '.start-0': { insetInlineStart: '0' },
        '.end-0': { insetInlineEnd: '0' },
        '.start-4': { insetInlineStart: '1rem' },
        '.end-4': { insetInlineEnd: '1rem' },
        '.start-full': { insetInlineStart: '100%' },
        '.end-full': { insetInlineEnd: '100%' },
        // Luxury text utilities
        '.text-balance': { textWrap: 'balance' },
        '.text-pretty': { textWrap: 'pretty' },
        // Luxury mask utilities
        '.mask-fade-bottom': {
          maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
        },
        '.mask-fade-top': {
          maskImage: 'linear-gradient(to top, black 60%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, black 60%, transparent 100%)',
        },
        // Performance utilities
        '.gpu': {
          transform: 'translateZ(0)',
          willChange: 'transform',
        },
        '.no-scrollbar': {
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        // Luxury hover states
        '.hover-lift': {
          transition: 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
          },
        },
        '.hover-glow': {
          transition: 'box-shadow 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
          '&:hover': {
            boxShadow: '0 0 30px rgba(201, 166, 107, 0.3)',
          },
        },
      };

      // Luxury components
      const components = {
        '.btn-luxury': {
          '@apply relative overflow-hidden px-8 py-4 text-sm tracking-luxury-wider uppercase font-light transition-all duration-500':
            {},
          '&::before': {
            content: '""',
            '@apply absolute inset-0 bg-gold transform scale-x-0 origin-start transition-transform duration-500':
              {},
          },
          '&:hover::before': {
            '@apply scale-x-100': {},
          },
          '& span': {
            '@apply relative z-10': {},
          },
        },
        '.section-luxury': {
          '@apply py-20 md:py-28 lg:py-36': {},
        },
        '.container-luxury': {
          '@apply w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16': {},
        },
        '.title-luxury': {
          '@apply text-display md:text-display-lg lg:text-display-xl font-thin tracking-luxury-tight':
            {},
        },
        '.label-luxury': {
          '@apply text-xs tracking-luxury-extreme uppercase text-gold': {},
        },
      };

      addUtilities(newUtilities);
      addComponents(components);
    },
    // Custom variant for luxury interactions
    function ({ addVariant }) {
      addVariant('luxury-hover', '&:hover');
      addVariant('luxury-focus', '&:focus-visible');
      addVariant('luxury-active', '&:active');
      addVariant('group-luxury-hover', ':merge(.group):hover &');
    },
  ],
};
