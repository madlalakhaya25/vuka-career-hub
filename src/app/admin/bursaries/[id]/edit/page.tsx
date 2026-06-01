import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { BursaryForm } from '../../BursaryForm'
import { updateBursary } from '@/app/actions/admin'

export default async function EditBursaryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const bursary = await prisma.bursary.findUnique({ where: { id } })
  if (!bursary) notFound()

  async function action(_prev: { error: string }, formData: FormData) {
    'use server'
    try {
      await updateBursary(id, formData)
      return { error: '' }
    } catch (e) {
      return { error: e instanceof Error ? e.message : 'Something went wrong' }
    }
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Edit Bursary</h1>
        <p className="text-slate-500 mt-0.5">{bursary.name}</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <BursaryForm action={action} defaultValues={bursary} submitLabel="Save Changes" />
      </div>
    </div>
  )
}
