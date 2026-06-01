import type { Metadata } from 'next'
import Link from 'next/link'
import { TrendingUp, Flame, ChevronRight, AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'In-Demand Careers South Africa 2025/2026 — Salary Guide',
  description: "South Africa's most in-demand careers with real salary data and qualification pathways.",
}

const careers = [
  {
    title: 'Software Developer', slug: 'software-developer',
    sector: 'Information Technology', icon: '💻',
    demand: 'CRITICAL', salaryEntry: 25000, salaryMid: 55000, salarySenior: 88000,
    desc: 'Design, build, and maintain software. One of the highest-paying careers in SA with remote work opportunities for international companies.',
    skills: ['JavaScript', 'Python', 'React', 'Node.js', 'SQL'],
    pathways: ['BSc Computer Science', 'MICT SETA Learnership', 'WeThinkCode_ / HyperionDev Bootcamp'],
    outlook: 'ICT skills shortage up 57% YoY — 22% of companies struggled to fill roles in 2025',
    accentFrom: 'from-blue-500', accentTo: 'to-indigo-500',
    bgGlow: 'bg-blue-500/5',
  },
  {
    title: 'Electrician (Artisan)', slug: 'electrician',
    sector: 'Trades', icon: '⚡',
    demand: 'CRITICAL', salaryEntry: 17000, salaryMid: 25000, salarySenior: 52000,
    desc: 'Install and repair electrical systems. Red Seal trade with lifelong earning potential — own your business and earn even more.',
    skills: ['Wiring & installations', 'Fault diagnosis', "Wireman's license", 'Safety compliance'],
    pathways: ['TVET N1–N3 + Apprenticeship', 'MERSETA Learnership', 'Trade test → Red Seal'],
    outlook: 'Artisan shortage doubled — 22% of companies could not fill artisan roles in 2025',
    accentFrom: 'from-amber-500', accentTo: 'to-yellow-500',
    bgGlow: 'bg-amber-500/5',
  },
  {
    title: 'Solar PV Technician', slug: 'solar-pv-technician',
    sector: 'Renewable Energy', icon: '☀️',
    demand: 'CRITICAL', salaryEntry: 8000, salaryMid: 18000, salarySenior: 35000,
    desc: 'Install and maintain solar power systems for homes, businesses, and industrial sites. Energy crisis created explosive demand.',
    skills: ['Solar PV installation', 'Inverter systems', 'Electrical basics', 'Safety practices'],
    pathways: ['Solar PV NQF 3 (QCTO)', 'EWSETA Learnership', 'PQRS Training / MSC Academy'],
    outlook: "One of SA's fastest-growing sectors",
    accentFrom: 'from-orange-500', accentTo: 'to-amber-400',
    bgGlow: 'bg-orange-500/5',
  },
  {
    title: 'Data Scientist', slug: 'data-scientist',
    sector: 'Information Technology', icon: '📊',
    demand: 'CRITICAL', salaryEntry: 21000, salaryMid: 40000, salarySenior: 68000,
    desc: 'Analyse data to find insights that drive business decisions. Growing rapidly in SA — AI/ML engineers are emerging as top earners.',
    skills: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics'],
    pathways: ['BSc Statistics/Maths', 'BCom Analytics', 'Coursera Data Science cert'],
    outlook: 'AI/ML engineers emerging as top earners',
    accentFrom: 'from-violet-500', accentTo: 'to-purple-500',
    bgGlow: 'bg-violet-500/5',
  },
  {
    title: 'Cybersecurity Analyst', slug: 'cybersecurity-analyst',
    sector: 'Information Technology', icon: '🔒',
    demand: 'CRITICAL', salaryEntry: 25000, salaryMid: 55000, salarySenior: 100000,
    desc: 'Protect organisations from cyber attacks. As businesses go digital, demand has skyrocketed. Excellent remote work options.',
    skills: ['Network security', 'Ethical hacking', 'CompTIA Security+', 'SIEM tools'],
    pathways: ['Diploma Cybersecurity', 'CompTIA A+ → Security+', 'Certified Ethical Hacker (CEH)'],
    outlook: "Critical shortage — one of SA's fastest-growing sectors",
    accentFrom: 'from-red-500', accentTo: 'to-pink-500',
    bgGlow: 'bg-red-500/5',
  },
  {
    title: 'Registered Nurse', slug: 'registered-nurse',
    sector: 'Healthcare', icon: '🏥',
    demand: 'HIGH', salaryEntry: 15000, salaryMid: 28000, salarySenior: 60000,
    desc: 'Provide patient care in hospitals, clinics, and communities. Strong job security and many specialisation paths.',
    skills: ['Patient care', 'Clinical assessment', 'Emergency response', 'Medication'],
    pathways: ['4-year B.Cur Degree', '3-year Diploma Nursing', 'HWSETA Learnership (Auxiliary)'],
    outlook: 'Registered nurses hardest healthcare role to recruit',
    accentFrom: 'from-rose-500', accentTo: 'to-red-400',
    bgGlow: 'bg-rose-500/5',
  },
  {
    title: 'Cloud Engineer / DevOps', slug: 'cloud-engineer',
    sector: 'Information Technology', icon: '☁️',
    demand: 'CRITICAL', salaryEntry: 30000, salaryMid: 65000, salarySenior: 110000,
    desc: 'Build and manage cloud infrastructure on AWS, Azure, or GCP. As SA companies migrate to the cloud, demand is surging.',
    skills: ['AWS / Azure / GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Linux'],
    pathways: ['BSc Computer Science', 'AWS/Azure certifications (self-study)', 'MICT SETA → specialise'],
    outlook: 'Among the fastest-growing IT roles globally',
    accentFrom: 'from-sky-500', accentTo: 'to-cyan-400',
    bgGlow: 'bg-sky-500/5',
  },
  {
    title: 'Boilermaker', slug: 'boilermaker',
    sector: 'Trades', icon: '⚙️',
    demand: 'CRITICAL', salaryEntry: 17500, salaryMid: 27000, salarySenior: 50000,
    desc: 'Fabricate and repair boilers, pressure vessels, and structural steel. Work across mining, manufacturing, and energy sectors.',
    skills: ['Welding', 'Metal fabrication', 'Blueprint reading', 'Pressure vessels'],
    pathways: ['TVET N1–N3 + Apprenticeship', 'MERSETA Learnership', 'Trade test → Red Seal'],
    outlook: 'Critical across mining and energy sectors',
    accentFrom: 'from-slate-500', accentTo: 'to-zinc-400',
    bgGlow: 'bg-slate-500/5',
  },
  {
    title: 'Accountant / Bookkeeper', slug: 'accountant',
    sector: 'Finance', icon: '📈',
    demand: 'HIGH', salaryEntry: 18000, salaryMid: 40000, salarySenior: 80000,
    desc: 'Manage financial records and tax compliance. Every business needs accounting — stable, high demand across all industries.',
    skills: ['SAGE / Pastel', 'Xero', 'Tax legislation', 'Financial reporting'],
    pathways: ['BCom Accounting', 'Diploma Accounting (TVET)', 'FASSET Learnership', 'CIMA articles'],
    outlook: 'Stable demand — finance sector resilient',
    accentFrom: 'from-green-500', accentTo: 'to-emerald-400',
    bgGlow: 'bg-green-500/5',
  },
  {
    title: 'Digital Marketer', slug: 'digital-marketer',
    sector: 'Marketing', icon: '📱',
    demand: 'HIGH', salaryEntry: 12000, salaryMid: 28000, salarySenior: 55000,
    desc: 'Manage online campaigns across social media, search, and email. Every business needs digital marketing expertise.',
    skills: ['Google Ads', 'Meta Ads', 'SEO', 'Content creation', 'Analytics'],
    pathways: ['Diploma Marketing', 'MICT SETA Learnership', 'Google/Meta Certifications (free)'],
    outlook: 'Every business needs digital marketing',
    accentFrom: 'from-pink-500', accentTo: 'to-fuchsia-400',
    bgGlow: 'bg-pink-500/5',
  },
  {
    title: 'Plumber', slug: 'plumber',
    sector: 'Trades', icon: '🔧',
    demand: 'HIGH', salaryEntry: 12750, salaryMid: 21750, salarySenior: 38000,
    desc: 'Install and repair plumbing and drainage systems. Critical shortage in construction — self-employed plumbers with a good client base can earn R200K+/year.',
    skills: ['Pipe fitting', 'Drainage systems', 'Gas installation', 'Building regulations'],
    pathways: ['TVET N1 Plumbing', 'Apprenticeship (3–4 years)', 'Trade test → Red Seal'],
    outlook: 'Construction boom driving demand',
    accentFrom: 'from-cyan-500', accentTo: 'to-teal-400',
    bgGlow: 'bg-cyan-500/5',
  },
  {
    title: 'Paramedic / EMT', slug: 'paramedic',
    sector: 'Healthcare', icon: '🚑',
    demand: 'HIGH', salaryEntry: 14000, salaryMid: 24000, salarySenior: 41000,
    desc: 'Respond to medical emergencies and provide pre-hospital care. Career ladder from BAA to Advanced Life Support.',
    skills: ['Advanced life support', 'Triage', 'Emergency driving', 'Trauma care'],
    pathways: ['BAA Course (4 weeks)', 'ILS Certificate (1 year)', 'BHSc Emergency Medical Care'],
    outlook: 'Growing demand for emergency services',
    accentFrom: 'from-orange-500', accentTo: 'to-red-400',
    bgGlow: 'bg-orange-500/5',
  },
]

