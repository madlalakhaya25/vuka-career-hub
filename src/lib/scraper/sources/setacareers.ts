// Scraper for setacareers.co.za — dedicated SA SETA learnerships and bursaries
// aggregator. WordPress-based with standard category pages.
//
// NOTE: May be behind Cloudflare — run locally (`npm run scrape`) if 403.

import * as cheerio from 'cheerio'
import type { SourceResult, ScrapedItem } from '../types'
import { politeGet, parseDeadline, parseStipend, parseNqfLevel, parseProvinces, parseSeta } from '../utils'

const BASE = 'https://www.setacareers.co.za'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseWpListing(html: string, sourceUrl: string): ScrapedItem[] {
  const $ = cheerio.load(html)
  const items: ScrapedItem[] = []

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parseEl = (el: any) => {
    const titleEl = $(el).find('.entry-title a, h2 a, h3 a').first()
    const title = titleEl.text().trim()
    if (!title || title.length < 6) return

    const href = titleEl.attr('href')
    const itemUrl = href?.startsWith('http') ? href : href ? `${BASE}${href}` : sourceUrl

    const summary = $(el).find('.entry-summary, .entry-content').text()
    const fullText = $(el).text()
    const stipend = parseStipend(fullText)
    const provinces = parseProvinces(fullText)

    items.push({
      externalId: itemUrl,
      title,
      provider: parseSeta(fullText) ?? undefined,
      description: summary.trim().substring(0, 500) || undefined,
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

  $('article').each((_, el) => parseEl(el))
  if (items.length === 0) {
    $('.post, .type-post, .hentry').each((_, el) => parseEl(el))
  }
  return items
}

export async function scrapeSetaCareersLearnerships(): Promise<SourceResult> {
  const sourceUrl = `${BASE}/category/learnerships/`
  let items: ScrapedItem[] = []
  try {
    const html = await politeGet(sourceUrl)
    items = parseWpListing(html, sourceUrl)
  } catch (err) {
    console.error('[setacareers learnerships]', err)
  }
  return { source: 'setacareers.co.za', sourceUrl, type: 'LEARNERSHIP', items }
}

export async function scrapeSetaCareersBursaries(): Promise<SourceResult> {
  const sourceUrl = `${BASE}/category/bursaries/`
  let items: ScrapedItem[] = []
  try {
    const html = await politeGet(sourceUrl)
    items = parseWpListing(html, sourceUrl)
  } catch (err) {
    console.error('[setacareers bursaries]', err)
  }
  return { source: 'setacareers.co.za/bursaries', sourceUrl, type: 'BURSARY', items }
}
