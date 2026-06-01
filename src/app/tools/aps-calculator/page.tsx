import type { Metadata } from 'next'
import { Calculator } from 'lucide-react'
import { APSCalculatorClient } from './APSCalculatorClient'

export const metadata: Metadata = {
  title: 'APS Score Calculator — Find Which Courses You Qualify For',
  description: 'Enter your matric marks to calculate your APS score and see which SA university programmes you qualify for.',
}

export default function APSCalculatorPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative mesh-bg dot-pattern pt-32 pb-16 overflow-hidden">
        <div className="absolute top-1/3 right-0 w-72 h-72 bg-brand/10 rounded-full blur-3xl" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 gradient-orange rounded-2xl flex items-center justify-center mx-auto mb-6 glow-orange">
            <Calculator className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-5xl font-extrabold text-white tracking-tight mb-4">
            APS Calculator
          </h1>
          <p className="text-lg text-white/60">
            Enter your matric subject marks to instantly calculate your Admission Point
            Score — and see which university programmes you qualify for.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent" />
      </section>
      <APSCalculatorClient />
    </>
  )
}
