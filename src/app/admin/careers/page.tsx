import { prisma } from '@/lib/db'
import Link from 'next/link'
import { Plus, Pencil } from 'lucide-react'
import { deleteCareer } from '@/app/actions/admin'

const demandColors: Record<string, string> = {
  CRITICAL: 'bg-red-100 text-red-700',
  HIGH: 'bg-orange-100 text-orange-700',
  MODERATE: 'bg-yellow-100 text-yellow-700',
  LOW: 'bg-slate-100 text-slate-500',
}

export default async function AdminCareersPage() {
  const careers = await prisma.careerPath.findMany({
    orderBy: [{ demandLevel: 'asc' }, { title: 'asc' }],
  })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Careers</h1>
          <p className="text-slate-500 mt-0.5">{careers.length} total</p>
        </div>
        <Link
          href="/admin/careers/new"
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Career
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="text-left px-5 py-3 font-semibold text-slate-600">Career</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Sector</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Salary Range</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Demand</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {careers.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    {c.icon && <span>{c.icon}</span>}
                    <div>
                      <div className="font-medium text-slate-900">{c.title}</div>
                      <div className="text-xs text-slate-400">{c.fieldOfStudy}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600">{c.sector}</td>
                <td className="px-4 py-3 text-slate-600 text-xs">
                  {c.salaryEntry && c.salarySenior
                    ? `R${c.salaryEntry.toLocaleString()}–R${c.salarySenior.toLocaleString()}/mo`
                    : '—'}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${demandColors[c.demandLevel] ?? 'bg-slate-100 text-slate-500'}`}>
                    {c.demandLevel}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3 justify-end">
                    <Link
                      href={`/admin/careers/${c.id}/edit`}
                      className="flex items-center gap-1 text-xs text-slate-500 hover:text-orange-600 font-medium"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </Link>
                    <form action={async () => { 'use server'; await deleteCareer(c.id) }}>
                      <button type="submit" className="text-xs text-slate-400 hover:text-red-500 font-medium">
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
