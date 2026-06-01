'use client'

import { useState, useTransition } from 'react'
import { Check, X, ChevronDown, ChevronUp, Globe, RefreshCw } from 'lucide-react'
import { approveScrapedListing, rejectScrapedListing, rejectAllScrapedListings } from '@/app/actions/admin'

type Item = {
  id: string
  type: string
  source: string
  sourceUrl: string
  title: string
  provider: string | null
  data: unknown
  createdAt: Date
}

type Props = {
  items: Item[]
  sources: string[]
}

export function InboxClient({ items, sources }: Props) {
  const [activeSource, setActiveSource] = useState<string>('All')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  const filtered = activeSource === 'All'
    ? items
    : items.filter((i) => i.source === activeSource)

  function approve(id: string) {
    startTransition(() => approveScrapedListing(id))
  }

  function reject(id: string) {
    startTransition(() => rejectScrapedListing(id))
  }

  function rejectAll() {
    if (!confirm(`Reject all ${filtered.length} pending items from "${activeSource}"?`)) return
    startTransition(() => rejectAllScrapedListings(activeSource === 'All' ? undefined : activeSource))
  }

  return (
    <div className="space-y-4">
      {/* Source filter + bulk actions */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {['All', ...sources].map((s) => (
            <button
              key={s}
              onClick={() => setActiveSource(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                s === activeSource
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'border-slate-200 text-slate-600 hover:border-orange-300 bg-white'
              }`}
            >
              {s === 'All' ? `All (${items.length})` : `${s} (${items.filter((i) => i.source === s).length})`}
            </button>
          ))}
        </div>
        <button
          onClick={rejectAll}
          disabled={pending}
          className="text-xs text-slate-400 hover:text-red-500 font-medium disabled:opacity-50"
        >
          Reject all {activeSource === 'All' ? '' : `from ${activeSource}`}
        </button>
      </div>

      {/* Listing table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="text-left px-5 py-3 font-semibold text-slate-600">Title</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Type</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Source</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Scraped</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((item) => {
              const isExpanded = expanded === item.id
              const data = item.data as Record<string, unknown>
              return (
                <>
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50 cursor-pointer"
                    onClick={() => setExpanded(isExpanded ? null : item.id)}
                  >
                    <td className="px-5 py-3">
                      <div className="font-medium text-slate-900 leading-snug">{item.title}</div>
                      {item.provider && <div className="text-xs text-slate-400 mt-0.5">{item.provider}</div>}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                        item.type === 'LEARNERSHIP'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-green-50 text-green-700'
                      }`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-orange-500 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Globe className="h-3 w-3" />
                        {item.source}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-400">
                      {new Date(item.createdAt).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 justify-end">
                        <button
                          onClick={(e) => { e.stopPropagation(); approve(item.id) }}
                          disabled={pending}
                          title="Approve — create live listing"
                          className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 disabled:opacity-50 transition-colors"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); reject(item.id) }}
                          disabled={pending}
                          title="Reject — discard"
                          className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 disabled:opacity-50 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <span className="text-slate-300">
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </span>
                      </div>
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr key={`${item.id}-detail`}>
                      <td colSpan={5} className="bg-slate-50 px-5 py-4 border-b border-slate-200">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-3">
                          {data.seta && <Detail label="SETA" value={String(data.seta)} />}
                          {data.sector && <Detail label="Sector" value={String(data.sector)} />}
                          {data.nqfLevel && <Detail label="NQF Level" value={String(data.nqfLevel)} />}
                          {(data.stipendMin || data.stipendMax) && (
                            <Detail
                              label="Stipend"
                              value={`R${Number(data.stipendMin ?? 0).toLocaleString()}–R${Number(data.stipendMax ?? 0).toLocaleString()}/mo`}
                            />
                          )}
                          {data.deadline && <Detail label="Deadline" value={String(data.deadline)} />}
                          {data.durationMonths && <Detail label="Duration" value={`${data.durationMonths} months`} />}
                          {data.isNational !== undefined && <Detail label="Coverage" value={data.isNational ? 'National' : String((data.provinces as string[] | undefined)?.join(', ') ?? '')} />}
                        </div>
                        {data.description && (
                          <p className="text-xs text-slate-600 leading-relaxed mb-2">{String(data.description)}</p>
                        )}
                        {data.requirements && (
                          <p className="text-xs text-slate-500 italic">Requirements: {String(data.requirements)}</p>
                        )}
                        {data.applicationUrl && (
                          <a href={String(data.applicationUrl)} target="_blank" rel="noopener noreferrer" className="text-xs text-orange-500 hover:underline mt-1 inline-block">
                            {String(data.applicationUrl)}
                          </a>
                        )}
                      </td>
                    </tr>
                  )}
                </>
              )
            })}
          </tbody>
        </table>
      </div>

      {pending && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-lg">
          <RefreshCw className="h-3.5 w-3.5 animate-spin" />
          Updating...
        </div>
      )}
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg px-3 py-2">
      <div className="text-slate-400 font-medium mb-0.5">{label}</div>
      <div className="text-slate-700 font-semibold">{value}</div>
    </div>
  )
}
