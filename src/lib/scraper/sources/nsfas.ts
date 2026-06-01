// Scraper for nsfas.org.za — checks the NSFAS application window dates.
// Rather than scraping individual bursaries, this just checks whether
// NSFAS applications are currently open and what the deadline is.

import * as cheerio from 'cheerio'
import type { SourceResult, ScrapedItem } from '../types'
import { politeGet, parseDeadline } from '../utils'

const SOURCE_URL = 'https://www.nsfas.org.za/content/apply.html'

export async function scrapeNsfasStatus(): Promise<SourceResult> {
  const items: ScrapedItem[] = []

  try {
    const html = await politeGet(SOURCE_URL)
    const $ = cheerio.load(html)

    const pageText = $('body').text()

    // Look for opening/closing dates in the text
    const openMatch = pageText.match(/applications?\s+(?:are\s+)?open[:\s]+(\d[\w\s,]+202\d)/i)
    const closeMatch = pageText.match(/clos(?:ing|es?)\s+(?:date[:\s]+)?(\d[\w\s,]+202\d)/i)

    const deadline = closeMatch?.[1] ? parseDeadline(closeMatch[1]) : undefined
    const isOpen = /applications?\s+(?:are\s+)?(?:now\s+)?open/i.test(pageText)

    items.push({
      externalId: 'nsfas:2026-application',
      title: 'NSFAS 2026 Student Funding Application',
      provider: 'National Student Financial Aid Scheme',
      description: isOpen
        ? `NSFAS applications are currently open. Deadline: ${deadline ?? 'check nsfas.org.za'}.`
        : 'NSFAS applications are currently closed. Check nsfas.org.za for the next window.',
      deadline,
      applicationUrl: 'https://www.nsfas.org.za/content/apply.html',
      isNational: true,
    })
  } catch (err) {
    console.error('[nsfas]', err)
  }

  return { source: 'nsfas.org.za', sourceUrl: SOURCE_URL, type: 'BURSARY', items }
}
