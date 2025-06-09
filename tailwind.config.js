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
        'charcoal': '#1A1A1A',
        'charcoal-light': '#2A2A2A',
        'charcoal-dark': '#111111',
        'brown': '#704214',
        'gold': '#C9A66B',
        'gold-light': '#D9BC8C',
        'gold-dark': '#A6845C',
        'offwhite': '#F5F5F5',
        'lightgrey': '#E0E0E0',
        'burgundy': '#5C0511',
      },
    },
    fontFamily: {
      'heebo': ['var(--font-heebo)', 'sans-serif'],
    },
    fontSize: {
      'h1': '48px',
      'h2': '36px',
      'h3': '24px',
      'h4': '20px',
      'body': '16px',
      'small': '14px',
      'mini': '12px',
    },
    spacing: {
      'section': '80px',
      'section-mobile': '48px',
    },
    maxWidth: {
      'content': '1440px',
    },
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
    },
    animation: {
      'fade-in': 'fadeIn 0.5s ease-out forwards',
      'slide-up': 'slideUp 0.5s ease-out forwards',
      'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      slideUp: {
        '0%': { transform: 'translateY(20px)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '1' },
      },
      pulse: {
        '0%, 100%': { opacity: '1' },
        '50%': { opacity: '0.5' },
      },
    },
  },

  plugins: [
    // Add RTL-specific plugins if needed
    function ({ addUtilities }) {
      const newUtilities = {
        '.flip-horizontal': {
          transform: 'scaleX(-1)',
        },
        '.hebrew-numbers': {
          fontFeatureSettings: '"tnum" 1',
        },
      }
      addUtilities(newUtilities)
    },
  ],
}