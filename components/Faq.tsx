/** questions that open in place. Each row shows it opens: it lifts and gets the green edge on hover */
export function Faq({ items }: { items: [string, string][] }) {
  return (
    <div className="faq cols">
      {items.map(([q, a]) => (
        <details key={q}><summary>{q}<span className="pm" aria-hidden="true">+</span></summary><p>{a}</p></details>
      ))}
    </div>
  )
}
