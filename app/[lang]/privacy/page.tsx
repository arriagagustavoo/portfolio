import type { Metadata } from 'next'
import { getDict } from '@/lib/content/site'
import type { Lang } from '@/lib/i18n'
import { pageMeta } from '@/lib/seo'

type P = { params: Promise<{ lang: Lang }> }
export async function generateMetadata({ params }: P): Promise<Metadata> { const { lang } = await params; return pageMeta(lang, 'privacy', '/privacy') }

export default async function Privacy({ params }: P) {
  const { lang } = await params
  const p = getDict(lang).privacy as Record<string, string | string[]>
  return (
    <section className="wrap sec first prose">
      <h1 className="h1">{p.title}</h1>
      <p className="note">{p.updated}</p>
      {Object.entries(p).filter(([k]) => k !== 'title' && k !== 'updated').map(([k, v]) =>
        Array.isArray(v) ? <ul key={k}>{v.map(x => <li key={x}>{x}</li>)}</ul> : k.endsWith('Heading') ? <h2 key={k}>{v}</h2> : <p key={k}>{v}</p>)}
    </section>
  )
}