const demandCfg: Record<string, { label: string; cls: string; dot: string; ring: string }> = {
  CRITICAL: { label: 'Critical shortage', cls: 'bg-red-50 text-red-600 border-red-200', dot: 'bg-red-500 animate-pulse-ring', ring: 'ring-red-100' },
  HIGH: { label: 'High demand', cls: 'bg-orange-50 text-orange-600 border-orange-200', dot: 'bg-orange-500', ring: 'ring-orange-50' },
}

function fmt(n: number) { return `R${n.toLocaleString()}` }

export default function CareersPage() {
  const criticalCount = careers.filter((c) => c.demand === 'CRITICAL').length

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
              <span className="gradient-text">careers 2025/26</span>
            </h1>
            <p className="text-lg text-white/60">
              Real salary data and qualification pathways from the DHET 2024 National
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
            {['All', 'IT & Tech', 'Trades', 'Healthcare', 'Finance', 'Energy', 'Marketing'].map((f) => (
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

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {careers.map((c) => {
              const d = demandCfg[c.demand]
              return (
                <div
                  key={c.slug}
                  className={`group bg-white rounded-2xl border border-slate-200 card-hover overflow-hidden`}
                >
                  {/* Gradient accent */}
                  <div className={`h-1 bg-gradient-to-r ${c.accentFrom} ${c.accentTo}`} />

                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 ${c.bgGlow} rounded-2xl flex items-center justify-center text-2xl border border-slate-100`}>
                          {c.icon}
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

                    <p className="text-sm text-slate-500 leading-relaxed mb-4">{c.desc}</p>

                    {/* Salary table */}
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
                            <div className="text-sm font-extrabold text-dark">{fmt(row.v)}</div>
                            <div className="text-xs text-slate-400">{row.l}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pathways */}
                    <div className="mb-4">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        How to qualify
                      </div>
                      <div className="space-y-1">
                        {c.pathways.map((p) => (
                          <div key={p} className="flex items-start gap-2 text-xs text-slate-600">
                            <span className="text-brand mt-0.5">→</span>
                            {p}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Outlook */}
                    <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 border border-green-200/60 rounded-xl px-3 py-2">
                      <TrendingUp className="h-3.5 w-3.5 shrink-0" />
                      {c.outlook}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
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
