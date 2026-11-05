'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Icon, Mark } from './bits'
import { href, swapLang, type Lang } from '@/lib/i18n'
import type { Dict } from '@/lib/content/site'

const NAV = ['work', 'services', 'about', 'dev', 'faq', 'contact'] as const

export default function Header({ lang, nav }: { lang: Lang; nav: Dict['nav'] }) {
  const path = usePathname() || '/'
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)

  // slim and sticky: a soft surface once you scroll, hides while reading down, back on the way up
  useEffect(() => {
    let last = window.scrollY
    const on = () => {
      const y = window.scrollY
      setScrolled(y > 8)
      setHidden(y > 240 && y > last + 4)
      if (y < last - 4) setHidden(false)
      last = y
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => setOpen(false), [path])
  useEffect(() => { document.documentElement.style.overflow = open ? 'hidden' : '' }, [open])

  const cur = (k: string) => path === href(lang, '/' + k) || path.startsWith(href(lang, '/' + k) + '/')
  const theme = () => {
    const el = document.documentElement
    const next = el.dataset.theme === 'light' ? 'dark' : 'light'
    el.dataset.theme = next
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'light' ? '#e3e0d8' : '#181816')
    try { localStorage.setItem('theme', next) } catch {}
  }
  const switchTo = (to: Lang) => { try { sessionStorage.setItem('langToast', to) } catch {} }

  return (
    <>
      <header className={'site-h' + (scrolled ? ' scrolled' : '') + (hidden && !open ? ' hide' : '')}>
        <div className="wrap bar">
          <Link className="brand" href={href(lang, '/')} aria-label="arriagagustavoo, home" translate="no">
            <Mark /><span>arriagagustav<b>oo</b></span>
          </Link>
          <nav className="links" aria-label="Main">
            {NAV.map(k => <Link key={k} href={href(lang, '/' + k)} aria-current={cur(k) ? 'page' : undefined}>{nav[k]}</Link>)}
          </nav>
          <div className="utils">
            <span className="lang" role="group" aria-label={nav.language}>
              <Link href={swapLang(path, 'en')} hrefLang="en" lang="en" aria-current={lang === 'en' ? 'true' : undefined} onClick={() => switchTo('en')}>EN</Link>
              <Link href={swapLang(path, 'es')} hrefLang="es" lang="es" aria-current={lang === 'es' ? 'true' : undefined} onClick={() => switchTo('es')}>ES</Link>
            </span>
            <button className="icon-b theme" type="button" onClick={theme} aria-label={nav.theme}><Icon name="moon" className="i-moon" /><Icon name="sun" className="i-sun" /></button>
            <button className="icon-b menu-b" type="button" aria-expanded={open} aria-label={open ? nav.close : nav.menu} onClick={() => setOpen(o => !o)}><i /><i /></button>
          </div>
        </div>
      </header>
      {open && (
        <div className="mnav" id="mnav">
          {(['home', ...NAV] as const).map((k, i) => {
            const to = k === 'home' ? href(lang, '/') : href(lang, '/' + k)
            return <Link className="m" key={k} href={to} style={{ animationDelay: i * 40 + 'ms' }} aria-current={path === to ? 'page' : undefined}>{nav[k]}</Link>
          })}
          <Link className="btn" href={href(lang, '/') + '#estimate'}>{nav.estimate}</Link>
          <button className="icon-b theme" type="button" onClick={theme} aria-label={nav.theme} style={{ marginTop: '1rem' }}><Icon name="moon" className="i-moon" /><Icon name="sun" className="i-sun" /></button>
          <p>832-453-4158 · gus@arriagagustavoo.com</p>
        </div>
      )}
    </>
  )
}
