import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { LearnershipForm } from '../../LearnershipForm'
import { updateLearnership } from '@/app/actions/admin'

export default async function EditLearnershipPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const learnership = await prisma.learnership.findUnique({ where: { id } })
  if (!learnership) notFound()

  async function action(_prev: { error: string }, formData: FormData) {
    'use server'
    try {
      await updateLearnership(id, formData)
      return { error: '' }
    } catch (e) {
      return { error: e instanceof Error ? e.message : 'Something went wrong' }
    }
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Edit Learnership</h1>
        <p className="text-slate-500 mt-0.5">{learnership.title}</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <LearnershipForm action={action} defaultValues={learnership} submitLabel="Save Changes" />
      </div>
    </div>
  )
}
