import { BursaryForm } from '../BursaryForm'
import { createBursary } from '@/app/actions/admin'

async function action(_prev: { error: string }, formData: FormData) {
  'use server'
  try {
    await createBursary(formData)
    return { error: '' }
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Something went wrong' }
  }
}

export default function NewBursaryPage() {
  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Add Bursary</h1>
        <p className="text-slate-500 mt-0.5">New bursary will be visible on the site immediately.</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <BursaryForm action={action} submitLabel="Create Bursary" />
      </div>
    </div>
  )
}
