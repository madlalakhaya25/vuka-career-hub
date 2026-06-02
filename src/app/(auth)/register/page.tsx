import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { RegisterForm } from './RegisterForm'
import { VukaMark } from '@/components/VukaMark'

export const metadata: Metadata = { title: 'Create Account for Free' }

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-2xl text-slate-900">
            <VukaMark size={32} className="rounded-xl shrink-0" />
            <span>Vuka<span className="text-orange-500">Career</span>Hub</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 mt-6">Create your free account</h1>
          <p className="text-slate-500 mt-1">Save learnerships, track bursary deadlines</p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
          <div className="space-y-2">
            {[
              'Save learnerships and bursaries',
              'Get deadline reminder alerts',
              'Personalised career recommendations',
              'Track your applications',
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle className="h-4 w-4 text-orange-500 shrink-0" />
                {benefit}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <RegisterForm />
          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-orange-500 hover:text-orange-600 font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
