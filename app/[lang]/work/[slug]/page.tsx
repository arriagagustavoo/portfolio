import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Chips } from '@/components/bits'
import { Gallery } from '@/components/Work'
import { getDict } from '@/lib/content/site'
import { href, locales, SITE, type Lang } from '@/lib/i18n'
import { projects } from '@/lib/data'
import { crumbs, JsonLd, pageMeta } from '@/lib/seo'

type P = { params: Promise<{ lang: Lang; slug: string }> }
type Section = { heading: string; body: string; points?: string[] }
type Item = { meta: { title: string; description: string }; summary: string[]; sections: Section[]; linked?: { heading: string; body: string; labels: string[] } }
const LINKED: Record<string, number[]> = { clientportal: [2, 3], queuesmart: [8, 9], documents: [2, 4, 6] }
const PULL: Record<string, Record<Lang, [string, string]>> = {
  clientportal: { en: ["Type a price, a date or the client's details once, and it fills in ", 'everywhere.'], es: ['Escribe un precio, una fecha o los datos del cliente una vez, y se llena en ', 'todos lados.'] },
  documents: { en: ['Fill the brackets. ', 'Skip the paperwork.'], es: ['Llena los corchetes. ', 'Olvídate del papeleo.'] },
  queuesmart: { en: ['A smarter way to ', 'wait in line.'], es: ['Una forma más inteligente de ', 'hacer fila.'] },
}

export function generateStaticParams() { return locales.flatMap(lang => projects.map(p => ({ lang, slug: p.slug }))) }
export const dynamicParams = false

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang, slug } = await params
  const p = projects.find(x => x.slug === slug); if (!p) return {}
  const it = (getDict(lang).legacy.caseStudy.items as Record<string, Item>)[p.key]
  return pageMeta(lang, 'work', '/work/' + slug, { title: it.meta.title.replace(/ — /g, ' | '), description: it.meta.description, image: p.shots[0].src })
}

