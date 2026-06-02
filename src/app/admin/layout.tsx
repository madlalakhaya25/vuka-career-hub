import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, GraduationCap, Briefcase, TrendingUp, Inbox, ArrowLeft } from 'lucide-react'
import { prisma } from '@/lib/db'
import { VukaMark } from '@/components/VukaMark'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!(session?.user as { isAdmin?: boolean } | undefined)?.isAdmin) {
    redirect('/')
  }

  const inboxCount = await prisma.scrapedListing.count({ where: { status: 'PENDING' } })

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/bursaries', label: 'Bursaries', icon: GraduationCap },
    { href: '/admin/learnerships', label: 'Learnerships', icon: Briefcase },
    { href: '/admin/careers', label: 'Careers', icon: TrendingUp },
    { href: '/admin/inbox', label: 'Inbox', icon: Inbox, badge: inboxCount },
  ]

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-200">
          <Link href="/" className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <VukaMark size={28} className="rounded-lg shrink-0" />
            Admin Panel
          </Link>
        </div>

        <nav className="p-3 flex-1 space-y-0.5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {'badge' in item && (item.badge ?? 0) > 0 && (
                <span className="bg-orange-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-slate-200">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-500 hover:text-slate-700 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
