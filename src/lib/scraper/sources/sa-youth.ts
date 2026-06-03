// Scraper for sa-youth.org.za — high-volume SA youth opportunity aggregator.
// Covers learnerships/internships and student funding (bursaries).
//
// WordPress-based. Structure per listing:
//   <article class="post-NNN ...">
//     <h2 class="entry-title"><a href="URL">Title</a></h2>
//     <div class="entry-summary"><p>Excerpt</p></div>
//   </article>
//
// NOTE: Site is behind Cloudflare — run locally (`npm run scrape`),
// not from a cloud/DC IP.

import * as cheerio from 'cheerio'
import type { SourceResult, ScrapedItem } from '../types'
import { politeGet, parseDeadline, parseStipend, parseNqfLevel, parseProvinces, parseSeta } from '../utils'

const BASE = 'https://www.sa-youth.org.za'

function scrapeWordPress(html: string, sourceUrl: string, type: 'LEARNERSHIP' | 'BURSARY'): ScrapedItem[] {
  const $ = cheerio.load(html)
  const items: ScrapedItem[] = []

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parseEl = (el: any) => {
    const titleEl = $(el).find('.entry-title a, h2 a, h3 a').first()
    const title = titleEl.text().trim()
    if (!title || title.length < 6) return

    const href = titleEl.attr('href') ?? $(el).find('a').first().attr('href')
    const itemUrl = href?.startsWith('http') ? href : href ? `${BASE}${href}` : sourceUrl

    const summary = $(el).find('.entry-summary, .entry-content, .post-excerpt').text()
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
      requirements: extractRequirements(fullText),
    })
  }

  $('article').each((_, el) => parseEl(el))

  // Some WordPress themes don't use <article>
  if (items.length === 0) {
    $('.post, .type-post, .hentry').each((_, el) => parseEl(el))
  }

  return items
}

export async function scrapeSaYouthLearnerships(): Promise<SourceResult> {
  const sourceUrl = `${BASE}/category/latest-learnerships-internships/`
  let items: ScrapedItem[] = []
  try {
    const html = await politeGet(sourceUrl)
    items = scrapeWordPress(html, sourceUrl, 'LEARNERSHIP')
  } catch (err) {
    console.error('[sa-youth learnerships]', err)
  }
  return { source: 'sa-youth.org.za', sourceUrl, type: 'LEARNERSHIP', items }
}

export async function scrapeSaYouthBursaries(): Promise<SourceResult> {
  const sourceUrl = `${BASE}/category/student-funding/`
  let items: ScrapedItem[] = []
  try {
    const html = await politeGet(sourceUrl)
    items = scrapeWordPress(html, sourceUrl, 'BURSARY')
  } catch (err) {
    console.error('[sa-youth bursaries]', err)
  }
  return { source: 'sa-youth.org.za/funding', sourceUrl, type: 'BURSARY', items }
}

function extractRequirements(text: string): string | undefined {
  const m = text.match(/requirements?[:\s]+([^\n.]{20,200})/i)
    ?? text.match(/minimum[:\s]+([^\n.]{20,200})/i)
    ?? text.match(/grade\s+1[02][^.]{0,100}/i)
  return (m?.[1] ?? m?.[0])?.trim()
}
