import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { Chevron, Html, Icon, LongLogo, Mark } from '@/components/bits'
import { Headline, Typed } from '@/components/Hero'
import EstimateCard from '@/components/EstimateCard'
import { ColePeek, CostumeCole } from '@/components/Cole'
import { FeaturedStack } from '@/components/Work'
import { QuickForm } from '@/components/Forms'
import { Socials } from '@/components/Socials'
import { getDict } from '@/lib/content/site'
import { href, swapLang, type Lang } from '@/lib/i18n'
import { lead, projects } from '@/lib/data'
import { pageMeta } from '@/lib/seo'
import { uhLogo, type IconName } from '@/lib/icons'

type P = { params: Promise<{ lang: Lang }> }
export async function generateMetadata({ params }: P): Promise<Metadata> { const { lang } = await params; return pageMeta(lang, 'home', '/') }

export default async function Home({ params }: P) {
  const { lang } = await params
  const t = getDict(lang)
  const work = projects.map(p => ({
    title: p.title, url: p.url, href: href(lang, '/work/' + p.slug), doc: p.doc,
    text: t.legacy.projects[p.key].pitch, skills: p.cardSkills,
    shots: [p.shots[lead[p.key]].src, ...p.shots.filter((_, k) => k !== lead[p.key]).map(s => s.src)],
  }))
  return (
    <>
      <section className="wrap hero" aria-label={t.hero.lines.join(' ')}>
        <div className="hgrid">
          <div className="h-top">
            <Typed className="eb" text={t.hero.eyebrow} />
            <Headline lines={t.hero.lines} words={t.hero.words} />
            <p className="studio">{t.hero.studio} <LongLogo /></p>
          </div>
          <EstimateCard t={t.card} e={t.estimate} work={work.map(w => ({ title: w.title, url: w.url, href: w.href, src: w.shots[0], doc: w.doc }))} />
          <div className="h-bot">
            <div className="svc">
              {t.hero.services.map(s => <div key={s.title}><Icon name={s.icon as IconName} /><b>{s.title}</b><span>{s.sub}</span></div>)}
            </div>
            <div className="acts">
              <Link className="btn ghost" href={href(lang, '/work')}>{t.hero.seeWork}</Link>
              <Link className="hablo" href={swapLang('/', lang === 'en' ? 'es' : 'en')} hrefLang={lang === 'en' ? 'es' : 'en'}><Icon name="translate" />{t.hero.otherLang}</Link>
            </div>
            <div className="chrow">
              <span className="sch"><Icon name="pin" />{t.hero.chips[0]}</span>
              <span className="sch"><span className="uh" dangerouslySetInnerHTML={{ __html: uhLogo }} />{t.hero.chips[1]}</span>
            </div>
          </div>
        </div>
        <div className="devlink"><Link href={href(lang, '/dev')}>{t.hero.dev}</Link></div>
      </section>

      <section className="wrap sec" aria-label={t.steps.map(s => s.word).join(', ')}>
        <div className="steps">
          {t.steps.map((s, k) => (
            <div className="stp" key={s.word} data-reveal style={{ transitionDelay: k * 90 + 'ms' }}>
              <CostumeCole kind={(['design', 'build', 'ship'] as const)[k]} delay={k * 0.25} />
              <div className="w-row"><h2 className="w">{s.word}<i>.</i></h2>{s.free && <span className="freetag">{t.card.free}</span>}</div>
              <Html as="p" html={s.text} />
            </div>
          ))}
        </div>
      </section>

      <section className="wrap sec" aria-labelledby="featured">
        <div className="sec-h" data-reveal><h2 className="h2" id="featured">{t.featured.title}</h2><Link className="lnk" href={href(lang, '/work')}>{t.featured.seeAll}</Link></div>
        <div data-reveal>
          <FeaturedStack items={work} words={{ read: t.featured.read, seeAll: t.featured.seeAll, seeAllHref: href(lang, '/work'), hint: t.featured.hint, prev: t.caseStudy.prev, next: t.caseStudy.next, open: t.card.open }} />
        </div>
      </section>

      <section className="wrap sec" aria-labelledby="pricing">
        <div className="sec-h" data-reveal>
          <div><h2 className="h2" id="pricing">{t.pricing.title}</h2><p className="lede">{t.pricing.sub}</p></div>
          <Link className="lnk" href={href(lang, '/services')}>{t.pricing.all}</Link>
        </div>
        <div className="tiers" data-reveal>
          {t.pricing.tiers.map((x, k) => (
            <Link key={x.name} className={'tier' + (k === 0 ? ' hot' : '')} href={href(lang, '/services')}>
              <span className="t-n">{x.name}</span>
              <span className="t-w">{x.who}<em>{t.pricing.great}: {x.great}</em></span>
              <span className="t-p"><b>{x.price}</b><small>{x.monthly}</small></span>
              <Chevron />
            </Link>
          ))}
        </div>
        <p className="note">{t.pricing.note}</p>
      </section>

      <section className="wrap sec" aria-labelledby="why">
        <div className="why">
          <div data-reveal>
            <div className="pk photo-pk"><ColePeek /><div className="photo"><Image src="/images/gus.webp" alt={t.about.photoAlt} fill sizes="(max-width: 900px) 300px, 380px" /></div></div>
            <figure className="quote"><blockquote>&ldquo;{t.quote.text}&rdquo;</blockquote><Html as="figcaption" html={t.quote.source} /></figure>
          </div>
          <div data-reveal>
            <h2 className="h2" id="why">{t.why.title}</h2>
            <div className="rlist">{t.why.reasons.map(r => <div key={r.title}><b>{r.title}</b><p>{r.body}</p></div>)}</div>
            <div className="acts"><Link className="btn ghost" href={href(lang, '/about')}>{t.why.more}</Link></div>
          </div>
        </div>
      </section>

      <section className="wrap sec close" aria-labelledby="build">
        <div className="cl3-h" data-reveal>
          <Mark className="bm" />
          <div><h2 className="cl-h gl" id="build">{t.close.title}</h2><p className="cl-p">{t.close.text}</p></div>
          <QuickForm t={t.close} estimateHref={href(lang, '/') + '#estimate'} toastSent={t.toast.sent} />
        </div>
        <div className="pk close-pk"><ColePeek center say={lang === 'es' ? '¡hola!' : 'hey!'} /><Socials t={t} /></div>
      </section>
    </>
  )
}
