// Scraper for mict.org.za — MICT SETA (Media, Information & Communication
// Technologies SETA) learnerships. Covers software development, cybersecurity,
// digital marketing, and all ICT-related learnerships.

import * as cheerio from 'cheerio'
import type { SourceResult, ScrapedItem } from '../types'
import { politeGet, parseDeadline, parseStipend, parseNqfLevel, parseProvinces } from '../utils'

const SOURCE_URL = 'https://www.mict.org.za/learnerships'

export async function scrapeMictLearnerships(): Promise<SourceResult> {
  const items: ScrapedItem[] = []

  try {
    const html = await politeGet(SOURCE_URL)
    const $ = cheerio.load(html)

    // MICT SETA uses WordPress — try article posts first
    $('article, .post, .entry').each((_, el) => {
      const titleEl = $(el).find('h2 a, h3 a, .entry-title a, .post-title a').first()
      const title = titleEl.text().trim()
      if (!title) return

      const href = titleEl.attr('href')
      const itemUrl = href?.startsWith('http') ? href : href ? `https://www.mict.org.za${href}` : SOURCE_URL
      const fullText = $(el).text()
      const stipend = parseStipend(fullText)

      items.push({
        externalId: itemUrl,
        title,
        provider: 'MICT SETA',
        seta: 'MICT SETA',
        description: $(el).find('.entry-content p, .entry-summary p').first().text().trim() || undefined,
        deadline: parseDeadline(fullText),
        stipendMin: stipend.min,
        stipendMax: stipend.max,
        nqfLevel: parseNqfLevel(fullText) ?? 4,
        applicationUrl: itemUrl,
        provinces: parseProvinces(fullText),
        isNational: !parseProvinces(fullText).length,
        sector: 'Information Technology',
      })
    })

    // Fallback: paragraph-based listing (some SETA sites list in <p> blocks)
    if (items.length === 0) {
      const allText = $('main, .page-content, #content').text()
      const lines = allText.split('\n').map((l) => l.trim()).filter((l) => l.length > 20)

      lines.forEach((line) => {
        if (/learnership/i.test(line) && line.length < 200) {
          items.push({
            externalId: `mict:${line.substring(0, 60).toLowerCase().replace(/\s+/g, '-')}`,
            title: line,
            provider: 'MICT SETA',
            seta: 'MICT SETA',
            applicationUrl: SOURCE_URL,
            isNational: true,
            sector: 'Information Technology',
          })
        }
      })
    }
  } catch (err) {
    console.error('[mict seta]', err)
  }

  return { source: 'mict.org.za', sourceUrl: SOURCE_URL, type: 'LEARNERSHIP', items }
}
