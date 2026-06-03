'use client'

import { useState, useTransition } from 'react'
import { RefreshCw, CheckCircle, AlertCircle, Loader2, Inbox } from 'lucide-react'
import { runScraperAction } from '@/app/actions/admin'
import Link from 'next/link'

export function ScraperButton() {
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<{
    ok: boolean
    newListings?: number
    sources?: number
    errors?: number
    error?: string
  } | null>(null)

  function handleClick() {
    setResult(null)
    startTransition(async () => {
      const res = await runScraperAction()
      setResult(res)
    })
  }

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <button
        onClick={handleClick}
        disabled={isPending}
        className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-800 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-colors"
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCw className="h-4 w-4" />
        )}
        {isPending ? 'Scraping…' : 'Fetch New Listings'}
      </button>

      {result && (
        <div className={`flex items-center gap-2 text-sm font-medium ${result.ok ? 'text-green-600' : 'text-red-600'}`}>
          {result.ok ? (
            <>
              <CheckCircle className="h-4 w-4 shrink-0" />
              {result.newListings === 0
                ? 'No new listings found'
                : `${result.newListings} new listing${result.newListings === 1 ? '' : 's'} queued`}
              <span className="text-slate-400 font-normal">
                · {result.sources} sources
                {(result.errors ?? 0) > 0 && `, ${result.errors} blocked`}
              </span>
              {(result.newListings ?? 0) > 0 && (
                <Link href="/admin/inbox" className="flex items-center gap-1 text-orange-500 hover:text-orange-700 font-semibold">
                  <Inbox className="h-3.5 w-3.5" /> Review
                </Link>
              )}
            </>
          ) : (
            <>
              <AlertCircle className="h-4 w-4 shrink-0" />
              {result.error ?? 'Scrape failed'}
            </>
          )}
        </div>
      )}
    </div>
  )
}
