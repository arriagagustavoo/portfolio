import type { Metadata } from 'next'
import { ColePeek } from '@/components/Cole'
import { ContactForm } from '@/components/Forms'
import { Socials } from '@/components/Socials'
import { getDict } from '@/lib/content/site'
import type { Lang } from '@/lib/i18n'
import { crumbs, JsonLd, pageMeta } from '@/lib/seo'

type P = { params: Promise<{ lang: Lang }> }
export async function generateMetadata({ params }: P): Promise<Metadata> { const { lang } = await params; return pageMeta(lang, 'contact', '/contact') }

export default async function Contact({ params }: P) {
  const { lang } = await params
  const t = getDict(lang), c = t.contact
  return (
    <section className="wrap sec first">
      <JsonLd data={crumbs(lang, [[t.nav.home, '/'], [t.nav.contact, '/contact']])} />
      <div className="ct2">
        <div>
          <h1 className="h1">{c.title}<span className="g">.</span></h1>
          <p className="lede" style={{ marginTop: '.875rem' }}>{c.intro}</p>
          <Socials t={t} two />
          <p className="where">{c.where}</p>
        </div>
        <div className="pk"><ColePeek /><ContactForm t={c.form} errText={t.close.error} toastSent={t.toast.sent} failed={t.close.failed} /></div>
      </div>
    </section>
  )
}
