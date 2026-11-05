'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState, ViewTransition } from 'react'
import { Chevron, Chips } from './bits'

type P = { title: string; url: string; href: string; doc?: boolean; text: string; skills: string[]; shots: string[] }
const flash = (el: Element | null) => { if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return; el.classList.remove('flash'); void (el as HTMLElement).offsetWidth; el.classList.add('flash') }

/** featured work: three browser windows stacked like a desktop. Arrows flip screenshots, the front screen opens the case study */
export function FeaturedStack({ items, words }: { items: P[]; words: { read: string; seeAll: string; seeAllHref: string; hint: string; prev: string; next: string; open: string } }) {
  const [order, setOrder] = useState(items.map((_, k) => k))
  const [shot, setShot] = useState(items.map(() => 0))
  const wins = useRef<(HTMLDivElement | null)[]>([])
  const front = order[0]
  const toFront = (k: number) => { if (k === front) return; setOrder([k, ...order.filter(x => x !== k)]); setTimeout(() => flash(wins.current[k]), 380) }
  const flip = (k: number, d: number) => { setShot(s => s.map((v, j) => (j === k ? (v + d + items[k].shots.length) % items[k].shots.length : v))); flash(wins.current[k]?.querySelector('.screen') ?? null) }
  const cur = items[front]
  return (
    <div className="stack">
      <div>
        <div className="plist" role="list">
          {items.map((p, k) => <button key={p.title} type="button" role="listitem" aria-current={k === front} onClick={() => toFront(k)}>{p.title}</button>)}
        </div>
        <div className="pdet" aria-live="polite">
          <p>{cur.text}</p>
          <Chips names={cur.skills} />
          <Link className="lnk" href={cur.href} transitionTypes={['nav-forward']}>{words.read}</Link>
          <Link className="lnk" href={words.seeAllHref}>{words.seeAll}</Link>
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
                  <Image src={p.shots[shot[k]]} alt="" fill sizes="(max-width: 900px) 92vw, 900px" style={{ objectFit: p.doc ? 'contain' : 'cover', objectPosition: p.doc ? 'center' : 'top left' }} />
                  <span className="open">{words.read}</span>
                </Link>
              </div>
              </ViewTransition>
            )
          })}
        </div>
        <p className="deck-cap">{words.hint}</p>
      </div>
    </div>
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

/** case study gallery: the arrows in the title bar, five thumbnails and a "+N" tile for the rest */
export function Gallery({ shots, url, doc, alts, more, label, vt }: { shots: string[]; url: string; doc?: boolean; alts: string[]; more: string; label: string; vt: string }) {
  const [i, setI] = useState(0)
  const view = useRef<HTMLDivElement>(null)
  const go = (n: number) => { setI((n + shots.length) % shots.length); flash(view.current) }
  const rest = shots.length - 5
  return (
    <div>
      <ViewTransition name={vt} share="morph" default="none">
      <div className="browser">
        <div className="chrome">
          <span className="lights"><i /><i /><i /></span><span className="url">{url}</span>
          <span className="sw" style={{ display: 'flex', alignItems: 'center', gap: 2, fontFamily: 'var(--mono)', fontSize: '.72rem', color: 'var(--fg-3)' }}>
            <button className="icon-b sm" type="button" aria-label={label + " −1"} onClick={() => go(i - 1)}><Chevron dir="left" className="chv" /></button>
            <span>{i + 1}/{shots.length}</span>
            <button className="icon-b sm" type="button" aria-label={label + " +1"} onClick={() => go(i + 1)}><Chevron className="chv" /></button>
          </span>
        </div>
        <div className={'screen' + (doc ? ' doc' : '')} ref={view} style={doc ? { aspectRatio: '4 / 3' } : undefined}>
          <Image src={shots[i]} alt={alts[i] ?? ''} fill sizes="(max-width: 900px) 92vw, 760px" style={{ objectFit: doc ? 'contain' : 'cover', objectPosition: doc ? 'center' : 'top left' }} priority />
        </div>
      </div>
      </ViewTransition>
      <div className="gal-t cols">
        {shots.slice(0, 5).map((s, k) => (
          <button key={s} type="button" aria-label={`${label} ${k + 1}`} aria-current={i === k} onClick={() => go(k)} style={doc ? { aspectRatio: '4 / 3' } : undefined}>
            <Image src={s} alt="" width={200} height={doc ? 150 : 97} style={{ objectFit: doc ? 'contain' : 'cover' }} />
          </button>
        ))}
        {rest > 0 && <button type="button" className="more" aria-label={`+${rest} ${more}`} onClick={() => go(5)} style={doc ? { aspectRatio: '4 / 3' } : undefined}>+{rest}</button>}
      </div>
    </div>
  )
}
