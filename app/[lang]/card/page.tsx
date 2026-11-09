import type { Metadata } from 'next'
import { Socials } from '@/components/Socials'
import { getDict } from '@/lib/content/site'
import { href, type Lang } from '@/lib/i18n'
import { pageMeta } from '@/lib/seo'

type P = { params: Promise<{ lang: Lang }> }
// the page the business card, keychain and Wallet pass open: a short contact page, kept out of search results
export async function generateMetadata({ params }: P): Promise<Metadata> { const { lang } = await params; return { ...pageMeta(lang, 'card', '/card'), robots: { index: false, follow: true } } }

export default async function Card({ params }: P) {
  const { lang } = await params
  const t = getDict(lang), c = t.contactCard
  return (
    <section className="wrap sec first cardp">
      <div className="cardp-top">
        <div>
          <p className="eb">{c.eyebrow}</p>
          <h1 className="h1">{c.title} <span className="g">{c.word}</span></h1>
          <p className="lede">{c.sub}</p>
        </div>
        <img className="cardp-ph" src="/images/gus-arriaga.webp" alt="Gustavo Arriaga" width={112} height={112} />
      </div>
      <div className="cardp-cta">
        <a className="btn" href="/gustavo-arriaga.vcf" download="Gustavo Arriaga.vcf" data-ev="Contact clicked" data-ev-way="vcard">{c.save}</a>
        <a className="btn ghost" href={href(lang, '/') + '#estimate'}>{t.nav.estimate}</a>
      </div>
      <Socials t={t} two />
    </section>
  )
}
