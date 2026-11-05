import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { Html, Icon, LongLogo } from '@/components/bits'
import { ColePeek, ColeThumbs } from '@/components/Cole'
import { getDict } from '@/lib/content/site'
import { href, type Lang } from '@/lib/i18n'
import { contact } from '@/lib/data'
import { uhLogo, type IconName } from '@/lib/icons'
import { crumbs, JsonLd, pageMeta } from '@/lib/seo'

type P = { params: Promise<{ lang: Lang }> }
export async function generateMetadata({ params }: P): Promise<Metadata> { const { lang } = await params; return pageMeta(lang, 'about', '/about') }

export default async function About({ params }: P) {
  const { lang } = await params
  const t = getDict(lang), a = t.about
  const icons: IconName[] = ['code', 'web', 'pin', 'translate']
  const ext = { target: '_blank', rel: 'noopener noreferrer' }
  return (
    <>
      <JsonLd data={crumbs(lang, [[t.nav.home, '/'], [t.nav.about, '/about']])} />
      <section className="wrap sec first">
        <div className="ab2">
          <div>
            <h1 className="big-h">{a.hi}<span className="g">.</span></h1>
            <p className="lede">{a.name} {t.hero.studio} <LongLogo /></p>
            <div className="facts">
              <span className="sch"><span className="uh" dangerouslySetInnerHTML={{ __html: uhLogo }} />{a.facts[0]}</span>
              {a.facts.slice(1).map((f, i) => <span className="sch" key={f}><Icon name={icons[i]} />{f}</span>)}
            </div>
            <figure className="quote"><blockquote>&ldquo;{t.quote.text}&rdquo;</blockquote><Html as="figcaption" html={t.quote.source} /></figure>
            <div className="cole-mini"><ColeThumbs /><Html as="p" html={a.cole} /></div>
            <div className="follow"><span>{a.follow}</span><a className="sch" href={contact.instagram.url} {...ext}><Icon name="instagram" />Instagram</a><a className="sch" href={contact.facebook.url} {...ext}><Icon name="facebook" />Facebook</a></div>
          </div>
          <div className="ab2-r">
            <div className="pk photo-pk"><ColePeek /><div className="photo"><Image src="/images/gus.webp" alt={a.photoAlt} fill priority sizes="(max-width: 900px) 300px, 360px" /></div></div>
          </div>
        </div>
      </section>
      <section className="wrap sec story" aria-label={a.lead}>
        <p className="lead" data-reveal>{a.lead}</p>
        <div className="story-cols" data-reveal>{a.story.map(s => <p key={s.slice(0, 20)}>{s}</p>)}</div>
      </section>
      <section className="wrap sec" aria-labelledby="count">
        <div className="sec-h" data-reveal><h2 className="h2" id="count">{a.countOn}</h2></div>
        <div className="rlist two" data-reveal>{[...t.why.reasons, ...a.extra].map(r => <div key={r.title}><b>{r.title}</b><p>{r.body}</p></div>)}</div>
        <div className="acts"><Link className="btn" href={href(lang, '/contact')}>{t.close.send}</Link><Link className="btn ghost" href={href(lang, '/work')}>{t.hero.seeWork}</Link></div>
      </section>
    </>
  )
}
