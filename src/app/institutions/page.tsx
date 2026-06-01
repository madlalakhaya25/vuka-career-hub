import type { Metadata } from 'next'
import Link from 'next/link'
import { GraduationCap, MapPin, Globe, CheckCircle, BookOpen, Award, Building2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Institutions — TVET Colleges, Universities & Private Colleges SA',
  description: 'Browse all 50 TVET colleges, 26 public universities, and top private colleges in South Africa.',
}

const institutions = [
  { name: 'University of Cape Town (UCT)', type: 'UNIVERSITY', provinces: ['Western Cape'], city: 'Cape Town', website: 'https://www.uct.ac.za', nsfas: true, desc: "Africa's top-ranked university. Strong in law, medicine, commerce, and engineering.", appClose: 'Oct 2025', featured: true, rank: '1st in Africa' },
  { name: 'University of the Witwatersrand (Wits)', type: 'UNIVERSITY', provinces: ['Gauteng'], city: 'Johannesburg', website: 'https://www.wits.ac.za', nsfas: true, desc: 'Premier research university in Johannesburg. Renowned for medicine, engineering, and law.', appClose: 'Sep 2025', featured: true, rank: 'Top 5 SA' },
  { name: 'University of Pretoria (UP)', type: 'UNIVERSITY', provinces: ['Gauteng'], city: 'Pretoria', website: 'https://www.up.ac.za', nsfas: true, desc: "One of SA's largest universities. Strong in veterinary science, law, and engineering.", appClose: 'Oct 2025', featured: false, rank: undefined },
  { name: 'Stellenbosch University', type: 'UNIVERSITY', provinces: ['Western Cape'], city: 'Stellenbosch', website: 'https://www.sun.ac.za', nsfas: true, desc: 'Top research university. Strong in agriculture, data science, and engineering.', appClose: 'Sep 2025', featured: false, rank: undefined },
  { name: 'UKZN', type: 'UNIVERSITY', provinces: ['KwaZulu-Natal'], city: 'Durban / PMB', website: 'https://www.ukzn.ac.za', nsfas: true, desc: 'Two campuses in Durban and Pietermaritzburg. Well known for healthcare, engineering, and agriculture.', appClose: 'Sep 2025', featured: false, rank: undefined },
  { name: 'UNISA', type: 'DISTANCE_LEARNING', provinces: ['National'], city: 'Distance learning', website: 'https://www.unisa.ac.za', nsfas: true, desc: "Africa's largest university. Fully online — study from anywhere in SA or the world.", appClose: 'Oct 2025', featured: true, rank: 'Largest in Africa' },
  { name: 'Tshwane University of Technology (TUT)', type: 'UNIVERSITY', provinces: ['Gauteng'], city: 'Pretoria', website: 'https://www.tut.ac.za', nsfas: true, desc: "One of SA's largest universities by student numbers. Practical, hands-on degrees in IT, engineering, and business.", appClose: 'Oct 2025', featured: false, rank: undefined },
  { name: 'Durban University of Technology (DUT)', type: 'UNIVERSITY', provinces: ['KwaZulu-Natal'], city: 'Durban', website: 'https://www.dut.ac.za', nsfas: true, desc: 'Strong engineering, IT, management, and health sciences in KZN.', appClose: 'Oct 2025', featured: false, rank: undefined },
  { name: 'Tshwane North TVET College', type: 'TVET', provinces: ['Gauteng'], city: 'Pretoria', website: 'https://www.tnc.edu.za', nsfas: true, desc: "One of Gauteng's largest TVET colleges. NCV and NATED in engineering, IT, and business.", appClose: 'Jan 2026', featured: true, rank: undefined },
  { name: 'Northlink TVET College', type: 'TVET', provinces: ['Western Cape'], city: 'Bellville', website: 'https://www.northlink.edu.za', nsfas: true, desc: 'Leading TVET college in the Western Cape. Trades, IT, business, and hospitality.', appClose: 'Jan 2026', featured: false, rank: undefined },
  { name: 'Majuba TVET College', type: 'TVET', provinces: ['KwaZulu-Natal'], city: 'Newcastle', website: 'https://www.majuba.edu.za', nsfas: true, desc: 'Well-regarded TVET college in the Newcastle area. Strong in engineering trades, IT, and business.', appClose: 'Jan 2026', featured: false, rank: undefined },
  { name: 'West Coast TVET College', type: 'TVET', provinces: ['Western Cape'], city: 'Vredenburg', website: 'https://www.westcoastcollege.co.za', nsfas: true, desc: 'Main TVET option along the West Coast. Offers NCV and NATED in trades, business, and engineering.', appClose: 'Jan 2026', featured: false, rank: undefined },
  { name: 'Rosebank College (IIE)', type: 'PRIVATE_COLLEGE', provinces: ['Gauteng', 'Western Cape', 'KwaZulu-Natal'], city: 'Multiple campuses', website: 'https://www.rosebankcollege.co.za', nsfas: false, desc: 'Affordable IIE private college with flexible payment plans. Business, IT, and media.', appClose: 'Rolling', featured: true, rank: undefined },
  { name: 'Boston City Campus', type: 'PRIVATE_COLLEGE', provinces: ['Gauteng', 'Western Cape', 'Eastern Cape'], city: 'Multiple campuses', website: 'https://www.boston.co.za', nsfas: false, desc: "Been around since 1974 — one of SA's longest-running private colleges. Practical diplomas and certificates you can finish quickly.", appClose: 'Rolling', featured: false, rank: undefined },
  { name: 'Regenesys Business School', type: 'PRIVATE_COLLEGE', provinces: ['Gauteng'], city: 'Sandton', website: 'https://www.regenesys.net', nsfas: false, desc: 'Business and management school. MBAs, BCom, and professional development.', appClose: 'Rolling', featured: false, rank: undefined },
]

