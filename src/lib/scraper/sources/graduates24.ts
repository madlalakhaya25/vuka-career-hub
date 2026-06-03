// Scraper for graduates24.com — one of SA's largest opportunity boards.
// Covers learnerships, internships, graduate programmes, bursaries and funding.
//
// WordPress-based with a job-board plugin. Uses standard article/entry-title
// selectors with fallbacks for different theme layouts.
//
// NOTE: Site is behind Cloudflare — run locally (`npm run scrape`),
// not from a cloud/DC IP.

import * as cheerio from 'cheerio'
import type { SourceResult, ScrapedItem } from '../types'
import { politeGet, parseDeadline, parseStipend, parseNqfLevel, parseProvinces, parseSeta } from '../utils'

const BASE = 'https://www.graduates24.com'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseListingPage($: ReturnType<typeof cheerio.load>, sourceUrl: string): ScrapedItem[] {
  const items: ScrapedItem[] = []

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parseEl = (el: any) => {
    const titleEl = $(el).find('.entry-title a, h2 a, h3 a, .job-title a, .listing-title a').first()
    const title = titleEl.text().trim()
    if (!title || title.length < 6) return

    const href = titleEl.attr('href') ?? $(el).find('a').first().attr('href')
    const itemUrl = href?.startsWith('http') ? href : href ? `${BASE}${href}` : sourceUrl

    const summary = $(el).find('.entry-summary, .entry-content, .job-description, .post-excerpt').text()
    const fullText = $(el).text()

    const stipend = parseStipend(fullText)
    const provinces = parseProvinces(fullText)
    const seta = parseSeta(fullText)

    const providerMatch = fullText.match(/(?:company|employer|provider)[:\s]+([A-Z][^\n,]{3,40})/i)

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
  }

  $('article').each((_, el) => parseEl(el))

  if (items.length === 0) {
    $('.post, .type-post, .hentry, .job-listing, .listing-item').each((_, el) => parseEl(el))
  }

  return items
}

async function scrapePage(path: string): Promise<ScrapedItem[]> {
  const url = `${BASE}${path}`
  try {
    const html = await politeGet(url)
    const $ = cheerio.load(html)
    return parseListingPage($, url)
  } catch (err) {
    console.error(`[graduates24 ${path}]`, err)
    return []
  }
}

export async function scrapeGraduates24Learnerships(): Promise<SourceResult> {
  return {
    source: 'graduates24.com',
    sourceUrl: `${BASE}/learnerships/`,
    type: 'LEARNERSHIP',
    items: await scrapePage('/learnerships/'),
  }
}

export async function scrapeGraduates24Internships(): Promise<SourceResult> {
  return {
    source: 'graduates24.com/internships',
    sourceUrl: `${BASE}/internshipprogrammes/`,
    type: 'LEARNERSHIP',
    items: (await scrapePage('/internshipprogrammes/')).map((i) => ({
      ...i,
      sector: i.sector ?? 'Internship',
    })),
  }
}

export async function scrapeGraduates24GradProgrammes(): Promise<SourceResult> {
  return {
    source: 'graduates24.com/grad-programmes',
    sourceUrl: `${BASE}/graduate_programmes/`,
    type: 'LEARNERSHIP',
    items: (await scrapePage('/graduate_programmes/')).map((i) => ({
      ...i,
      sector: i.sector ?? 'Graduate Programme',
    })),
  }
}

export async function scrapeGraduates24Bursaries(): Promise<SourceResult> {
  return {
    source: 'graduates24.com/bursaries',
    sourceUrl: `${BASE}/bursaries/`,
    type: 'BURSARY',
    items: await scrapePage('/bursaries/'),
  }
}

export async function scrapeGraduates24Funding(): Promise<SourceResult> {
  return {
    source: 'graduates24.com/funding',
    sourceUrl: `${BASE}/funding/`,
    type: 'BURSARY',
    items: await scrapePage('/funding/'),
  }
}

// Universities directory — institutions that offer bursaries/programmes.
// Mapped to BURSARY so admins can approve relevant university funding info.
export async function scrapeGraduates24Universities(): Promise<SourceResult> {
  return {
    source: 'graduates24.com/universities',
    sourceUrl: `${BASE}/universities/`,
    type: 'BURSARY',
    items: (await scrapePage('/universities/')).map((i) => ({
      ...i,
      description: i.description ?? 'University listed on graduates24.com — check website for bursary and application information.',
    })),
  }
}

// Businesses directory — companies posting graduate/internship programmes.
// Mapped to LEARNERSHIP so admins can approve relevant employer opportunities.
export async function scrapeGraduates24Businesses(): Promise<SourceResult> {
  return {
    source: 'graduates24.com/businesses',
    sourceUrl: `${BASE}/businesses/`,
    type: 'LEARNERSHIP',
    items: (await scrapePage('/businesses/')).map((i) => ({
      ...i,
      sector: i.sector ?? 'Graduate Programme',
      description: i.description ?? 'Employer listed on graduates24.com — visit their profile for current learnership and graduate opportunities.',
    })),
  }
}

function extractRequirements(text: string): string | undefined {
  const m = text.match(/requirements?[:\s]+([^\n.]{20,200})/i)
    ?? text.match(/minimum[:\s]+([^\n.]{20,200})/i)
    ?? text.match(/grade\s+1[02][^.]{0,100}/i)
  return (m?.[1] ?? m?.[0])?.trim()
}
