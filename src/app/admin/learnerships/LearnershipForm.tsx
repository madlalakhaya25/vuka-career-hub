'use client'

import { useActionState } from 'react'

type LearnershipData = {
  id?: string
  title?: string | null
  provider?: string | null
  seta?: string | null
  sector?: string | null
  fieldOfStudy?: string | null
  nqfLevel?: number
  stipendMin?: number | null
  stipendMax?: number | null
  durationMonths?: number
  deadline?: Date | null
  applicationUrl?: string | null
  description?: string | null
  requirements?: string | null
  provinces?: string[]
  isNational?: boolean
  icon?: string | null
  status?: string
}

type Props = {
  action: (prevState: { error: string }, formData: FormData) => Promise<{ error: string }>
  defaultValues?: LearnershipData
  submitLabel?: string
}

export function LearnershipForm({ action, defaultValues: d = {}, submitLabel = 'Save Learnership' }: Props) {
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
        <Field label="Title *" name="title" defaultValue={d.title} required />
        <Field label="Provider *" name="provider" defaultValue={d.provider} required />
        <Field label="SETA" name="seta" defaultValue={d.seta ?? ''} placeholder="e.g. MERSETA" />
        <Field label="Sector" name="sector" defaultValue={d.sector ?? ''} placeholder="e.g. Manufacturing" />
        <Field label="Field of Study" name="fieldOfStudy" defaultValue={d.fieldOfStudy ?? ''} placeholder="e.g. Engineering" />
        <Field label="Icon (emoji)" name="icon" defaultValue={d.icon ?? ''} placeholder="🔧" />
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">NQF Level *</label>
          <select
            name="nqfLevel"
            defaultValue={d.nqfLevel ?? 3}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={n}>NQF {n}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Status *</label>
          <select
            name="status"
            defaultValue={d.status ?? 'OPEN'}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="OPEN">Open</option>
            <option value="UPCOMING">Upcoming</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
        <Field label="Duration (months) *" name="durationMonths" defaultValue={String(d.durationMonths ?? 12)} type="number" />
        <Field label="Stipend Min (R/mo)" name="stipendMin" defaultValue={d.stipendMin ? String(d.stipendMin) : ''} type="number" placeholder="3000" />
        <Field label="Stipend Max (R/mo)" name="stipendMax" defaultValue={d.stipendMax ? String(d.stipendMax) : ''} type="number" placeholder="7000" />
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
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Provinces (comma-separated, leave blank if national)</label>
        <input
          type="text"
          name="provinces"
          defaultValue={(d.provinces ?? []).join(', ')}
          placeholder="Gauteng, Western Cape, KwaZulu-Natal"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <Textarea label="Description" name="description" defaultValue={d.description ?? ''} rows={3} />
      <Textarea label="Requirements" name="requirements" defaultValue={d.requirements ?? ''} rows={3} />

      <div className="flex flex-wrap gap-6">
        <Checkbox name="isNational" label="National (available in all provinces)" defaultChecked={d.isNational} />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold rounded-xl text-sm transition-colors"
        >
          {pending ? 'Saving...' : submitLabel}
        </button>
        <a href="/admin/learnerships" className="px-5 py-2.5 border border-slate-300 text-slate-700 font-medium rounded-xl text-sm hover:bg-slate-50 transition-colors">
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
