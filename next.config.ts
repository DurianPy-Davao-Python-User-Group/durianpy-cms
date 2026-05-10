import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)
import { redirects } from './redirects'

const NEXT_PUBLIC_SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000')

const isProduction = process.env.NODE_ENV === 'production' || process.env.ENVIRONMENT === 'production'

const nextConfig: NextConfig = {
  output: 'standalone',
  ...(isProduction && {
    assetPrefix: process.env.CLOUDFRONT_DISTRIBUTION_DOMAIN || undefined,
  }),
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
    qualities: [100],
    remotePatterns: [
      ...[
        NEXT_PUBLIC_SERVER_URL,
        process.env.CLOUDFRONT_DISTRIBUTION_DOMAIN
          ? process.env.CLOUDFRONT_DISTRIBUTION_DOMAIN
          : null,
      ]
        .filter(Boolean)
        .map((item) => {
          const url = new URL(item!)

          return {
            hostname: url.hostname,
            protocol: url.protocol.replace(':', '') as 'http' | 'https',
          }
        }),
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  experimental: {
    isrFlushToDisk: false,
  },
  reactStrictMode: true,
  redirects,
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
