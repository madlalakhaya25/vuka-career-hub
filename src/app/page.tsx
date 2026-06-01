import Link from 'next/link'
import {
  ArrowRight, CheckCircle, ChevronRight, Zap, Calculator,
  Flame, TrendingUp, Clock, Star, Shield, BookOpen,
  GraduationCap, Award, Building2,
} from 'lucide-react'

/* ─── Data ──────────────────────────────────────────────────────────────────── */
const floatingCards = [
  { icon: '⚡', title: 'Electrician', salary: 'R9K–R52K/mo', tag: 'Critical shortage', color: 'from-amber-500/20 to-amber-600/10', border: 'border-amber-500/20' },
  { icon: '💻', title: 'Developer', salary: 'R25K–R88K/mo', tag: 'Critical shortage', color: 'from-blue-500/20 to-blue-600/10', border: 'border-blue-500/20' },
  { icon: '☀️', title: 'Solar Tech', salary: 'R8K–R35K/mo', tag: 'Fastest growing', color: 'from-orange-500/20 to-orange-600/10', border: 'border-orange-500/20' },
]

const pathways = [
  {
    icon: GraduationCap, emoji: '🎓',
    title: 'University',
    sub: 'Full degree programmes',
    desc: '26 public universities. 3–4 year degrees. NSFAS covers costs for qualifying students.',
    pros: ['Internationally recognised degree', 'NSFAS eligible (R350K income limit)', 'Wide career options'],
    cost: 'R35K–R100K/yr', duration: '3–4 years', entry: 'Matric + APS score',
    accent: 'from-blue-500 to-indigo-600',
    pill: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    href: '/institutions?type=UNIVERSITY',
  },
  {
    icon: BookOpen, emoji: '🔧',
    title: 'TVET College',
    sub: 'Vocational & technical',
    desc: '50 public colleges. NCV & N-courses in engineering, IT, business. Often government-funded.',
    pros: ['Often free or low-cost', 'Practical, work-ready skills', 'NSFAS eligible'],
    cost: 'R6.5K–R22K/yr', duration: '2–3 years', entry: 'Grade 9 or Matric',
    accent: 'from-green-500 to-emerald-600',
    pill: 'bg-green-500/10 text-green-400 border-green-500/20',
    href: '/institutions?type=TVET',
  },
  {
    icon: Building2, emoji: '💼',
    title: 'Learnership',
    sub: 'Earn while you learn',
    desc: 'Free SETA-funded training. You work + study and earn a stipend every month.',
    pros: ['Completely free to you', 'R2K–R8K/month stipend', 'Real work experience'],
    cost: 'Free + stipend', duration: '6–18 months', entry: 'Grade 12',
    accent: 'from-orange-500 to-brand',
    pill: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    href: '/learnerships',
  },
  {
    icon: Award, emoji: '🏆',
    title: 'Private College',
    sub: 'Flexible & career-focused',
    desc: 'IIE, Boston, Rosebank and more. Flexible timetables and industry-relevant qualifications.',
    pros: ['Flexible study schedule', 'Strong industry connections', 'Shorter programmes'],
    cost: 'R15K–R60K/yr', duration: '1–3 years', entry: 'Matric',
    accent: 'from-purple-500 to-violet-600',
    pill: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    href: '/institutions?type=PRIVATE_COLLEGE',
  },
]

const careers = [
  { icon: '💻', title: 'Software Developer', sector: 'IT', salary: 'R25K–R88K/mo', demand: 'CRITICAL', slug: 'software-developer' },
  { icon: '⚡', title: 'Electrician', sector: 'Trades', salary: 'R9K–R52K/mo', demand: 'CRITICAL', slug: 'electrician' },
  { icon: '☀️', title: 'Solar PV Technician', sector: 'Renewable Energy', salary: 'R8K–R35K/mo', demand: 'HIGH', slug: 'solar-pv-technician' },
  { icon: '📊', title: 'Data Scientist', sector: 'IT', salary: 'R21K–R68K/mo', demand: 'CRITICAL', slug: 'data-scientist' },
  { icon: '🏥', title: 'Registered Nurse', sector: 'Healthcare', salary: 'R15K–R60K/mo', demand: 'HIGH', slug: 'registered-nurse' },
  { icon: '🔒', title: 'Cybersecurity Analyst', sector: 'IT', salary: 'R25K–R100K/mo', demand: 'CRITICAL', slug: 'cybersecurity-analyst' },
]

