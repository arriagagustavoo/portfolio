# arriagagustavoo.com

Gustavo Arriaga's portfolio: a one-person design / code studio in Houston. Next.js (App Router), English at `/` and Spanish at `/es`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

- Pages live in `app/[lang]/`. English URLs are rewritten to `/en/...` internally (see `next.config.ts`), so the public URLs match the old site.
- Every word is in `lib/content/site.ts` (both languages). Case studies, the dev bio, courses and the privacy text come from `lib/content/legacy.json`, carried over from the old site.
- Projects, skills and contact links: `lib/data.ts`. Cole (the mascot): `lib/cole.ts`.
- Forms post to Web3Forms (same inbox as before).
- SEO: per-page titles, descriptions, canonical and hreflang links, `sitemap.xml`, `robots.txt`, and JSON-LD (Person, ProfessionalService, breadcrumbs, FAQPage, case studies).
