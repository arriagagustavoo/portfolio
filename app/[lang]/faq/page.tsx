import Link from 'next/link'
import type { Metadata } from 'next'
import { Faq } from '@/components/Faq'
import { getDict } from '@/lib/content/site'
import { href, type Lang } from '@/lib/i18n'
import { crumbs, JsonLd, pageMeta } from '@/lib/seo'

type P = { params: Promise<{ lang: Lang }> }
export async function generateMetadata({ params }: P): Promise<Metadata> { const { lang } = await params; return pageMeta(lang, 'faq', '/faq') }

export default async function FaqPage({ params }: P) {
  const { lang } = await params
  const t = getDict(lang), f = t.faq
  const all = f.groups.flatMap(g => g.items)
  return (
    <section className="wrap sec first">
      <JsonLd data={crumbs(lang, [[t.nav.home, '/'], [t.nav.faq, '/faq']])} />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'FAQPage', inLanguage: lang, mainEntity: all.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }} />
      <div className="head2"><h1 className="h1">{f.title}</h1><p className="lede">{f.intro} <Link className="lnk" href={href(lang, '/contact')}>{f.ask}</Link></p></div>
      {f.groups.map(g => (
        <div className="fgrp" key={g.title} data-reveal><h2 className="h3">{g.title}</h2><Faq items={g.items as [string, string][]} /></div>
      ))}
    </section>
  )
}
