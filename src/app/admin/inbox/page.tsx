import { prisma } from '@/lib/db'
import { InboxClient } from './InboxClient'

export default async function AdminInboxPage() {
  const [pending, approved, rejected] = await Promise.all([
    prisma.scrapedListing.findMany({
      where: { status: 'PENDING' },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.scrapedListing.count({ where: { status: 'APPROVED' } }),
    prisma.scrapedListing.count({ where: { status: 'REJECTED' } }),
  ])

  // Group pending by source
  const sources = [...new Set(pending.map((p) => p.source))]

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Scraper Inbox</h1>
          <p className="text-slate-500 mt-0.5">
            Review listings scraped from SA websites before they go live
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1 rounded-full font-semibold">
            {pending.length} pending
          </span>
          <span className="text-slate-400">{approved} approved · {rejected} rejected</span>
        </div>
      </div>

      {pending.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
          <div className="text-4xl mb-3">✅</div>
          <p className="font-semibold text-slate-700">Inbox is clear</p>
          <p className="text-sm text-slate-400 mt-1">
            Run <code className="bg-slate-100 px-1.5 py-0.5 rounded">npm run scrape</code> locally
            or trigger the GitHub Action to fetch new listings.
          </p>
        </div>
      ) : (
        <InboxClient items={pending} sources={sources} />
      )}
    </div>
  )
}
