import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,

  // ─── Image Optimization ────────────────────────────────────────────────────

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    cacheControl: 'public, max-age=31536000, immutable',
    minimumCacheTTL: 31536000,
  },

  // ─── Performance Optimizations ──────────────────────────────────────────────

  swcMinify: true,
  productionBrowserSourceMaps: false,

  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=()',
          },
        ],
      },
    ]
  },

  // ─── Redirects ──────────────────────────────────────────────────────────────

  redirects: async () => {
    return [
      {
        source: '/dashboard',
        destination: '/platform/dashboard',
        permanent: true,
      },
      {
        source: '/arena/:path*',
        destination: '/platform/arena/:path*',
        permanent: true,
      },
    ]
  },

  // ─── Rewrites ───────────────────────────────────────────────────────────────

  rewrites: async () => {
    return {
      beforeFiles: [
        {
          source: '/api/:path*',
          destination: '/api/:path*',
        },
      ],
    }
  },

  // ─── Environment Variables ──────────────────────────────────────────────────

  env: {
    NEXT_PUBLIC_APP_NAME: 'VICTORIS',
    NEXT_PUBLIC_APP_VERSION: '0.1.0',
  },

  // ─── Webpack Configuration ──────────────────────────────────────────────────

  webpack: (config, { isServer }) => {
    // Optimize bundle size
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk
          vendor: {
            filename: 'chunks/vendor-[hash].js',
            priority: 10,
            reuseExistingChunk: true,
            test: /node_modules/,
          },
          // React vendor chunk
          react: {
            filename: 'chunks/react-[hash].js',
            priority: 20,
            reuseExistingChunk: true,
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          },
          // UI components chunk
          ui: {
            filename: 'chunks/ui-[hash].js',
            priority: 15,
            reuseExistingChunk: true,
            test: /[\\/]components[\\/]/,
          },
        },
      },
    }

    return config
  },
}

export default nextConfig
