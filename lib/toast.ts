export type ToastOpts = { icon?: string; kind?: 'info'; action?: { label: string; href: string }; ms?: number }
/** fire a toast from anywhere; components/Toasts.tsx shows it */
export function toast(msg: string, opts: ToastOpts = {}) {
  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('toast', { detail: { msg, ...opts } }))
}
