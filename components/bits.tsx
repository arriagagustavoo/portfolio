import { icons, skillIcons, type IconName } from '@/lib/icons'

export const MARK_PATHS = '<path fill="var(--fg)" d="M120 136a16 16 0 1 1-32 0a16 16 0 0 1 32 0Z"/><path fill="var(--fg)" d="M120 72a16 16 0 1 1-32 0a16 16 0 0 1 32 0Z"/><path fill="#1e9e45" d="M57.8 116.3L41.7 176.5H104v32H0l26.9-100.5l30.9 8.3Z"/><path fill="#1e9e45" d="M181.1 100.5l-30.9-8.3L166.3 32H104V0h104l-26.9 100.5Z"/>'

export function Mark({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 209 209" aria-hidden="true" dangerouslySetInnerHTML={{ __html: MARK_PATHS }} />
}

export function LongLogo() {
  return <span className="lglogo" translate="no"><Mark /><span>arriagagustav<b>oo</b></span></span>
}

export function Icon({ name }: { name: IconName }) {
  return <span className="ic" style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: icons[name] }} />
}

export function Html({ html, as: Tag = 'span', className }: { html: string; as?: 'span' | 'p' | 'b' | 'div' | 'small' | 'figcaption'; className?: string }) {
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />
}

export function Chips({ names, big }: { names: readonly string[]; big?: boolean }) {
  return (
    <div className={'chips' + (big ? ' big' : '')}>
      {names.map(n => (
        <span className="chip" key={n}>
          <span style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: skillIcons[n] ?? '' }} />
          {n}
        </span>
      ))}
    </div>
  )
}

/** the one drawn arrow (same stroke as the icon set), for rows that lead somewhere. Never tacked onto buttons */
export function Chevron({ dir = 'right', className = 'arw' }: { dir?: 'right' | 'left'; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={dir === 'right' ? 'm9 6 6 6-6 6' : 'm15 6-6 6 6 6'} />
    </svg>
  )
}
