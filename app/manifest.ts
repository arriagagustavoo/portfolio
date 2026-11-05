import type { MetadataRoute } from 'next'

// Install icon and colors for phones (Add to Home Screen) and Android's app switcher
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'arriagagustavoo · Gustavo Arriaga',
    short_name: 'arriagagustavoo',
    description: 'One-person design and code studio in Houston.',
    start_url: '/',
    display: 'browser',
    background_color: '#181816',
    theme_color: '#181816',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
