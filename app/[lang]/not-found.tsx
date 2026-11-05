import { NotFoundBody } from '@/components/NotFound'
import { dicts } from '@/lib/content/site'

export default function NotFound() {
  return <NotFoundBody t={{ en: dicts.en.notFound, es: dicts.es.notFound }} />
}
