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
    },
  },
  plugins: [],
};
