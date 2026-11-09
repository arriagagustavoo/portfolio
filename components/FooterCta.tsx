'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

/** the footer's green button: the estimate everywhere, except on /card, which already offers it up top */
export function FooterCta({ estimate, work, home, workHref }: { estimate: string; work: string; home: string; workHref: string }) {
  const onCard = /\/card\/?$/.test(usePathname() || '')
  return onCard ? <Link className="btn" href={workHref}>{work}</Link> : <Link className="btn" href={home + '#estimate'}>{estimate}</Link>
}
