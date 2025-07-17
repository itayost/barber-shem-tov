// next.config.js - Performance-Optimized Static Export
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  experimental: {
    optimizeCss: true, // Enable CSS optimization
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: false,
  },

  compress: true,
  poweredByHeader: false,

  // Generate build ID based on timestamp for cache busting
  generateBuildId: async () => {
    return `build-${Date.now()}`;
  },

  webpack: (config, { dev, isServer }) => {
    // Production client-side optimizations
    if (!dev && !isServer) {
      // Better code splitting for static export
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

            // Framework core - highest priority
            framework: {
              name: 'framework',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
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

            // Async components
            async: {
              name: 'async',
              test: /[\\/]components[\\/]/,
              chunks: 'async',
              priority: 30,
              minChunks: 2,
              reuseExistingChunk: true,
            },

            // Framer Motion - separate bundle
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

      // Minimize CSS
      config.optimization.minimizer = config.optimization.minimizer.map(minimizer => {
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

      // Add webpack plugins for better optimization
      const CompressionPlugin = require('compression-webpack-plugin');
      config.plugins.push(
        new CompressionPlugin({
          filename: '[path][base].gz',
          algorithm: 'gzip',
          test: /\.(js|css|html|svg)$/,
          threshold: 8192,
          minRatio: 0.8,
        })
      );
    }

    // Alias for cleaner imports
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };

    return config;
  },

  // Environment variables for build time
  env: {
    BUILD_TIME: new Date().toISOString(),
    BUILD_ID: `build-${Date.now()}`,
  },
};

module.exports = nextConfig;
