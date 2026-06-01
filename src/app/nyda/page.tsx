import type { Metadata } from 'next'
import { Rocket, DollarSign, BookOpen, Phone, Globe, CheckCircle, ArrowRight, Star, Building2, TrendingUp, ExternalLink, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NYDA — National Youth Development Agency Guide 2025',
  description: 'Complete NYDA guide. R2.5 billion youth fund, grants up to R200K, business loans at 6% interest. Ages 18–35.',
}

const products = [
  {
    icon: DollarSign, emoji: '💵',
    title: 'NYDA Grant Programme',
    amount: 'R1,000 – R200,000',
    amountSub: 'Non-repayable grant',
    desc: 'Cash grant + business development support for youth-owned businesses. You do not pay it back.',
    eligibility: ['Age 18–35', 'South African citizen', 'Annual turnover below R750K', '51% youth-owned business'],
    includes: ['Cash grant (non-repayable)', 'Business mentorship', 'Financial literacy training', 'Market access support'],
    url: 'https://www.nyda.gov.za',
    accent: 'from-green-500/15 to-emerald-500/5', border: 'border-green-500/20', iconCls: 'bg-green-500/15 text-green-400',
  },
  {
    icon: TrendingUp, emoji: '📈',
    title: 'NYDA Business Loan',
    amount: '6% interest rate',
    amountSub: 'Below prime — repayable',
    desc: 'Low-interest business loan for youth entrepreneurs. Significantly below the commercial prime rate.',
    eligibility: ['Age 18–35', 'South African citizen', 'Viable business plan', 'Ability to repay'],
    includes: ['Below-prime interest', 'Flexible repayment terms', 'Business advisory services', 'Progress monitoring'],
    url: 'https://www.nyda.gov.za',
    accent: 'from-blue-500/15 to-indigo-500/5', border: 'border-blue-500/20', iconCls: 'bg-blue-500/15 text-blue-400',
  },
  {
    icon: BookOpen, emoji: '🎫',
    title: 'NYDA Voucher Programme',
    amount: 'R6,600 – R19,800',
    amountSub: 'Service vouchers',
    desc: 'Vouchers to pay for business services: website development, accounting, legal advice, and more.',
    eligibility: ['Age 18–35', 'Running a small business', 'Registered with NYDA', 'SA citizen'],
    includes: ['Website development', 'Accounting services', 'Legal assistance', 'Marketing materials'],
    url: 'https://erp.nyda.gov.za',
    accent: 'from-orange-500/15 to-brand/5', border: 'border-orange-500/20', iconCls: 'bg-orange-500/15 text-orange-400',
  },
  {
    icon: Rocket, emoji: '🚀',
    title: 'R2.5 Billion Youth Fund',
    amount: 'R750K – R2,000,000',
    amountSub: 'Launched November 2025',
    desc: "The biggest NYDA funding announcement in history. Focus: agriculture, renewable energy, industrial development, property.",
    eligibility: ['Age 18–35', 'SA citizen', 'Business in priority sectors', 'Strong business plan'],
    includes: ['Large-scale capital', 'Business development support', 'Sector mentorship', 'Job creation focus'],
    url: 'https://www.nyda.gov.za',
    accent: 'from-purple-500/15 to-violet-500/5', border: 'border-purple-500/20', iconCls: 'bg-purple-500/15 text-purple-400',
    badge: 'NEW 2025',
  },
]

const programmes = [
  { name: 'Website Dev & Digital Marketing', partner: 'Accenture + Moses Kotane Institute', status: 'Open 2025', desc: 'Fully funded digital skills training including CV writing, personal branding, and interview prep.' },
  { name: 'Data Analytics Training', partner: 'NYDA Digital Skills Unit', status: 'Open 2025', desc: 'Learn data analytics, Excel, and business intelligence tools aligned with current job market.' },
  { name: 'National Youth Service (NYS)', partner: 'Government', status: 'Expanding 2025/26', desc: 'Community service programme expanding to 40,000 participants. Stipend + skills development included.' },
  { name: 'Creative Economy Programme', partner: 'Various partners', status: 'Rolling', desc: 'Support for youth in music, film, events, and design. Includes business development support.' },
]

