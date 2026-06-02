'use client'

import { useActionState } from 'react'
import { resetPasswordAction } from '@/app/actions/auth'
import { ArrowRight, Loader2 } from 'lucide-react'

const initialState = { error: '' }

export function ResetPasswordForm({ token }: { token: string }) {
  const [state, action, isPending] = useActionState(resetPasswordAction, initialState)

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="token" value={token} />
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
          New password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="At least 8 characters"
        />
      </div>
      <div>
        <label htmlFor="confirm" className="block text-sm font-medium text-slate-700 mb-1.5">
          Confirm new password
        </label>
        <input
          id="confirm"
          name="confirm"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
          <>Update password <ArrowRight className="h-4 w-4" /></>
        )}
      </button>
    </form>
  )
}
