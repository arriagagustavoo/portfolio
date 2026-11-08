import { track } from '@vercel/analytics'

/** which app's built-in browser the visit came through, read from its user agent (Instagram and Facebook name themselves there) */
export const inApp = (): 'instagram' | 'facebook' | null => {
  const ua = navigator.userAgent
  if (/Instagram/i.test(ua)) return 'instagram'
  if (/FBAN|FBAV|FB_IAB|FBIOS/i.test(ua)) return 'facebook'
  return null
}

/** a Vercel custom event with the page language and the app (if any) added; props stay small, never names, emails or messages */
export const trackEvent = (name: string, props: Record<string, string | number | boolean> = {}) => {
  const app = inApp()
  track(name, { lang: document.documentElement.lang, ...(app ? { app } : {}), ...props })
}
