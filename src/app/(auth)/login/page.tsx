import type { Metadata } from 'next'
import Link from 'next/link'
import { Flame } from 'lucide-react'
import { LoginForm } from './LoginForm'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-2xl text-slate-900">
            <Flame className="h-7 w-7 text-orange-500" />
            <span>
              Vuka<span className="text-orange-500">Career</span>Hub
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 mt-6">Welcome back</h1>
          <p className="text-slate-500 mt-1">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <LoginForm />
          <p className="text-center text-sm text-slate-500 mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-orange-500 hover:text-orange-600 font-semibold">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
