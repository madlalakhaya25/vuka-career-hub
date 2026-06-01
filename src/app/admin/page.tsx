import { prisma } from '@/lib/db'
import Link from 'next/link'
import { GraduationCap, Briefcase, TrendingUp, Plus } from 'lucide-react'

export default async function AdminDashboard() {
  const [bursaryCount, learnershipCount, careerCount] = await Promise.all([
    prisma.bursary.count(),
    prisma.learnership.count(),
    prisma.careerPath.count(),
  ])

  const recentBursaries = await prisma.bursary.findMany({
    orderBy: { updatedAt: 'desc' },
    take: 5,
    select: { id: true, name: true, provider: true, isActive: true, updatedAt: true },
  })

  const recentLearnerships = await prisma.learnership.findMany({
    orderBy: { updatedAt: 'desc' },
    take: 5,
    select: { id: true, title: true, seta: true, status: true, deadline: true },
  })

  const sections = [
    { label: 'Bursaries', count: bursaryCount, href: '/admin/bursaries', icon: GraduationCap, color: 'bg-green-50 text-green-600' },
    { label: 'Learnerships', count: learnershipCount, href: '/admin/learnerships', icon: Briefcase, color: 'bg-orange-50 text-orange-600' },
    { label: 'Careers', count: careerCount, href: '/admin/careers', icon: TrendingUp, color: 'bg-blue-50 text-blue-600' },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Manage all content on Vuka Career Hub.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {sections.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="bg-white rounded-xl border border-slate-200 p-5 hover:border-orange-300 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center`}>
                <s.icon className="h-5 w-5" />
              </div>
              <Link
                href={`${s.href}/new`}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-xs font-semibold text-orange-500 hover:text-orange-700"
              >
                <Plus className="h-3.5 w-3.5" />
                Add
              </Link>
            </div>
            <div className="text-3xl font-extrabold text-slate-900">{s.count}</div>
            <div className="text-sm text-slate-500 mt-0.5">{s.label}</div>
          </Link>
        ))}
      </div>

      {/* Recent rows */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Bursaries */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Recent Bursaries</h2>
            <Link href="/admin/bursaries" className="text-xs text-orange-500 hover:text-orange-700 font-medium">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {recentBursaries.map((b) => (
              <div key={b.id} className="px-5 py-3 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-900">{b.name}</div>
                  <div className="text-xs text-slate-400">{b.provider}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${b.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                    {b.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <Link href={`/admin/bursaries/${b.id}/edit`} className="text-xs text-slate-400 hover:text-orange-500">
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learnerships */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Recent Learnerships</h2>
            <Link href="/admin/learnerships" className="text-xs text-orange-500 hover:text-orange-700 font-medium">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {recentLearnerships.map((l) => (
              <div key={l.id} className="px-5 py-3 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-900">{l.title}</div>
                  <div className="text-xs text-slate-400">{l.seta}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    l.status === 'OPEN' ? 'bg-green-100 text-green-700' :
                    l.status === 'UPCOMING' ? 'bg-blue-100 text-blue-700' :
                    'bg-slate-100 text-slate-500'
                  }`}>
                    {l.status}
                  </span>
                  <Link href={`/admin/learnerships/${l.id}/edit`} className="text-xs text-slate-400 hover:text-orange-500">
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
