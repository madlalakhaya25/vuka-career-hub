'use client'

import { useActionState } from 'react'
import { signInAction } from '@/app/actions/auth'
import Link from 'next/link'
import { ArrowRight, Loader2 } from 'lucide-react'

const initialState = { error: '' }

export function LoginForm({ registered, reset }: { registered?: boolean; reset?: boolean }) {
  const [state, action, isPending] = useActionState(signInAction, initialState)

  return (
    <form action={action} className="space-y-4">
      {registered && (
        <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
          Account created! Sign in below.
        </div>
      )}
      {reset && (
        <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
          Password updated! Sign in with your new password.
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="w-full px-4 py-3 border border-slate-300 rounded-xl text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent min-h-[48px]"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="password" className="block text-sm font-medium text-slate-700">
            Password
          </label>
          <Link href="/forgot-password" className="text-xs text-orange-500 hover:text-orange-600">
            Forgot password?
          </Link>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full px-4 py-3 border border-slate-300 rounded-xl text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent min-h-[48px]"
          placeholder="••••••••"
        />
      </div>

      {state?.error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold rounded-xl transition-colors text-sm"
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>Sign in <ArrowRight className="h-4 w-4" /></>
        )}
      </button>
    </form>
  )
}
