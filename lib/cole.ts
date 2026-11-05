// Cole, the two dots of the [:] logo with arms, drawn on the same 10px grid as the Reels (src/mascot/poses.json there).
const G = '#1E9E45'
export const px = (pts: number[][], fill = G) => `<path fill="${fill}" d="${pts.map(p => `M${p[0]} ${p[1]}h10v10h-10z`).join('')}"/>`
const SH = '<path d="M74 76H154V86H164V166H154V176H74V166H64V86H74Z" fill="#1E9E45"/>'
const BODY = '<path d="M80 70H160V80H170V160H160V170H80V160H70V80H80Z" fill="#161616" stroke="#F2F2F2" stroke-width="3"/>'
const eyes = (x: number, y: number, rx: number, ry: number) => `<g class="eyes"><ellipse class="e" cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#F2F2F2"/><ellipse class="e" cx="${x + 36}" cy="${y}" rx="${rx}" ry="${ry}" fill="#F2F2F2"/></g>`
const mouth = (y: number, h: number) => `<rect x="108" y="${y}" width="24" height="${h}" fill="#1E9E45"/>`
export const svg = (vb: string, inner: string, cls = '') => `<svg${cls ? ` class="${cls}"` : ''} viewBox="${vb}" overflow="visible" aria-hidden="true" focusable="false">${inner}</svg>`

const ARM_L_DOWN = [[64, 140], [54, 140], [54, 150], [44, 160], [44, 170], [34, 180]]
const ARM_R_UP = [[166, 100], [176, 100], [186, 100], [186, 90], [196, 80], [196, 70], [196, 60]]
const CARRY_L = [[64, 140], [54, 140], [44, 140], [44, 150], [44, 160], [54, 160], [64, 160], [74, 160]]
const CARRY_R = [[166, 110], [176, 110], [186, 110], [186, 120], [186, 130], [186, 140], [186, 150], [186, 160], [176, 160], [166, 160], [156, 160]]

const BERET = '<g class="drop"><g transform="rotate(-9 124 60)"><path fill="#ff2f6d" d="M88 48h72v10h12v12H76V58h12z"/><rect x="120" y="40" width="9" height="8" fill="#ff2f6d"/><rect x="76" y="66" width="96" height="4" fill="#c21f4f"/></g></g>'
const PENCIL = '<g class="drop" style="--d:.15s"><g class="pencil"><g transform="translate(201 66) rotate(24)"><rect x="-5" y="-50" width="10" height="42" fill="#F2B705"/><rect x="-5" y="-50" width="3" height="42" fill="#D99A00"/><path d="M-5 -50 L5 -50 L0 -64Z" fill="#E8C99B"/><path d="M-2 -58 L2 -58 L0 -64Z" fill="#2a2a2a"/><rect x="-5" y="-8" width="10" height="4" fill="#a0a0a0"/><rect x="-5" y="-4" width="10" height="8" fill="#ff2f6d"/></g></g></g>'
const HAT = '<g class="drop"><path fill="#F2B705" d="M100 34h40v8h10v10h10v10h18v10H62V62h18V52h10V42h10z"/><rect x="115" y="34" width="10" height="28" fill="#D99A00"/><rect x="92" y="46" width="8" height="6" fill="#FFE27A"/><rect x="62" y="68" width="116" height="4" fill="#C98A00"/></g>'
const HAMMER = '<g class="drop" style="--d:.15s"><g class="swing"><rect x="197" y="16" width="9" height="52" fill="#9b6a3c"/><rect x="180" y="6" width="42" height="15" fill="#8d8d8d"/><rect x="180" y="6" width="42" height="4" fill="#b8b8b8"/></g></g>'
const SPARK = '<g class="spark" fill="#F2B705"><rect x="224" y="-2" width="6" height="6"/><rect x="232" y="12" width="6" height="6"/><rect x="172" y="-8" width="6" height="6"/><rect x="214" y="-14" width="5" height="5"/></g>'
const BOX = '<rect x="58" y="118" width="124" height="76" fill="#C68B4E"/><rect x="58" y="118" width="124" height="10" fill="#A8713A"/><rect x="113" y="118" width="14" height="76" fill="#E5C08A"/><rect x="136" y="150" width="36" height="26" fill="#F2F2F2"/><rect x="141" y="156" width="10" height="4" fill="#1E9E45"/><rect x="141" y="164" width="24" height="4" fill="#1E9E45"/><path fill="#A8713A" d="M66 182h10v4H66zM88 182h18v4H88z"/>'
const LINES = '<g class="lines" fill="#1E9E45"><rect x="2" y="128" width="26" height="5"/><rect x="-8" y="146" width="30" height="5"/><rect x="6" y="164" width="20" height="5"/></g>'

