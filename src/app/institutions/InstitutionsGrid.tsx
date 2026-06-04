'use client'

import { useState } from 'react'
import { MapPin, Globe, GraduationCap, BookOpen, Award, Building2 } from 'lucide-react'

type Institution = {
  id: string
  name: string
  type: string
  provinces: string[]
  city: string | null
  website: string | null
  description: string | null
  rank: string | null
  appCloseDisplay: string | null
  applicationCloseDate: Date | null
  nsfasAccredited: boolean
  featured: boolean
}

const typeCfg: Record<string, { label: string; pill: string; accent: string; icon: typeof GraduationCap }> = {
  UNIVERSITY: { label: 'University', pill: 'bg-blue-50 text-blue-600 border-blue-200', accent: 'from-blue-500 to-indigo-500', icon: GraduationCap },
  TVET: { label: 'TVET College', pill: 'bg-green-50 text-green-600 border-green-200', accent: 'from-green-500 to-emerald-500', icon: BookOpen },
  PRIVATE_COLLEGE: { label: 'Private College', pill: 'bg-purple-50 text-purple-600 border-purple-200', accent: 'from-purple-500 to-violet-500', icon: Award },
  DISTANCE_LEARNING: { label: 'Distance Learning', pill: 'bg-orange-50 text-orange-600 border-orange-200', accent: 'from-orange-500 to-brand', icon: Building2 },
  TRAINING_PROVIDER: { label: 'Training Provider', pill: 'bg-slate-50 text-slate-600 border-slate-200', accent: 'from-slate-500 to-zinc-400', icon: BookOpen },
}

const groups = [
  { key: 'UNIVERSITY', title: 'Universities', sub: '26 public universities, NSFAS accredited' },
  { key: 'TVET', title: 'TVET Colleges', sub: '50 public colleges, often free, NSFAS eligible' },
  { key: 'PRIVATE_COLLEGE', title: 'Private Colleges & Distance', sub: 'Flexible options (NSFAS does not cover these)' },
]

const filterOptions = ['All', 'University', 'TVET', 'Private College', 'Gauteng', 'Western Cape', 'KwaZulu-Natal', 'NSFAS Only']

function matchesFilter(inst: Institution, filter: string): boolean {
  switch (filter) {
    case 'All': return true
    case 'University': return inst.type === 'UNIVERSITY'
    case 'TVET': return inst.type === 'TVET'
    case 'Private College': return inst.type === 'PRIVATE_COLLEGE' || inst.type === 'DISTANCE_LEARNING' || inst.type === 'TRAINING_PROVIDER'
    case 'NSFAS Only': return inst.nsfasAccredited
    default: return inst.provinces.includes(filter)
  }
}

function groupKey(filter: string): string | null {
  if (filter === 'University') return 'UNIVERSITY'
  if (filter === 'TVET') return 'TVET'
  if (filter === 'Private College') return 'PRIVATE_COLLEGE'
  return null
}

export function InstitutionsGrid({ institutions, initialFilter = 'All' }: { institutions: Institution[]; initialFilter?: string }) {
  const [activeFilter, setActiveFilter] = useState(initialFilter)

  const filtered = institutions.filter((i) => matchesFilter(i, activeFilter))

  const activeGroupKey = groupKey(activeFilter)
  const visibleGroups = activeGroupKey
    ? groups.filter((g) => g.key === activeGroupKey)
    : groups

  return (
    <>
      {/* Filter chips */}
      <section className="bg-white border-b border-slate-200 py-4 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="filter-chips">
            {filterOptions.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  f === activeFilter
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

      {/* Institution groups */}
      <div className="bg-white">
        {visibleGroups.map((group) => {
          const list = filtered.filter((i) =>
            group.key === 'PRIVATE_COLLEGE'
              ? i.type === 'PRIVATE_COLLEGE' || i.type === 'DISTANCE_LEARNING' || i.type === 'TRAINING_PROVIDER'
              : i.type === group.key
          )
          if (list.length === 0) return null
          const cfg = typeCfg[group.key === 'PRIVATE_COLLEGE' ? 'PRIVATE_COLLEGE' : group.key]
          const Icon = cfg.icon

          return (
            <section key={group.key} className="py-14 border-b border-slate-100 last:border-0">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center bg-gradient-to-br ${cfg.accent}`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-dark">{group.title}</h2>
                    <p className="text-sm text-slate-400">
                      {group.sub}
                      {activeFilter !== 'All' && activeFilter !== 'University' && activeFilter !== 'TVET' && activeFilter !== 'Private College' && (
                        <span className="ml-1 text-orange-500">· filtered by {activeFilter}</span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {list.map((inst) => {
                    const t = typeCfg[inst.type] ?? typeCfg.PRIVATE_COLLEGE
                    const TIcon = t.icon
                    return (
                      <div
                        key={inst.id}
                        className={`group bg-white rounded-2xl border card-hover overflow-hidden ${
                          inst.featured ? 'border-orange-300' : 'border-slate-200'
                        }`}
                      >
                        <div className={`h-0.5 bg-gradient-to-r ${t.accent}`} />
                        <div className="p-5">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              {inst.nsfasAccredited && (
                                <span className="text-xs bg-green-50 text-green-600 border border-green-200 px-2 py-0.5 rounded-full font-semibold">
                                  NSFAS ✓
                                </span>
                              )}
                              {inst.rank && (
                                <span className="text-xs bg-orange-50 text-orange-600 border border-orange-200 px-2 py-0.5 rounded-full font-semibold">
                                  {inst.rank}
                                </span>
                              )}
                            </div>
                            {inst.featured && <span className="text-xs text-slate-400">⭐</span>}
                          </div>

                          <h3 className="font-extrabold text-dark text-base leading-tight mb-0.5 group-hover:text-orange-500 transition-colors">
                            {inst.name}
                          </h3>
                          <span className={`inline-flex text-xs font-semibold px-2.5 py-0.5 rounded-full border mb-3 ${t.pill}`}>
                            {t.label}
                          </span>

                          {inst.city && (
                            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
                              <MapPin className="h-3.5 w-3.5 shrink-0" />
                              {inst.city}
                              {inst.provinces[0] && inst.provinces[0] !== 'National' && ` · ${inst.provinces[0]}`}
                            </div>
                          )}

                          {inst.description && (
                            <p className="text-xs text-slate-500 leading-relaxed mb-4">{inst.description}</p>
                          )}

                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-400">
                              Apply by:{' '}
                              {inst.appCloseDisplay ?? (inst.applicationCloseDate
                                ? inst.applicationCloseDate.toLocaleDateString('en-ZA', { month: 'short', year: 'numeric' })
                                : 'Rolling')}
                            </span>
                            {inst.website && (
                              <a
                                href={inst.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-xs font-bold text-orange-500 hover:text-orange-600 transition-colors"
                              >
                                <Globe className="h-3.5 w-3.5" />
                                Website
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>
          )
        })}

        {filtered.length === 0 && (
          <div className="py-20 text-center text-slate-400">
            <p className="text-lg font-semibold">No institutions match this filter.</p>
            <button onClick={() => setActiveFilter('All')} className="mt-3 text-sm text-orange-500 hover:underline">
              Clear filter
            </button>
          </div>
        )}
      </div>
    </>
  )
}
