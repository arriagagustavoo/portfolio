'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ColeThumbs } from './Cole'
import { href } from '@/lib/i18n'

type T = { title: string; text: string; home: string; message: string }
export function NotFoundBody({ t }: { t: { en: T; es: T } }) {
  const lang = (usePathname() || '').startsWith('/es') ? 'es' : 'en'
  const w = t[lang]
  return (
    <section className="wrap nf">
      <ColeThumbs />
      <div>
        <h1 className="h1">{w.title}</h1>
        <p className="lede" style={{ marginTop: '.875rem' }}>{w.text}</p>
        <div className="acts"><Link className="btn" href={href(lang, '/')}>{w.home}</Link><Link className="lnk" href={href(lang, '/contact')}>{w.message}</Link></div>
      </div>
    </section>
  )
}