const typeCfg: Record<string, { label: string; pill: string; accent: string; icon: typeof GraduationCap }> = {
  UNIVERSITY: { label: 'University', pill: 'bg-blue-50 text-blue-600 border-blue-200', accent: 'from-blue-500 to-indigo-500', icon: GraduationCap },
  TVET: { label: 'TVET College', pill: 'bg-green-50 text-green-600 border-green-200', accent: 'from-green-500 to-emerald-500', icon: BookOpen },
  PRIVATE_COLLEGE: { label: 'Private College', pill: 'bg-purple-50 text-purple-600 border-purple-200', accent: 'from-purple-500 to-violet-500', icon: Award },
  DISTANCE_LEARNING: { label: 'Distance Learning', pill: 'bg-orange-50 text-orange-600 border-orange-200', accent: 'from-orange-500 to-brand', icon: Building2 },
}

const groups = [
  { key: 'UNIVERSITY', title: 'Universities', sub: '26 public universities — NSFAS accredited' },
  { key: 'TVET', title: 'TVET Colleges', sub: '50 public colleges — often free, NSFAS eligible' },
  { key: 'PRIVATE_COLLEGE', title: 'Private Colleges & Distance', sub: 'Flexible options (NSFAS does not cover these)' },
]

export default function InstitutionsPage() {
  return (
    <>
      {/* Header */}
      <section className="relative mesh-bg dot-pattern pt-24 sm:pt-32 pb-16 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-blue-500/8 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-semibold text-white/70 mb-6">
              <GraduationCap className="h-3.5 w-3.5 text-brand" />
              All institution types across all 9 provinces
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight mb-4">
              Find Your
              <br />
              <span className="gradient-text">Institution</span>
            </h1>
            <p className="text-lg text-white/60 mb-8">
              50 TVET colleges, 26 universities, and top private colleges. Filter by province,
              institution type, and NSFAS eligibility.
            </p>
            <div className="glass border border-amber-500/25 rounded-2xl p-4 flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
              <div className="text-sm text-white/70">
                <strong className="text-white">NSFAS note:</strong> Only covers study at public universities
                and public TVET colleges — not private colleges. Look for the green NSFAS badge.
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Filter chips */}
      <section className="bg-white border-b border-slate-200 py-4 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="filter-chips">
            {['All', 'University', 'TVET', 'Private College', 'Gauteng', 'Western Cape', 'KwaZulu-Natal', 'NSFAS Only'].map((f) => (
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

      {/* Institution groups */}
      <div className="bg-white">
        {groups.map((group) => {
          const list = institutions.filter((i) =>
            group.key === 'PRIVATE_COLLEGE'
              ? i.type === 'PRIVATE_COLLEGE' || i.type === 'DISTANCE_LEARNING'
              : i.type === group.key
          )
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
                    <p className="text-sm text-slate-400">{group.sub}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {list.map((inst) => {
                    const t = typeCfg[inst.type]
                    const TIcon = t.icon
                    return (
                      <div
                        key={inst.name}
                        className={`group bg-white rounded-2xl border card-hover overflow-hidden ${
                          inst.featured ? 'border-orange-300' : 'border-slate-200'
                        }`}
                      >
                        <div className={`h-0.5 bg-gradient-to-r ${t.accent}`} />
                        <div className="p-5">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              {inst.nsfas && (
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
                            {inst.featured && (
                              <span className="text-xs text-slate-400">⭐</span>
                            )}
                          </div>

                          <h3 className="font-extrabold text-dark text-base leading-tight mb-0.5 group-hover:text-orange-500 transition-colors">
                            {inst.name}
                          </h3>
                          <span className={`inline-flex text-xs font-semibold px-2.5 py-0.5 rounded-full border mb-3 ${t.pill}`}>
                            {t.label}
                          </span>

                          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
                            <MapPin className="h-3.5 w-3.5 shrink-0" />
                            {inst.city}
                            {inst.provinces[0] !== 'National' && ` · ${inst.provinces[0]}`}
                          </div>

                          <p className="text-xs text-slate-500 leading-relaxed mb-4">{inst.desc}</p>

                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-400">Apply by: {inst.appClose}</span>
                            <a
                              href={inst.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-xs font-bold text-orange-500 hover:text-orange-600 transition-colors"
                            >
                              <Globe className="h-3.5 w-3.5" />
                              Website
                            </a>
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
      </div>
    </>
  )
}
