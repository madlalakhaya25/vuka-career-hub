'use client'

import { useState, useTransition } from 'react'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { sendDigestAction } from '@/app/actions/admin'

export function DigestButton() {
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<{
    ok: boolean
    urgent?: number
    expired?: number
    newFound?: number
    error?: string
  } | null>(null)

  function handleClick() {
    setResult(null)
    startTransition(async () => {
      const res = await sendDigestAction()
      setResult(res)
    })
  }

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <button
        onClick={handleClick}
        disabled={isPending}
        className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-colors"
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        {isPending ? 'Sending…' : 'Send Digest Now'}
      </button>

      {result && (
        <div className={`flex items-center gap-2 text-sm font-medium ${result.ok ? 'text-green-600' : 'text-red-600'}`}>
          {result.ok ? (
            <>
              <CheckCircle className="h-4 w-4 shrink-0" />
              Sent to madlalakhaya@yahoo.com
              {(result.urgent! + result.expired!) > 0 && (
                <span className="text-slate-500 font-normal">
                  · {result.expired} expired, {result.urgent} urgent, {result.newFound} new found
                </span>
              )}
            </>
          ) : (
            <>
              <AlertCircle className="h-4 w-4 shrink-0" />
              {result.error ?? 'Failed to send'}
            </>
          )}
        </div>
      )}
    </div>
  )
}
