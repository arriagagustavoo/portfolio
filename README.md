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
- SEO: per-page titles, descriptions, canonical and hreflang links, `sitemap.xml`, `robots.txt`, and JSON-LD (Person, ProfessionalService linked to the Google Business Profile via `hasMap`, breadcrumbs, FAQPage, case studies). Link previews: `public/og-image*.jpg` and `public/og/work-*.jpg`. Favicon set + `app/manifest.ts`.
- All fonts ship in `app/fonts/` (no Google Fonts download at build time; that once failed a production build).

## Deploys and search engines

- `main` is production on Vercel; work happens on `gus/redesign` and is fast-forwarded into `main` only with Gus's OK.
- After a production deploy, tell Bing and the other IndexNow engines about the pages:

  ```bash
  npm run indexnow                       # every URL in the live sitemap
  npm run indexnow -- /services /es/faq  # just these paths
  ```

  The key lives in `public/<key>.txt` and `scripts/indexnow.mjs`. A `202 Accepted` means it went through.
- Google: Search Console (domain property `arriagagustavoo.com`) has the sitemap. For a changed page, use URL Inspection, then Request indexing.
- `public/gbp/`: logo, cover and photos used on the Google Business Profile.
