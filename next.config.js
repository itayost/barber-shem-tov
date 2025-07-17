// next.config.js - Static Export for Hostinger
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🚨 חובה לייצוא סטטי!
  output: 'export',

  // 🚨 חובה - ביטול אופטימיזציית תמונות של Next.js
  images: {
    unoptimized: true,
    // עדיין אפשר להגדיר פורמטים למידע
    formats: ['image/webp', 'image/avif'],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: false,
  },

  // נשאר כמו שהיה
  compress: true,
  poweredByHeader: false,

  // Webpack optimizations - עדיין רלוונטי לגודל הבאנדל
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          mobile: {
            name: 'mobile',
            test: /[\\/]components[\\/](home|common|navigation)[\\/]/,
            chunks: 'all',
            priority: 10,
          },
          framerMotion: {
            name: 'framer-motion',
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            chunks: 'all',
            priority: 15,
          },
        },
      };
    }
    return config;
  },

  // ⚠️ Headers לא יעבדו באחסון סטטי - נטפל בזה ב-.htaccess
  // async headers() { ... } // מחק או הערה
};

module.exports = nextConfig;
