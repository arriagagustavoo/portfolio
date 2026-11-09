import Link from 'next/link'
import { LongLogo } from './bits'
import { FooterCta } from './FooterCta'
import { href, type Lang } from '@/lib/i18n'
import { contact, projects } from '@/lib/data'
import type { Dict } from '@/lib/content/site'

export default function Footer({ lang, t }: { lang: Lang; t: Dict }) {
  const pages = [['/', t.nav.home], ['/work', t.nav.work], ['/services', t.nav.services], ['/about', t.nav.about], ['/dev', t.nav.dev], ['/faq', t.nav.faq], ['/contact', t.nav.contact]] as const
  const ext = { target: '_blank', rel: 'noopener noreferrer' }
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-top">
          <div className="fbrand">
            <Link href={href(lang, '/')} aria-label="arriagagustavoo, home" style={{ textDecoration: 'none' }}><LongLogo /></Link>
            <p>{t.footer.about}</p>
            <FooterCta estimate={t.nav.estimate} work={t.contactCard.work} home={href(lang, '/')} workHref={href(lang, '/work')} />
          </div>
          <div className="fcols">
          <nav className="fcol" aria-label={t.footer.pages}><b>{t.footer.pages}</b>{pages.map(([p, l]) => <Link key={p} href={href(lang, p)}>{l}</Link>)}</nav>
          <nav className="fcol" aria-label={t.footer.work}><b>{t.footer.work}</b>{projects.map(p => <Link key={p.slug} href={href(lang, '/work/' + p.slug)}>{p.title}</Link>)}</nav>
          <div className="fcol"><b>{t.footer.contact}</b>
            <a href={'tel:' + contact.tel}>{contact.phone}</a>
            <a href={'mailto:' + contact.email}>{contact.email}</a>
            <a href={contact.instagram.url} {...ext}>Instagram</a>
            <a href={contact.facebook.url} {...ext}>Facebook</a>
            <a href={contact.linkedin.url} {...ext}>LinkedIn</a>
            <a href={contact.github.url} {...ext}>GitHub</a>
          </div>
          </div>
        </div>
        <div className="foot-bot"><span>{t.footer.rights}</span><span><Link href={href(lang, '/privacy')}>{t.nav.privacy}</Link> · <Link href="/" hrefLang="en">English</Link> / <Link href="/es" hrefLang="es">Español</Link></span></div>
      </div>
    </footer>
  )
}
