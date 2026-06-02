import type { Metadata } from 'next'
import { Zap } from 'lucide-react'
import { CareerQuizClient } from './CareerQuizClient'

export const metadata: Metadata = {
  title: 'Career Quiz: Discover Your Ideal Career Path',
  description: 'Answer 10 questions about your interests and strengths to find your ideal career in South Africa.',
}

export default function CareerQuizPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 overflow-hidden bg-gradient-to-br from-orange-500 to-orange-600">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-5xl font-extrabold text-white tracking-tight mb-4">
            Career Quiz
          </h1>
          <p className="text-lg text-orange-100">
            10 questions. 3 minutes. Discover the in-demand careers in South Africa
            that best match your personality and strengths.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent" />
      </section>
      <CareerQuizClient />
    </>
  )
}
