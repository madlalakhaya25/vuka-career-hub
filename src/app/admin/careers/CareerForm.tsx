'use client'

import { useActionState } from 'react'

type CareerData = {
  id?: string
  title?: string
  sector?: string
  fieldOfStudy?: string
  icon?: string | null
  demandLevel?: string
  salaryEntry?: number | null
  salaryMid?: number | null
  salarySenior?: number | null
  description?: string | null
  outlook?: string | null
  skills?: string[]
  pathways?: string[]
}

type Props = {
  action: (prevState: { error: string }, formData: FormData) => Promise<{ error: string }>
  defaultValues?: CareerData
  submitLabel?: string
}

export function CareerForm({ action, defaultValues: d = {}, submitLabel = 'Save Career' }: Props) {
  const [state, formAction, pending] = useActionState(action, { error: '' })

  return (
    <form action={formAction} className="space-y-6">
      {state.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Title *" name="title" defaultValue={d.title} required />
        <Field label="Sector *" name="sector" defaultValue={d.sector} required placeholder="e.g. Engineering" />
        <Field label="Field of Study *" name="fieldOfStudy" defaultValue={d.fieldOfStudy} required placeholder="e.g. Electrical Engineering" />
        <Field label="Icon (emoji)" name="icon" defaultValue={d.icon ?? ''} placeholder="⚡" />
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Demand Level *</label>
          <select
            name="demandLevel"
            defaultValue={d.demandLevel ?? 'HIGH'}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MODERATE">Moderate</option>
            <option value="LOW">Low</option>
          </select>
        </div>
        <Field label="Entry Salary (R/mo)" name="salaryEntry" defaultValue={d.salaryEntry ? String(d.salaryEntry) : ''} type="number" placeholder="17000" />
        <Field label="Mid Salary (R/mo)" name="salaryMid" defaultValue={d.salaryMid ? String(d.salaryMid) : ''} type="number" placeholder="35000" />
        <Field label="Senior Salary (R/mo)" name="salarySenior" defaultValue={d.salarySenior ? String(d.salarySenior) : ''} type="number" placeholder="65000" />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Skills (comma-separated)</label>
        <input
          type="text"
          name="skills"
          defaultValue={(d.skills ?? []).join(', ')}
          placeholder="Problem solving, Technical drawing, Safety compliance"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <Textarea label="Outlook" name="outlook" defaultValue={d.outlook ?? ''} rows={2} />
      <Textarea label="Description" name="description" defaultValue={d.description ?? ''} rows={4} />

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Career Pathways (one per line)</label>
        <textarea
          name="pathways"
          defaultValue={(d.pathways ?? []).join('\n')}
          rows={4}
          placeholder="Apprentice Electrician&#10;Journeyman Electrician&#10;Master Electrician&#10;Electrical Contractor"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-y"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold rounded-xl text-sm transition-colors"
        >
          {pending ? 'Saving...' : submitLabel}
        </button>
        <a href="/admin/careers" className="px-5 py-2.5 border border-slate-300 text-slate-700 font-medium rounded-xl text-sm hover:bg-slate-50 transition-colors">
          Cancel
        </a>
      </div>
    </form>
  )
}

function Field({ label, name, defaultValue = '', required, placeholder, type = 'text' }: {
  label: string; name: string; defaultValue?: string; required?: boolean; placeholder?: string; type?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
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
