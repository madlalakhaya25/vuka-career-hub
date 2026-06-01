'use client'

import { useActionState } from 'react'

type BursaryData = {
  id?: string
  name?: string | null
  fullName?: string | null
  provider?: string | null
  category?: string | null
  icon?: string | null
  featured?: boolean
  amountDescription?: string | null
  deadline?: Date | null
  applicationUrl?: string | null
  description?: string | null
  eligibilityNotes?: string | null
  fieldsOfStudy?: string[]
  isNsfas?: boolean
  isActive?: boolean
}

type Props = {
  action: (prevState: { error: string }, formData: FormData) => Promise<{ error: string }>
  defaultValues?: BursaryData
  submitLabel?: string
}

export function BursaryForm({ action, defaultValues: d = {}, submitLabel = 'Save Bursary' }: Props) {
  const [state, formAction, pending] = useActionState(action, { error: '' })

  const deadlineStr = d.deadline
    ? new Date(d.deadline).toISOString().substring(0, 10)
    : ''

  return (
    <form action={formAction} className="space-y-6">
      {state.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Bursary Name *" name="name" defaultValue={d.name} required />
        <Field label="Full Name / Programme Title" name="fullName" defaultValue={d.fullName ?? ''} />
        <Field label="Provider *" name="provider" defaultValue={d.provider} required />
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Category *</label>
          <select
            name="category"
            defaultValue={d.category ?? 'government'}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="government">Government</option>
            <option value="corporate">Corporate</option>
            <option value="seta">SETA</option>
          </select>
        </div>
        <Field label="Icon (emoji)" name="icon" defaultValue={d.icon ?? ''} placeholder="🎓" />
        <Field label="Amount Description" name="amountDescription" defaultValue={d.amountDescription ?? ''} placeholder="Full tuition + R5,200/month" />
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Application Deadline</label>
          <input
            type="date"
            name="deadline"
            defaultValue={deadlineStr}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <Field label="Application URL" name="applicationUrl" defaultValue={d.applicationUrl ?? ''} placeholder="https://..." type="url" />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Fields of Study (comma-separated)</label>
        <input
          type="text"
          name="fieldsOfStudy"
          defaultValue={(d.fieldsOfStudy ?? []).join(', ')}
          placeholder="Engineering, Science, IT"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <Textarea label="Description" name="description" defaultValue={d.description ?? ''} rows={3} />
      <Textarea label="Eligibility Notes" name="eligibilityNotes" defaultValue={d.eligibilityNotes ?? ''} rows={3} />

      <div className="flex flex-wrap gap-6">
        <Checkbox name="isNsfas" label="NSFAS scheme" defaultChecked={d.isNsfas} />
        <Checkbox name="featured" label="Featured (pinned to top)" defaultChecked={d.featured} />
        <Checkbox name="isActive" label="Active (visible on site)" defaultChecked={d.isActive ?? true} />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold rounded-xl text-sm transition-colors"
        >
          {pending ? 'Saving...' : submitLabel}
        </button>
        <a href="/admin/bursaries" className="px-5 py-2.5 border border-slate-300 text-slate-700 font-medium rounded-xl text-sm hover:bg-slate-50 transition-colors">
          Cancel
        </a>
      </div>
    </form>
  )
}

function Field({ label, name, defaultValue, required, placeholder, type = 'text' }: {
  label: string; name: string; defaultValue?: string | null; required?: boolean; placeholder?: string; type?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue ?? undefined}
        required={required}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
    </div>
  )
}

function Textarea({ label, name, defaultValue = '', rows = 4 }: {
  label: string; name: string; defaultValue?: string; rows?: number
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-y"
      />
    </div>
  )
}

function Checkbox({ name, label, defaultChecked }: { name: string; label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="rounded border-slate-300 text-orange-500 focus:ring-orange-500" />
      {label}
    </label>
  )
}
