import type { Metadata } from 'next'
import { Clock, ExternalLink, CheckCircle, Star, DollarSign, GraduationCap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Bursaries South Africa 2025/2026 — NSFAS, Corporate & Government',
  description: 'Find bursaries for South African students. NSFAS, Sasol, Anglo American, Eskom and more.',
}

const bursaries = [
  {
    name: 'NSFAS', full: 'National Student Financial Aid Scheme',
    provider: 'Government', category: 'government',
    icon: '🎓', featured: true,
    tag: 'Most popular', tagCls: 'bg-green-500/10 text-green-400 border-green-500/20',
    amount: 'Full tuition + accommodation + R15,750 living allowance/yr',
    deadline: '2025-11-15', applicationUrl: 'https://www.nsfas.org.za',
    eligibility: 'SA citizen, household income ≤ R350K/yr. SASSA auto-qualifies. Public universities & TVET only.',
    description: "SA's largest student funding scheme. Covers tuition, accommodation or travel, learning materials, and personal care allowance.",
    fields: ['All fields'],
    accent: 'from-green-500/15 to-emerald-500/5', border: 'border-green-500/20',
  },
  {
    name: 'Funza Lushaka', full: 'Teaching Bursary',
    provider: 'Department of Basic Education', category: 'government',
    icon: '📚', featured: false,
    tag: 'Teaching', tagCls: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    amount: 'Full bursary — tuition, accommodation & living expenses',
    deadline: '2026-01-24', applicationUrl: 'https://www.funzalushaka.doe.gov.za',
    eligibility: 'B.Ed or PGCE at approved university. Work-back obligation. Priority: Maths, Science, African languages.',
    description: 'Full government bursary for aspiring teachers in exchange for teaching in a public school after graduation.',
    fields: ['Education', 'Mathematics', 'Science', 'African Languages'],
    accent: 'from-blue-500/15 to-blue-600/5', border: 'border-blue-500/20',
  },
  {
    name: 'Sasol Bursary', full: 'Sasol Bursary Programme',
    provider: 'Sasol', category: 'corporate',
    icon: '⚗️', featured: true,
    tag: 'Full bursary', tagCls: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    amount: 'Tuition + accommodation + meals + books + pocket money',
    deadline: '2026-05-31', applicationUrl: 'https://www.sasol.com/careers/bursaries',
    eligibility: 'SA citizen. Matric or first-year student. Mathematics & Physical Science required.',
    description: "One of SA's most prestigious corporate bursaries. Includes vacation work and potential employment on graduation.",
    fields: ['Engineering', 'Science', 'IT', 'Commerce', 'Chemistry'],
    accent: 'from-purple-500/15 to-violet-500/5', border: 'border-purple-500/20',
  },
  {
    name: 'Anglo American', full: 'Anglo American Bursary',
    provider: 'Anglo American', category: 'corporate',
    icon: '⛏️', featured: false,
    tag: 'Mining & Engineering', tagCls: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    amount: 'Full tuition + living allowance',
    deadline: '2025-10-31', applicationUrl: 'https://www.angloamerican.com/careers',
    eligibility: 'SA citizen. Good academic record. Studying at a recognised SA university.',
    description: 'Anglo American funds students in mining, engineering, and geosciences. Includes vacation work at their operations.',
    fields: ['Mining Engineering', 'Metallurgy', 'Mechanical Engineering', 'Geology', 'Finance'],
    accent: 'from-slate-500/10 to-slate-600/5', border: 'border-slate-500/20',
  },
  {
    name: 'Eskom Bursary', full: 'Eskom Bursary Programme',
    provider: 'Eskom', category: 'corporate',
    icon: '⚡', featured: false,
    tag: 'Engineering', tagCls: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
    amount: 'Full tuition + monthly allowance',
    deadline: '2025-10-31', applicationUrl: 'https://www.eskom.co.za/careers',
    eligibility: 'SA citizen. Min 60% in Maths & Physical Science. Strong chance of employment.',
    description: 'Eskom funds engineering and technical students. Vacation work included. Critical need for qualified engineers.',
    fields: ['Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'IT', 'Finance'],
    accent: 'from-yellow-500/10 to-amber-500/5', border: 'border-yellow-500/20',
  },
  {
    name: 'Standard Bank', full: 'Standard Bank Bursary',
    provider: 'Standard Bank', category: 'corporate',
    icon: '🏦', featured: false,
    tag: 'Finance & IT', tagCls: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    amount: 'Full tuition + accommodation + monthly allowance',
    deadline: '2025-08-31', applicationUrl: 'https://jobs.standardbank.com',
    eligibility: 'SA citizen. Min 65% average in matric. Studying at a South African university.',
    description: 'Full bursary for commerce, accounting, and IT students with mentorship and graduate employment opportunity.',
    fields: ['Commerce', 'Accounting', 'IT', 'Data Science', 'Finance'],
    accent: 'from-blue-500/12 to-sky-500/5', border: 'border-blue-500/20',
  },
  {
    name: 'MICT SETA', full: 'MICT SETA Bursary',
    provider: 'MICT SETA', category: 'seta',
    icon: '💻', featured: false,
    tag: 'IT & Tech', tagCls: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    amount: 'Tuition and/or living allowance',
    deadline: '2025-09-30', applicationUrl: 'https://www.mict.org.za',
    eligibility: 'SA citizen. Enrolled in ICT qualification. Universities, private colleges, and TVET colleges.',
    description: 'MICT SETA funds IT students at all institution types. Ideal for students not qualifying for NSFAS.',
    fields: ['Information Technology', 'Software Development', 'Cybersecurity', 'Data Science'],
    accent: 'from-orange-500/10 to-brand/5', border: 'border-orange-500/20',
  },
  {
    name: 'MERSETA', full: 'MERSETA Engineering Bursary',
    provider: 'MERSETA', category: 'seta',
    icon: '⚙️', featured: false,
    tag: 'SETA funded', tagCls: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    amount: 'Varies — full to partial bursaries',
    deadline: '2026-02-20', applicationUrl: 'https://www.merseta.org.za',
    eligibility: 'SA citizen. Manufacturing, engineering sector. TVET and university students.',
    description: 'MERSETA funds engineering and manufacturing students. One of the most accessible bursaries for TVET students.',
    fields: ['Mechanical Engineering', 'Electrical Engineering', 'Manufacturing', 'Metallurgy'],
    accent: 'from-slate-500/10 to-zinc-500/5', border: 'border-slate-500/20',
  },
]

function daysUntil(d: string) { return Math.ceil((new Date(d).getTime() - Date.now()) / 86400000) }
function fmt(d: string) { return new Date(d).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' }) }

export default function BursariesPage() {
  return (
    <>
      {/* Header */}
      <section className="relative mesh-bg dot-pattern pt-32 pb-16 overflow-hidden">
        <div className="absolute top-1/3 left-0 w-72 h-72 bg-green-500/8 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-semibold text-green-400 mb-6">
              <GraduationCap className="h-3.5 w-3.5" />
              {bursaries.length} bursaries listed — updated for 2025/2026
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
                  <div className="text-sm font-bold text-white">NSFAS 2026 — Applications open</div>
                  <div className="text-xs text-white/50 mt-0.5">17 Sep – 15 Nov 2025 · nsfas.org.za</div>
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
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {bursaries.map((b) => {
              const days = daysUntil(b.deadline)
              const urgent = days <= 45 && days > 0
              const closed = days <= 0

              return (
                <div
                  key={b.name}
                  className={`group relative bg-gradient-to-br ${b.accent} border ${b.border} rounded-2xl p-6 card-hover overflow-hidden`}
                >
                  {b.featured && (
                    <div className="absolute top-4 right-4 flex items-center gap-1 text-xs font-semibold text-orange-500">
                      <Star className="h-3.5 w-3.5 fill-orange-500" />
                      Featured
                    </div>
                  )}

                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm shrink-0">
                      {b.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-extrabold text-dark text-lg">{b.name}</h3>
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${b.tagCls}`}>
                          {b.tag}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{b.full}</p>
                      <p className="text-xs font-medium text-slate-400 mt-0.5">by {b.provider}</p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{b.description}</p>

                  {/* Fields */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {b.fields.map((f) => (
                      <span key={f} className="text-xs bg-white/70 text-slate-600 border border-slate-200 px-2.5 py-0.5 rounded-full">
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* Amount */}
                  <div className="salary-pill rounded-xl px-4 py-2.5 mb-3 flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 shrink-0" />
                    <span className="font-bold">{b.amount}</span>
                  </div>

                  {/* Eligibility */}
                  <div className="flex items-start gap-2 text-xs text-slate-500 bg-white/50 rounded-xl px-3 py-2.5 mb-4">
                    <CheckCircle className="h-3.5 w-3.5 text-blue-500 shrink-0 mt-0.5" />
                    {b.eligibility}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center gap-1.5 text-xs font-medium ${closed ? 'text-red-500' : urgent ? 'text-orange-500' : 'text-slate-500'}`}>
                      {urgent && <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />}
                      <Clock className="h-3.5 w-3.5" />
                      {closed ? 'Deadline passed' : urgent ? `${days} days left!` : fmt(b.deadline)}
                    </div>
                    {!closed && (
                      <a
                        href={b.applicationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 gradient-orange text-white text-xs font-bold rounded-xl hover:opacity-90 transition-all glow-orange-sm"
                      >
                        Apply <ExternalLink className="h-3.5 w-3.5" />
                      </a>
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
