'use client'
import { useEffect, useRef, useState } from 'react'

const GLY = '#%&/[]:<>=+*01'
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches

/** the old site's scramble: glyphs resolve into the text left to right */
export function decode(el: HTMLElement, text: string, dur = 400) {
  if (reduced()) { el.textContent = text; return }
  const t0 = performance.now()
  const tick = (t: number) => {
    const k = Math.min(1, (t - t0) / dur), n = Math.floor(k * text.length)
    let o = text.slice(0, n)
    for (let i = n; i < text.length; i++) o += text[i] === ' ' ? ' ' : GLY[(Math.random() * GLY.length) | 0]
    el.textContent = o
    if (k < 1) requestAnimationFrame(tick); else el.textContent = text
  }
  requestAnimationFrame(tick)
}

/** "// hey, I'm Gus" typed out once */
export function Typed({ text, className }: { text: string; className?: string }) {
  const [shown, setShown] = useState(text)
  useEffect(() => {
    if (reduced()) return
    let i = 0, t = 0
    setShown('')
    const step = () => { setShown(text.slice(0, ++i)); if (i < text.length) t = window.setTimeout(step, 55 + Math.random() * 40) }
    t = window.setTimeout(step, 350)
    return () => clearTimeout(t)
  }, [text])
  return <span className={className} aria-label={text}><span aria-hidden="true">{shown}</span></span>
}

/** Three fixed lines. The business word sits in a slot as wide as the longest word, so nothing reflows,
 *  and the size steps down only if a line would not fit its column. */
export function Headline({ lines, words }: { lines: string[]; words: string[] }) {
  const h = useRef<HTMLHeadingElement>(null)
  const w = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = h.current!, slot = el.querySelector<HTMLElement>('.slot')!
    const fit = () => {
      el.style.fontSize = ''
      const avail = el.parentElement!.clientWidth
      let fs = parseFloat(getComputedStyle(el).fontSize)
      const meas = document.createElement('span'); meas.className = 'word'; meas.style.cssText = 'position:absolute;visibility:hidden;white-space:pre;left:-9999px'
      el.appendChild(meas)
      for (;;) {
        el.style.fontSize = fs + 'px'
        let sw = 0; words.forEach(x => { meas.textContent = x; sw = Math.max(sw, meas.getBoundingClientRect().width) })
        slot.style.width = Math.ceil(sw + 6) + 'px'
        const widest = Math.max(...[...el.querySelectorAll<HTMLElement>('.ln')].map(l => l.getBoundingClientRect().width))
        if (widest <= avail || fs <= 28) break
        fs -= 2
      }
      meas.remove()
    }
    const ready = (document as Document & { fonts?: FontFaceSet }).fonts?.ready ?? Promise.resolve()
    ready.then(fit)
    let rz = 0
    const onR = () => { clearTimeout(rz); rz = window.setTimeout(fit, 120) }
    addEventListener('resize', onR)
    let i = 0, iv = 0
    if (!reduced()) iv = window.setInterval(() => { i = (i + 1) % words.length; if (w.current) decode(w.current, words[i], 420) }, 2600)
    return () => { removeEventListener('resize', onR); clearInterval(iv) }
  }, [words])
  return (
    <h1 className="hl" ref={h}>
      <span className="ln">{lines[0]}</span>{' '}
      <span className="ln">{lines[1]}</span>{' '}
      <span className="ln">{lines[2]} <span className="slot"><span className="word gl" ref={w}>{words[0]}</span></span></span>
      <span className="vh"> ({words.map(x => x.replace('.', '')).join(', ')})</span>
    </h1>
  )
}
