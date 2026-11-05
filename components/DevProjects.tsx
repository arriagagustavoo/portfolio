'use client'
// Dev page projects: each card opens its own gallery (screens, GIFs of the game, the MRI GUI), in a native dialog.
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Chevron, Chips } from './bits'

type Project = { title: string; text: string; cover: string; shots: string[]; skills: readonly string[]; repo: string }
type Words = { repo: string; view: string; close: string; of: string; prev: string; next: string }

export function DevProjects({ items, w }: { items: Project[]; w: Words }) {
  const dlg = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState<number | null>(null)
  const [i, setI] = useState(0)
  const p = open === null ? null : items[open]
  const show = (k: number) => { setOpen(k); setI(0); dlg.current?.showModal(); document.documentElement.style.overflow = 'hidden' }
  const go = (d: number) => p && setI(v => (v + d + p.shots.length) % p.shots.length)
  useEffect(() => {
    const el = dlg.current!
    const onClose = () => { setOpen(null); document.documentElement.style.overflow = '' }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }
    el.addEventListener('close', onClose); el.addEventListener('keydown', onKey)
    return () => { el.removeEventListener('close', onClose); el.removeEventListener('keydown', onKey) }
  })
  return (
    <>
      <div className="dgrid cols">
        {items.map((x, k) => (
          <article className="dcard" key={x.cover} data-reveal style={{ transitionDelay: k * 70 + 'ms' }}>
            <button type="button" className="dimg" onClick={() => show(k)} aria-label={`${w.view}: ${x.title}`}>
              <Image src={x.cover} alt="" fill sizes="(max-width: 56rem) 92vw, 22vw" />
              <span className="dcount">{x.shots.length} {w.of}</span>
            </button>
            <h3 style={{ margin: 0 }}><button type="button" className="dtitle" onClick={() => show(k)}><b>{x.title}</b></button></h3>
            <p>{x.text}</p>
            <Chips names={x.skills} />
            {x.repo && <a className="lnk" href={x.repo} target="_blank" rel="noopener noreferrer">{w.repo}</a>}
          </article>
        ))}
      </div>
      <dialog ref={dlg} className="dlg" aria-label={p?.title} data-lenis-prevent onClick={e => { if (e.target === dlg.current) dlg.current?.close() }}>
        {p && (
          <div className="dlg-in">
            <div className="dlg-top">
              <b>{p.title}</b>
              <span className="dlg-n">{i + 1} / {p.shots.length}</span>
              <button type="button" className="icon-b" onClick={() => dlg.current?.close()} aria-label={w.close}><i className="x" aria-hidden="true" /></button>
            </div>
            <div className="dlg-view">
              <Image key={p.shots[i]} className="swapin" src={p.shots[i]} alt={`${p.title} ${i + 1}`} fill sizes="(max-width: 56rem) 96vw, 70vw" unoptimized={p.shots[i].endsWith('.gif')} style={{ objectFit: 'contain' }} />
              {p.shots.length > 1 && <>
                <button type="button" className="icon-b dlg-prev" onClick={() => go(-1)} aria-label={w.prev}><Chevron dir="left" className="chv" /></button>
                <button type="button" className="icon-b dlg-next" onClick={() => go(1)} aria-label={w.next}><Chevron className="chv" /></button>
              </>}
            </div>
            <div className="dlg-thumbs">
              {p.shots.map((s, k) => (
                <button key={s} type="button" aria-label={`${k + 1}`} aria-current={k === i} onClick={() => setI(k)}>
                  <Image src={s} alt="" fill sizes="6rem" unoptimized={s.endsWith('.gif')} />
                </button>
              ))}
            </div>
          </div>
        )}
      </dialog>
    </>
  )
}
