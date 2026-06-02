import type { Metadata } from 'next'
import Link from 'next/link'
import { VukaMark } from '@/components/VukaMark'
import { ForgotPasswordForm } from './ForgotPasswordForm'

export const metadata: Metadata = { title: 'Forgot Password' }

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-2xl text-slate-900">
            <VukaMark size={32} className="rounded-xl shrink-0" />
            <span>Vuka<span className="text-orange-500">Career</span>Hub</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 mt-6">Forgot your password?</h1>
          <p className="text-slate-500 mt-1">Enter your email and we&apos;ll send a reset link</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <ForgotPasswordForm />
          <p className="text-center text-sm text-slate-500 mt-6">
            <Link href="/login" className="text-orange-500 hover:text-orange-600 font-semibold">
              Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
