import Link from 'next/link'
import { DevProjects } from '@/components/DevProjects'
import Image from 'next/image'
import type { Metadata } from 'next'
import { Chips, Icon } from '@/components/bits'
import { EmailLink } from '@/components/Forms'
import { getDict } from '@/lib/content/site'
import { href, type Lang } from '@/lib/i18n'
import { contact, devProjects, skillGroups } from '@/lib/data'
import { crumbs, JsonLd, pageMeta } from '@/lib/seo'

type P = { params: Promise<{ lang: Lang }> }
export async function generateMetadata({ params }: P): Promise<Metadata> { const { lang } = await params; return pageMeta(lang, 'dev', '/dev') }

export default async function Dev({ params }: P) {
  const { lang } = await params
  const t = getDict(lang), d = t.dev, L = t.legacy
  const ext = { target: '_blank', rel: 'noopener noreferrer' }
  return (
    <>
      <JsonLd data={crumbs(lang, [[t.nav.home, '/'], [t.nav.dev, '/dev']])} />
      <section className="wrap sec first dev-top">
        <div className="dev-h">
          <div>
            <h1 className="h1">{d.title}</h1>
            <div className="acts">
              <a className="btn" href={contact.github.url} {...ext} data-ev="Contact clicked" data-ev-way="github" data-ev-from="dev"><Icon name="github" />{d.github}</a>
              <a className="btn ghost" href={contact.linkedin.url} {...ext} data-ev="Contact clicked" data-ev-way="linkedin" data-ev-from="dev"><Icon name="linkedin" />{d.linkedin}</a>
              <EmailLink className="lnk" copied={t.toast.copied}>{contact.email}</EmailLink>
            </div>
          </div>
          <p className="lede" style={{ paddingTop: '.375rem' }}>{d.bio}</p>
        </div>
      </section>
      <section className="wrap sec" aria-labelledby="skills">
        <div className="sec-h" data-reveal><h2 className="h2" id="skills">{d.skills}</h2></div>
        <div className="skg cols">
          {skillGroups.map((g, k) => <div className="skc" key={g.id} data-reveal style={{ transitionDelay: k * 70 + 'ms' }}><h3 className="skl">{(L.skills.categories as Record<string, string>)[g.id]}</h3><Chips names={g.skills} big /></div>)}
        </div>
      </section>
      <section className="wrap sec" aria-labelledby="outside">
        <div className="sec-h" data-reveal><div><h2 className="h2" id="outside">{d.outside}</h2><p className="lede">{d.outsideSub}</p></div></div>
        <DevProjects items={devProjects.map((p, k) => ({ ...p, title: d.projects[k].title, text: d.projects[k].text }))} w={{ repo: d.repo, view: d.view, close: d.close, of: d.images, prev: t.caseStudy.prev, next: t.caseStudy.next }} />
      </section>
      <section className="wrap sec" aria-labelledby="edu">
        <div className="sec-h" data-reveal><h2 className="h2" id="edu">{d.education}</h2><p className="lede" style={{ margin: 0 }}>{L.about.degree} · {L.about.school}</p></div>
        <div className="crs cols" data-reveal>
          {(Object.keys(L.coursework.groups) as (keyof typeof L.coursework.groups)[]).map(g => (
            <div key={g}><h3 className="skl">{L.coursework.groups[g]}</h3><ul>{(L.coursework.courses as Record<string, string[]>)[g].map(c => <li key={c}>{c}</li>)}</ul></div>
          ))}
        </div>
      </section>
      <section className="wrap sec" aria-labelledby="habits">
        <div className="sec-h" data-reveal><h2 className="h2" id="habits">{d.habits}</h2></div>
        <div className="rlist two cols" data-reveal>{d.habitsList.map(([h, b]) => <div key={h}><b>{h}</b><p>{b}</p></div>)}</div>
        <div className="acts end"><span className="lede" style={{ margin: 0 }}>{d.outro}</span><Link className="btn ghost" href={href(lang, '/services')}>{d.servicesBtn}</Link></div>
      </section>
    </>
  )
}
