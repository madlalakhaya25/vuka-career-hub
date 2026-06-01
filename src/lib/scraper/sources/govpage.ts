// Scraper for govpage.co.za — one of SA's most comprehensive government
// information sites; aggregates learnerships and bursaries from all SETAs.
//
// Page structure (WordPress with custom post type):
//   <article class="post-...">
//     <h2 class="entry-title"><a href="[item-url]">[Title]</a></h2>
//     <div class="entry-content"> ... description, deadline, requirements ... </div>
//   </article>

import * as cheerio from 'cheerio'
import type { SourceResult, ScrapedItem } from '../types'
import { politeGet, parseDeadline, parseStipend, parseNqfLevel, parseProvinces, parseSeta } from '../utils'

const BASE = 'https://www.govpage.co.za'

export async function scrapeGovpageLearnerships(): Promise<SourceResult> {
  const sourceUrl = `${BASE}/learnerships.html`
  const items: ScrapedItem[] = []

  try {
    const html = await politeGet(sourceUrl)
    const $ = cheerio.load(html)

    $('article').each((_, el) => {
      const titleEl = $(el).find('h2 a, h3 a, .entry-title a').first()
      const title = titleEl.text().trim()
      const href = titleEl.attr('href')
      if (!title) return

      const itemUrl = href?.startsWith('http') ? href : href ? `${BASE}${href}` : sourceUrl
      const content = $(el).find('.entry-content, .entry-summary').text()
      const fullText = $(el).text()

      const stipend = parseStipend(fullText)
      const deadline = parseDeadline(fullText)
      const provinces = parseProvinces(fullText)
      const seta = parseSeta(fullText)
      const nqfLevel = parseNqfLevel(fullText)

      items.push({
        externalId: itemUrl,
        title,
        provider: seta ?? undefined,
        description: content.substring(0, 400).trim() || undefined,
        seta,
        nqfLevel,
        stipendMin: stipend.min,
        stipendMax: stipend.max,
        deadline,
        applicationUrl: itemUrl,
        provinces: provinces.length ? provinces : undefined,
        isNational: provinces.length === 0 || fullText.toLowerCase().includes('national') || fullText.toLowerCase().includes('nationwide'),
        requirements: extractRequirements(fullText),
      })
    })
  } catch (err) {
    console.error('[govpage learnerships]', err)
  }

  return { source: 'govpage.co.za', sourceUrl, type: 'LEARNERSHIP', items }
}

export async function scrapeGovpageBursaries(): Promise<SourceResult> {
  const sourceUrl = `${BASE}/bursaries.html`
  const items: ScrapedItem[] = []

  try {
    const html = await politeGet(sourceUrl)
    const $ = cheerio.load(html)

    $('article').each((_, el) => {
      const titleEl = $(el).find('h2 a, h3 a, .entry-title a').first()
      const title = titleEl.text().trim()
      const href = titleEl.attr('href')
      if (!title) return

      const itemUrl = href?.startsWith('http') ? href : href ? `${BASE}${href}` : sourceUrl
      const content = $(el).find('.entry-content, .entry-summary').text()
      const fullText = $(el).text()

      const deadline = parseDeadline(fullText)

      items.push({
        externalId: itemUrl,
        title,
        description: content.substring(0, 400).trim() || undefined,
        deadline,
        applicationUrl: itemUrl,
        isNational: true,
      })
    })
  } catch (err) {
    console.error('[govpage bursaries]', err)
  }

  return { source: 'govpage.co.za/bursaries', sourceUrl, type: 'BURSARY', items }
}

function extractRequirements(text: string): string | undefined {
  // Look for common requirement keywords
  const match = text.match(/requirements?[:\s]+([^\n.]{20,200})/i)
    ?? text.match(/minimum[:\s]+([^\n.]{20,200})/i)
    ?? text.match(/grade\s+1[02][^.]{0,100}/i)
  return match?.[1]?.trim() ?? match?.[0]?.trim()
}
