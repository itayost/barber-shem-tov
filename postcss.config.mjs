export default {
  plugins: {
    'postcss-import': {},  // MUST be first - handles @import
    'tailwindcss': {},     // Tailwind CSS
    'autoprefixer': {},    // Vendor prefixes
  },
}