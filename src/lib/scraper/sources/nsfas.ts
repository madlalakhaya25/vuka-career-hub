// Scraper for nsfas.org.za — checks the NSFAS application window status.
// The old /content/apply.html moved; we now check the homepage and the
// myNSFAS portal page for open/closed status and deadline dates.

import * as cheerio from 'cheerio'
import type { SourceResult, ScrapedItem } from '../types'
import { politeGet, parseDeadline } from '../utils'

const PORTAL_URL = 'https://my.nsfas.org.za/'
const HOME_URL = 'https://www.nsfas.org.za/'

export async function scrapeNsfasStatus(): Promise<SourceResult> {
  const items: ScrapedItem[] = []

  // Try portal first, fall back to homepage
  for (const url of [PORTAL_URL, HOME_URL]) {
    try {
      const html = await politeGet(url)
      const $ = cheerio.load(html)
      const pageText = $('body').text()

      const isOpen = /applications?\s+(?:are\s+)?(?:now\s+)?open/i.test(pageText)
      const isClosed = /applications?\s+(?:are\s+)?(?:now\s+)?closed/i.test(pageText)

      const closeMatch = pageText.match(/clos(?:ing|es?)\s+(?:date[:\s]+)?(\d[\w\s,]+202\d)/i)
      const deadline = closeMatch?.[1] ? parseDeadline(closeMatch[1]) : undefined

      items.push({
        externalId: 'nsfas:2026-application-status',
        title: 'NSFAS 2026/2027 Student Funding Application',
        provider: 'National Student Financial Aid Scheme',
        description: isOpen
          ? `NSFAS applications are currently open${deadline ? `. Deadline: ${deadline}` : ''}. Apply at my.nsfas.org.za.`
          : isClosed
          ? 'NSFAS applications are currently closed. The 2027 application window typically opens Sep–Oct 2026. Monitor my.nsfas.org.za.'
          : 'Check my.nsfas.org.za for current NSFAS application status and deadlines.',
        deadline,
        applicationUrl: PORTAL_URL,
        isNational: true,
      })
      break // success — don't try next URL
    } catch {
      // try next URL
    }
  }

  // If both failed, add a static reminder entry
  if (items.length === 0) {
    items.push({
      externalId: 'nsfas:2026-application-status',
      title: 'NSFAS 2026/2027 Student Funding Application',
      provider: 'National Student Financial Aid Scheme',
      description: 'Check my.nsfas.org.za for current application status. Window typically opens Sep–Oct for the following year.',
      applicationUrl: PORTAL_URL,
      isNational: true,
    })
  }

  return { source: 'nsfas.org.za', sourceUrl: PORTAL_URL, type: 'BURSARY', items }
}
