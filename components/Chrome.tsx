'use client'
// Site-wide behavior that has no markup of its own: the background, toasts, smooth scroll and scroll reveals.
import { usePathname, useRouter } from 'next/navigation'
import { sileo, Toaster } from 'sileo'
import 'sileo/styles.css'
import { useEffect, useRef } from 'react'
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
    const aim = (x: number, y: number) => { lastMove = performance.now(); tx = (x / innerWidth) * 100; ty = (y / innerHeight) * 100; if (!raf) raf = requestAnimationFrame(loop) }
    const move = (e: PointerEvent) => aim(e.clientX, e.clientY)
    addEventListener('pointermove', move, { passive: true })
    addEventListener('pointerdown', move, { passive: true })
    // touch screens have no cursor to carry the light, so it wanders on its own, slowly
    const touch = matchMedia('(hover: none)').matches
    const rows = [...el.querySelectorAll<HTMLElement>('.logs div')]
    let drift = 0
    if (!reduce) {
      let s = 0, prev = performance.now()
      const step = (t: number) => {
        const live = !document.hidden && !matchMedia('(prefers-reduced-motion: reduce)').matches
        if (live && touch && t - lastMove > 2500) { const a = t / 9000; tx = 50 + 34 * Math.sin(a); ty = 42 + 30 * Math.sin(a * 1.7 + 1); if (!raf) raf = requestAnimationFrame(loop) }
        if (live && (touch || t - lastMove < 4000)) s += (t - prev) / 1000
        prev = t
        rows.forEach((r, k) => { const d = k % 2 ? 1 : -1; r.style.transform = `translate3d(${((d * s * (9 + (k % 3) * 3)) % 600) - (d > 0 ? 600 : 0)}px,0,0)` })
        drift = requestAnimationFrame(step)
      }
      drift = requestAnimationFrame(step)
    }
    return () => { removeEventListener('pointermove', move); removeEventListener('pointerdown', move); cancelAnimationFrame(raf); cancelAnimationFrame(drift) }
  }, [])
  const rows = Array.from({ length: 30 }, (_, r) => Array.from({ length: 4 }, (_, c) => { const l = LOG[(r * 3 + c * 5) % LOG.length]; return `[${l[0]}]  ${l[1]}  ${l[2]}          ` }).join(''))
  return (
    <div className="backdrop" ref={ref} aria-hidden="true">
      <div className="stripes" /><div className="light" />
      <div className="logs">{rows.map((r, i) => <div key={i}>{r}</div>)}</div>
    </div>
  )
}

/** toasts: the real Sileo (physics springs, the gooey morph), dressed in the site's colors,
 *  plus the "¿Prefieres español?" nudge for Spanish-language browsers */
export function Toasts({ lang, words }: { lang: Lang; words: { es: string; en: string; prefer: string; change: string } }) {
  const path = usePathname() || '/'
  const router = useRouter()
  useEffect(() => {
    const on = (e: Event) => {
      const d = (e as CustomEvent).detail as ToastOpts & { msg: string }
      // Sileo draws the pill in SVG, so it gets a real color: the site's text color, flipped against the page in either theme
      const fill = getComputedStyle(document.documentElement).getPropertyValue('--fg').trim() || '#ece9e3'
      const base = { title: d.msg, duration: d.ms ?? 3600, fill, styles: { title: 'toast-t', button: 'toast-b' } }
      if (d.action) { const a = d.action; sileo.action({ ...base, button: { title: a.label, onClick: () => { try { sessionStorage.setItem('langToast', 'es') } catch {} router.push(a.href) } } }) }
      else if (d.icon === '!') sileo.error(base)
      else if (d.kind === 'info') sileo.info(base)
      else sileo.success(base)
    }
    addEventListener('toast', on)
    return () => removeEventListener('toast', on)
  }, [router])
  // after a language switch, say so on the new page
  useEffect(() => {
    let to: string | null = null
    try { to = sessionStorage.getItem('langToast'); sessionStorage.removeItem('langToast') } catch {}
    if (to === lang) setTimeout(() => dispatchEvent(new CustomEvent('toast', { detail: { msg: lang === 'es' ? words.es : words.en } })), 250)
  }, [lang, words])
  // a Spanish-language browser on an English page gets one gentle offer, once
  useEffect(() => {
    if (lang !== 'en') return
    let seen = false
    try { seen = !!localStorage.getItem('esNudge') } catch {}
    if (seen || !(navigator.languages || [navigator.language]).some(l => (l || '').toLowerCase().startsWith('es'))) return
    const t = setTimeout(() => {
      try { localStorage.setItem('esNudge', '1') } catch {}
      dispatchEvent(new CustomEvent('toast', { detail: { msg: words.prefer, kind: 'info', ms: 7000, action: { label: words.change, href: swapLang(path, 'es') } } }))
    }, 1600)
    return () => clearTimeout(t)
  }, [lang, path, words])
  return <Toaster position="top-center" offset={{ top: 72 }} theme="dark" />
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
