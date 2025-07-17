// next.config.js - Optimized for Vercel Deployment
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove 'output: export' to leverage Vercel's dynamic capabilities
  // This allows ISR, API routes, and edge functions

  images: {
    // Vercel's Image Optimization API works great with these settings
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Enable Vercel's Image Optimization
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  experimental: {
    // Vercel-specific optimizations
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: false,
  },

  compress: true,
  poweredByHeader: false,

  // Leverage Vercel's automatic build ID generation
  generateBuildId: async () => {
    // Use Vercel's deployment ID if available
    return process.env.VERCEL_GIT_COMMIT_SHA || `build-${Date.now()}`;
  },

  webpack: (config, { dev, isServer }) => {
    // Production client-side optimizations
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        runtimeChunk: 'single',
        moduleIds: 'deterministic',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 25,
          minSize: 20000,
          cacheGroups: {
            default: false,
            vendors: false,

            // Framework core
            framework: {
              name: 'framework',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|next)[\\/]/,
              priority: 40,
              chunks: 'all',
              enforce: true,
            },

            // Critical components for initial load
            critical: {
              name: 'critical',
              test: /[\\/]components[\\/](navigation|common[\\/](Hero|Button))[\\/]/,
              priority: 35,
              chunks: 'initial',
              minChunks: 1,
            },

            // Mobile-optimized components
            mobile: {
              name: 'mobile',
              test: /[\\/]components[\\/](home|common|navigation)[\\/]/,
              priority: 30,
              chunks: 'all',
            },

            // Framer Motion - lazy load for better mobile performance
            framerMotion: {
              name: 'framer-motion',
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              priority: 25,
              chunks: 'async',
              enforce: true,
            },

            // Other vendor libraries
            vendor: {
              name: 'vendor',
              test: /[\\/]node_modules[\\/]/,
              priority: 20,
              chunks: 'async',
              reuseExistingChunk: true,
            },

            // Common shared modules
            common: {
              name: 'common',
              minChunks: 2,
              priority: 10,
              chunks: 'async',
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        },
      };

      // CSS optimization
      config.optimization.minimizer = config.optimization.minimizer?.map(minimizer => {
        if (minimizer.constructor.name === 'CssMinimizerPlugin') {
          minimizer.options.minimizerOptions = {
            preset: [
              'default',
              {
                discardComments: { removeAll: true },
                discardEmpty: true,
                discardDuplicates: true,
                discardOverridden: true,
                mergeLonghand: true,
                mergeRules: true,
              },
            ],
          };
        }
        return minimizer;
      });
    }

    // Alias for cleaner imports
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };

    return config;
  },

  // Headers optimized for Vercel Edge Network
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
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        // Aggressive caching for static assets
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Font caching
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Environment variables for build time
  env: {
    BUILD_TIME: new Date().toISOString(),
    NEXT_PUBLIC_VERCEL_URL: process.env.VERCEL_URL,
  },
};

module.exports = nextConfig;
