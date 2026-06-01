import { prisma } from '@/lib/db'
import type { SourceResult } from './types'
import { scrapeGovpageLearnerships, scrapeGovpageBursaries } from './sources/govpage'
import { scrapeMersetaLearnerships } from './sources/merseta'
import { scrapeMictLearnerships } from './sources/mict'
import { scrapeNsfasStatus } from './sources/nsfas'

const SOURCES = [
  scrapeGovpageLearnerships,
  scrapeGovpageBursaries,
  scrapeMersetaLearnerships,
  scrapeMictLearnerships,
  scrapeNsfasStatus,
]

export type RunReport = {
  source: string
  found: number
  saved: number
  skipped: number
  error?: string
}

export async function runScraper(dryRun = false): Promise<RunReport[]> {
  const report: RunReport[] = []

  for (const scrape of SOURCES) {
    let result: SourceResult | undefined
    try {
      result = await scrape()
    } catch (err) {
      report.push({ source: scrape.name, found: 0, saved: 0, skipped: 0, error: String(err) })
      continue
    }

    let saved = 0
    let skipped = 0

    for (const item of result.items) {
      if (!item.title || item.title.length < 5) { skipped++; continue }

      if (!dryRun) {
        try {
          const existing = await prisma.scrapedListing.findUnique({
            where: { externalId: item.externalId },
          })

          if (!existing) {
            await prisma.scrapedListing.create({
              data: {
                type: result.type,
                source: result.source,
                sourceUrl: result.sourceUrl,
                externalId: item.externalId,
                title: item.title,
                provider: item.provider ?? null,
                data: item as object,
                status: 'PENDING',
              },
            })
            saved++
          } else {
            skipped++
          }
        } catch {
          skipped++
        }
      } else {
        console.log(`  [DRY RUN] Would save: ${item.title}`)
        saved++
      }
    }

    report.push({ source: result.source, found: result.items.length, saved, skipped })
  }

  return report
}
