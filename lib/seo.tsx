import type { Metadata } from 'next'
import { alternates, href, SITE, type Lang } from './i18n'
import { getDict } from './content/site'
import { contact } from './data'

// the Google Business Profile, so search engines tie the site and the map listing together
const GBP = 'https://maps.google.com/?cid=12568473080583635988'

type Key = keyof ReturnType<typeof getDict>['meta']

export function pageMeta(lang: Lang, key: Key, path: string, override?: { title: string; description: string; image?: string }): Metadata {
  const m = override ?? getDict(lang).meta[key]
  // link previews: each case study shows itself; everything else shows the home hero, in the page's language
  const image = override?.image ?? (lang === 'es' ? '/og-image-es.jpg' : '/og-image.jpg')
  return {
    title: m.title,
    description: m.description,
    alternates: alternates(lang, path),
    openGraph: {
      type: 'website', siteName: 'arriagagustavoo', title: m.title, description: m.description, url: SITE + href(lang, path),
      locale: lang === 'es' ? 'es_US' : 'en_US', alternateLocale: lang === 'es' ? 'en_US' : 'es_US',
      images: [{ url: image, width: 1200, height: 630, alt: m.title }],
    },
    twitter: { card: 'summary_large_image', title: m.title, description: m.description, images: [image] },
  }
}

/** who and what this site is, for search engines (no prices, ratings or reviews: none of that would be real yet) */
export function siteGraph(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person', '@id': SITE + '/#gustavo', name: 'Gustavo Arriaga', alternateName: 'Gus Arriaga', url: SITE + '/', image: SITE + '/images/gus-arriaga.webp',
        email: contact.email, telephone: contact.tel, jobTitle: lang === 'es' ? 'Diseñador y desarrollador web' : 'Web Designer and Developer',
        address: { '@type': 'PostalAddress', addressLocality: 'Houston', addressRegion: 'TX', addressCountry: 'US' },
        alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of Houston' },
        knowsAbout: ['Web Design', 'Web Development', 'Next.js', 'React', 'Custom Software', 'Graphic Design', 'Local SEO', '3D Modeling'],
        knowsLanguage: ['en', 'es'],
        sameAs: [contact.github.url, contact.linkedin.url, contact.instagram.url, contact.facebook.url],
      },
      {
        '@type': 'ProfessionalService', '@id': SITE + '/#studio', name: 'arriagagustavoo', alternateName: 'Gustavo Arriaga, web design and development',
        url: SITE + '/', image: SITE + '/og-image.jpg', logo: SITE + '/icon-512.png', email: contact.email, telephone: contact.tel,
        description: getDict(lang).meta.home.description, priceRange: '$$', founder: { '@id': SITE + '/#gustavo' },
        areaServed: [{ '@type': 'City', name: 'Houston' }, { '@type': 'City', name: 'Pasadena' }, { '@type': 'State', name: 'Texas' }],
        address: { '@type': 'PostalAddress', addressLocality: 'Houston', addressRegion: 'TX', addressCountry: 'US' },
        availableLanguage: ['English', 'Spanish'], hasMap: GBP, sameAs: [GBP, contact.instagram.url, contact.facebook.url, contact.linkedin.url],
        makesOffer: ['Website design and development', 'Custom software and client portals', 'Graphic design and logos', 'Local SEO and Google Business Profile setup', 'Monthly website care', '3D modeling and printing']
          .map(name => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
      },
      { '@type': 'WebSite', '@id': SITE + '/#site', url: SITE + '/', name: 'arriagagustavoo', inLanguage: ['en', 'es'], publisher: { '@id': SITE + '/#studio' } },
    ],
  }
}

export function crumbs(lang: Lang, items: [string, string][]) {
  return {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: SITE + href(lang, path) })),
  }
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}
