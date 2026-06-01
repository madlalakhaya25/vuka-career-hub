import { prisma } from '@/lib/db'
import Link from 'next/link'
import { Plus, Pencil } from 'lucide-react'
import { deleteBursary, toggleBursaryActive } from '@/app/actions/admin'

export default async function AdminBursariesPage() {
  const bursaries = await prisma.bursary.findMany({
    orderBy: [{ featured: 'desc' }, { name: 'asc' }],
  })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Bursaries</h1>
          <p className="text-slate-500 mt-0.5">{bursaries.length} total</p>
        </div>
        <Link
          href="/admin/bursaries/new"
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Bursary
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="text-left px-5 py-3 font-semibold text-slate-600">Bursary</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Category</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Deadline</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {bursaries.map((b) => {
              const deadlinePassed = b.deadline && b.deadline < new Date()
              return (
                <tr key={b.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      {b.icon && <span className="text-lg">{b.icon}</span>}
                      <div>
                        <div className="font-medium text-slate-900">{b.name}</div>
                        <div className="text-xs text-slate-400">{b.provider}</div>
                      </div>
                      {b.featured && <span className="text-xs bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded font-medium">Featured</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-500 capitalize">{b.category ?? '—'}</td>
                  <td className="px-4 py-3">
                    {b.deadline ? (
                      <span className={deadlinePassed ? 'text-red-500 text-xs' : 'text-slate-600 text-xs'}>
                        {b.deadline.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}
                        {deadlinePassed && ' (passed)'}
                      </span>
                    ) : (
                      <span className="text-slate-400 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <form
                      action={async () => {
                        'use server'
                        await toggleBursaryActive(b.id, !b.isActive)
                      }}
                    >
                      <button
                        type="submit"
                        className={`text-xs px-2.5 py-1 rounded-full font-medium border cursor-pointer ${
                          b.isActive
                            ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                            : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {b.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </form>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3 justify-end">
                      <Link
                        href={`/admin/bursaries/${b.id}/edit`}
                        className="flex items-center gap-1 text-xs text-slate-500 hover:text-orange-600 font-medium"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </Link>
                      <form
                        action={async () => {
                          'use server'
                          await deleteBursary(b.id)
                        }}
                      >
                        <button
                          type="submit"
                          className="text-xs text-slate-400 hover:text-red-500 font-medium"
                          onClick={() => {}}
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
