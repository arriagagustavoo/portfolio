import type { NextConfig } from 'next'

// English lives at the root (/work), Spanish under /es (/es/work), the same URLs the old site used.
// Internally every page is app/[lang]/..., so the root paths are rewritten to /en and /en is never public.
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
]

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { formats: ['image/avif', 'image/webp'] },
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/', destination: '/en' },
        { source: '/:path((?!en(?:/|$)|es(?:/|$)|_next/|_vercel/|api/)(?!.*\\.).*)', destination: '/en/:path' },
      ],
    }
  },
  async redirects() {
    return [
      { source: '/en', destination: '/', permanent: true },
      { source: '/en/:path*', destination: '/:path*', permanent: true },
      // links shared before Nov 5, 2026 point at the old PNG preview image
      { source: '/og-image.png', destination: '/og-image.jpg', permanent: true },
    ]
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

export default nextConfig
