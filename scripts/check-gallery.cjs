// Gallery check: clicks through every screen of each case study on desktop and phone and reports how many places the arrows sat (must be 1), plus sideways scroll and page errors.
// usage: PW=<path to playwright> node scripts/check-gallery.cjs   (dev server on :4174)
const { chromium } = require(process.env.PW)
;(async () => {
  const b = await chromium.launch(); const res = {}
  for (const [tag, w, h, m] of [['d', 1440, 900, false], ['p', 390, 844, true]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: m, hasTouch: m }); const p = await ctx.newPage()
    const errs = []; p.on('pageerror', e => errs.push(e.message))
    for (const slug of ['fadeaway', 'client-portal', 'bracketed']) {
      await p.goto('http://localhost:4174/work/' + slug, { waitUntil: 'networkidle' }); await p.waitForTimeout(600)
      const pos = async sel => p.$$eval(sel, a => a.map(x => { const r = x.getBoundingClientRect(); return Math.round(r.left) + ',' + Math.round(r.top + scrollY) }).join(' '))
      const page = new Set(), view = new Set()
      for (let k = 0; k < 12; k++) { page.add(await pos('.gal > .gal-cap .gal-nav button')); await p.$eval('.gal > .gal-cap .gal-nav button:last-child', el => el.click()); await p.waitForTimeout(200) }
      await p.$eval('.gal-open', el => el.click()); await p.waitForTimeout(500)
      for (let k = 0; k < 12; k++) { view.add(await pos('.gd-ctl .gal-nav button')); await p.$eval('.gd-ctl .gal-nav button:last-child', el => el.click()); await p.waitForTimeout(200) }
      if (slug === 'fadeaway') await p.screenshot({ path: `still-${tag}-view.jpg`, type: 'jpeg', quality: 70 })
      await p.keyboard.press('Escape'); await p.waitForTimeout(300)
      if (slug === 'fadeaway') { await p.evaluate(() => document.querySelector('.gal').scrollIntoView()); await p.waitForTimeout(400); await p.screenshot({ path: `still-${tag}-page.jpg`, type: 'jpeg', quality: 70 }) }
      res[tag + ' ' + slug] = { pagePositions: page.size, viewerPositions: view.size, overflow: await p.evaluate(() => document.documentElement.scrollWidth - innerWidth) }
    }
    res[tag + ' errors'] = errs.length
    await ctx.close()
  }
  console.log(JSON.stringify(res, null, 1)); await b.close()
})()
