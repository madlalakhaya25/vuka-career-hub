// Scraper for merseta.org.za — official MERSETA (Manufacturing, Engineering
// & Related Services SETA) learnerships page.
//
// MERSETA covers electrical, mechanical, automotive, and boilermaking trades.
// They update their learnerships page regularly with live opportunities.

import * as cheerio from 'cheerio'
import type { SourceResult, ScrapedItem } from '../types'
import { politeGet, parseDeadline, parseStipend, parseNqfLevel, parseProvinces } from '../utils'

const SOURCE_URL = 'https://www.merseta.org.za/Learnerships'

export async function scrapeMersetaLearnerships(): Promise<SourceResult> {
  const items: ScrapedItem[] = []

  try {
    const html = await politeGet(SOURCE_URL)
    const $ = cheerio.load(html)

    // MERSETA uses a table or card layout for listings
    // Try table rows first (common for SETA sites)
    $('table tr').each((i, el) => {
      if (i === 0) return // skip header
      const cells = $(el).find('td')
      if (cells.length < 2) return

      const title = cells.eq(0).text().trim()
      if (!title) return

      const fullText = $(el).text()
      const linkEl = $(el).find('a')
      const href = linkEl.attr('href')
      const itemUrl = href?.startsWith('http') ? href : href ? `https://www.merseta.org.za${href}` : SOURCE_URL

      items.push({
        externalId: `merseta:${slugify(title)}`,
        title,
        provider: 'MERSETA',
        seta: 'MERSETA',
        description: cells.eq(1).text().trim() || undefined,
        deadline: parseDeadline(fullText),
        stipendMin: parseStipend(fullText).min,
        stipendMax: parseStipend(fullText).max,
        nqfLevel: parseNqfLevel(fullText),
        applicationUrl: itemUrl !== SOURCE_URL ? itemUrl : 'https://www.merseta.org.za/Learnerships',
        provinces: parseProvinces(fullText),
        isNational: !parseProvinces(fullText).length,
        sector: 'Engineering',
      })
    })

    // Fallback: try card/article layout
    if (items.length === 0) {
      $('article, .learnership-item, .job-item, .listing-item, .wpb_wrapper .vc_column-inner').each((_, el) => {
        const titleEl = $(el).find('h2, h3, h4, .title, strong').first()
        const title = titleEl.text().trim()
        if (!title || title.length < 5) return

        const fullText = $(el).text()
        const href = $(el).find('a').attr('href')
        const itemUrl = href?.startsWith('http') ? href : href ? `https://www.merseta.org.za${href}` : SOURCE_URL

        items.push({
          externalId: `merseta:${slugify(title)}`,
          title,
          provider: 'MERSETA',
          seta: 'MERSETA',
          description: $(el).find('p').first().text().trim() || undefined,
          deadline: parseDeadline(fullText),
          applicationUrl: 'https://www.merseta.org.za/Learnerships',
          provinces: parseProvinces(fullText),
          isNational: !parseProvinces(fullText).length,
          sector: 'Engineering',
        })
      })
    }
  } catch (err) {
    console.error('[merseta]', err)
  }

  return { source: 'merseta.org.za', sourceUrl: SOURCE_URL, type: 'LEARNERSHIP', items }
}

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').substring(0, 80)
}
