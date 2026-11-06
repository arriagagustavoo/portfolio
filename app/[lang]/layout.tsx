import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import Script from 'next/script'
import { notFound } from 'next/navigation'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Backdrop, Motion, Toasts } from '@/components/Chrome'
import { getDict } from '@/lib/content/site'
import { isLang, locales, SITE, type Lang } from '@/lib/i18n'
import { JsonLd, siteGraph } from '@/lib/seo'
import '../globals.css'

// vendored like the client portal, so the build never depends on Google being reachable for the brand fonts
const geist = localFont({ src: '../fonts/Geist-Variable.woff2', variable: '--font-geist', weight: '100 900', display: 'swap' })
const pixel = localFont({ src: '../fonts/GeistPixel-Regular.woff2', variable: '--font-pixel', display: 'swap' })
// all fonts ship with the site (no Google Fonts download at build time, which once failed a production build)
const mono = localFont({ src: '../fonts/GeistMono-Variable.woff2', variable: '--font-mono', weight: '100 900', display: 'swap' })
const hand = localFont({ src: [{ path: '../fonts/Caveat-500.woff2', weight: '500' }, { path: '../fonts/Caveat-600.woff2', weight: '600' }], variable: '--font-hand', display: 'swap' })

export const dynamicParams = false
export function generateStaticParams() { return locales.map(lang => ({ lang })) }

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: 'arriagagustavoo', template: '%s' },
  icons: { icon: [{ url: '/favicon.ico', sizes: '16x16 32x32 48x48' }, { url: '/favicon.svg', type: 'image/svg+xml' }, { url: '/icon-192.png', sizes: '192x192', type: 'image/png' }], apple: { url: '/apple-touch-icon.png', sizes: '180x180' } },
  formatDetection: { telephone: false },
  authors: [{ name: 'Gustavo Arriaga', url: SITE }],
  creator: 'Gustavo Arriaga',
}
export const viewport: Viewport = { themeColor: '#181816', colorScheme: 'dark light' }

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang: l } = await params
  if (!isLang(l)) notFound()
  const lang = l as Lang
  const t = getDict(lang)
  return (
    <html lang={lang} data-theme="dark" suppressHydrationWarning className={`${geist.variable} ${pixel.variable} ${mono.variable} ${hand.variable}`}>
      <head>
        <Script id="boot" strategy="beforeInteractive">{"document.documentElement.classList.add('js');try{if(localStorage.getItem('theme')==='light'){document.documentElement.dataset.theme='light';var m=document.querySelector('meta[name=theme-color]');if(m)m.setAttribute('content','#e3e0d8')}}catch(e){}"}</Script>
        <JsonLd data={siteGraph(lang)} />
      </head>
      <body>
        <a className="skip" href="#main">{t.nav.skip}</a>
        <Backdrop />
        <Header lang={lang} nav={t.nav} />
        <main id="main">{children}</main>
        <Footer lang={lang} t={t} />
        <Toasts lang={lang} words={{ es: t.toast.es, en: t.toast.en, prefer: t.toast.prefer, change: t.toast.change }} />
        <Motion />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