const demandCfg: Record<string, { label: string; cls: string; dot: string }> = {
  CRITICAL: { label: 'Critical shortage', cls: 'bg-red-500/10 text-red-400 border-red-500/20', dot: 'bg-red-400 animate-pulse-ring' },
  HIGH: { label: 'High demand', cls: 'bg-orange-500/10 text-orange-400 border-orange-500/20', dot: 'bg-orange-400' },
}

const bursaryHighlights = [
  {
    name: 'NSFAS 2026', provider: 'Government', tag: 'Most popular',
    tagCls: 'bg-green-500/10 text-green-400 border-green-500/20',
    amount: 'Full tuition + allowances', deadline: '15 Nov 2025',
    icon: '🎓', urgent: true,
  },
  {
    name: 'Sasol Bursary', provider: 'Corporate', tag: 'Full bursary',
    tagCls: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    amount: 'Tuition + accommodation + books', deadline: '31 May 2026',
    icon: '⚗️', urgent: false,
  },
  {
    name: 'MICT SETA Learnership', provider: 'SETA', tag: 'Free + stipend',
    tagCls: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    amount: 'R3.5K–R5.5K/month', deadline: 'Rolling 2025',
    icon: '💻', urgent: false,
  },
]

const trustItems = ['100% Free forever', 'Updated monthly', 'All 9 provinces', 'NYDA & NSFAS info']

