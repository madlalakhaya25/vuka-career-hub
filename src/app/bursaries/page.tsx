import type { Metadata } from 'next'
import { Clock, ExternalLink, CheckCircle, Star, DollarSign, GraduationCap } from 'lucide-react'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Bursaries South Africa 2026/2027: NSFAS, Corporate & Government',
  description: 'Find bursaries for South African students. NSFAS, Sasol, Anglo American, Eskom and more.',
}

const categoryStyles: Record<string, { accent: string; border: string; tagCls: string }> = {
  government: {
    accent: 'from-green-500/15 to-emerald-500/5',
    border: 'border-green-500/20',
    tagCls: 'bg-green-500/10 text-green-400 border-green-500/20',
  },
  corporate: {
    accent: 'from-blue-500/15 to-blue-600/5',
    border: 'border-blue-500/20',
    tagCls: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  seta: {
    accent: 'from-orange-500/10 to-brand/5',
    border: 'border-orange-500/20',
    tagCls: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  },
}

const fallbackStyle = {
  accent: 'from-slate-500/10 to-zinc-500/5',
  border: 'border-slate-500/20',
  tagCls: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
}

function daysUntil(d: Date) { return Math.ceil((d.getTime() - Date.now()) / 86400000) }
function fmt(d: Date) { return d.toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' }) }

export default async function BursariesPage() {
  const bursaries = await prisma.bursary.findMany({
    where: { isActive: true },
    orderBy: [{ featured: 'desc' }, { name: 'asc' }],
  })

  const nsfas = bursaries.find((b) => b.isNsfas)
  const nsfasDeadline = nsfas?.deadline
    ? nsfas.deadline.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })
    : null

  return (
    <>
      {/* Header */}
      <section className="relative mesh-bg dot-pattern pt-24 sm:pt-32 pb-16 overflow-hidden">
        <div className="absolute top-1/3 left-0 w-72 h-72 bg-green-500/8 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-semibold text-green-400 mb-6">
              <GraduationCap className="h-3.5 w-3.5" />
              {bursaries.length} bursaries listed, updated for 2026/2027
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight mb-4">
              Bursaries &<br />
              <span className="gradient-text">Student Funding</span>
            </h1>
            <p className="text-lg text-white/60 mb-8">
              You don&apos;t have to fund your education alone. NSFAS, government departments,
              corporations, and SETAs award billions in bursaries every year.
            </p>

            {/* NSFAS urgent CTA */}
            <div className="glass border border-green-500/30 rounded-2xl p-5 flex items-start sm:items-center gap-4 flex-col sm:flex-row">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse shrink-0" />
                <div>
                  <div className="text-sm font-bold text-white">NSFAS 2026: Applications open</div>
                  <div className="text-xs text-white/50 mt-0.5">
                    {nsfasDeadline ? `Deadline: ${nsfasDeadline}` : 'Check nsfas.org.za for current dates'} · nsfas.org.za
                  </div>
                </div>
              </div>
              <a
                href="https://www.nsfas.org.za"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 flex items-center gap-1.5 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-xs font-bold rounded-xl transition-colors"
              >
                Apply Now <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent" />
      </section>

      {/* Filter chips */}
      <section className="bg-slate-50 border-b border-slate-200 py-4 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="filter-chips">
            {['All', 'Government', 'Corporate', 'SETA', 'Engineering', 'IT', 'Healthcare', 'Finance'].map((f) => (
              <button
                key={f}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  f === 'All'
                    ? 'gradient-orange text-white border-transparent'
                    : 'border-slate-200 text-slate-600 hover:border-orange-300 hover:text-orange-600 bg-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Bursary grid */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs text-slate-400 mb-6">
            External links go to official provider websites. If a link appears broken, search the bursary name on the provider&apos;s site directly.
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {bursaries.map((b) => {
              const style = categoryStyles[b.category ?? ''] ?? fallbackStyle
              const days = b.deadline ? daysUntil(b.deadline) : null
              const urgent = days !== null && days <= 45 && days > 0
              const closed = days !== null && days <= 0

              return (
                <div
                  key={b.id}
                  className={`group relative bg-gradient-to-br ${style.accent} border ${style.border} rounded-2xl p-6 card-hover overflow-hidden`}
                >
                  {b.featured && (
                    <div className="absolute top-4 right-4 flex items-center gap-1 text-xs font-semibold text-orange-500">
                      <Star className="h-3.5 w-3.5 fill-orange-500" />
                      Featured
                    </div>
                  )}

                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm shrink-0">
                      {b.icon ?? '🎓'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-extrabold text-dark text-lg">{b.name}</h3>
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${style.tagCls}`}>
                          {b.category ? b.category.charAt(0).toUpperCase() + b.category.slice(1) : 'Bursary'}
                        </span>
                      </div>
                      {b.fullName && <p className="text-xs text-slate-500 mt-0.5">{b.fullName}</p>}
                      <p className="text-xs font-medium text-slate-400 mt-0.5">by {b.provider}</p>
                    </div>
                  </div>

                  {b.description && (
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">{b.description}</p>
                  )}

                  {/* Fields */}
                  {b.fieldsOfStudy.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {b.fieldsOfStudy.map((f) => (
                        <span key={f} className="text-xs bg-white/70 text-slate-600 border border-slate-200 px-2.5 py-0.5 rounded-full">
                          {f}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Amount */}
                  {b.amountDescription && (
                    <div className="salary-pill rounded-xl px-4 py-2.5 mb-3 flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 shrink-0" />
                      <span className="font-bold">{b.amountDescription}</span>
                    </div>
                  )}

                  {/* Eligibility */}
                  {b.eligibilityNotes && (
                    <div className="flex items-start gap-2 text-xs text-slate-500 bg-white/50 rounded-xl px-3 py-2.5 mb-4">
                      <CheckCircle className="h-3.5 w-3.5 text-blue-500 shrink-0 mt-0.5" />
                      {b.eligibilityNotes}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center gap-1.5 text-xs font-medium ${closed ? 'text-red-500' : urgent ? 'text-orange-500' : 'text-slate-500'}`}>
                      {urgent && <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />}
                      <Clock className="h-3.5 w-3.5" />
                      {days === null
                        ? 'Rolling deadline'
                        : closed
                        ? 'Deadline passed'
                        : urgent
                        ? `${days} days left!`
                        : fmt(b.deadline!)}
                    </div>
                    {!closed && (
                      b.applicationUrl ? (
                        <a
                          href={b.applicationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-4 py-2 gradient-orange text-white text-xs font-bold rounded-xl hover:opacity-90 transition-all glow-orange-sm"
                        >
                          Apply <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      ) : (
                        <span className="text-xs text-slate-400 italic flex items-center gap-1">
                          <ExternalLink className="h-3 w-3" />
                          Visit {b.provider}&apos;s website
                        </span>
                      )
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
