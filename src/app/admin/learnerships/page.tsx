import { prisma } from '@/lib/db'
import Link from 'next/link'
import { Plus, Pencil } from 'lucide-react'
import { deleteLearnership } from '@/app/actions/admin'

async function handleDelete(formData: FormData) {
  'use server'
  const id = formData.get('id') as string
  await deleteLearnership(id)
}

export default async function AdminLearnershipPage() {
  const learnerships = await prisma.learnership.findMany({
    orderBy: [{ status: 'asc' }, { deadline: 'asc' }],
  })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Learnerships</h1>
          <p className="text-slate-500 mt-0.5">{learnerships.length} total</p>
        </div>
        <Link
          href="/admin/learnerships/new"
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Learnership
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="text-left px-5 py-3 font-semibold text-slate-600">Title</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">SETA</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Stipend</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Deadline</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {learnerships.map((l) => {
              const deadlinePassed = l.deadline && l.deadline < new Date()
              return (
                <tr key={l.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      {l.icon && <span>{l.icon}</span>}
                      <div>
                        <div className="font-medium text-slate-900">{l.title}</div>
                        <div className="text-xs text-slate-400">{l.sector}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{l.seta ?? '—'}</td>
                  <td className="px-4 py-3 text-slate-600 text-xs">
                    {l.stipendMin && l.stipendMax
                      ? `R${l.stipendMin.toLocaleString()}–R${l.stipendMax.toLocaleString()}/mo`
                      : '—'}
                  </td>
                  <td className="px-4 py-3">
                    {l.deadline ? (
                      <span className={`text-xs ${deadlinePassed ? 'text-red-500' : 'text-slate-600'}`}>
                        {l.deadline.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}
                        {deadlinePassed && ' ⚠'}
                      </span>
                    ) : <span className="text-slate-400 text-xs">Rolling</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                      l.status === 'OPEN' ? 'bg-green-100 text-green-700' :
                      l.status === 'UPCOMING' ? 'bg-blue-100 text-blue-700' :
                      'bg-slate-100 text-slate-500'
                    }`}>
                      {l.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3 justify-end">
                      <Link
                        href={`/admin/learnerships/${l.id}/edit`}
                        className="flex items-center gap-1 text-xs text-slate-500 hover:text-orange-600 font-medium"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </Link>
                      <form action={handleDelete}>
                        <input type="hidden" name="id" value={l.id} />
                        <button type="submit" className="text-xs text-slate-400 hover:text-red-500 font-medium">
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
