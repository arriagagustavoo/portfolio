import { Icon } from './bits'
import { EmailLink } from './Forms'
import { contact } from '@/lib/data'
import type { Dict } from '@/lib/content/site'

/** six ways to reach Gus. Instagram and Facebook sit in the middle and stand out: they're the ones he cares about most */
export function Socials({ t, two }: { t: Dict; two?: boolean }) {
  const ext = { target: '_blank', rel: 'noopener noreferrer' }
  return (
    <div className={'socs' + (two ? ' two' : '')} data-reveal="rows">
      <a className="soc" href={'tel:' + contact.tel}><Icon name="phone" /><b>{t.socials.phone}</b><span>{contact.phone}</span></a>
      <EmailLink className="soc" copied={t.toast.copied}><Icon name="mail" /><b>{t.socials.email}</b><span>{contact.email.split('@')[0]}@<wbr />{contact.email.split('@')[1]}</span></EmailLink>
      <a className="soc hot" href={contact.instagram.url} {...ext}><Icon name="instagram" /><b>{t.socials.instagram}</b><span>{contact.instagram.handle}</span></a>
      <a className="soc hot" href={contact.facebook.url} {...ext}><Icon name="facebook" /><b>{t.socials.facebook}</b><span>{contact.facebook.handle}</span></a>
      <a className="soc" href={contact.linkedin.url} {...ext}><Icon name="linkedin" /><b>{t.socials.linkedin}</b><span>{contact.linkedin.handle}</span></a>
      <a className="soc" href={contact.github.url} {...ext}><Icon name="github" /><b>{t.socials.github}</b><span>{contact.github.handle}</span></a>
    </div>
  )
}
