import type { Metadata } from 'next'
import Link from 'next/link'
import { TrendingUp, Flame, ChevronRight, AlertTriangle } from 'lucide-react'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'In-Demand Careers South Africa 2026/2027 | Salary Guide',
  description: "South Africa's most in-demand careers with real salary data and qualification pathways.",
}

const sectorAccent: Record<string, { from: string; to: string; bg: string }> = {
  'Information Technology': { from: 'from-blue-500', to: 'to-indigo-500', bg: 'bg-blue-500/5' },
  'Trades': { from: 'from-amber-500', to: 'to-yellow-500', bg: 'bg-amber-500/5' },
  'Renewable Energy': { from: 'from-orange-500', to: 'to-amber-400', bg: 'bg-orange-500/5' },
  'Finance': { from: 'from-green-500', to: 'to-emerald-400', bg: 'bg-green-500/5' },
  'Healthcare': { from: 'from-rose-500', to: 'to-red-400', bg: 'bg-rose-500/5' },
  'Marketing': { from: 'from-pink-500', to: 'to-fuchsia-400', bg: 'bg-pink-500/5' },
  'Engineering': { from: 'from-slate-500', to: 'to-zinc-400', bg: 'bg-slate-500/5' },
}

const fallbackAccent = { from: 'from-slate-500', to: 'to-slate-400', bg: 'bg-slate-500/5' }

const demandCfg: Record<string, { label: string; cls: string; dot: string; ring: string }> = {
  CRITICAL: { label: 'Critical shortage', cls: 'bg-red-50 text-red-600 border-red-200', dot: 'bg-red-500 animate-pulse-ring', ring: 'ring-red-100' },
  HIGH: { label: 'High demand', cls: 'bg-orange-50 text-orange-600 border-orange-200', dot: 'bg-orange-500', ring: 'ring-orange-50' },
  MODERATE: { label: 'Moderate demand', cls: 'bg-yellow-50 text-yellow-600 border-yellow-200', dot: 'bg-yellow-500', ring: 'ring-yellow-50' },
  LOW: { label: 'Low demand', cls: 'bg-slate-50 text-slate-500 border-slate-200', dot: 'bg-slate-400', ring: 'ring-slate-50' },
}

// Maps filter chip key → Prisma sector string (partial match)
const filterSectorMap: Record<string, string> = {
  it: 'Information Technology',
  trades: 'Trades',
  healthcare: 'Healthcare',
  finance: 'Finance',
  energy: 'Energy',
  marketing: 'Marketing',
  engineering: 'Engineering',
}

const filterChips = [
  { key: 'all', label: 'All' },
  { key: 'it', label: 'IT & Tech' },
  { key: 'trades', label: 'Trades' },
  { key: 'healthcare', label: 'Healthcare' },
  { key: 'finance', label: 'Finance' },
  { key: 'energy', label: 'Energy' },
  { key: 'marketing', label: 'Marketing' },
]

function fmt(n: number) { return `R${n.toLocaleString()}` }

