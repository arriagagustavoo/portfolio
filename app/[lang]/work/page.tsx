import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { Chips } from '@/components/bits'
import { WorkGrid } from '@/components/Work'
import { getDict } from '@/lib/content/site'
import { href, type Lang } from '@/lib/i18n'
import { lead, projects } from '@/lib/data'
import { crumbs, JsonLd, pageMeta } from '@/lib/seo'

type P = { params: Promise<{ lang: Lang }> }
export async function generateMetadata({ params }: P): Promise<Metadata> { const { lang } = await params; return pageMeta(lang, 'work', '/work') }

export default async function Work({ params }: P) {
  const { lang } = await params
  const t = getDict(lang), w = t.workPage
  return (
    <section className="wrap sec first">
      <JsonLd data={crumbs(lang, [[t.nav.home, '/'], [t.nav.work, '/work']])} />
      <div className="head2"><h1 className="h1">{w.title}</h1><p className="lede">{w.intro}</p></div>
      <WorkGrid filters={[['all', w.filters.all], ['websites', w.filters.websites], ['software', w.filters.software], ['design', w.filters.design]]} kinds={projects.map(p => p.kind)} empty={w.empty}>
        {projects.map((p, k) => (
          <Link key={p.slug} className="wcard" data-kind={p.kind} href={href(lang, '/work/' + p.slug)} data-reveal style={{ transitionDelay: k * 80 + 'ms' }}>
            <div className="browser">
              <div className="chrome"><span className="lights"><i /><i /><i /></span><span className="url">{p.url}</span></div>
              <div className={'screen' + (p.doc ? ' doc' : '')}><Image src={p.shots[lead[p.key]].src} alt={(t.legacy.projects as Record<string, { alts: string[] }>)[p.key].alts[lead[p.key]] ?? p.title} fill sizes="(max-width: 900px) 92vw, 420px" style={{ objectFit: p.doc ? 'contain' : 'cover', objectPosition: p.doc ? 'center' : 'top left' }} /></div>
            </div>
            <div className="wc-t"><h2 style={{ margin: 0, font: 'inherit' }}><b>{p.title}</b></h2><span className="wc-k">{w.kinds[p.kind]}</span></div>
            <p className="wc-o">{t.legacy.projects[p.key].pitch}</p>
            <Chips names={p.cardSkills} />
            <span className="go">{w.read}</span>
          </Link>
        ))}
        <Link className="wcard next" data-kind="websites" href={href(lang, '/contact')} data-reveal><div className="nx"><span className="nx-i" aria-hidden="true">+</span><b>{w.next.title}</b><span>{w.next.text}</span></div></Link>
      </WorkGrid>
    </section>
  )
}
