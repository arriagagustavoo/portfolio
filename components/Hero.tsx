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
  return <span className={className}><span className="vh">{text}</span><span aria-hidden="true">{shown}</span></span>
}

/** Three fixed lines. The business word sits in a slot as wide as the longest word, so nothing reflows,
 *  and the size follows the column continuously, never past the point where a line would not fit. */
export function Headline({ lines, words }: { lines: string[]; words: string[] }) {
  const h = useRef<HTMLHeadingElement>(null)
  const w = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = h.current!, slot = el.querySelector<HTMLElement>('.slot')!
    // Measured once (and again when the words change): the slot gets the longest word's width in em and the
    // headline publishes its widest line in em as --k. CSS then sizes it as min(fluid size, column / k),
    // so it scales continuously with the column while the window is being resized, with no JS on resize.
    const fit = () => {
      const fs = parseFloat(getComputedStyle(el).fontSize)
      const meas = document.createElement('span'); meas.className = 'word'; meas.style.cssText = 'position:absolute;visibility:hidden;white-space:pre;left:-9999px'
      el.appendChild(meas)
      let sw = 0; words.forEach(x => { meas.textContent = x; sw = Math.max(sw, meas.getBoundingClientRect().width) })
      meas.remove()
      slot.style.width = ((sw + 6) / fs).toFixed(3) + 'em'
      const widest = Math.max(...[...el.querySelectorAll<HTMLElement>('.ln')].map(l => l.getBoundingClientRect().width))
      el.style.setProperty('--k', (widest / fs + 0.04).toFixed(3))
    }
    const ready = (document as Document & { fonts?: FontFaceSet }).fonts?.ready ?? Promise.resolve()
    ready.then(fit)
    let i = 0, iv = 0
    // the word pauses while you hover or focus the headline, and when the tab is hidden
    let paused = false
    const hold = () => { paused = true }, go = () => { paused = false }
    el.addEventListener('pointerenter', hold); el.addEventListener('pointerleave', go)
    if (!reduced()) iv = window.setInterval(() => { if (paused || document.hidden) return; i = (i + 1) % words.length; if (w.current) decode(w.current, words[i], 420) }, 2600)
    return () => { clearInterval(iv); el.removeEventListener('pointerenter', hold); el.removeEventListener('pointerleave', go) }
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
