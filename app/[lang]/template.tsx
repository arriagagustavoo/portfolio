import { ViewTransition } from 'react'

// Every navigation is a React transition, so this animates page changes. Going into a case study
// slides up (deeper), coming back slides down; everything else is a quick, quiet cross-fade.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition
      enter={{ 'nav-forward': 'nav-in', 'nav-back': 'nav-back-in', default: 'page-in' }}
      exit={{ 'nav-forward': 'nav-out', 'nav-back': 'nav-back-out', default: 'page-out' }}
      default="none"
    >
      <div>{children}</div>
    </ViewTransition>
  )
}