export default async function Case({ params }: P) {
  const { lang, slug } = await params
  const k = projects.findIndex(x => x.slug === slug)
  if (k < 0) notFound()
  const p = projects[k], t = getDict(lang), c = t.caseStudy
  const it = (t.legacy.caseStudy.items as Record<string, Item>)[p.key]
  const alts = (t.legacy.projects as Record<string, { alts: string[] }>)[p.key].alts
  const prev = projects[(k + projects.length - 1) % projects.length], next = projects[(k + 1) % projects.length]
  const order = p.key === 'clientportal' ? [1, 9, 2, 4, 5, 12, ...p.shots.map((_, i) => i).filter(i => ![1, 9, 2, 4, 5, 12].includes(i))] : p.shots.map((_, i) => i)
  const linked = LINKED[p.key].map(i => p.shots[i])
  const roleText = p.key === 'queuesmart' ? (lang === 'es' ? 'El lado de administración, en un equipo de cuatro' : 'The admin side, in a team of four') : (lang === 'es' ? 'Diseño y código, yo solo' : 'Design and code, solo')
  const typeText = { clientportal: lang === 'es' ? 'Mi propio software, de uso diario' : 'My own software, used every day', documents: lang === 'es' ? 'Documentos para mi negocio' : 'Documents for my business', queuesmart: lang === 'es' ? 'Proyecto de curso, UH' : 'Coursework, UH' }[p.key]
  const [first, ...rest] = it.sections
  return (
    <>
      <JsonLd data={crumbs(lang, [[t.nav.home, '/'], [t.nav.work, '/work'], [p.title, '/work/' + slug]])} />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'CreativeWork', name: p.title, description: it.meta.description, url: SITE + href(lang, '/work/' + slug), image: SITE + p.shots[0].src, creator: { '@id': SITE + '/#gustavo' }, inLanguage: lang, keywords: p.skills.join(', ') }} />
      <section className="wrap sec first">
        <nav className="crumb" aria-label="Breadcrumb"><Link href={href(lang, '/work')}>{c.crumb}</Link><span aria-hidden="true">/</span><span aria-current="page">{p.title}</span></nav>
        <div className="cs-top">
          <div>
            <h1 className="h1">{p.title}</h1>
            <p className="cs-sum">{it.summary[0]}</p>
            <dl className="meta">
              <div><dt>{c.role}</dt><dd>{roleText}</dd></div>
              <div><dt>{c.type}</dt><dd>{typeText}</dd></div>
              {p.key === 'clientportal' && <div><dt>{c.languages}</dt><dd>{lang === 'es' ? 'Inglés y español' : 'English and Spanish'}</dd></div>}
            </dl>
            <Chips names={p.skills} />
          </div>
          <div>
            <Gallery shots={order.map(i => p.shots[i].src)} alts={order.map(i => alts[i] ?? p.title)} url={p.url} doc={p.doc} more={c.more} label={c.shot} />
            {p.key === 'clientportal' && <p className="note">{t.legacy.caseStudy.galleryNote}</p>}
          </div>
        </div>
      </section>

      <section className="wrap sec" style={{ paddingTop: 0 }}>
        {it.summary[1] && <div className="chap" data-reveal><h2>{lang === 'es' ? 'En resumen' : 'The short version'}</h2><div><p>{it.summary[1]}</p></div></div>}
        <div className="chap" data-reveal><h2>{first.heading}</h2><div><p>{first.body}</p>{first.points && <ul className="chk">{first.points.map(x => <li key={x}>{x}</li>)}</ul>}</div></div>
        {it.linked && (
          <>
            <div className="chap" data-reveal style={{ boxShadow: 'none', paddingBottom: 0 }}><h2>{it.linked.heading}</h2><div><p>{it.linked.body}</p></div></div>
            <div className={'shots2'} data-reveal style={linked.length === 3 ? { gridTemplateColumns: 'repeat(3,minmax(0,1fr))' } : undefined}>
              {linked.map((s, i) => (
                <figure key={s.src} className="browser" style={{ margin: 0 }}>
                  <div className="chrome"><span className="lights"><i /><i /><i /></span><span className="url">{it.linked!.labels[i]}</span></div>
                  <div className={'screen' + (p.doc ? ' doc' : '')} style={p.doc ? { aspectRatio: '3 / 4' } : undefined}><Image src={s.src} alt={it.linked!.labels[i]} fill sizes="(max-width: 900px) 92vw, 600px" style={{ objectFit: p.doc ? 'contain' : 'cover', objectPosition: 'top left' }} /></div>
                </figure>
              ))}
            </div>
            <p className="pull" data-reveal>{PULL[p.key][lang][0]}<span>{PULL[p.key][lang][1]}</span></p>
          </>
        )}
        {rest.map(s => (
          <div className="chap" key={s.heading} data-reveal><h2>{s.heading}</h2><div><p>{s.body}</p>{s.points && <ul className="chk">{s.points.map(x => <li key={x}>{x}</li>)}</ul>}</div></div>
        ))}
        {p.repo && <p className="note"><a className="lnk" href={p.repo} target="_blank" rel="noopener noreferrer">GitHub</a></p>}
        <div className="acts" data-reveal><span className="lede" style={{ margin: 0 }}>{c.cta}</span><Link className="btn" href={href(lang, '/contact')}>{c.ctaBtn}</Link></div>
        <nav className="pn" aria-label={c.all}>
          <Link className="pn-p" href={href(lang, '/work/' + prev.slug)} rel="prev"><span>{c.prev}</span><b>{prev.title}</b></Link>
          <Link className="pn-all" href={href(lang, '/work')}>{c.all}</Link>
          <Link className="pn-n" href={href(lang, '/work/' + next.slug)} rel="next"><span>{c.next}</span><b>{next.title}</b></Link>
        </nav>
      </section>
    </>
  )
}
