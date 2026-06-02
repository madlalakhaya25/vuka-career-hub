'use client'

import { useActionState } from 'react'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { subscribeNewsletter } from '@/app/actions/newsletter'

const initial = { error: '', success: false }

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(subscribeNewsletter, initial)

  if (state.success) {
    return (
      <div className="flex items-center gap-2 text-sm text-green-400 font-medium">
        <CheckCircle className="h-4 w-4 shrink-0" />
        You're subscribed! Check your inbox.
      </div>
    )
  }

  return (
    <form action={formAction} className="flex flex-col gap-2 w-full md:w-auto">
      <div className="flex gap-2">
        <input
          type="email"
          name="email"
          required
          placeholder="your@email.com"
          className="flex-1 md:w-64 px-4 py-2.5 bg-white/8 border border-white/12 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all"
        />
        <button
          type="submit"
          disabled={pending}
          className="px-4 py-2.5 gradient-orange text-white text-sm font-semibold rounded-xl hover:opacity-90 disabled:opacity-60 transition-opacity flex items-center gap-1.5 whitespace-nowrap"
        >
          {pending ? 'Sending…' : <><span>Subscribe</span> <ArrowRight className="h-3.5 w-3.5" /></>}
        </button>
      </div>
      {state.error && (
        <p className="text-xs text-red-400">{state.error}</p>
      )}
    </form>
  )
}
