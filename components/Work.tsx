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
type GWords = { more: string; shot: string; close: string; screens: string; groups: Record<string, string>; phone: string; prev: string; next: string }

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
        <Image src={src} alt={alt} width={1179} height={2394} sizes="(max-width: 56rem) 16vw, 9vw" />
      </div>
      </div>
    </div>
  )
}

/** case study gallery: the arrows in the title bar, five thumbnails, and a "+N" tile that opens every screen in a dialog, by group when there are groups */
export function Gallery({ shots, url, doc, vt, title, w }: { shots: GShot[]; url: string; doc?: boolean; vt: string; title: string; w: GWords }) {
  const [i, setI] = useState(0)
  const view = useRef<HTMLDivElement>(null)
  const dlg = useRef<HTMLDialogElement>(null)
  const [d, setD] = useState(0)
  const go = (n: number) => { setI((n + shots.length) % shots.length); flash(view.current) }
  const rest = shots.length - 5
  const phones = shots.some(s => s.phone)
  const groups = [...new Set(shots.map(s => s.group).filter(Boolean))] as string[]
  const inGroup = shots.map((s, k) => k).filter(k => !groups.length || shots[k].group === shots[d].group)
  const open = (k: number) => { setD(k); dlg.current?.showModal(); document.documentElement.style.overflow = 'hidden' }
  const step = (by: number) => setD(v => inGroup[(inGroup.indexOf(v) + by + inGroup.length) % inGroup.length])
  useEffect(() => {
    const el = dlg.current!
    const onClose = () => { document.documentElement.style.overflow = '' }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1) }
    el.addEventListener('close', onClose); el.addEventListener('keydown', onKey)
    return () => { el.removeEventListener('close', onClose); el.removeEventListener('keydown', onKey) }
  })
  const s = shots[i], o = shots[d]
  return (
    <div>
      <div className={'gal-stage' + (phones ? ' has-phone' : '')}>
        <ViewTransition name={vt} share="morph" default="none">
        <div className="browser">
          <div className="chrome">
            <span className="lights"><i /><i /><i /></span><span className="url">{url}</span>
            <span className="sw" style={{ display: 'flex', alignItems: 'center', gap: 2, fontFamily: 'var(--mono)', fontSize: '.72rem', color: 'var(--fg-3)' }}>
              <button className="icon-b sm" type="button" aria-label={w.shot + " −1"} onClick={() => go(i - 1)}><Chevron dir="left" className="chv" /></button>
              <span>{i + 1}/{shots.length}</span>
              <button className="icon-b sm" type="button" aria-label={w.shot + " +1"} onClick={() => go(i + 1)}><Chevron className="chv" /></button>
            </span>
          </div>
          <div className={'screen' + (doc ? ' doc' : '')} ref={view} style={{ aspectRatio: doc ? '4 / 3' : `${s.w} / ${s.h}` }}>
            <Image src={s.src} alt={s.alt} fill sizes="(max-width: 56rem) 92vw, 53vw" style={{ objectFit: doc ? 'contain' : 'cover', objectPosition: doc ? 'center' : 'top left' }} priority />
          </div>
        </div>
        </ViewTransition>
        {s.phone && <Phone key={s.phone} src={s.phone} alt={`${s.alt}, ${w.phone}`} />}
      </div>
      <div className="gal-t cols">
        {shots.slice(0, 5).map((t, k) => (
          <button key={t.src} type="button" aria-label={`${w.shot} ${k + 1}`} aria-current={i === k} onClick={() => go(k)} style={{ aspectRatio: doc ? '4 / 3' : `${t.w} / ${t.h}` }}>
            <Image src={t.src} alt="" width={200} height={doc ? 150 : Math.round(200 * t.h / t.w)} style={{ objectFit: doc ? 'contain' : 'cover' }} />
          </button>
        ))}
        {rest > 0 && <button type="button" className="more" aria-label={`+${rest} ${w.more}`} aria-haspopup="dialog" onClick={() => open(5)} style={{ aspectRatio: doc ? '4 / 3' : `${shots[5].w} / ${shots[5].h}` }}>+{rest}</button>}
      </div>
      <dialog ref={dlg} className="dlg gal-dlg" aria-label={title} data-lenis-prevent onClick={e => { if (e.target === dlg.current) dlg.current?.close() }}>
        <div className="dlg-in">
          <div className="dlg-top">
            <b>{title}</b>
            {groups.length > 1 && (
              <span className="gal-tabs" role="tablist">
                {groups.map(g => {
                  const first = shots.findIndex(x => x.group === g)
                  return <button key={g} type="button" role="tab" aria-selected={o.group === g} onClick={() => setD(first)}>{w.groups[g] ?? g} <small>{shots.filter(x => x.group === g).length}</small></button>
                })}
              </span>
            )}
            <span className="dlg-n">{inGroup.indexOf(d) + 1} / {inGroup.length}</span>
            <button type="button" className="icon-b" onClick={() => dlg.current?.close()} aria-label={w.close}><i className="x" aria-hidden="true" /></button>
          </div>
          <div className={'dlg-view gal-view' + (o.phone ? ' pair' : '')}>
            <div className="gal-desk" style={doc ? { aspectRatio: '3 / 4', flex: 'none', height: '62dvh' } : { aspectRatio: `${o.w} / ${o.h}` }}>
              <Image key={o.src} className="swapin" src={o.src} alt={o.alt} fill sizes="(max-width: 56rem) 96vw, 62vw" style={{ objectFit: 'contain' }} />
            </div>
            {o.phone && <Phone key={o.phone} src={o.phone} alt={`${o.alt}, ${w.phone}`} />}
            <button type="button" className="icon-b dlg-prev" onClick={() => step(-1)} aria-label={w.prev}><Chevron dir="left" className="chv" /></button>
            <button type="button" className="icon-b dlg-next" onClick={() => step(1)} aria-label={w.next}><Chevron className="chv" /></button>
          </div>
          <div className="dlg-thumbs">
            {inGroup.map(k => (
              <button key={shots[k].src} type="button" aria-label={shots[k].alt} aria-current={k === d} onClick={() => setD(k)}>
                <Image src={shots[k].src} alt="" fill sizes="6rem" style={{ objectFit: 'cover', objectPosition: 'top left' }} />
              </button>
            ))}
          </div>
        </div>
      </dialog>
    </div>
  )
}
