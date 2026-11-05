'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useLayoutEffect, useRef, useState } from 'react'
import { ColePeek } from './Cole'
import { Chevron, Html } from './bits'
import { decode } from './Hero'
import { coleReact } from '@/lib/cole'
import { sendForm } from '@/lib/send'
import { toast } from '@/lib/toast'
import type { Dict } from '@/lib/content/site'

type Mini = { title: string; url: string; href: string; src: string; doc?: boolean }
type S = { noun: keyof Dict['estimate']['nouns']; pages: number; google: number; es: boolean; acct: boolean }
const START: S = { noun: 'business', pages: 0, google: 0, es: false, acct: false }
// what each answer sets, in question order (the words live in the dictionary)
const EFFECTS: Partial<S>[][] = [
  [{ noun: 'shop' }, { noun: 'restaurant' }, { noun: 'gym' }, { noun: 'business' }, { noun: 'store' }, { noun: 'business' }],
  [{}, {}, {}],
  [{ pages: 0 }, { pages: 3 }, { pages: 5 }],
  [{ google: 0 }, { google: 1 }, { google: 2 }],
  [{ es: false }, { es: true }],
  [{ acct: false }, { acct: true }],
]
const fmt = (n: number) => '$' + n.toLocaleString('en-US')

export default function EstimateCard({ t, e, work }: { t: Dict['card']; e: Dict['estimate']; work: Mini[] }) {
  const [pane, setPane] = useState<'home' | 'price' | 'work'>('home')
  const [i, setI] = useState(0)
  const [s, setS] = useState<S>(START)
  const [picked, setPicked] = useState<number | null>(null)
  const [order, setOrder] = useState([0, 1, 2])
  const [sendOpen, setSendOpen] = useState(false)
  const [sent, setSent] = useState<string | null>(null)
  const card = useRef<HTMLDivElement>(null)
  const qRef = useRef<HTMLDivElement>(null)
  const bigRef = useRef<HTMLDivElement>(null)
  const h0 = useRef(0)

  // the card grows or shrinks smoothly whenever its content changes
  const remember = () => { h0.current = card.current?.offsetHeight ?? 0 }
  useLayoutEffect(() => {
    const el = card.current; if (!el || !h0.current) return
    const h1 = el.offsetHeight
    if (Math.abs(h1 - h0.current) > 4 && !matchMedia('(prefers-reduced-motion: reduce)').matches) el.animate([{ height: h0.current + 'px' }, { height: h1 + 'px' }], { duration: 440, easing: 'cubic-bezier(.77,0,.175,1)' })
    h0.current = 0
  })
  useLayoutEffect(() => { if (pane === 'price' && i < e.q.length && qRef.current) decode(qRef.current, e.q[i].q.replace('{n}', e.nouns[s.noun]), 320) }, [pane, i]) // eslint-disable-line react-hooks/exhaustive-deps

  const price = () => {
    let b = s.acct ? 1700 : 600, m = s.acct ? 65 : 45
    const L: [string, string][] = [[s.acct ? e.lines.accounts : e.lines.starter, fmt(b)]]
    if (s.pages) { b += 100 * s.pages; L.push([e.lines.pages, fmt(100 * s.pages)]) }
    if (s.google) { b += 250; L.push([e.lines.google, '$250']) }
    if (s.google === 2) { m += 75; L.push([e.lines.care, '$75/mo']) }
    if (s.es) { b += 300; L.push([e.lines.es, '$300']) }
    return { b, m, L }
  }
  useLayoutEffect(() => { if (i >= e.q.length && bigRef.current) decode(bigRef.current, fmt(price().b), 650) }, [i]) // eslint-disable-line react-hooks/exhaustive-deps

  const go = (p: typeof pane) => { remember(); setPane(p); coleReact(card.current, {}) }
  const answer = (k: number) => {
    setPicked(k); coleReact(card.current, {})
    setTimeout(() => {
      remember(); setS(v => ({ ...v, ...EFFECTS[i][k] })); setPicked(null)
      const n = i + 1; setI(n)
      if (n >= e.q.length) coleReact(card.current, { big: true, happy: true })
    }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 170)
  }
  const restart = () => { remember(); setI(0); setS(START); setSendOpen(false); setSent(null); coleReact(card.current, { happy: false }) }
  const send = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const f = new FormData(ev.currentTarget)
    if (f.get('botcheck')) return
    const name = String(f.get('name') || '').trim(), reach = String(f.get('reach') || '').trim()
    if (!name || !reach) return
    const p = price()
    remember(); setSent(name.split(' ')[0]); toast(e.sent.replace('{n}', name.split(' ')[0]))
    const ok = await sendForm({ subject: 'Free estimate from ' + name, name, contact: reach, estimate: p.L.map(l => l.join(': ')).join(', ') + ` | total ${fmt(p.b)} + ${fmt(p.m)}/mo`, business: e.nouns[s.noun] })
    if (!ok) { remember(); setSent(null); toast(e.failed, { icon: '!' }) }
  }

  const step = Math.min(i + 1, e.q.length)
  const top = (
    <>
      <div className="top"><span><i>//</i> {e.label}</span><span>{step} {e.of} {e.q.length}</span></div>
      <div className="segs">{e.q.map((_, k) => <i key={k} className={k <= i ? 'on' : ''} />)}</div>
    </>
  )
  const p = price()

  return (
    <div className="pk" id="estimate">
      <ColePeek />
      <div className="card ask" ref={card}>
        <span className="free-st" aria-hidden="true">{t.free}</span>
        {pane === 'home' && (
          <div className="swapin">
            <div className="top"><span><i>//</i> {t.start}</span><span>{t.minute}</span></div>
            <h2 className="ask-h">{t.hook}</h2>
            <p className="ask-p">{t.sub}</p>
            <button className="choice main" type="button" onClick={() => go('price')}><span>{t.price.title}</span><Html as="small" html={t.price.small} /><Chevron /></button>
            <button className="choice" type="button" onClick={() => go('work')}><span>{t.work.title}</span><small>{t.work.small}</small><Chevron /></button>
          </div>
        )}
        {pane === 'price' && (
          <div className="est swapin">
            <button className="bk2" type="button" onClick={() => go('home')}>{t.back}</button>
            {top}
            {i < e.q.length ? (
              <div key={i} className="swapin" aria-live="polite">
                <div className="q" ref={qRef}>{e.q[i].q.replace('{n}', e.nouns[s.noun])}</div>
                <div className="as">
                  {e.q[i].a.map((a, k) => (
                    <button key={k} className="a" type="button" style={{ animationDelay: k * 40 + 'ms' }} aria-pressed={picked === k} onClick={() => answer(k)}><span className="k">{k + 1}</span><span>{a}</span></button>
                  ))}
                </div>
                <div className="foot"><span>{e.minute}</span>{i > 0 && <button type="button" onClick={() => { remember(); setI(i - 1) }}>{e.back}</button>}</div>
              </div>
            ) : (
              <div className="res swapin">
                <p>{e.resultLead.replace('{n}', e.nouns[s.noun])}</p>
                <div className="big" ref={bigRef}>{fmt(p.b)}</div>
                <Html as="p" html={e.monthly.replace('{m}', fmt(p.m))} />
                <ul>{p.L.map(l => <li key={l[0]}><span>{l[0]}</span><span>{l[1]}</span></li>)}</ul>
                {sent ? (
                  <p className="done"><b>{e.sent.replace('{n}', sent)}</b></p>
                ) : sendOpen ? (
                  <form className="qform in" onSubmit={send}>
                    <p style={{ fontWeight: 650, color: 'var(--fg)' }}>{e.sendTitle}</p>
                    <input className="hp" type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                    <div className="qf-row cols">
                      <label className="field">{e.name}<input name="name" autoComplete="given-name" required /></label>
                      <label className="field">{e.contact}<input name="reach" autoComplete="email" spellCheck={false} placeholder="832-555-0100…" required /></label>
                    </div>
                    <div className="fact"><button className="btn" type="submit">{e.sendBtn}</button></div>
                  </form>
                ) : (
                  <div className="acts" style={{ marginTop: '.375rem' }}><button className="btn" type="button" onClick={() => { remember(); setSendOpen(true) }}>{e.send}</button></div>
                )}
                <div className="foot"><span>{e.quote}</span><button type="button" onClick={restart}>{e.again}</button></div>
              </div>
            )}
          </div>
        )}
        {pane === 'work' && (
          <div className="swapin">
            <button className="bk2" type="button" onClick={() => go('home')}>{t.back}</button>
            <div className="mstack" aria-hidden="true">
              {work.map((w, k) => (
                <div key={w.title} className="mw browser" data-p={order.indexOf(k)}>
                  <div className="chrome"><span className="lights"><i /><i /><i /></span><span className="url">{w.url}</span></div>
                  <div className={'screen' + (w.doc ? ' doc' : '')}><Image src={w.src} alt="" fill sizes="360px" style={{ objectFit: w.doc ? 'contain' : 'cover' }} /></div>
                </div>
              ))}
            </div>
            <div className="mlist">
              {work.map((w, k) => <Link key={w.title} href={w.href} onPointerEnter={() => setOrder([k, ...[0, 1, 2].filter(x => x !== k)])} onFocus={() => setOrder([k, ...[0, 1, 2].filter(x => x !== k)])}>{w.title}<span>{t.open}</span></Link>)}
            </div>
            <Link className="lnk allw" href={work[0].href.replace(/\/[^/]+$/, '')}>{t.seeAll}</Link>
          </div>
        )}
      </div>
    </div>
  )
}
