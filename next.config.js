// next.config.js - Fixed for Next.js 15.3.0
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

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Experimental features (only valid ones for 15.3.0)
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      '@heroicons/react',
    ],
  },

  // Advanced webpack optimization
  webpack: (config, { dev, isServer }) => {
    // Production optimizations only
    if (!dev && !isServer) {
      // Configure modern output
      config.output = {
        ...config.output,
        environment: {
          arrowFunction: true,
          bigIntLiteral: true,
          const: true,
          destructuring: true,
          dynamicImport: true,
          forOf: true,
          module: true,
          optionalChaining: true,
          templateLiteral: true,
        },
      };

      // Enhanced bundle splitting
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          
          // Framework chunk
          framework: {
            name: 'framework',
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            priority: 40,
            reuseExistingChunk: true,
          },
          
          // Critical UI chunk
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
          
          // Other vendors - with null safety
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // Null safety check
              if (!module.context) return 'vendor';
              
              const match = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              );
              
              if (!match || !match[1]) {
                return 'vendor';
              }
              
              const packageName = match[1];
              return `vendor-${packageName.replace('@', '')}`;
            },
            priority: 1,
            reuseExistingChunk: true,
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