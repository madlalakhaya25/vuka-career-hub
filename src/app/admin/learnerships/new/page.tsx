import { LearnershipForm } from '../LearnershipForm'
import { createLearnership } from '@/app/actions/admin'

async function action(_prev: { error: string }, formData: FormData) {
  'use server'
  try {
    await createLearnership(formData)
    return { error: '' }
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Something went wrong' }
  }
}

export default function NewLearnershipPage() {
  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Add Learnership</h1>
        <p className="text-slate-500 mt-0.5">New learnership will be visible on the site immediately.</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <LearnershipForm action={action} submitLabel="Create Learnership" />
      </div>
    </div>
  )
}
