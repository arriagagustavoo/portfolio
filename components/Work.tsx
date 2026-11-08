'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState, ViewTransition } from 'react'
import { Chevron, Chips } from './bits'

type P = { title: string; url: string; href: string; doc?: boolean; text: string; skills: string[]; shots: string[] }
const flash = (el: Element | null) => { if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return; el.classList.remove('flash'); void (el as HTMLElement).offsetWidth; el.classList.add('flash') }

/** featured work: three browser windows stacked like a desktop. Arrows flip screenshots, the front screen opens the case study */
export function FeaturedStack({ head, items, words }: { head?: React.ReactNode; items: P[]; words: { read: string; seeAll: string; seeAllHref: string; hint: string; prev: string; next: string; open: string } }) {
  const [order, setOrder] = useState(items.map((_, k) => k))
  const [shot, setShot] = useState(items.map(() => 0))
  const wins = useRef<(HTMLDivElement | null)[]>([])
  const front = order[0]
  const toFront = (k: number) => {
    if (k === front) return
    setOrder([k, ...order.filter(x => x !== k)]); setTimeout(() => flash(wins.current[k]), 380)
    // on phones the rows sit under the window, so bring the window back into view if it scrolled away
    const deck = wins.current[k]?.parentElement, top = deck?.getBoundingClientRect().top ?? 0
    if (top < 0 && deck && getComputedStyle(deck.closest('.stack')!).flexDirection === 'column') scrollBy({ top: top - 88, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }
  const flip = (k: number, d: number) => { setShot(s => s.map((v, j) => (j === k ? (v + d + items[k].shots.length) % items[k].shots.length : v))); flash(wins.current[k]?.querySelector('.screen') ?? null) }
  const cur = items[front]
  return (
    <div className="stack-c"><div className="stack">
      <div>
        {head}
        <div className="plist" role="group" aria-labelledby="featured">
          {items.map((p, k) => <button key={p.title} type="button" aria-pressed={k === front} onClick={() => toFront(k)}>{p.title}</button>)}
        </div>
        <Link className="pall" href={words.seeAllHref}>{words.seeAll}<Chevron className="chv" /></Link>
        <div className="pdet" aria-live="polite">
          <p>{cur.text}</p>
          <Chips names={cur.skills} />
          <Link className="lnk" href={cur.href} transitionTypes={['nav-forward']}>{words.read}</Link>
        </div>
      </div>
      <div>
        <div className="deck">
          {items.map((p, k) => {
            const pos = order.indexOf(k)
            return (
              <ViewTransition key={p.title} name={'shot-' + p.href.split('/').pop()} share="morph" default="none">
              <div ref={el => { wins.current[k] = el }} className="win browser" data-p={pos} onClick={() => pos !== 0 && toFront(k)} aria-hidden={pos !== 0}>
                <div className="chrome">
                  <span className="lights"><i /><i /><i /></span><span className="url">{p.url}</span>
                  <span className="sw">
                    <button type="button" aria-label={words.prev} tabIndex={pos === 0 ? 0 : -1} onClick={ev => { ev.stopPropagation(); flip(k, -1) }}><Chevron dir="left" className="chv" /></button>
                    <span>{shot[k] + 1}/{p.shots.length}</span>
                    <button type="button" aria-label={words.next} tabIndex={pos === 0 ? 0 : -1} onClick={ev => { ev.stopPropagation(); flip(k, 1) }}><Chevron className="chv" /></button>
                  </span>
                </div>
                <Link className={'screen' + (p.doc ? ' doc' : '')} href={p.href} transitionTypes={['nav-forward']} tabIndex={pos === 0 ? 0 : -1} aria-label={`${words.open}: ${p.title}`} onClick={ev => { if (pos !== 0) ev.preventDefault() }}>
                  <Image src={p.shots[shot[k]]} alt="" fill sizes="(max-width: 56rem) 92vw, 63vw" style={{ objectFit: p.doc ? 'contain' : 'cover', objectPosition: p.doc ? 'center' : 'top left' }} />
                  <span className="open">{words.read}</span>
                </Link>
              </div>
              </ViewTransition>
            )
          })}
        </div>
        <p className="deck-cap">{words.hint}</p>
      </div>
    </div></div>
  )
}

/** the Work page: a filter that slides the cards to their new places (hiding is plain CSS on data-f) */
export function WorkGrid({ filters, kinds, empty, children }: { filters: [string, string][]; kinds: string[]; empty: string; children: React.ReactNode }) {
  const [f, setF] = useState('all')
  const grid = useRef<HTMLDivElement>(null)
  useEffect(() => { const q = new URLSearchParams(location.search).get('type'); if (q && filters.some(([k]) => k === q)) setF(q) }, []) // eslint-disable-line react-hooks/exhaustive-deps
  const pick = (k: string) => {
    const u = new URL(location.href); if (k === 'all') u.searchParams.delete('type'); else u.searchParams.set('type', k); history.replaceState(history.state, '', u)
    const cards = [...(grid.current?.querySelectorAll<HTMLElement>('.wcard') ?? [])]
    const first = new Map(cards.map(c => [c, c.getBoundingClientRect()]))
    setF(k)
    requestAnimationFrame(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
      cards.filter(c => c.offsetParent !== null).forEach(c => {
        const a = first.get(c)!, z = c.getBoundingClientRect()
        if (a.width) c.animate([{ transform: `translate(${a.left - z.left}px,${a.top - z.top}px)` }, { transform: 'none' }], { duration: 450, easing: 'cubic-bezier(.23,1,.32,1)' })
        else c.animate([{ opacity: 0, transform: 'scale(.96)' }, { opacity: 1, transform: 'none' }], { duration: 350, easing: 'ease-out' })
      })
    })
  }
  const none = f !== 'all' && !kinds.includes(f)
  return (
    <>
      <div className="filt" role="group">
        {filters.map(([k, l]) => <button key={k} type="button" aria-pressed={f === k} onClick={() => pick(k)}>{l}</button>)}
      </div>
      <div className="wgrid cols" ref={grid} data-f={f}>{children}</div>
      {none && <p className="note">{empty}</p>}
    </>
  )
}

export type GShot = { src: string; alt: string; w: number; h: number; phone?: string; group?: string }
type GWords = { more: string; shot: string; close: string; screens: string; groups: Record<string, string>; phone: string; prev: string; next: string; expand: string; all: string; one: string; desk: string; phoneTab: string }

/** an iphone drawn in css around a phone screenshot, with the status bar the home screen app sits under */
function Phone({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="iphone">
      <div className="iphone-body">
      <div className="iphone-scr">
        <div className="iphone-bar" aria-hidden="true">
          <b>9:41</b><i className="iphone-di" />
          <svg viewBox="0 0 66 12"><path d="M1 9h3v3H1zM6 6h3v6H6zM11 3h3v9h-3zM16 0h3v12h-3z" /><path d="M31 3.6a10 10 0 0 1 13 0l-1.5 1.6a7.8 7.8 0 0 0-10 0zM34 6.8a5.6 5.6 0 0 1 7 0L37.5 10.5z" /><rect x="48.5" y=".5" width="15" height="11" rx="3" fill="none" stroke="currentColor" opacity=".45" /><rect x="50" y="2" width="11" height="8" rx="1.8" /><path d="M64.8 4.2v3.6a1.9 1.9 0 0 0 0-3.6z" opacity=".45" /></svg>
        </div>
        <Image src={src} alt={alt} width={1179} height={2394} sizes="(max-width: 56rem) 40vw, 12vw" />
      </div>
      </div>
    </div>
  )
}

/** a horizontal swipe on a touch screen flips; returns handlers and whether the last touch was a swipe (so it doesn't also count as a tap) */
function useSwipe(on: (dir: number) => void) {
  const x0 = useRef<number | null>(null), swiped = useRef(false)
  return {
    swiped,
    h: {
      onPointerDown: (e: React.PointerEvent) => { swiped.current = false; x0.current = e.pointerType === 'touch' ? e.clientX : null },
      onPointerUp: (e: React.PointerEvent) => { if (x0.current == null) return; const dx = e.clientX - x0.current; x0.current = null; if (Math.abs(dx) > 40) { swiped.current = true; on(dx < 0 ? 1 : -1) } },
    },
  }
}

/** ‹ 2 / 11 ›: the one place the arrows live, under the window and in the viewer, so they never move */
function Nav({ at, of, prev, next, w }: { at: number; of: number; prev: () => void; next: () => void; w: { prev: string; next: string } }) {
  return (
    <span className="gal-nav">
      <button type="button" aria-label={w.prev} onClick={prev}><Chevron dir="left" className="chv" /></button>
      <span aria-live="polite">{at} / {of}</span>
      <button type="button" aria-label={w.next} onClick={next}><Chevron className="chv" /></button>
    </span>
  )
}

const Grid = () => <svg className="chv" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" /></svg>
const Expand = () => <svg className="chv" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" /></svg>

/** case study gallery. On the page: big arrows on the window's edges, a caption, every screen in a strip, and a click (or "View all")
 *  opens a full-screen viewer that shows one screen at a time or all of them as a grid */
export function Gallery({ shots, url, doc, vt, title, w }: { shots: GShot[]; url: string; doc?: boolean; vt: string; title: string; w: GWords }) {
  const [i, setI] = useState(0)
  const view = useRef<HTMLButtonElement>(null)
  const strip = useRef<HTMLDivElement>(null)
  const dlg = useRef<HTMLDialogElement>(null)
  const [d, setD] = useState(0)
  const [mode, setMode] = useState<'one' | 'grid'>('one')
  const [pv, setPv] = useState<'d' | 'p'>('d')
  const n = shots.length
  const go = (k: number) => { setI((k + n) % n); flash(view.current) }
  const phones = shots.some(s => s.phone)
  const groups = [...new Set(shots.map(s => s.group).filter(Boolean))] as string[]
  const inGroup = shots.map((_, k) => k).filter(k => !groups.length || shots[k].group === shots[d].group)
  const open = (k: number, m: 'one' | 'grid') => { setD(k); setMode(m); dlg.current?.showModal(); document.documentElement.style.overflow = 'hidden' }
  const step = (by: number) => setD(v => inGroup[(inGroup.indexOf(v) + by + inGroup.length) % inGroup.length])
  const page = useSwipe(by => go(i + by))
  const big = useSwipe(by => step(by))
  // keep the lit thumbnail in view inside its strip, without scrolling the page
  useEffect(() => {
    const s = strip.current, t = s?.children[i] as HTMLElement | undefined
    if (!s || !t) return
    const sr = s.getBoundingClientRect(), tr = t.getBoundingClientRect()
    s.scrollTo({ left: s.scrollLeft + tr.left - sr.left - (sr.width - tr.width) / 2, behavior: 'smooth' })
  }, [i])
  useEffect(() => {
    const el = dlg.current!
    const onClose = () => { document.documentElement.style.overflow = '' }
    const onKey = (e: KeyboardEvent) => { if (mode !== 'one') return; if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1) }
    el.addEventListener('close', onClose); el.addEventListener('keydown', onKey)
    return () => { el.removeEventListener('close', onClose); el.removeEventListener('keydown', onKey) }
  })
  const s = shots[i], o = shots[d]
  const ratio = (x: GShot) => (doc ? '4 / 3' : `${x.w} / ${x.h}`)
  return (
    <div className="gal">
      <div className={'gal-stage' + (phones ? ' has-phone' : '')}>
        <div className="gal-win">
          <ViewTransition name={vt} share="morph" default="none">
          <div className="browser">
            <div className="chrome"><span className="lights"><i /><i /><i /></span><span className="url">{url}</span></div>
            <button type="button" className={'screen gal-open' + (doc ? ' doc' : '')} ref={view} style={{ aspectRatio: ratio(s) }} aria-label={`${w.expand}: ${s.alt}`} aria-haspopup="dialog"
              onClick={() => { if (!page.swiped.current) open(i, 'one') }} {...page.h}>
              <Image src={s.src} alt={s.alt} fill sizes="(max-width: 56rem) 92vw, 53vw" style={{ objectFit: doc ? 'contain' : 'cover', objectPosition: doc ? 'center' : 'top left' }} priority />
              <span className="gal-exp" aria-hidden="true"><Expand />{w.expand}</span>
            </button>
          </div>
          </ViewTransition>
        </div>
        {s.phone && <Phone key={s.phone} src={s.phone} alt={`${s.alt}, ${w.phone}`} />}
      </div>
      <div className="gal-cap">
        <Nav at={i + 1} of={n} prev={() => go(i - 1)} next={() => go(i + 1)} w={w} />
        <p>{s.alt}</p>
        <button type="button" className="gal-all" aria-haspopup="dialog" onClick={() => open(i, 'grid')}><Grid />{w.all} <small>{n}</small></button>
      </div>
      <div className="gal-strip" ref={strip}>
        {shots.map((t, k) => (
          <button key={t.src} type="button" aria-label={`${w.shot} ${k + 1}: ${t.alt}`} aria-current={i === k} onClick={() => go(k)} style={{ aspectRatio: ratio(t) }}>
            <Image src={t.src} alt="" fill sizes="7rem" style={{ objectFit: doc ? 'contain' : 'cover', objectPosition: 'top left' }} />
          </button>
        ))}
      </div>

      <dialog ref={dlg} className="gal-dlg" aria-label={title} data-lenis-prevent data-mode={mode} data-pv={pv}>
        <div className="gd-top">
          <b>{title}</b>
          {mode === 'one' && groups.length > 1 && (
            <span className="gal-tabs" role="tablist">
              {groups.map(g => <button key={g} type="button" role="tab" aria-selected={o.group === g} onClick={() => setD(shots.findIndex(x => x.group === g))}>{w.groups[g] ?? g} <small>{shots.filter(x => x.group === g).length}</small></button>)}
            </span>
          )}
          <span className="gd-r">
            <button type="button" className="gal-all" onClick={() => setMode(m => (m === 'one' ? 'grid' : 'one'))}>{mode === 'one' ? <><Grid />{w.all}</> : <><Expand />{w.one}</>}</button>
            <button type="button" className="icon-b" onClick={() => dlg.current?.close()} aria-label={w.close}><i className="x" aria-hidden="true" /></button>
          </span>
        </div>

        {mode === 'one' ? (
          <>
            {o.phone && (
              <span className="gd-pv" role="group">
                <button type="button" aria-pressed={pv === 'd'} onClick={() => setPv('d')}>{w.desk}</button>
                <button type="button" aria-pressed={pv === 'p'} onClick={() => setPv('p')}>{w.phoneTab}</button>
              </span>
            )}
            <div className={'gd-view' + (o.phone ? ' pair' : '')} {...big.h}>
              <div className="gd-desk" style={{ aspectRatio: ratio(o) }}>
                <Image key={o.src} className="swapin" src={o.src} alt={o.alt} fill sizes="90vw" style={{ objectFit: 'contain' }} />
              </div>
              {o.phone && <Phone key={o.phone} src={o.phone} alt={`${o.alt}, ${w.phone}`} />}
            </div>
            <div className="gal-cap gd-ctl"><Nav at={inGroup.indexOf(d) + 1} of={inGroup.length} prev={() => step(-1)} next={() => step(1)} w={w} /><p>{o.alt}</p></div>
            <div className="gal-strip gd-strip">
              {inGroup.map(k => (
                <button key={shots[k].src} type="button" aria-label={shots[k].alt} aria-current={k === d} onClick={() => setD(k)} style={{ aspectRatio: ratio(shots[k]) }}>
                  <Image src={shots[k].src} alt="" fill sizes="7rem" style={{ objectFit: doc ? 'contain' : 'cover', objectPosition: 'top left' }} />
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="gd-grid">
            {(groups.length ? groups : ['']).map(g => (
              <section key={g || 'all'}>
                {g && <h3>{w.groups[g] ?? g} <small>{shots.filter(x => x.group === g).length}</small></h3>}
                <div className="gd-tiles">
                  {shots.map((t, k) => (g && t.group !== g ? null : (
                    <button key={t.src} type="button" onClick={() => { setD(k); setMode('one') }} aria-label={t.alt}>
                      <span className="gd-img" style={{ aspectRatio: ratio(t) }}><Image src={t.src} alt="" fill sizes="(max-width: 40rem) 46vw, 22vw" style={{ objectFit: doc ? 'contain' : 'cover', objectPosition: 'top left' }} /></span>
                      <span className="gd-lab">{t.alt}</span>
                    </button>
                  )))}
                </div>
              </section>
            ))}
          </div>
        )}
      </dialog>
    </div>
  )
}
