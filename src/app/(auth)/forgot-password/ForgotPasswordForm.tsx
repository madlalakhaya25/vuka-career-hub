'use client'

import { useActionState } from 'react'
import { forgotPasswordAction } from '@/app/actions/auth'
import { ArrowRight, Loader2, CheckCircle } from 'lucide-react'

const initialState = { error: '' }

export function ForgotPasswordForm() {
  const [state, action, isPending] = useActionState(forgotPasswordAction, initialState)

  // After submission (no error), show success regardless (don't reveal if email exists)
  const submitted = state !== initialState && !state.error && !isPending

  if (submitted) {
    return (
      <div className="text-center space-y-4">
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
        <p className="text-slate-700 font-medium">Check your inbox</p>
        <p className="text-sm text-slate-500">
          If an account exists for that email, we&apos;ve sent a password reset link. It expires in 1 hour.
        </p>
      </div>
    )
  }

  return (
    <form action={action} className="space-y-4">
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
          className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="you@example.com"
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
          <>Send reset link <ArrowRight className="h-4 w-4" /></>
        )}
      </button>
    </form>
  )
}
