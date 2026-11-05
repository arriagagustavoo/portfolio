import type { MetadataRoute } from 'next'
import { href, SITE } from '@/lib/i18n'
import { projects } from '@/lib/data'

const PAGES: [string, number][] = [['/', 1], ['/work', 0.9], ['/services', 0.9], ['/about', 0.7], ['/dev', 0.6], ['/faq', 0.6], ['/contact', 0.8], ['/privacy', 0.2], ...projects.map(p => ['/work/' + p.slug, 0.7] as [string, number])]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return PAGES.flatMap(([path, priority]) => (['en', 'es'] as const).map(lang => ({
    url: SITE + href(lang, path), lastModified: now, priority: lang === 'en' ? priority : Math.max(0.1, priority - 0.1),
    alternates: { languages: { en: SITE + href('en', path), es: SITE + href('es', path) } },
  })))
}