export default async function CareersPage({
  searchParams,
}: {
  searchParams: Promise<{ sector?: string }>
}) {
  const { sector } = await searchParams
  const activeSector = sector && filterSectorMap[sector] ? filterSectorMap[sector] : null

  const careers = await prisma.careerPath.findMany({
    where: activeSector ? { sector: { contains: activeSector } } : undefined,
    orderBy: [{ demandLevel: 'asc' }, { title: 'asc' }],
  })

  const criticalCount = await prisma.careerPath.count({ where: { demandLevel: 'CRITICAL' } })

  return (
    <>
      {/* Header */}
      <section className="relative mesh-bg dot-pattern pt-24 sm:pt-32 pb-16 overflow-hidden">
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-red-500/8 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-4 py-1.5 text-xs font-semibold text-red-400 mb-6">
              <AlertTriangle className="h-3.5 w-3.5" />
              {criticalCount} careers with critical skills shortage in SA right now
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight mb-4">
              Most in-demand
              <br />
              <span className="gradient-text">careers 2026/27</span>
            </h1>
            <p className="text-lg text-white/60">
              Real salary data and qualification pathways from the DHET National
              List of Occupations in High Demand. Employers are actively competing to hire.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent" />
      </section>

      {/* Stats band */}
      <section className="bg-slate-900 border-b border-white/6 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { v: '22%', l: 'Firms can\'t fill ICT roles' },
              { v: '22%', l: 'Firms can\'t fill artisan roles' },
              { v: '350', l: 'High-demand occupations' },
              { v: 'R110K', l: 'Top monthly salary' },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-2xl font-extrabold gradient-text">{s.v}</div>
                <div className="text-xs text-white/40 mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career grid */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="filter-chips mb-8">
            {filterChips.map((f) => {
              const isActive = f.key === 'all' ? !sector || sector === 'all' : sector === f.key
              return (
                <Link
                  key={f.key}
                  href={f.key === 'all' ? '/careers' : `/careers?sector=${f.key}`}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    isActive
                      ? 'gradient-orange text-white border-transparent'
                      : 'border-slate-200 text-slate-600 hover:border-orange-300 hover:text-orange-600 bg-white'
                  }`}
                >
                  {f.label}
                </Link>
              )
            })}
          </div>

          {careers.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-5xl mb-4">🔍</div>
              <p className="font-semibold text-slate-700 text-lg">No careers found</p>
              <p className="text-slate-400 text-sm mt-2 mb-6">Try a different filter or browse all careers.</p>
              <Link href="/careers" className="inline-flex items-center gap-2 px-5 py-2.5 gradient-orange text-white font-semibold rounded-xl text-sm hover:opacity-90 transition-opacity">
                View all careers
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {careers.map((c) => {
                const d = demandCfg[c.demandLevel] ?? demandCfg.MODERATE
                const accent = sectorAccent[c.sector] ?? fallbackAccent
                return (
                  <Link
                    key={c.id}
                    href={`/careers/${c.slug}`}
                    className="group bg-white rounded-2xl border border-slate-200 card-hover overflow-hidden"
                  >
                    {/* Gradient accent */}
                    <div className={`h-1 bg-gradient-to-r ${accent.from} ${accent.to}`} />

                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 ${accent.bg} rounded-2xl flex items-center justify-center text-2xl border border-slate-100`}>
                            {c.icon ?? '💼'}
                          </div>
                          <div>
                            <h3 className="font-extrabold text-dark text-base group-hover:text-orange-500 transition-colors leading-tight">
                              {c.title}
                            </h3>
                            <p className="text-xs text-slate-400">{c.sector}</p>
                          </div>
                        </div>
                        <div className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ring-4 ${d.cls} ${d.ring}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${d.dot}`} />
                          {d.label}
                        </div>
                      </div>

                      {c.description && (
                        <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">{c.description}</p>
                      )}

                      {/* Salary table */}
                      {(c.salaryEntry || c.salaryMid || c.salarySenior) && (
                        <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200/60 rounded-2xl p-4 mb-4">
                          <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-3">
                            Monthly salary range
                          </div>
                          <div className="grid grid-cols-3 gap-1.5 text-center">
                            {[
                              { l: 'Entry', v: c.salaryEntry },
                              { l: 'Mid-level', v: c.salaryMid },
                              { l: 'Senior', v: c.salarySenior },
                            ].map((row) => (
                              <div key={row.l} className="bg-white rounded-xl py-2.5">
                                <div className="text-sm font-extrabold text-dark">
                                  {row.v ? fmt(row.v) : '—'}
                                </div>
                                <div className="text-xs text-slate-400">{row.l}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-end gap-1 text-xs font-semibold text-orange-500 group-hover:gap-2 transition-all">
                        View pathway <ChevronRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <Flame className="h-10 w-10 text-brand mx-auto mb-4" />
          <h2 className="text-2xl font-extrabold text-dark mb-3">Not sure which suits you?</h2>
          <p className="text-slate-500 mb-6">
            Answer 10 quick questions about your interests and we&apos;ll show you which careers fit you best.
          </p>
          <Link
            href="/tools/career-quiz"
            className="inline-flex items-center gap-2 px-6 py-3.5 gradient-orange text-white font-bold rounded-2xl hover:opacity-90 transition-opacity glow-orange-sm"
          >
            Take Career Quiz <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  )
}
