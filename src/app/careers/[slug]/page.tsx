import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, TrendingUp, DollarSign, CheckCircle, BookOpen } from 'lucide-react'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const career = await prisma.careerPath.findUnique({ where: { slug } })
  if (!career) return { title: 'Career Not Found' }
  return {
    title: `${career.title} Career Guide South Africa | Salary & Pathways`,
    description: career.description ?? `Learn about ${career.title} career paths, salary ranges, and qualifications in South Africa.`,
  }
}

const demandCfg: Record<string, { label: string; cls: string; dot: string }> = {
  CRITICAL: { label: 'Critical shortage', cls: 'bg-red-50 text-red-600 border-red-200', dot: 'bg-red-500 animate-pulse' },
  HIGH: { label: 'High demand', cls: 'bg-orange-50 text-orange-600 border-orange-200', dot: 'bg-orange-500' },
  MODERATE: { label: 'Moderate demand', cls: 'bg-yellow-50 text-yellow-600 border-yellow-200', dot: 'bg-yellow-500' },
  LOW: { label: 'Stable demand', cls: 'bg-slate-50 text-slate-600 border-slate-200', dot: 'bg-slate-400' },
}

function fmt(n: number) { return `R${n.toLocaleString()}` }

export default async function CareerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const career = await prisma.careerPath.findUnique({ where: { slug } })
  if (!career) notFound()

  const demand = demandCfg[career.demandLevel] ?? demandCfg.MODERATE

  return (
    <>
      {/* Header */}
      <section className="relative mesh-bg dot-pattern pt-24 sm:pt-28 pb-12 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/careers"
            className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to all careers
          </Link>

          <div className="flex items-start gap-5 mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl shrink-0">
              {career.icon ?? '💼'}
            </div>
            <div>
              <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border mb-3 ${demand.cls}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${demand.dot}`} />
                {demand.label}
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {career.title}
              </h1>
              <p className="text-white/60 mt-1 text-sm">{career.sector} · {career.fieldOfStudy}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          {/* Salary table */}
          {(career.salaryEntry || career.salaryMid || career.salarySenior) && (
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-emerald-500" />
                Salary ranges
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Entry level', value: career.salaryEntry, sub: '0–3 years' },
                  { label: 'Mid level', value: career.salaryMid, sub: '3–7 years' },
                  { label: 'Senior level', value: career.salarySenior, sub: '7+ years' },
                ].filter((row) => row.value).map((row) => (
                  <div key={row.label} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
                    <div className="text-xl sm:text-2xl font-extrabold text-emerald-700">{fmt(row.value!)}/mo</div>
                    <div className="text-sm font-semibold text-slate-700 mt-1">{row.label}</div>
                    <div className="text-xs text-slate-400">{row.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {career.description && (
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-3">About this career</h2>
              <p className="text-slate-600 leading-relaxed">{career.description}</p>
            </div>
          )}

          {/* Outlook */}
          {career.outlook && (
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 font-bold text-slate-800 mb-2">
                <TrendingUp className="h-4 w-4 text-orange-500" />
                Market outlook
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">{career.outlook}</p>
            </div>
          )}

          {/* Skills */}
          {career.skills.length > 0 && (
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-blue-500" />
                Key skills employers want
              </h2>
              <div className="flex flex-wrap gap-2">
                {career.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-full font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Pathways */}
          {career.pathways.length > 0 && (
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-purple-500" />
                How to qualify
              </h2>
              <div className="space-y-3">
                {career.pathways.map((pathway, i) => (
                  <div key={i} className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <div className="w-6 h-6 gradient-orange rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">{pathway}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-center">
            <h3 className="text-xl font-extrabold text-white mb-2">Ready to start?</h3>
            <p className="text-white/60 text-sm mb-6">
              Find learnerships, bursaries, and qualifications to launch your career in {career.sector}.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/learnerships"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 gradient-orange text-white font-semibold rounded-xl text-sm hover:opacity-90 transition-opacity"
              >
                Browse learnerships
              </Link>
              <Link
                href="/bursaries"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-white/20 text-white font-semibold rounded-xl text-sm hover:bg-white/10 transition-colors"
              >
                Find bursaries
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