/* ─── Page ──────────────────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen mesh-bg dot-pattern flex items-center overflow-hidden pt-16 overflow-x-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-indigo-500/6 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left — Content */}
            <div className="animate-slide-up">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs font-semibold text-white/80 mb-8">
                <Flame className="h-3.5 w-3.5 text-brand" />
                2025/2026 Updated — SA&apos;s most complete career guide
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight">
                Your future
                <br />
                starts{' '}
                <span className="gradient-text">after matric.</span>
              </h1>

              {/* Subline */}
              <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-lg">
                Free guides on TVET colleges, universities, learnerships, bursaries
                and the most in-demand careers in South Africa — all in one place.
              </p>

              {/* CTAs */}
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/tools/aps-calculator"
                  className="group inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 gradient-orange text-white font-semibold rounded-2xl transition-all hover:opacity-90 glow-orange text-sm min-h-[44px]"
                >
                  <Calculator className="h-4.5 w-4.5" />
                  Calculate APS Score
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/tools/career-quiz"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 glass text-white font-semibold rounded-2xl hover:bg-white/12 transition-all text-sm min-h-[44px]"
                >
                  <Zap className="h-4 w-4 text-brand" />
                  Take Career Quiz
                </Link>
              </div>

              {/* Trust bar */}
              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
                {trustItems.map((t) => (
                  <div key={t} className="flex items-center gap-1.5 text-xs text-white/50">
                    <CheckCircle className="h-3.5 w-3.5 text-green-400 shrink-0" />
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Floating cards */}
            <div className="hidden lg:flex flex-col gap-4 items-end">
              {floatingCards.map((card, i) => (
                <div
                  key={card.title}
                  className={`glass-card rounded-2xl p-5 w-64 border ${card.border} bg-gradient-to-br ${card.color}`}
                  style={{ animationDelay: `${i * 0.4}s` }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{card.icon}</span>
                    <div>
                      <div className="text-sm font-bold text-white">{card.title}</div>
                      <div className="text-xs text-white/50">{card.tag}</div>
                    </div>
                  </div>
                  <div className="text-xl font-extrabold gradient-text">{card.salary}</div>
                </div>
              ))}

              {/* NYDA card */}
              <div className="glass-card rounded-2xl p-5 w-72 border border-brand/20 bg-gradient-to-br from-brand/15 to-brand/5">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🚀</span>
                  <div>
                    <div className="text-xs font-bold text-brand uppercase tracking-wider mb-0.5">NEW 2025</div>
                    <div className="text-sm font-bold text-white">NYDA R2.5B Youth Fund</div>
                    <div className="text-xs text-white/50 mt-0.5">Up to R2M for ages 18–35</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>

      {/* ── STATS BAND ────────────────────────────────────────────────────── */}
      <section className="relative bg-dark-2 border-y border-white/6 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { value: '50', label: 'TVET Colleges', sub: 'all 9 provinces' },
              { value: '26', label: 'Universities', sub: 'public institutions' },
              { value: '21', label: 'SETAs', sub: 'funding learnerships' },
              { value: 'R2.5B', label: 'NYDA Youth Fund', sub: 'announced 2025' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-extrabold gradient-text">{s.value}</div>
                <div className="text-sm font-semibold text-white mt-1">{s.label}</div>
                <div className="text-xs text-white/40 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PATHWAYS ──────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 text-xs font-semibold text-orange-600 mb-4">
              <Star className="h-3.5 w-3.5" />
              Choose your path after matric
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-dark tracking-tight">
              No wrong choice.<br />
              <span className="gradient-text">Only your choice.</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-xl mx-auto">
              University, TVET, learnership, or private college — each has real
              advantages. Compare them and decide what fits your life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {pathways.map((p) => {
              const Icon = p.icon
              return (
                <Link
                  key={p.title}
                  href={p.href}
                  className="group relative bg-white rounded-2xl border border-slate-200 p-6 card-hover overflow-hidden"
                >
                  {/* Gradient accent line */}
                  <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${p.accent}`} />

                  <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border mb-4 ${p.pill}`}>
                    {p.emoji} {p.title}
                  </div>

                  <h3 className="text-xl font-extrabold text-dark mb-0.5">{p.title}</h3>
                  <p className="text-xs text-slate-400 font-medium mb-3">{p.sub}</p>
                  <p className="text-sm text-slate-500 leading-relaxed mb-5">{p.desc}</p>

                  <ul className="space-y-2 mb-6">
                    {p.pros.map((pro) => (
                      <li key={pro} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle className="h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5" />
                        {pro}
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-slate-100 pt-4 space-y-1.5">
                    {[
                      { k: 'Cost', v: p.cost },
                      { k: 'Duration', v: p.duration },
                      { k: 'Entry', v: p.entry },
                    ].map((row) => (
                      <div key={row.k} className="flex justify-between text-xs">
                        <span className="text-slate-400">{row.k}</span>
                        <span className="font-semibold text-slate-700">{row.v}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center gap-1 text-xs font-bold text-orange-500 group-hover:gap-2 transition-all">
                    Explore <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── TOOLS SPOTLIGHT ───────────────────────────────────────────────── */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* APS Calculator */}
            <Link
              href="/tools/aps-calculator"
              className="group relative mesh-bg dot-pattern rounded-3xl overflow-hidden p-8 min-h-52 border border-white/8 flex flex-col justify-between"
            >
              <div className="absolute top-4 right-4 w-24 h-24 bg-brand/20 rounded-full blur-2xl" />
              <div>
                <div className="w-12 h-12 gradient-orange rounded-2xl flex items-center justify-center mb-4 glow-orange-sm">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-2">APS Calculator</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Enter your matric marks → instantly see which university programmes and TVET
                  courses you qualify for.
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-brand mt-4 group-hover:gap-3 transition-all">
                Calculate now <ArrowRight className="h-4 w-4" />
              </div>
            </Link>

            {/* Career Quiz */}
            <Link
              href="/tools/career-quiz"
              className="group relative bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl overflow-hidden p-8 min-h-52 flex flex-col justify-between"
            >
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full" />
              <div className="absolute bottom-4 left-4 w-20 h-20 bg-white/5 rounded-full" />
              <div className="relative">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-2">Career Quiz</h3>
                <p className="text-orange-100 text-sm leading-relaxed">
                  15 questions about your interests and strengths → discover your top
                  career matches in 3 minutes.
                </p>
              </div>
              <div className="relative flex items-center gap-2 text-sm font-bold text-white mt-4 group-hover:gap-3 transition-all">
                Start quiz <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── IN-DEMAND CAREERS ─────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 mesh-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-4 py-1.5 text-xs font-semibold text-red-600 mb-4">
                <TrendingUp className="h-3.5 w-3.5" />
                Skills shortage — South Africa 2025/26
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-dark tracking-tight">
                Most in-demand
                <br />
                <span className="gradient-text">careers right now</span>
              </h2>
              <p className="mt-3 text-slate-500 max-w-lg">
                Employers are competing to hire these people — and paying serious money for them.
              </p>
            </div>
            <Link
              href="/careers"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors"
            >
              View all 12 careers <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {careers.map((career) => {
              const d = demandCfg[career.demand]
              return (
                <Link
                  key={career.slug}
                  href={`/careers/${career.slug}`}
                  className="group bg-white rounded-2xl border border-slate-200 p-5 card-hover"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl border border-slate-100">
                        {career.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-dark text-sm group-hover:text-orange-500 transition-colors">
                          {career.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">{career.sector}</p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${d.cls}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${d.dot}`} />
                      {d.label}
                    </div>
                  </div>

                  <div className="salary-pill rounded-xl px-4 py-2.5 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">Monthly salary</span>
                    <span className="font-extrabold text-emerald-700 text-sm">{career.salary}</span>
                  </div>

                  <div className="mt-3 flex items-center justify-end text-xs font-semibold text-orange-400 group-hover:gap-1 transition-all gap-0.5">
                    View pathway <ChevronRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── NYDA SPOTLIGHT ────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mesh-bg dot-pattern rounded-3xl overflow-hidden border border-white/8">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              <div className="lg:col-span-3 p-6 sm:p-10 lg:p-12">
                <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-semibold text-orange-400 mb-6">
                  <Star className="h-3.5 w-3.5 fill-orange-400" />
                  Announced November 2025
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
                  NYDA launched a{' '}
                  <span className="gradient-text">R2.5 billion</span>
                  <br />
                  Youth Fund
                </h2>
                <p className="text-white/60 leading-relaxed mb-8 max-w-md">
                  The National Youth Development Agency now offers up to R2 million for
                  youth-owned businesses in agriculture, renewable energy, and industrial
                  development. Ages 18–35.
                </p>

                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    { v: 'R1K–R200K', l: 'Standard grants' },
                    { v: 'Up to R2M', l: 'Large-scale fund' },
                    { v: '6%', l: 'Loan interest rate' },
                    { v: '18–35', l: 'Age requirement' },
                  ].map((s) => (
                    <div key={s.l} className="glass rounded-2xl p-4">
                      <div className="text-xl font-extrabold gradient-text">{s.v}</div>
                      <div className="text-xs text-white/50 mt-0.5">{s.l}</div>
                    </div>
                  ))}
                </div>

                <Link
                  href="/nyda"
                  className="inline-flex items-center gap-2 px-6 py-3 gradient-orange text-white font-semibold rounded-2xl hover:opacity-90 transition-opacity text-sm glow-orange-sm"
                >
                  Explore NYDA Funding <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="hidden lg:flex lg:col-span-2 items-center justify-center p-12">
                <div className="text-center">
                  <div className="text-6xl sm:text-8xl mb-4 animate-float-slow">🚀</div>
                  <div className="text-white/80 font-bold text-lg">Start Your Business</div>
                  <div className="text-white/40 text-sm mt-1 max-w-40 mx-auto">
                    Funding + mentorship + business support
                  </div>
                  <div className="mt-6 glass rounded-full px-4 py-2 text-xs text-white/60 inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    Applications open
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FUNDING TEASER ────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-dark tracking-tight">
                Fund your education
              </h2>
              <p className="mt-2 text-slate-500">You don&apos;t have to pay for everything yourself.</p>
            </div>
            <Link href="/bursaries" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-orange-500 hover:text-orange-600">
              All bursaries <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bursaryHighlights.map((b) => (
              <Link
                key={b.name}
                href="/bursaries"
                className="group bg-white rounded-2xl border border-slate-200 p-6 card-hover"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{b.icon}</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${b.tagCls}`}>
                    {b.tag}
                  </span>
                </div>
                <h3 className="font-extrabold text-dark text-lg group-hover:text-orange-500 transition-colors">
                  {b.name}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 mb-3">{b.provider}</p>
                <div className="text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 mb-4">
                  {b.amount}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  Deadline: {b.deadline}
                  {b.urgent && (
                    <span className="ml-1 text-red-500 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                      Closing soon
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="py-24 mesh-bg dot-pattern relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <div className="text-6xl mb-6 animate-float">🔥</div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Ready to{' '}
            <span className="gradient-text">Vuka</span>?
          </h2>
          <p className="text-white/60 text-base sm:text-lg mb-8 sm:mb-10">
            Create a free account to save learnerships, track bursary deadlines,
            and get matched to opportunities that fit your profile.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 gradient-orange text-white font-bold rounded-2xl hover:opacity-90 transition-opacity glow-orange text-sm sm:text-base min-h-[44px]"
            >
              Create Free Account <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/learnerships"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 glass text-white font-semibold rounded-2xl hover:bg-white/12 transition-all text-sm sm:text-base min-h-[44px]"
            >
              Browse Learnerships
            </Link>
          </div>
          <p className="text-white/30 text-sm mt-6">
            Free forever. No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </>
  )
}
