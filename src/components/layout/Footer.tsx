import Link from 'next/link'
import { Mail, MapPin } from 'lucide-react'
import { VukaMark } from '@/components/VukaMark'
import { NewsletterForm } from '@/components/NewsletterForm'

const footerLinks = {
  Pathways: [
    { label: 'TVET Colleges', href: '/institutions?type=TVET' },
    { label: 'Universities', href: '/institutions?type=UNIVERSITY' },
    { label: 'Private Colleges', href: '/institutions?type=PRIVATE_COLLEGE' },
    { label: 'Learnerships', href: '/learnerships' },
    { label: 'Distance Learning', href: '/institutions?type=DISTANCE_LEARNING' },
  ],
  Funding: [
    { label: 'NSFAS Guide', href: '/bursaries?type=nsfas' },
    { label: 'All Bursaries', href: '/bursaries' },
    { label: 'NYDA Funding', href: '/nyda' },
    { label: 'SETA Learnerships', href: '/learnerships' },
    { label: 'Corporate Bursaries', href: '/bursaries?type=corporate' },
  ],
  Tools: [
    { label: 'APS Calculator', href: '/tools/aps-calculator' },
    { label: 'Career Quiz', href: '/tools/career-quiz' },
    { label: 'Salary Guide', href: '/careers' },
    { label: 'In-Demand Careers', href: '/careers' },
  ],
}

const stats = [
  { value: '50', label: 'TVET Colleges' },
  { value: '26', label: 'Universities' },
  { value: '21', label: 'SETAs' },
  { value: '100%', label: 'Free to Use' },
]

export function Footer() {
  return (
    <footer className="bg-dark">
      {/* Newsletter strip */}
      <div className="border-b border-white/6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-white">Stay updated on learnerships & bursaries</h3>
              <p className="text-sm text-white/40 mt-1">New opportunities every week. Free. Unsubscribe anytime.</p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <VukaMark size={32} className="rounded-xl shrink-0" />
              <span className="font-bold text-lg text-white">
                Vuka<span className="gradient-text">Career</span>Hub
              </span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed mb-6 max-w-xs">
              Free guides to help you figure out what to do after matric —
              learnerships, bursaries, universities, and careers, all in one place.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-white/40">
                <MapPin className="h-3.5 w-3.5 text-brand shrink-0" />
                Available in all 9 provinces
              </div>
              <div className="flex items-center gap-2 text-xs text-white/40">
                <Mail className="h-3.5 w-3.5 text-brand shrink-0" />
                hello@vukacareerhub.co.za
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-orange-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="border-t border-white/6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-extrabold gradient-text">{s.value}</div>
                <div className="text-xs text-white/30 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Vuka Career Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {['Privacy Policy', 'Terms of Service', 'Contact'].map((l) => (
              <Link key={l} href="/" className="text-xs text-white/25 hover:text-white/50 transition-colors">
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
