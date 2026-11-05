'use client'
// Site-wide behavior that has no markup of its own: the background, toasts, smooth scroll and scroll reveals.
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import type { ToastOpts } from '@/lib/toast'
import { swapLang, type Lang } from '@/lib/i18n'

const LOG = [
  ['09:41:02', 'deploy', 'site ready on vercel  38s'], ['09:41:07', 'estimate', 'type=barbershop pages=3 es=true'], ['09:42:15', 'lighthouse', 'perf 99  a11y 100  seo 100'],
  ['09:43:30', 'commit', 'hero: glitch the business name'], ['09:44:12', 'portal', 'contract signed  invoice sent'], ['09:45:40', 'es', 'traducción lista, 6 páginas'],
  ['09:46:03', 'figma', 'home v3 approved'], ['09:47:21', 'dns', 'domain connected, ssl on'], ['09:48:55', 'form', 'new message from the contact page'],
  ['09:50:10', 'commit', 'mobile: bigger tap targets'], ['09:51:44', 'google', 'listing verified, maps pin set'], ['09:52:30', 'care', 'monthly report sent'],
]

/** the carousel log text, drifting, lit only around the cursor */
export function Backdrop() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current!
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    let tx = 30, ty = 25, cx = 30, cy = 25, raf = 0
    const loop = () => {
      cx += (tx - cx) * 0.12; cy += (ty - cy) * 0.12
      el.style.setProperty('--mx', cx.toFixed(2) + '%'); el.style.setProperty('--my', cy.toFixed(2) + '%')
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.1 ? requestAnimationFrame(loop) : 0
    }
    let lastMove = 0
    const move = (e: PointerEvent) => { lastMove = performance.now(); tx = (e.clientX / innerWidth) * 100; ty = (e.clientY / innerHeight) * 100; if (!raf) raf = requestAnimationFrame(loop) }
    addEventListener('pointermove', move, { passive: true })
    const rows = [...el.querySelectorAll<HTMLElement>('.logs div')]
    let drift = 0
    if (!reduce && matchMedia('(hover: hover) and (min-width: 901px)').matches) {
      let s = 0, prev = performance.now()
      const step = (t: number) => {
        if (t - lastMove < 4000 && !document.hidden && !matchMedia('(prefers-reduced-motion: reduce)').matches) s += (t - prev) / 1000
        prev = t
        rows.forEach((r, k) => { const d = k % 2 ? 1 : -1; r.style.transform = `translate3d(${((d * s * (9 + (k % 3) * 3)) % 600) - (d > 0 ? 600 : 0)}px,0,0)` })
        drift = requestAnimationFrame(step)
      }
      drift = requestAnimationFrame(step)
    }
    return () => { removeEventListener('pointermove', move); cancelAnimationFrame(raf); cancelAnimationFrame(drift) }
  }, [])
  const rows = Array.from({ length: 30 }, (_, r) => Array.from({ length: 4 }, (_, c) => { const l = LOG[(r * 3 + c * 5) % LOG.length]; return `[${l[0]}]  ${l[1]}  ${l[2]}          ` }).join(''))
  return (
    <div className="backdrop" ref={ref} aria-hidden="true">
      <div className="stripes" /><div className="light" />
      <div className="logs">{rows.map((r, i) => <div key={i}>{r}</div>)}</div>
    </div>
  )
}

type T = ToastOpts & { id: number; msg: string; state: 'new' | 'in' | 'out' }
/** toasts: a dot that springs open into a pill (the Sileo feel), plus the "¿Prefieres español?" nudge */
export function Toasts({ lang, words }: { lang: Lang; words: { es: string; en: string; prefer: string; change: string } }) {
  const [list, setList] = useState<T[]>([])
  const path = usePathname() || '/'
  useEffect(() => {
    let id = 0
    const on = (e: Event) => {
      const d = (e as CustomEvent).detail as ToastOpts & { msg: string }
      const t: T = { ...d, id: ++id, state: 'new' }
      setList(l => [t, ...l].slice(0, 3))
      requestAnimationFrame(() => requestAnimationFrame(() => setList(l => l.map(x => (x.id === t.id ? { ...x, state: 'in' } : x)))))
      setTimeout(() => setList(l => l.map(x => (x.id === t.id ? { ...x, state: 'out' } : x))), d.ms ?? 3200)
      setTimeout(() => setList(l => l.filter(x => x.id !== t.id)), (d.ms ?? 3200) + 450)
    }
    addEventListener('toast', on)
    return () => removeEventListener('toast', on)
  }, [])
  // after a language switch, say so on the new page
  useEffect(() => {
    let to: string | null = null
    try { to = sessionStorage.getItem('langToast'); sessionStorage.removeItem('langToast') } catch {}
    if (to === lang) setTimeout(() => dispatchEvent(new CustomEvent('toast', { detail: { msg: lang === 'es' ? words.es : words.en, icon: lang.toUpperCase() } })), 250)
  }, [lang, words])
  // a Spanish-language browser on an English page gets one gentle offer, once
  useEffect(() => {
    if (lang !== 'en') return
    let seen = false
    try { seen = !!localStorage.getItem('esNudge') } catch {}
    if (seen || !(navigator.language || '').toLowerCase().startsWith('es')) return
    const t = setTimeout(() => {
      try { localStorage.setItem('esNudge', '1') } catch {}
      dispatchEvent(new CustomEvent('toast', { detail: { msg: words.prefer, icon: 'Ñ', kind: 'info', ms: 7000, action: { label: words.change, href: swapLang(path, 'es') } } }))
    }, 1600)
    return () => clearTimeout(t)
  }, [lang, path, words])
  return (
    <div className="toasts" aria-live="polite">
      {list.map(t => (
        <div key={t.id} role="status" className={'toast' + (t.kind ? ' ' + t.kind : '') + (t.state === 'in' ? ' in' : t.state === 'out' ? ' out' : '')}>
          <span className="ti">{t.icon ?? '✓'}</span><span className="tm">{t.msg}</span>
          {t.action && <a className="ta" href={t.action.href} onClick={() => { try { sessionStorage.setItem('langToast', 'es') } catch {} }}>{t.action.label}</a>}
        </div>
      ))}
    </div>
  )
}

/** Lenis smooth scrolling (off for reduced motion), and reveals that rise once as they come into view */
export function Motion() {
  const path = usePathname()
  useEffect(() => {
    // smooth scrolling is a vestibular trigger: never started under reduced motion, and torn down if the setting changes
    const mq = matchMedia('(prefers-reduced-motion: reduce)')
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null, raf = 0, alive = true
    const start = () => {
      if (mq.matches || lenis) return
      import('lenis').then(({ default: Lenis }) => {
        if (!alive || mq.matches || lenis) return
        lenis = new Lenis({ lerp: 0.11, smoothWheel: true }) as unknown as typeof lenis
        const loop = (t: number) => { lenis?.raf(t); raf = requestAnimationFrame(loop) }
        raf = requestAnimationFrame(loop)
      })
    }
    const stop = () => { cancelAnimationFrame(raf); lenis?.destroy(); lenis = null }
    const change = () => (mq.matches ? stop() : start())
    start(); mq.addEventListener('change', change)
    return () => { alive = false; mq.removeEventListener('change', change); stop() }
  }, [])
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { rootMargin: '0px 0px -8% 0px' })
    document.querySelectorAll('[data-reveal]:not(.in)').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [path])
  return null
}
