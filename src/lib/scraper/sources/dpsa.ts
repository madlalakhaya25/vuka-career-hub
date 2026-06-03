// Scraper for dpsa.gov.za/newsroom/psvc/ — DPSA Public Service Vacancy Circulars.
// The page lists weekly PDF circulars containing all advertised government posts.
// We scrape the circular index (titles + PDF links) so admins can review and link
// to them from the app as government job opportunities.
//
// Maps to LEARNERSHIP type with sector: 'Government Vacancy' so admins can
// review and approve the relevant circulars into the learnerships section.

import * as cheerio from 'cheerio'
import type { SourceResult, ScrapedItem } from '../types'
import { politeGet, parseDeadline } from '../utils'

const SOURCE_URL = 'https://www.dpsa.gov.za/newsroom/psvc/'

export async function scrapeDpsaCirculars(): Promise<SourceResult> {
  const items: ScrapedItem[] = []

  try {
    const html = await politeGet(SOURCE_URL)
    const $ = cheerio.load(html)

    // DPSA uses a table or list of circular links
    // Try links that look like circular references
    const seen = new Set<string>()

    $('a').each((_, el) => {
      const href = $(el).attr('href') ?? ''
      const text = $(el).text().trim()

      if (!text || text.length < 8) return

      // Match circular entries — typically "Circular X of 2026" or "PSVC XX/2026"
      const isCircular =
        /circular\s+\d+/i.test(text) ||
        /PSVC\s*\d+/i.test(text) ||
        /vacancy\s+circular/i.test(text) ||
        /public\s+service.*circular/i.test(text) ||
        href.toLowerCase().includes('psvc') ||
        href.toLowerCase().includes('circular')

      if (!isCircular) return

      const itemUrl = href.startsWith('http') ? href : href.startsWith('/') ? `https://www.dpsa.gov.za${href}` : SOURCE_URL
      if (seen.has(itemUrl)) return
      seen.add(itemUrl)

      const fullText = $(el).closest('tr, li, div').text()
      const deadline = parseDeadline(fullText)

      items.push({
        externalId: itemUrl,
        title: text,
        provider: 'DPSA',
        description: `Government vacancy circular published by the Department of Public Service and Administration. Contains advertised posts across all national and provincial departments.`,
        sector: 'Government Vacancy',
        deadline,
        applicationUrl: itemUrl,
        isNational: true,
      })
    })

    // Fallback: look for table rows with date + circular patterns
    if (items.length === 0) {
      $('table tr, ul li').each((_, el) => {
        const text = $(el).text().trim()
        const linkEl = $(el).find('a')
        const href = linkEl.attr('href') ?? ''
        const title = linkEl.text().trim()

        if (!title || title.length < 5) return
        if (!/202[4-9]|circular|vacancy/i.test(text)) return

        const itemUrl = href.startsWith('http') ? href : href.startsWith('/') ? `https://www.dpsa.gov.za${href}` : SOURCE_URL
        if (items.some((i) => i.externalId === itemUrl)) return

        items.push({
          externalId: itemUrl || `dpsa:${title.toLowerCase().replace(/\s+/g, '-')}`,
          title,
          provider: 'DPSA',
          description: 'Government vacancy circular — contains advertised posts across national and provincial departments.',
          sector: 'Government Vacancy',
          deadline: parseDeadline(text),
          applicationUrl: itemUrl || SOURCE_URL,
          isNational: true,
        })
      })
    }
  } catch (err) {
    console.error('[dpsa]', err)
  }

  // Keep only the most recent 10 circulars
  return { source: 'dpsa.gov.za', sourceUrl: SOURCE_URL, type: 'LEARNERSHIP', items: items.slice(0, 10) }
}
