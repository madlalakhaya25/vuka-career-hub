import type { Metadata } from 'next'
import { Clock, MapPin, DollarSign, CheckCircle, ArrowRight, Briefcase, BookOpen, Building2 } from 'lucide-react'
import { prisma } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Learnerships 2025/2026 — All SETA Learnerships South Africa',
  description: 'Browse current learnerships in South Africa. Free training + monthly stipend. Updated regularly.',
}

const sectorStyles: Record<string, { accentColor: string; borderColor: string }> = {
  'Information Technology': { accentColor: 'from-blue-500/20 to-blue-600/5', borderColor: 'border-blue-500/20' },
  'Engineering': { accentColor: 'from-amber-500/20 to-amber-600/5', borderColor: 'border-amber-500/20' },
  'Business & Commerce': { accentColor: 'from-purple-500/20 to-purple-600/5', borderColor: 'border-purple-500/20' },
  'Renewable Energy': { accentColor: 'from-orange-500/20 to-orange-600/5', borderColor: 'border-orange-500/20' },
  'Healthcare': { accentColor: 'from-red-500/15 to-red-600/5', borderColor: 'border-red-500/20' },
  'Marketing & Media': { accentColor: 'from-pink-500/15 to-pink-600/5', borderColor: 'border-pink-500/20' },
  'Finance': { accentColor: 'from-green-500/15 to-green-600/5', borderColor: 'border-green-500/20' },
}

const fallbackStyle = { accentColor: 'from-slate-500/20 to-slate-600/5', borderColor: 'border-slate-500/20' }

const setas = [
  { name: 'MICT SETA', sector: 'IT & Communications', icon: '💻', count: 45 },
  { name: 'MERSETA', sector: 'Manufacturing & Engineering', icon: '⚙️', count: 62 },
  { name: 'Services SETA', sector: 'Business & Finance', icon: '🏢', count: 38 },
  { name: 'HWSETA', sector: 'Healthcare', icon: '🏥', count: 29 },
  { name: 'EWSETA', sector: 'Energy & Water', icon: '⚡', count: 18 },
  { name: 'CETA', sector: 'Construction', icon: '🏗️', count: 31 },
  { name: 'AgriSETA', sector: 'Agriculture', icon: '🌾', count: 24 },
  { name: 'FASSET', sector: 'Finance', icon: '💰', count: 22 },
]

