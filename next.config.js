// next.config.js - Optimized for LCP Performance
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Enhanced image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Enable compression
  compress: true,
  poweredByHeader: false,

  // Advanced webpack optimization
  webpack: (config, { dev, isServer }) => {
    // Production optimizations only
    if (!dev && !isServer) {
      // Enhanced bundle splitting for LCP optimization
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          
          // Critical UI chunk (loads first)
          critical: {
            name: 'critical',
            test: /[\\/]components[\\/](common|ui)[\\/]/,
            chunks: 'all',
            priority: 30,
            enforce: true,
          },
          
          // Defer heavy libraries
          framerMotion: {
            name: 'framer-motion',
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            chunks: 'async',
            priority: 10,
          },
          
          // Icons in separate chunk
          icons: {
            name: 'icons',
            test: /[\\/]node_modules[\\/](lucide-react|@heroicons)[\\/]/,
            chunks: 'async',
            priority: 5,
          },
        },
      };
    }

    return config;
  },

  // Headers for performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;