export const costumes = {
  design: svg('0 0 240 240', SH + px(ARM_L_DOWN) + px(ARM_R_UP) + BODY + eyes(106, 106, 11, 11) + mouth(138, 8) + PENCIL + BERET),
  build: svg('0 0 240 240', SH + px(ARM_L_DOWN) + HAMMER + px(ARM_R_UP) + BODY + eyes(102, 112, 11, 8) + mouth(140, 6) + HAT + SPARK),
  ship: svg('0 0 240 240', LINES + SH + BODY + eyes(102, 104, 11, 10) + '<g class="lift">' + BOX + px(CARRY_L) + px(CARRY_R) + '</g>'),
}
export type Costume = keyof typeof costumes

export const thumbsUp = svg('0 0 240 240', SH + px(ARM_L_DOWN) + px(ARM_R_UP) + BODY + '<g class="eyes"><ellipse class="e" cx="102" cy="108" rx="11" ry="4" fill="#F2F2F2"/><ellipse class="e" cx="138" cy="108" rx="11" ry="4" fill="#F2F2F2"/></g>' + mouth(124, 22))

/** the peek: body and eyes sit behind the card, the two hands hold its top edge in front */
const PEEK_VB = '50 40 140 110'
export const peekBack = svg(PEEK_VB, '<g class="wv" style="display:none"></g>' + SH + BODY + eyes(102, 108, 11, 11) + mouth(138, 8), 'back')
export const peekFront = svg(PEEK_VB, px([[60, 126], [70, 126], [60, 136], [70, 136]]) + px([[160, 126], [170, 126], [160, 136], [170, 136]]), 'front')

/** arms from the Reels' pose file: polylines in 10px cells from the shoulder, rasterized the same way */
const raster = (pts: number[][]) => {
  const out = [pts[0]]
  for (let i = 1; i < pts.length; i++) {
    const [ax, ay] = pts[i - 1], [bx, by] = pts[i], n = Math.max(Math.abs(bx - ax), Math.abs(by - ay))
    for (let k = 1; k <= n; k++) out.push([Math.round(ax + ((bx - ax) * k) / n), Math.round(ay + ((by - ay) * k) / n)])
  }
  return out
}
const arm = (sh: number[], pts: number[][]) => px(raster(pts).map(([x, y]) => [sh[0] + x * 10, sh[1] + y * 10]))
export const WAVE_A = arm([166, 100], [[0, 0], [1, 0], [3, -5], [3, -9]])
export const WAVE_B = arm([166, 100], [[0, 0], [1, 0], [3, -5], [6, -8]])

/** the same four hard steps as the Reels and the old hero: jitter sideways, green and pink copies split off */
const GSTEPS: [number, number | null, number | null][] = [[-3, 4, -4], [3, -4, 4], [-2, 3, null], [2, null, -3]]
export function glitch(el: Element | null, k = 1) {
  if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const kf: Keyframe[] = GSTEPS.map(([dx, g, p]) => {
    const f: string[] = []
    if (g !== null) f.push(`drop-shadow(${g * k}px 0 0 #1e9e45)`)
    if (p !== null) f.push(`drop-shadow(${p * k}px 0 0 #ff2f6d)`)
    return { translate: `${dx * k}px 0`, filter: f.join(' ') || 'none', easing: 'steps(1,end)' }
  })
  kf.push({ translate: '0 0', filter: 'none' })
  el.animate(kf, { duration: 360 })
}
/** the big one: torn into bands that slide apart for a quarter second */
export function tear(host: HTMLElement, svgEl: SVGElement | null, k = 1) {
  if (!svgEl || matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const n = 5, layers: HTMLElement[] = []
  for (let i = 0; i < n; i++) {
    const d = document.createElement('div')
    d.className = 'tear'
    d.innerHTML = svgEl.outerHTML
    d.style.clipPath = `inset(${(i * 100) / n}% 0 ${100 - ((i + 1) * 100) / n}% 0)`
    d.style.translate = `${(Math.random() - 0.5) * 2 * k * 9}px 0`
    d.style.filter = `drop-shadow(${3 * k}px 0 0 #1e9e45) drop-shadow(${-3 * k}px 0 0 #ff2f6d)`
    host.appendChild(d)
    layers.push(d)
  }
  svgEl.style.visibility = 'hidden'
  setTimeout(() => { layers.forEach(l => l.remove()); svgEl.style.visibility = '' }, 260)
}

/** tell the Cole peeking over an element to hop (and maybe look happy) */
export function coleReact(from: Element | null, detail: { big?: boolean; happy?: boolean }) {
  from?.closest('.pk')?.querySelector('.pkc')?.dispatchEvent(new CustomEvent('cole', { detail }))
}