export default function NYDAPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative mesh-bg dot-pattern pt-32 pb-20 overflow-hidden">
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 glass border border-orange-500/30 rounded-full px-4 py-1.5 text-xs font-semibold text-orange-400 mb-6">
                <Star className="h-3.5 w-3.5 fill-orange-400" />
                R2.5 billion fund launched November 2025
              </div>
              <h1 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight mb-4">
                NYDA<br />
                <span className="gradient-text">Youth Funding</span>
              </h1>
              <p className="text-lg text-white/60 mb-8">
                Most South Africans aged 18–35 don&apos;t know what NYDA offers. Grants,
                loans, vouchers, and now a R2.5 billion fund — all specifically for young people.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://www.nyda.gov.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 gradient-orange text-white font-bold rounded-2xl hover:opacity-90 transition-opacity glow-orange-sm"
                >
                  Visit NYDA <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href="tel:0800525252"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 glass text-white font-semibold rounded-2xl hover:bg-white/12 transition-all"
                >
                  <Phone className="h-4 w-4 text-brand" />
                  0800 52 52 52 (Free)
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { v: 'R2.5B', l: 'New youth fund', sub: 'launched 2025' },
                { v: 'R200K', l: 'Max grant', sub: 'per individual' },
                { v: '6%', l: 'Loan rate', sub: 'below prime' },
                { v: '18–35', l: 'Age eligible', sub: 'all SA youth' },
              ].map((s) => (
                <div key={s.l} className="glass rounded-2xl p-5 text-center">
                  <div className="text-3xl font-extrabold gradient-text mb-1">{s.v}</div>
                  <div className="text-sm font-semibold text-white">{s.l}</div>
                  <div className="text-xs text-white/40 mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-dark">NYDA Funding Products</h2>
            <p className="text-slate-500 mt-2 max-w-xl mx-auto">
              Different products for different stages of your entrepreneurship journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {products.map((p) => {
              const Icon = p.icon
              return (
                <div key={p.title} className={`bg-gradient-to-br ${p.accent} border ${p.border} rounded-2xl p-7 card-hover relative overflow-hidden`}>
                  {p.badge && (
                    <div className="absolute top-4 right-4 text-xs font-bold text-purple-400 bg-purple-500/15 border border-purple-500/25 px-2.5 py-1 rounded-full">
                      {p.badge}
                    </div>
                  )}

                  <div className="flex items-start gap-4 mb-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${p.iconCls}`}>
                      {p.emoji}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-dark text-lg">{p.title}</h3>
                      <div className="text-xl font-extrabold gradient-text leading-tight">{p.amount}</div>
                      <div className="text-xs text-slate-500">{p.amountSub}</div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-5">{p.desc}</p>

                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Eligibility</div>
                      {p.eligibility.map((e) => (
                        <div key={e} className="flex items-center gap-1.5 text-xs text-slate-600 mb-1">
                          <CheckCircle className="h-3 w-3 text-green-500 shrink-0" />
                          {e}
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">What&apos;s included</div>
                      {p.includes.map((i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600 mb-1">
                          <Zap className="h-3 w-3 text-orange-400 shrink-0" />
                          {i}
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-dark text-white text-xs font-bold rounded-xl hover:bg-dark-3 transition-colors"
                  >
                    Apply on NYDA <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-dark mb-6">Free Skills Programmes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {programmes.map((p) => (
              <div key={p.name} className="bg-white rounded-2xl border border-slate-200 p-5 card-hover">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-bold text-dark">{p.name}</h3>
                  <span className="text-xs bg-green-100 text-green-700 border border-green-200 px-2.5 py-0.5 rounded-full font-semibold shrink-0">
                    {p.status}
                  </span>
                </div>
                <p className="text-xs text-orange-500 font-semibold mb-2">Partner: {p.partner}</p>
                <p className="text-sm text-slate-500">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-dark mb-6">Contact NYDA</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Phone, title: 'Toll-free Hotline', v: '0800 52 52 52', sub: 'Free from any network, Mon–Fri', href: 'tel:0800525252' },
              { icon: Globe, title: 'Online Portal', v: 'erp.nyda.gov.za', sub: 'Apply for funding & track applications', href: 'https://erp.nyda.gov.za' },
              { icon: Building2, title: 'Walk-in Offices', v: 'All 9 Provinces', sub: 'Find your nearest office below', href: 'https://www.nyda.gov.za/contact' },
            ].map((c) => (
              <a
                key={c.title}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group bg-slate-50 rounded-2xl border border-slate-200 p-5 card-hover block"
              >
                <div className="w-10 h-10 gradient-orange rounded-xl flex items-center justify-center mb-3 glow-orange-sm">
                  <c.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold text-dark mb-0.5">{c.title}</h3>
                <div className="font-extrabold text-brand text-sm">{c.v}</div>
                <div className="text-xs text-slate-400 mt-1">{c.sub}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
