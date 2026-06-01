'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown, Flame, ArrowRight, Zap } from 'lucide-react'

const navLinks = [
  {
    label: 'Explore',
    children: [
      { label: 'Institutions', href: '/institutions', desc: 'TVET, university & private colleges', icon: '🏫' },
      { label: 'Careers', href: '/careers', desc: 'In-demand jobs & salary guides', icon: '💼' },
      { label: 'NYDA', href: '/nyda', desc: 'Youth funding & programmes', icon: '🚀' },
    ],
  },
  {
    label: 'Opportunities',
    children: [
      { label: 'Learnerships', href: '/learnerships', desc: 'Free training + monthly stipend', icon: '⚡' },
      { label: 'Bursaries', href: '/bursaries', desc: 'Funding for your studies', icon: '🎓' },
    ],
  },
  {
    label: 'Tools',
    children: [
      { label: 'APS Calculator', href: '/tools/aps-calculator', desc: 'Find courses you qualify for', icon: '🧮' },
      { label: 'Career Quiz', href: '/tools/career-quiz', desc: 'Discover your ideal career', icon: '✨' },
    ],
  },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass-dark shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative">
                <div className="w-8 h-8 rounded-xl gradient-orange flex items-center justify-center glow-orange-sm">
                  <Flame className="h-4.5 w-4.5 text-white" />
                </div>
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                Vuka<span className="gradient-text">Career</span>Hub
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/8 transition-all duration-200">
                    {item.label}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        activeDropdown === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Dropdown */}
                  <div
                    className={`absolute top-full left-0 mt-2 w-72 transition-all duration-200 ${
                      activeDropdown === item.label
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}
                  >
                    <div className="glass-dark rounded-2xl overflow-hidden p-2 shadow-2xl shadow-black/40 border border-white/10">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/8 transition-all duration-150 group"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <span className="text-xl w-8 text-center">{child.icon}</span>
                          <div>
                            <div className="text-sm font-semibold text-white group-hover:text-orange-400 transition-colors">
                              {child.label}
                            </div>
                            <div className="text-xs text-white/50 mt-0.5">{child.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold gradient-orange text-white rounded-xl hover:opacity-90 transition-opacity glow-orange-sm"
              >
                <Zap className="h-3.5 w-3.5" />
                Get Started
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-full max-w-xs bg-slate-950 border-l border-white/10 transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
              <div className="w-7 h-7 rounded-lg gradient-orange flex items-center justify-center">
                <Flame className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-white">VukaCareerHub</span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="overflow-y-auto h-full pb-24">
            {navLinks.map((section) => (
              <div key={section.label} className="px-4 pt-5">
                <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-3 px-2">
                  {section.label}
                </p>
                {section.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="flex items-center gap-3 px-2 py-3 rounded-xl hover:bg-white/6 transition-all group"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="text-xl">{child.icon}</span>
                    <div>
                      <div className="text-sm font-semibold text-white/90 group-hover:text-orange-400 transition-colors">
                        {child.label}
                      </div>
                      <div className="text-xs text-white/40">{child.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            ))}

            <div className="px-4 mt-6 space-y-3 border-t border-white/10 pt-5">
              <Link
                href="/register"
                className="flex items-center justify-center gap-2 w-full py-3 gradient-orange text-white font-semibold rounded-xl text-sm"
                onClick={() => setMobileOpen(false)}
              >
                <Zap className="h-4 w-4" />
                Get Started — Free
              </Link>
              <Link
                href="/login"
                className="flex items-center justify-center w-full py-3 border border-white/15 text-white/70 font-medium rounded-xl text-sm hover:bg-white/6 transition-all"
                onClick={() => setMobileOpen(false)}
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
