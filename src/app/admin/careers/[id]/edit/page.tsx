import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { CareerForm } from '../../CareerForm'
import { updateCareer } from '@/app/actions/admin'

export default async function EditCareerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const career = await prisma.careerPath.findUnique({ where: { id } })
  if (!career) notFound()

  async function action(_prev: { error: string }, formData: FormData) {
    'use server'
    try {
      await updateCareer(id, formData)
      return { error: '' }
    } catch (e) {
      return { error: e instanceof Error ? e.message : 'Something went wrong' }
    }
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Edit Career</h1>
        <p className="text-slate-500 mt-0.5">{career.title}</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <CareerForm action={action} defaultValues={career} submitLabel="Save Changes" />
      </div>
    </div>
  )
}
