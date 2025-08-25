import type { NextConfig } from 'next'
// @ts-ignore
import withPWA from 'next-pwa'

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

const pwaConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})

export default pwaConfig(nextConfig)
