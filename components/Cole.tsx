'use client'
import { useEffect, useRef } from 'react'
import { costumes, glitch, peekBack, peekFront, tear, WAVE_A, WAVE_B, thumbsUp, type Costume } from '@/lib/cole'

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches
const visible = (el: Element) => { const r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight }

/** Cole peeking over the top edge of whatever sits next to him in a .pk wrapper.
 *  He rises when it scrolls in, waves hello once, follows the cursor, blinks, glitches now and then,
 *  and hops when the element tells him to (see coleReact in lib/cole.ts). */
export function ColePeek({ say, center }: { say?: string; center?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current!
    const back = el.querySelector<SVGElement>('.back')!, front = el.querySelector<SVGElement>('.front')!
    const eyes = el.querySelector<SVGGElement>('.eyes')!, es = [...el.querySelectorAll<SVGEllipseElement>('.e')]
    const wv = el.querySelector<SVGGElement>('.wv')!, rh = front.querySelectorAll('path')[1] as SVGPathElement | undefined
    const timers: number[] = []
    let happy = false, waving = false, last = performance.now(), lastWave = 0, up = false
    const setRy = (v: number) => es.forEach(e => e.setAttribute('ry', String(v)))
    const wave = () => {
      if (reduced() || waving) return
      waving = true; lastWave = performance.now(); wv.style.display = ''; if (rh) rh.style.visibility = 'hidden'
      if (!happy) setRy(4)
      let n = 0
      const tick = () => { wv.innerHTML = n % 2 ? WAVE_B : WAVE_A; if (++n < 8) timers.push(window.setTimeout(tick, 170)); else timers.push(window.setTimeout(() => { wv.style.display = 'none'; if (rh) rh.style.visibility = ''; if (!happy) setRy(11); waving = false }, 170)) }
      tick()
    }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || up) return
      up = true; io.disconnect()
      timers.push(window.setTimeout(() => {
        el.classList.add('up')
        if (say) { timers.push(window.setTimeout(() => el.classList.add('talk'), 900)); timers.push(window.setTimeout(() => el.classList.remove('talk'), 3200)) }
        timers.push(window.setTimeout(wave, 1300))
      }, reduced() ? 0 : 600))
    }, { rootMargin: '0px 0px -20% 0px' })
    io.observe(el)
    const move = (e: PointerEvent) => {
      last = performance.now()
      const r = el.getBoundingClientRect(); if (r.bottom < -200 || r.top > innerHeight + 200) return
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height * 0.55), d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / 260)
      eyes.setAttribute('transform', `translate(${((dx / d) * 6 * k).toFixed(2)} ${((dy / d) * 4 * k).toFixed(2)})`)
    }
    const hop = (big?: boolean) => { if (reduced()) return; back.animate([{ transform: 'none' }, { transform: `translateY(${big ? -22 : -9}%)` }, { transform: 'none' }], { duration: big ? 520 : 320, easing: 'cubic-bezier(.34,1.4,.64,1)' }) }
    const react = (e: Event) => { const d = (e as CustomEvent).detail || {}; hop(d.big); if (d.happy !== undefined) { happy = d.happy; setRy(happy ? 4 : 11) } }
    el.addEventListener('cole', react)
    if (!reduced()) {
      addEventListener('pointermove', move, { passive: true })
      const blink = () => { if (!happy && !waving) { setRy(1.5); timers.push(window.setTimeout(() => setRy(11), 130)) } timers.push(window.setTimeout(blink, 2800 + Math.random() * 2600)) }
      timers.push(window.setTimeout(blink, 2400))
      const gl = () => { if (up && visible(el) && !waving) { if (Math.random() < 0.35) tear(el, back, 1.2); else { glitch(back, 1.4); glitch(front, 1.4) } } timers.push(window.setTimeout(gl, 10000 + Math.random() * 10000)) }
      timers.push(window.setTimeout(gl, 9000))
      const idle = window.setInterval(() => { if (up && visible(el) && performance.now() - last > 9000 && performance.now() - lastWave > 20000) wave() }, 800)
      timers.push(idle)
    }
    return () => { io.disconnect(); removeEventListener('pointermove', move); el.removeEventListener('cole', react); timers.forEach(t => { clearTimeout(t); clearInterval(t) }) }
  }, [say])
  return (
    <div ref={ref} className={'pkc' + (center ? ' c' : '')} aria-hidden="true">
      <span style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: peekBack + peekFront }} />
      {say && <span className="say">{say}</span>}
    </div>
  )
}

/** Cole in costume for Design / Build / Ship: the props drop on as it scrolls in, then he keeps busy */
export function CostumeCole({ kind, delay = 0 }: { kind: Costume; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current!, s = el.querySelector('svg') as SVGElement
    const es = [...el.querySelectorAll<SVGEllipseElement>('.e')], ry = es.map(e => e.getAttribute('ry') || '11')
    const timers: number[] = []
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect() } }, { rootMargin: '0px 0px -15% 0px' })
    io.observe(el)
    if (!reduced()) {
      const blink = () => { es.forEach(e => e.setAttribute('ry', '1.5')); timers.push(window.setTimeout(() => es.forEach((e, i) => e.setAttribute('ry', ry[i])), 130)); timers.push(window.setTimeout(blink, 2600 + Math.random() * 2600)) }
      timers.push(window.setTimeout(blink, 2000 + Math.random() * 2000))
      const gl = () => { if (el.classList.contains('in') && visible(el)) { if (Math.random() < 0.3) tear(el, s, 1); else glitch(s, 1.2) } timers.push(window.setTimeout(gl, 9000 + Math.random() * 9000)) }
      timers.push(window.setTimeout(gl, 7000 + Math.random() * 5000))
    }
    return () => { io.disconnect(); timers.forEach(clearTimeout) }
  }, [])
  return <div ref={ref} className="cl cos" style={{ ['--d' as string]: delay + 's', position: 'relative' }} aria-hidden="true" dangerouslySetInnerHTML={{ __html: costumes[kind] }} />
}

export function ColeThumbs({ className = 'cr' }: { className?: string }) {
  return <div className={className} aria-hidden="true" dangerouslySetInnerHTML={{ __html: thumbsUp }} />
}
