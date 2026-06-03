// Scraper for graduates24.com — one of SA's largest learnership/internship boards.
// Aggregates listings from companies, SETAs, and government departments.
//
// WordPress-based. Listings at /learnerships/ use standard article structure.
//
// NOTE: Site is behind Cloudflare — must run locally (`npm run scrape`),
// not from a cloud/data-centre IP.

import * as cheerio from 'cheerio'
import type { SourceResult, ScrapedItem } from '../types'
import { politeGet, parseDeadline, parseStipend, parseNqfLevel, parseProvinces, parseSeta } from '../utils'

const BASE = 'https://www.graduates24.com'
const SOURCE_URL = `${BASE}/learnerships/`

export async function scrapeGraduates24Learnerships(): Promise<SourceResult> {
  const items: ScrapedItem[] = []

  try {
    const html = await politeGet(SOURCE_URL)
    const $ = cheerio.load(html)

    // graduates24 uses article tags with job-listing or post classes
    const selectors = ['article', '.job-listing', '.post', '.type-post', '.hentry']

    let found = false
    for (const sel of selectors) {
      $(sel).each((_, el) => {
        const titleEl = $(el).find('.entry-title a, h2 a, h3 a, .job-title a, .listing-title a').first()
        const title = titleEl.text().trim()
        if (!title || title.length < 6) return

        const href = titleEl.attr('href') ?? $(el).find('a').first().attr('href')
        const itemUrl = href?.startsWith('http') ? href : href ? `${BASE}${href}` : SOURCE_URL

        const summary = $(el).find('.entry-summary, .entry-content, .job-description, .post-excerpt').text()
        const fullText = $(el).text()

        const stipend = parseStipend(fullText)
        const provinces = parseProvinces(fullText)
        const seta = parseSeta(fullText)

        // Extract company/provider from common patterns
        const providerMatch = fullText.match(/(?:company|employer|provider|organisation)[:\s]+([A-Z][^\n,]{3,40})/i)
          ?? fullText.match(/at\s+([A-Z][a-zA-Z\s]{3,30})\s*[-–]/i)

        items.push({
          externalId: itemUrl,
          title,
          provider: seta ?? providerMatch?.[1]?.trim() ?? undefined,
          description: summary.trim().substring(0, 500) || undefined,
          seta: seta ?? undefined,
          nqfLevel: parseNqfLevel(fullText),
          stipendMin: stipend.min,
          stipendMax: stipend.max,
          deadline: parseDeadline(fullText),
          applicationUrl: itemUrl,
          provinces,
          isNational: provinces.length === 0,
          requirements: extractRequirements(fullText),
        })
        found = true
      })
      if (found) break
    }
  } catch (err) {
    console.error('[graduates24]', err)
  }

  return { source: 'graduates24.com', sourceUrl: SOURCE_URL, type: 'LEARNERSHIP', items }
}

function extractRequirements(text: string): string | undefined {
  const m = text.match(/requirements?[:\s]+([^\n.]{20,200})/i)
    ?? text.match(/minimum[:\s]+([^\n.]{20,200})/i)
    ?? text.match(/grade\s+1[02][^.]{0,100}/i)
  return (m?.[1] ?? m?.[0])?.trim()
}
