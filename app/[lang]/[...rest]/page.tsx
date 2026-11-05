import { notFound } from 'next/navigation'
export const dynamicParams = true
export function generateStaticParams() { return [] }
export default function Rest() { notFound() }
