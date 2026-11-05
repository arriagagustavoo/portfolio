import { WEB3FORMS_KEY } from './data'

/** posts to Web3Forms (the same inbox as the old site). resolves true when it was accepted */
export async function sendForm(fields: Record<string, string>) {
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ access_key: WEB3FORMS_KEY, from_name: 'arriagagustavoo.com', ...fields }),
    })
    const j = await res.json().catch(() => ({}))
    return res.ok && j.success !== false
  } catch {
    return false
  }
}
