// next.config.js - Mobile Performance Optimizations
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Optimize images for mobile
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Enable compression
  compress: true,
  
  // PWA-like optimizations
  poweredByHeader: false,
  
  // Bundle analyzer for mobile optimization
  webpack: (config, { dev, isServer }) => {
    // Only in production
    if (!dev && !isServer) {
      // Optimize for mobile
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Separate chunk for mobile-specific code
          mobile: {
            name: 'mobile',
            test: /[\\/]components[\\/](home|common|navigation)[\\/]/,
            chunks: 'all',
            priority: 10,
          },
          // Framer Motion in separate chunk (it's heavy)
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
  
  // Headers for mobile performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
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
}

module.exports = nextConfig;