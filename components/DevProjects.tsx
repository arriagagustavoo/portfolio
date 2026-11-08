'use client'
// Dev page projects: each card opens the same full-screen viewer the case studies use (screens, GIFs of the games, the MRI GUI).
import Image from 'next/image'
import { useRef } from 'react'
import { Chips } from './bits'
import { Viewer, type GShot, type ViewerHandle, type VWords } from './Work'

type Project = { title: string; text: string; cover: string; shots: GShot[]; skills: readonly string[]; repo: string }
type Words = VWords & { repo: string; view: string; of: string }

export function DevProjects({ items, w }: { items: Project[]; w: Words }) {
  const viewers = useRef<(ViewerHandle | null)[]>([])
  const show = (k: number) => viewers.current[k]?.open(0)
  return (
    <div className="dgrid cols">
      {items.map((x, k) => (
        <article className="dcard" key={x.cover} data-reveal style={{ transitionDelay: k * 70 + 'ms' }}>
          <button type="button" className="dimg" onClick={() => show(k)} aria-label={`${w.view}: ${x.title}`} aria-haspopup="dialog">
            <Image src={x.cover} alt="" fill sizes="(max-width: 56rem) 92vw, 22vw" />
            <span className="dcount">{x.shots.length} {w.of}</span>
          </button>
          <h3 style={{ margin: 0 }}><button type="button" className="dtitle" onClick={() => show(k)}><b>{x.title}</b></button></h3>
          <p>{x.text}</p>
          <Chips names={x.skills} />
          {x.repo && <a className="lnk" href={x.repo} target="_blank" rel="noopener noreferrer">{w.repo}</a>}
          <Viewer ref={el => { viewers.current[k] = el }} shots={x.shots} title={x.title} w={w} />
        </article>
      ))}
    </div>
  )
}
