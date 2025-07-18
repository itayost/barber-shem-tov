// next.config.js - Optimized for LCP Performance + No Legacy JS
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

  // Enable compression and modern minification
  compress: true,
  poweredByHeader: false,
  swcMinify: true, // ✨ NEW: Use SWC for modern minification

  // ✨ NEW: Compiler optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
    
    // Remove React data-testid attributes in production
    reactRemoveProperties: process.env.NODE_ENV === 'production' ? {
      properties: ['^data-testid$'],
    } : false,
  },

  // ✨ NEW: Experimental features for modern JS
  experimental: {
    // Don't transpile for legacy browsers
    legacyBrowsers: false,
    
    // Use browserslist for SWC
    browsersListForSwc: true,
    
    // Optimize package imports
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      '@heroicons/react',
      'keen-slider',
    ],
  },

  // Advanced webpack optimization
  webpack: (config, { dev, isServer }) => {
    // Production optimizations only
    if (!dev && !isServer) {
      // ✨ NEW: Configure modern output
      config.output = {
        ...config.output,
        environment: {
          // Only use features supported by modern browsers
          arrowFunction: true,
          bigIntLiteral: true,
          const: true,
          destructuring: true,
          dynamicImport: true,
          forOf: true,
          module: true,
          optionalChaining: true,
          templateLiteral: true,
          asyncFunction: true,
          // Disable legacy features
          globalThis: false,
        },
      };

      // ✨ NEW: Remove legacy polyfills
      config.resolve.alias = {
        ...config.resolve.alias,
        'core-js': false,
        'regenerator-runtime': false,
        '@babel/runtime': false,
      };

      // Enhanced bundle splitting for LCP optimization
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        minRemainingSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
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
          
          // Critical UI chunk (loads first)
          critical: {
            name: 'critical',
            test: /[\\/]components[\\/](common\/(Hero|Button|Navbar))[\\/]/,
            chunks: 'all',
            priority: 30,
            enforce: true,
          },
          
          // Common components chunk
          commons: {
            name: 'commons',
            test: /[\\/]components[\\/]/,
            minChunks: 2,
            priority: 20,
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
          
          // Other vendors
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];
              return `vendor-${packageName.replace('@', '')}`;
            },
            priority: 1,
            reuseExistingChunk: true,
          },
        },
      };

      // ✨ NEW: Optimize runtime chunk
      config.optimization.runtimeChunk = {
        name: 'runtime',
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
          // ✨ NEW: Modern browser hints
          {
            key: 'X-UA-Compatible',
            value: 'IE=edge',
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
      // ✨ NEW: Cache JavaScript files
      {
        source: '/_next/static/:path*',
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