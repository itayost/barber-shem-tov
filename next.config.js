// next.config.js - Optimized for LCP Performance
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Enhanced image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Optimize for LCP
    unoptimized: false,
    priority: true,
  },

  // Enable compression
  compress: true,
  poweredByHeader: false,

  // Experimental features for performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      '@heroicons/react'
    ],
    webVitalsAttribution: ['CLS', 'LCP', 'FCP', 'FID', 'TTFB'],
  },

  // Advanced webpack optimization
  webpack: (config, { dev, isServer, webpack }) => {
    // Production optimizations only
    if (!dev && !isServer) {
      // Enhanced bundle splitting for LCP optimization
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          // Remove default groups
          default: false,
          vendors: false,
          
          // Critical UI chunk (loads first)
          critical: {
            name: 'critical',
            test: /[\\/]components[\\/](common|ui)[\\/]/,
            chunks: 'all',
            priority: 30,
            enforce: true,
            minChunks: 1,
          },
          
          // Navigation chunk (loads early but not critical)
          navigation: {
            name: 'navigation',
            test: /[\\/]components[\\/]navigation[\\/]/,
            chunks: 'all',
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
          
          // Large libraries
          vendor: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            priority: 1,
            minChunks: 2,
          },
        },
      };

      // Tree shaking optimization
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;

      // Module concatenation
      config.optimization.concatenateModules = true;

      // Minimize CSS
      config.optimization.minimizer.push(
        new (require('css-minimizer-webpack-plugin'))({
          minimizerOptions: {
            preset: [
              'default',
              {
                discardComments: { removeAll: true },
                normalizeWhitespace: true,
                colormin: true,
                convertValues: true,
                discardDuplicates: true,
                discardEmpty: true,
                mergeRules: true,
                minifyFontValues: true,
                minifySelectors: true,
              },
            ],
          },
        })
      );
    }

    // Font optimization
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/fonts/[name].[hash][ext]',
      },
    });

    // Image optimization
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|webp|avif)$/i,
      use: [
        {
          loader: 'next-optimized-images-loader',
          options: {
            quality: 85,
            optimizeImages: true,
          },
        },
      ],
    });

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
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
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

  // Redirects for performance
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },

  // Environment variables for performance monitoring
  env: {
    NEXT_TELEMETRY_DISABLED: '1',
  },

  // Output configuration
  output: 'standalone',
  
  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;