import 'dotenv/config'
import { runScraper } from '../src/lib/scraper/run'

const dryRun = process.argv.includes('--dry-run')

console.log(`\n🔍 Vuka Career Hub — data scraper ${dryRun ? '(DRY RUN)' : ''}\n`)

runScraper(dryRun)
  .then((report) => {
    console.log('\n📋 Scrape report:')
    for (const r of report) {
      if (r.error) {
        console.log(`  ❌ ${r.source}: ERROR — ${r.error}`)
      } else {
        console.log(`  ✅ ${r.source}: ${r.found} found, ${r.saved} new, ${r.skipped} skipped`)
      }
    }
    const totalNew = report.reduce((s, r) => s + r.saved, 0)
    console.log(`\n  Total new listings queued for review: ${totalNew}\n`)
    process.exit(0)
  })
  .catch((err) => {
    console.error('Fatal error:', err)
    process.exit(1)
  })
