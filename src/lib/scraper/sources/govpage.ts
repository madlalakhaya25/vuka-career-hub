// Scraper for govpage.co.za — SA government and SETA opportunity aggregator.
//
// Site is Blogger-based. Old .html URLs are 404; now uses Blogger label URLs:
//   /search/label/Learnership  and  /search/label/Bursary
//
// NOTE: Blocks cloud/DC IPs (403) — run locally via `npm run scrape`.

import * as cheerio from 'cheerio'
import type { SourceResult, ScrapedItem } from '../types'
import { politeGet, parseDeadline, parseStipend, parseNqfLevel, parseProvinces, parseSeta } from '../utils'

const BASE = 'https://www.govpage.co.za'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseBloggerPage(html: string, sourceUrl: string): ScrapedItem[] {
  const $ = cheerio.load(html)
  const items: ScrapedItem[] = []

  // Blogger uses .post-outer or .post or h3.post-title for listings
  const parseEl = (el: any) => {
    const titleEl = $(el).find('.post-title a, h3 a, h2 a, .entry-title a').first()
    const title = titleEl.text().trim()
    if (!title || title.length < 6) return

    const href = titleEl.attr('href')
    const itemUrl = href?.startsWith('http') ? href : href ? `${BASE}${href}` : sourceUrl

    const snippet = $(el).find('.post-body, .entry-content, .post-snippet, .snippet').text()
    const fullText = $(el).text()
    const stipend = parseStipend(fullText)
    const provinces = parseProvinces(fullText)

    items.push({
      externalId: itemUrl,
      title,
      provider: parseSeta(fullText) ?? undefined,
      description: snippet.trim().substring(0, 500) || undefined,
      seta: parseSeta(fullText) ?? undefined,
      nqfLevel: parseNqfLevel(fullText),
      stipendMin: stipend.min,
      stipendMax: stipend.max,
      deadline: parseDeadline(fullText),
      applicationUrl: itemUrl,
      provinces,
      isNational: provinces.length === 0,
    })
  }

  // Blogger post list selectors
  $('.post-outer, .post, article').each((_, el) => parseEl(el))
  return items
}

export async function scrapeGovpageLearnerships(): Promise<SourceResult> {
  // Blogger label URL for learnership posts
  const sourceUrl = `${BASE}/search/label/Learnership`
  let items: ScrapedItem[] = []
  try {
    const html = await politeGet(sourceUrl)
    items = parseBloggerPage(html, sourceUrl)
    // Also try the Learnerships label (plural)
    if (items.length === 0) {
      const html2 = await politeGet(`${BASE}/search/label/Learnerships`)
      items = parseBloggerPage(html2, `${BASE}/search/label/Learnerships`)
    }
  } catch (err) {
    console.error('[govpage learnerships]', err)
  }
  return { source: 'govpage.co.za', sourceUrl, type: 'LEARNERSHIP', items }
}

export async function scrapeGovpageBursaries(): Promise<SourceResult> {
  const sourceUrl = `${BASE}/search/label/Bursary`
  let items: ScrapedItem[] = []
  try {
    const html = await politeGet(sourceUrl)
    items = parseBloggerPage(html, sourceUrl)
    if (items.length === 0) {
      const html2 = await politeGet(`${BASE}/search/label/Bursaries`)
      items = parseBloggerPage(html2, `${BASE}/search/label/Bursaries`)
    }
  } catch (err) {
    console.error('[govpage bursaries]', err)
  }
  return { source: 'govpage.co.za/bursaries', sourceUrl, type: 'BURSARY', items }
}
