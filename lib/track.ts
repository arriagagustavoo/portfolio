import { track } from '@vercel/analytics'

/** a Vercel custom event with the page language added; props stay small (tier, project, from), never names, emails or messages */
export const trackEvent = (name: string, props: Record<string, string | number | boolean> = {}) => track(name, { lang: document.documentElement.lang, ...props })
