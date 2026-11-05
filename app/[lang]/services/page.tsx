import Link from 'next/link'
import type { Metadata } from 'next'
import { Icon } from '@/components/bits'
import { Faq } from '@/components/Faq'
import { getDict } from '@/lib/content/site'
import { href, type Lang } from '@/lib/i18n'
import { crumbs, JsonLd, pageMeta } from '@/lib/seo'
import type { IconName } from '@/lib/icons'

type P = { params: Promise<{ lang: Lang }> }
export async function generateMetadata({ params }: P): Promise<Metadata> { const { lang } = await params; return pageMeta(lang, 'services', '/services') }

export default async function Services({ params }: P) {
  const { lang } = await params
  const t = getDict(lang), s = t.servicesPage, pr = t.pricing
  const some = [t.faq.groups[2].items[2], t.faq.groups[2].items[0], [lang === 'es' ? '¿Mi sitio puede estar en español también?' : 'Can my site be in Spanish too?', lang === 'es' ? 'Sí. Hago sitios en inglés y español, con una traducción real, no un widget.' : 'Yes. I build in English and Spanish, with a real translation, not a widget.'], t.faq.groups[1].items[0]] as [string, string][]
  return (
    <>
      <JsonLd data={crumbs(lang, [[t.nav.home, '/'], [t.nav.services, '/services']])} />
      <section className="wrap sec first">
        <div className="head2"><h1 className="h1">{s.title}</h1><p className="lede">{s.intro}</p></div>
        <div className="whatido">{t.hero.services.map(x => <span key={x.title}><Icon name={x.icon as IconName} />{x.title}</span>)}</div>
        <div className="tcards">
          {pr.tiers.map((x, k) => (
            <div key={x.name} className={'tc' + (k === 0 ? ' hot' : '')} data-reveal style={{ transitionDelay: k * 70 + 'ms' }}>
              {k === 0 && <span className="tc-badge">{pr.badge}</span>}
              <h2 className="t-n" style={{ margin: 0 }}>{x.name}</h2>
              <b className="tc-p">{x.price}</b><small>{x.monthly}{k === 0 ? (lang === 'es' ? ', diseño incluido' : ', design included') : ''}</small>
              <p>{x.who}</p>
              <ul className="chk">{x.list.map(i => <li key={i}>{i}</li>)}</ul>
              <em>{pr.great}: {x.great}</em>
              <Link className="lnk" href={href(lang, '/work')}>{pr.example}</Link>
            </div>
          ))}
        </div>
        <p className="note">{pr.note}</p>
        <div className="acts"><Link className="btn" href={href(lang, '/') + '#estimate'}>{t.nav.estimate}</Link><span className="lede" style={{ margin: 0 }}>{s.estimateSub}</span></div>
      </section>
      <section className="wrap sec" aria-labelledby="addons">
        <div className="sec-h" data-reveal><h2 className="h2" id="addons">{s.addonsTitle}</h2></div>
        <div className="addons" data-reveal>{s.addons.map(([n, d]) => <div className="ad" key={n}><b>{n}</b><span>{d}</span></div>)}</div>
        <p className="note">{s.addonsNote}</p>
      </section>
      <section className="wrap sec" aria-labelledby="gtk">
        <div className="sec-h" data-reveal><h2 className="h2" id="gtk">{s.faqTitle}</h2><Link className="lnk" href={href(lang, '/faq')}>{s.allQuestions}</Link></div>
        <div data-reveal><Faq items={some} /></div>
        <div className="acts"><Link className="btn ghost" href={href(lang, '/contact')}>{s.orMessage}</Link></div>
      </section>
    </>
  )
}
