'use client'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { Icon } from './bits'
import { coleReact } from '@/lib/cole'
import { sendForm } from '@/lib/send'
import { toast } from '@/lib/toast'
import { contact } from '@/lib/data'
import type { Dict } from '@/lib/content/site'

const reduced = () => typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

/** the close: two buttons, and "Send me a message" drops a short form into the same spot */
export function QuickForm({ t, estimateHref, toastSent }: { t: Dict['close']; estimateHref: string; toastSent: string }) {
  const [open, setOpen] = useState(false)
  const [err, setErr] = useState(false)
  const [done, setDone] = useState<string | null>(null)
  const box = useRef<HTMLDivElement>(null)
  const resize = (fn: () => void) => {
    const el = box.current!, h0 = el.offsetHeight
    fn()
    requestAnimationFrame(() => { const h1 = el.offsetHeight; if (!reduced() && Math.abs(h1 - h0) > 4) el.animate([{ height: h0 + 'px' }, { height: h1 + 'px' }], { duration: 420, easing: 'cubic-bezier(.77,0,.175,1)' }) })
    coleReact(el.closest('.close') ?? el, {})
  }
  const submit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const f = new FormData(ev.currentTarget)
    if (f.get('botcheck')) return
    const name = String(f.get('name') || '').trim(), reach = String(f.get('reach') || '').trim(), need = String(f.get('need') || '').trim()
    if (!name || !reach) { setErr(true); return }
    // optimistic: say thanks right away, take it back if the send fails
    const first = name.split(' ')[0]
    resize(() => setDone(first)); toast(toastSent)
    document.querySelector('.close .pkc')?.dispatchEvent(new CustomEvent('cole', { detail: { big: true, happy: true } }))
    const ok = await sendForm({ subject: 'Website message from ' + name, name, contact: reach, message: need || '(no details)' })
    if (!ok) { setDone(null); setErr(false); toast(t.failed, { icon: '!' }) }
  }
  return (
    <div className="cl3-r" ref={box}>
      {!open ? (
        <div className="qz-btns">
          <button className="btn" type="button" aria-expanded={false} onClick={() => resize(() => setOpen(true))}>{t.send} <span className="ar" aria-hidden="true">→</span></button>
          <Link className="btn ghost" href={estimateHref}>{t.estimate}</Link>
        </div>
      ) : done ? (
        <div className="done swapin"><h3>{t.done.replace('{n}', done)}</h3><p>{t.doneText}</p></div>
      ) : (
        <form className="qform in" onSubmit={submit} noValidate>
          <input className="hp" type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <div className="qf-row">
            <label className="field">{t.name}<input name="name" autoComplete="given-name" placeholder={t.namePh} autoFocus /></label>
            <label className="field">{t.contact}<input name="reach" autoComplete="email" placeholder={t.contactPh} /></label>
          </div>
          <label className="field"><span>{t.need} <i>{t.optional}</i></span><input name="need" placeholder={t.needPh} /></label>
          <div className="fact">
            <button className="btn" type="submit">{t.submit} <span className="ar" aria-hidden="true">→</span></button>
            <button className="x-btn" type="button" onClick={() => resize(() => setOpen(false))}>{t.cancel}</button>
            {err && <span className="ferr" role="alert">{t.error}</span>}
          </div>
        </form>
      )}
    </div>
  )
}

/** the full form on the Contact page: a tap to start, two required fields, the field follows how you want to be reached */
export function ContactForm({ t, errText, toastSent, failed }: { t: Dict['contact']['form']; errText: string; toastSent: string; failed: string }) {
  const [picks, setPicks] = useState<string[]>([])
  const [how, setHow] = useState(t.how[0])
  const [err, setErr] = useState(false)
  const [done, setDone] = useState<string | null>(null)
  const email = how === t.how[2]
  const submit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const f = new FormData(ev.currentTarget)
    if (f.get('botcheck')) return
    const name = String(f.get('name') || '').trim(), reach = String(f.get('reach') || '').trim()
    if (!name || !reach) { setErr(true); return }
    setDone(t.done.replace('{n}', name.split(' ')[0]).replace('{how}', t.back[how] ?? '')); toast(toastSent)
    document.querySelector('.ct2 .pkc')?.dispatchEvent(new CustomEvent('cole', { detail: { big: true, happy: true } }))
    const ok = await sendForm({ subject: 'Website inquiry from ' + name, name, [email ? 'email' : 'phone']: reach, preferred: how, needs: picks.join(', ') || '(none picked)', message: String(f.get('more') || '') })
    if (!ok) { setDone(null); toast(failed, { icon: '!' }) }
  }
  if (done) return <div className="cform"><div className="done swapin"><h3>{done}</h3></div></div>
  return (
    <form className="cform" onSubmit={submit} noValidate>
      <input className="hp" type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div>
        <span className="lbl" id="needs"><i>//</i> {t.needTitle} <span style={{ color: 'var(--fg-3)' }}>{t.tap}</span></span>
        <div className="picks" role="group" aria-labelledby="needs" style={{ marginTop: 10 }}>
          {t.picks.map(p => <button key={p} type="button" aria-pressed={picks.includes(p)} onClick={() => setPicks(v => (v.includes(p) ? v.filter(x => x !== p) : [...v, p]))}>{p}</button>)}
        </div>
      </div>
      <label className="field">{t.name}<input name="name" autoComplete="given-name" /></label>
      <div className="field">
        <span id="reach">{t.reach}</span>
        <div className="how" role="group" aria-labelledby="reach">{t.how.map(h => <button key={h} type="button" aria-pressed={how === h} onClick={() => setHow(h)}>{h}</button>)}</div>
        <input name="reach" aria-labelledby="reach" type={email ? 'email' : 'tel'} inputMode={email ? 'email' : 'tel'} autoComplete={email ? 'email' : 'tel'} placeholder={email ? t.emailPh : t.phonePh} />
      </div>
      <label className="field"><span>{t.more} <i>(optional)</i></span><textarea name="more" rows={3} placeholder={t.morePh} /></label>
      <div className="fact">
        <button className="btn" type="submit">{t.submit} <span className="ar" aria-hidden="true">→</span></button>
        <span className="trust"><Icon name="lock" />{t.trust}</span>
        {err && <span className="ferr" role="alert">{errText}</span>}
      </div>
      <p className="alt">{t.rather} <a href={'sms:' + contact.tel}>{contact.phone}</a></p>
    </form>
  )
}

/** copy the email on click (and still open the mail app), with a toast */
export function EmailLink({ className, children, copied }: { className?: string; children: React.ReactNode; copied: string }) {
  return (
    <a className={className} href={'mailto:' + contact.email} onClick={() => { try { navigator.clipboard?.writeText(contact.email) } catch {} toast(copied + ': ' + contact.email) }}>
      {children}
    </a>
  )
}
