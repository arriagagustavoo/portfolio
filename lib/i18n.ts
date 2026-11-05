export const locales = ['en', 'es'] as const
export type Lang = (typeof locales)[number]

export const isLang = (v: string): v is Lang => (locales as readonly string[]).includes(v)

export const SITE = 'https://arriagagustavoo.com'

/** a page path in the given language: "/work" -> "/work" or "/es/work" */
export function href(lang: Lang, path: string) {
  const p = path === '/' ? '' : path
  return lang === 'en' ? p || '/' : '/es' + p
}

/** the same page in the other language */
export function swapLang(pathname: string, to: Lang) {
  const bare = pathname.replace(/^\/es(?=\/|$)/, '') || '/'
  return href(to, bare)
}

/** canonical + hreflang alternates for a page path (without the language prefix) */
export function alternates(lang: Lang, path: string) {
  return {
    canonical: SITE + href(lang, path),
    languages: { en: SITE + href('en', path), es: SITE + href('es', path), 'x-default': SITE + href('en', path) },
  }
}
