// Tell Bing, Yandex, Seznam and Naver about every page right after a deploy (IndexNow).
// Usage: npm run indexnow            (all URLs in the live sitemap)
//        npm run indexnow -- /services /es/services   (just these paths)
const HOST = 'arriagagustavoo.com'
const KEY = 'f47bea6c5cb4bf9e3ea06eaa8ca9b41c'
const paths = process.argv.slice(2)
let urls
if (paths.length) urls = paths.map(p => 'https://' + HOST + p)
else {
  const xml = await (await fetch('https://' + HOST + '/sitemap.xml')).text()
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1])
}
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: 'https://' + HOST + '/' + KEY + '.txt', urlList: urls }),
})
console.log('IndexNow', res.status, res.statusText, '-', urls.length, 'URLs')
if (res.status >= 400) process.exit(1)
