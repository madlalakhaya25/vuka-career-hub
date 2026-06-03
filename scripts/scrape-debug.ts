// Debug script — fetches a URL and shows the first 2000 chars of HTML
// so we can see if Cloudflare is returning a challenge page.
// Usage: npx tsx scripts/scrape-debug.ts https://www.graduates24.com/learnerships/

import 'dotenv/config'

const url = process.argv[2]
if (!url) {
  console.error('Usage: npx tsx scripts/scrape-debug.ts <url>')
  process.exit(1)
}

const BROWSER_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'

async function main() {
  console.log(`\nFetching: ${url}\n`)
  const res = await fetch(url, {
    headers: {
      'User-Agent': BROWSER_UA,
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-ZA,en;q=0.9',
    },
    signal: AbortSignal.timeout(15_000),
  })

  console.log(`Status: ${res.status} ${res.statusText}`)
  console.log(`Content-Type: ${res.headers.get('content-type')}`)
  console.log(`CF-Ray: ${res.headers.get('cf-ray') ?? '(none)'}`)
  console.log()

  const html = await res.text()
  console.log('--- First 3000 chars ---')
  console.log(html.substring(0, 3000))
  console.log()

  // Check for Cloudflare challenge
  if (html.includes('cf-browser-verification') || html.includes('Just a moment') || html.includes('checking your browser') || html.includes('_cf_chl')) {
    console.log('⚠️  CLOUDFLARE CHALLENGE DETECTED — scraper cannot parse this page')
  }

  // Count article/post elements as a quick check
  const articleCount = (html.match(/<article/gi) ?? []).length
  const postCount = (html.match(/class="[^"]*post[^"]*"/gi) ?? []).length
  console.log(`<article> tags found: ${articleCount}`)
  console.log(`.post class found: ${postCount}`)
}

main().catch(console.error)