function daysUntil(d: Date) {
  return Math.ceil((d.getTime() - Date.now()) / 86400000)
}
function fmt(d: Date) {
  return d.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default async function LearnershipPage() {
  const learnerships = await prisma.learnership.findMany({
    where: { status: { not: 'CLOSED' } },
    orderBy: [{ status: 'asc' }, { deadline: 'asc' }],
  })

  const openCount = learnerships.filter((l) => l.status === 'OPEN').length

  return (
    <>
      {/* Header */}
      <section className="relative mesh-bg dot-pattern pt-24 sm:pt-32 pb-16 overflow-hidden">
        <div className="absolute top-1/3 right-0 w-64 h-64 bg-brand/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-semibold text-brand mb-6">
              <Briefcase className="h-3.5 w-3.5" />
              Updated June 2025 — {openCount} open learnerships
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight mb-4">
              Learnerships
              <br />
              <span className="gradient-text">2025/2026</span>
            </h1>
            <p className="text-lg text-white/60 mb-8">
              Free SETA-funded training + a monthly stipend while you work toward
              a nationally recognised qualification. No experience required.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: BookOpen, v: '100% Free', s: 'No fees ever' },
                { icon: DollarSign, v: 'R2.5K–R8K/mo', s: 'Monthly stipend' },
                { icon: Building2, v: '21 SETAs', s: 'All sectors' },
              ].map((s) => (
                <div key={s.v} className="glass rounded-2xl p-4 text-center">
                  <s.icon className="h-5 w-5 text-brand mx-auto mb-1.5" />
                  <div className="font-bold text-white text-sm">{s.v}</div>
                  <div className="text-xs text-white/40">{s.s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* How it works */}
      <section className="bg-orange-50 border-b border-orange-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: '01', t: 'Apply online', d: 'Send your ID, matric cert, and CV to the SETA or employer listed.' },
              { n: '02', t: 'Work + study', d: 'Split your time between a workplace and a training provider or TVET college.' },
              { n: '03', t: 'Graduate', d: 'Complete assessments to earn your SAQA-registered National Certificate.' },
            ].map((step) => (
              <div key={step.n} className="flex gap-4">
                <div className="w-10 h-10 gradient-orange rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0">
                  {step.n}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{step.t}</h3>
                  <p className="text-sm text-slate-500 mt-1">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Listings */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-extrabold text-dark">
              {openCount} open right now
            </h2>
            <div className="filter-chips">
              {['All', 'IT', 'Engineering', 'Healthcare', 'Finance', 'Energy'].map((f) => (
                <button
                  key={f}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    f === 'All'
                      ? 'gradient-orange text-white border-transparent glow-orange-sm'
                      : 'border-slate-200 text-slate-600 hover:border-orange-300 hover:text-orange-600'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {learnerships.map((l) => {
              const style = sectorStyles[l.sector ?? ''] ?? fallbackStyle
              const days = l.deadline ? daysUntil(l.deadline) : null
              const urgent = days !== null && days <= 30 && days > 0

              const statusLabel = l.status === 'OPEN' ? 'Open' : l.status === 'UPCOMING' ? 'Upcoming' : 'Closed'
              const statusCls = l.status === 'OPEN'
                ? 'bg-green-100 text-green-700 border-green-200'
                : l.status === 'UPCOMING'
                ? 'bg-blue-100 text-blue-700 border-blue-200'
                : 'bg-slate-100 text-slate-500 border-slate-200'

              return (
                <div
                  key={l.id}
                  className={`group relative bg-gradient-to-br ${style.accentColor} border ${style.borderColor} rounded-2xl p-6 card-hover overflow-hidden`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm shrink-0">
                      {l.icon ?? '📋'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-extrabold text-dark text-base leading-tight">{l.title}</h3>
                        <span className={`shrink-0 text-xs border px-2.5 py-0.5 rounded-full font-semibold ${statusCls}`}>
                          {statusLabel}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs mb-3">
                        {l.seta && <span className="font-semibold text-orange-600">{l.seta}</span>}
                        {l.seta && l.sector && <span className="text-slate-300">·</span>}
                        {l.sector && <span className="text-slate-500">{l.sector}</span>}
                        <span className="text-slate-300">·</span>
                        <span className="text-slate-500">NQF {l.nqfLevel}</span>
                      </div>
                      {l.description && (
                        <p className="text-sm text-slate-600 leading-relaxed mb-4">{l.description}</p>
                      )}

                      <div className="flex flex-wrap gap-3 mb-4">
                        {l.stipendMin && l.stipendMax && (
                          <div className="salary-pill rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-xs">
                            <DollarSign className="h-3.5 w-3.5" />
                            <span className="font-bold">R{l.stipendMin.toLocaleString()}–R{l.stipendMax.toLocaleString()}/mo</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100 rounded-xl px-3 py-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {l.durationMonths} months
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100 rounded-xl px-3 py-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          {l.isNational ? 'National' : l.provinces.slice(0, 2).join(', ')}
                        </div>
                      </div>

                      {l.requirements && (
                        <div className="flex items-start gap-2 text-xs text-slate-500 bg-white/60 rounded-xl px-3 py-2 mb-4">
                          <CheckCircle className="h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5" />
                          {l.requirements}
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className={`flex items-center gap-1.5 text-xs font-semibold ${urgent ? 'text-red-600' : 'text-slate-500'}`}>
                          {urgent && <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />}
                          <Clock className="h-3.5 w-3.5" />
                          {days === null ? 'Rolling' : urgent ? `${days} days left!` : fmt(l.deadline!)}
                        </div>
                        <a
                          href={l.applicationUrl ?? '#'}
                          target={l.applicationUrl ? '_blank' : undefined}
                          rel={l.applicationUrl ? 'noopener noreferrer' : undefined}
                          className="group/btn flex items-center gap-1.5 px-4 py-2 gradient-orange text-white text-xs font-bold rounded-xl hover:opacity-90 transition-all glow-orange-sm"
                        >
                          Apply Now
                          <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* SETA Grid */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-dark mb-6">Browse by SETA</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {setas.map((s) => (
              <div
                key={s.name}
                className="group bg-white rounded-2xl border border-slate-200 p-5 card-hover cursor-pointer"
              >
                <div className="text-3xl mb-3">{s.icon}</div>
                <div className="font-bold text-dark text-sm group-hover:text-orange-500 transition-colors">
                  {s.name}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">{s.sector}</div>
                <div className="mt-2 text-xs font-semibold text-orange-500">{s.count}+ learnerships</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
