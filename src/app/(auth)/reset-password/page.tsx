import type { Metadata } from 'next'
import Link from 'next/link'
import { VukaMark } from '@/components/VukaMark'
import { ResetPasswordForm } from './ResetPasswordForm'

export const metadata: Metadata = { title: 'Reset Password' }

type Props = { searchParams: Promise<{ token?: string }> }

export default async function ResetPasswordPage({ searchParams }: Props) {
  const { token } = await searchParams

  if (!token) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Invalid reset link.</p>
          <Link href="/forgot-password" className="text-orange-500 hover:text-orange-600 font-semibold text-sm">
            Request a new one
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-2xl text-slate-900">
            <VukaMark size={32} className="rounded-xl shrink-0" />
            <span>Vuka<span className="text-orange-500">Career</span>Hub</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 mt-6">Set a new password</h1>
          <p className="text-slate-500 mt-1">Must be at least 8 characters</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <ResetPasswordForm token={token} />
        </div>
      </div>
    </div>
  )
}
