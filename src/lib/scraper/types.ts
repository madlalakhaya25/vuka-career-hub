export type ScrapedItem = {
  externalId: string       // item URL or source:slug — used for deduplication
  title: string
  provider?: string
  description?: string
  seta?: string
  sector?: string
  nqfLevel?: number
  stipendMin?: number
  stipendMax?: number
  durationMonths?: number
  deadline?: string        // ISO date string YYYY-MM-DD
  applicationUrl?: string
  provinces?: string[]
  isNational?: boolean
  requirements?: string
  icon?: string
}

export type SourceResult = {
  source: string           // short name, e.g. 'govpage.co.za'
  sourceUrl: string        // page URL scraped
  type: 'LEARNERSHIP' | 'BURSARY'
  items: ScrapedItem[]
}
